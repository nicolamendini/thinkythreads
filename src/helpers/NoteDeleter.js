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
import { removeNoteFile } from "./BackupHelper";
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
    setNotesUpdating,
    packDashboard,
    synchNotes
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

        // keep track of deleted note
        newDashboard.notesEverDeleted[removingId]=true

        // backup the new notes order and the new deleted notes arrays
        window.localStorage.setItem('notes-order', JSON.stringify(newDashboard.notesOrder))
        window.localStorage.setItem('notes-ever-deleted', JSON.stringify(newDashboard.notesEverDeleted))

        // if this function was not called by merge mode then sanitise all collections and dashboard
        if(!mergeMode){

            // sanitise all the collections by simply removing the entry
            // no conflicts because collections have no links
            var updatesCounter=0
            for(const [, note] of newDashboard.notes){
                const removingIndex = note.collection.findIndex(id => id===removingId)
                if(removingIndex!==-1){
                    note.collection = removeElementAt(note.collection, removingIndex)   
                    updatesCounter+=1
                    setTimeout(() => {
                        backupNote(note, 'meta', setNotesUpdating)
                    }, (200 * updatesCounter))
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
            newDashboard.workspaceIds = newDashboard.workspaceIds.filter(id => id!==removingId)
        }

        // if it was called by merge mode, assume it is already sanitised previously and end merge mode
        else{
            setMergeMode(false)
        }

        // if possible, backup the removal and update the .config file on drive
        if(driveBackupAuthorised){
            setNotesUpdating((prev) => prev+1)
            removeNoteFile(noteToRemove, setNotesUpdating, () => synchNotes({...newDashboard}))
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
                setNotesUpdating,
                packDashboard
            )
        }
    }
}
