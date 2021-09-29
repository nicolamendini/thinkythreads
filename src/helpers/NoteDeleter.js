/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
NoteDeleter function
Deletes a note and resolves potential conflicts in the process
*/

import { db } from "../components/Dashboard";
import { checkConflicts, removeElementAt } from "./DashboardUtils";
import { driveBackupAuthorised } from "../components/Dashboard";
import { updateConfigFile, removeNoteFile } from "./BackupHelper";
import { forceRemove } from "./NotesManupulation";
import { backupNote } from "./RequestsMakers";
import { deleteConflictAlert } from "./Messages";

// Delete a note given by removingId from the notes array and cascade
// forceFlag controls whether the removal shouldbe forced without asking
export function noteDeleter(
    removingId, 
    forceFlag, 
    newDashboard, 
    mergeMode, 
    setMergeMode,
    deletedNotes, 
    setDeletedNotes, 
    setNotesUpdating,
    packDashboard
){

    // get the note to remove and check for conflicts
    const noteToRemove = newDashboard.notes.get(removingId);

    // if no conflicts
    if(checkConflicts(newDashboard, removingId) || mergeMode){
        
        // remove it from the dashboard
        newDashboard.notes.delete(removingId)
        newDashboard.notesOrder = removeElementAt(
            newDashboard.notesOrder, 
            newDashboard.notesOrder.findIndex(id => id===removingId)
        )

        // add its ID to the deleted notes storage
        const newDeletedNotes = [...deletedNotes, removingId]
        setDeletedNotes(newDeletedNotes)

        // keep track of deleted note
        newDashboard.notesEverDeleted.push(removingId)

        // backup the new notes order and the new deleted notes arrays
        window.localStorage.setItem('notes-order', JSON.stringify(newDashboard.notesOrder))
        window.localStorage.setItem('deleted-notes', JSON.stringify(newDeletedNotes))
        window.localStorage.setItem('notes-ever-deleted', JSON.stringify(newDashboard.notesEverDeleted))

        // if this function was not called by merge mode then sanitise all collections and dashboard
        if(!mergeMode){

            // sanitise all the collections by simply removing the entry
            // no conflicts because collections have no links
            for(const [, note] of newDashboard.notes){
                const removingIndex = note.collection.findIndex(id => id===removingId)
                if(removingIndex!==-1){
                    note.collection = removeElementAt(note.collection, removingIndex)
                    backupNote(note, 'meta', setNotesUpdating)
                }

            }

            // sanitise the dashboard
            if(newDashboard.openedWorkspaceId===removingId){
                newDashboard.openedWorkspaceId = null;
            }
            if(newDashboard.openedCollectionId===removingId){
                newDashboard.openedCollectionId = null;
            }
            if(newDashboard.selectedNoteId===removingId){
                newDashboard.selectedNoteId = null;
            }
        }

        // if it was called by merge mode, assume it is already sanitised previously and end merge mode
        else{
            setMergeMode(false)
        }

        // if possible, backup the removal and update the .config file on drive
        if(driveBackupAuthorised){
            removeNoteFile(noteToRemove, newDeletedNotes, setDeletedNotes, setNotesUpdating);
            updateConfigFile(newDashboard)
        }

        // remove the note locally and update the dashboard
        db.notes.delete(removingId)
        packDashboard(newDashboard)
    }

    // if there are conflicts ask to force the removal through the 
    // forceRemove function
    else{            
        if(forceFlag || window.confirm(deleteConflictAlert)){
            forceRemove(newDashboard, removingId, setNotesUpdating);
            noteDeleter(
                removingId, 
                false, 
                newDashboard,
                mergeMode, 
                setMergeMode,
                deletedNotes, 
                setDeletedNotes, 
                setNotesUpdating,
                packDashboard
            )
        }
    }
}
