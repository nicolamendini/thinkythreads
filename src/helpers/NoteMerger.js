/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
NoteMerger function
Merges two notes objects in a meaningful way
Unifies all the links and concatenates the text
For the user doing the same manually would make the system impractical
*/

import { toast } from "react-toastify";
import { LINKSLIMIT, WORKSPACELIMIT, TEXTLIMIT, db } from "../components/Dashboard"
import { setPreview } from "./DashboardUtils";
import { mergeLinksLimit, mergeTextLimit, mergeWorkspaceLimit } from "./Messages";
import { addToBranches } from "./NotesManupulation";
import { linkThreadNotes } from "./NotesManupulation";
import { backupNote } from "./RequestsMakers";

const notifyTextLimit = () => toast(mergeTextLimit);
const notifyLinksLimit = () => toast(mergeLinksLimit);
const notifyWorkspaceLimit = () => toast(mergeWorkspaceLimit);

// Merges noteA and noteB
export function noteMerger(
    noteA, 
    noteB, 
    setMergeMode, 
    dashboard, 
    setNotesUpdating, 
    threadOrCollection, 
    packDashboard, 
    deleteNote
){

    // Unifies roots, branches, collection and thread by also 
    // using sets to avoid repeated entries when needed
    const newBranches = [...new Set([...noteA.branches, ...noteB.branches])]
    const newRoots = [...new Set([...noteA.roots, ...noteB.roots])]
    const newCollection = [...new Set([...noteA.collection, ...noteB.collection])]
    const newThread = [...noteA.thread, ...noteB.thread]

    // check that the limits for branches and roots are met
    if(newBranches.length > LINKSLIMIT || newRoots.length > LINKSLIMIT){
        notifyLinksLimit()
        setMergeMode(false)
        return
    }

    // check that the limits for thread and collections are met
    if(newCollection.length > WORKSPACELIMIT || newThread.length > WORKSPACELIMIT){
        notifyWorkspaceLimit()
        setMergeMode(false)
        return
    }

    // if the checks passed, retrieve the notes and merge the contents
    db.notes.get(noteA.id).then((dbNoteA) => 
        db.notes.get(noteB.id).then((dbNoteB) => {

            const newText = dbNoteA.text + ' ' + dbNoteB.text

            // check if the merged texts are still within the limits
            // if not, abort
            if(newText.length > TEXTLIMIT){
                notifyTextLimit()
                setMergeMode(false)
                return
            }

            // if all the checks passed, initialise the new note C 
            // note C takes the same id as noteA
            const newDashboard = {...dashboard}
            const noteC = {
                id: noteA.id,
                text: newText,
                branches: newBranches,
                roots: newRoots,
                thread: newThread,
                collection: newCollection,
                pinned: noteA.pinned || noteB.pinned,
                color: noteA.color!=='#ffffff' ? noteA.color : noteB.color,
                colorPreview: noteA.colorPreview!=='#ffffff' ? noteA.colorPreview : noteB.colorPreview,
                version: noteA.version,
                leftLink: noteA.leftLink,
                rightLink: noteA.rightLink
            }

            // set the preview of the noteC based on the text
            setPreview(noteC)
            
            // remove occurrences of noteA and noteB in noteC to avoid circularity of reference
            noteC.branches = noteC.branches.filter((id) => 
                id!==noteA.id && id!==noteB.id
            );
            noteC.roots = noteC.roots.filter((id) => 
                id!==noteA.id && id!==noteB.id
            );

            // do the same for thread and collection
            noteC.collection = noteC.collection.filter((id) =>
                id!==noteA.id && id!==noteB.id
            )
            noteC.thread = noteC.thread.filter((id) =>
                id!==noteA.id && id!==noteB.id
            )
            linkThreadNotes(newDashboard, noteC.thread, setNotesUpdating)

            // add noteC to the dashboard
            newDashboard.notes.set(noteC.id, noteC)

            // start cleaning all the notes that have conflicts because they relied on the id
            // of noteB that now will not exist anymore
            var presenceCheck = false
            var updatesCounter=0

            for(const [, note] of newDashboard.notes){

                // clean from threads if noteB ID included
                if(note.thread.includes(noteB.id)){
                    note.thread = note.thread.flatMap(
                        (id) => id===noteB.id ? [noteA.id] : [id]
                    )
                    presenceCheck = true
                }

                // clean from collections if noteB ID included
                if(note.collection.includes(noteB.id)){
                    if(!note.collection.includes(noteC.id)){
                        note.collection.push(noteC.id);
                    }
                    note.collection = note.collection.filter(
                        (id) => id!==noteB.id
                    )
                    presenceCheck = true
                }
                    
                // clean from branches if noteB ID included
                if(note.branches.includes(noteB.id)){
                    if(!note.branches.includes(noteC.id)){
                        addToBranches(note, noteC)
                    }
                    note.branches = note.branches.filter(
                        (id) => id!==noteB.id
                    )
                    presenceCheck = true
                }

                // clean from roots if noteB ID included
                if(note.roots.includes(noteB.id)){
                    if(!note.roots.includes(noteC.id)){
                        addToBranches(noteC, note)
                    }
                    note.roots = note.roots.filter(
                        (id) => id===noteB.id
                    )
                    presenceCheck = true
                }
            
                // if any changes have been applied, backup the note
                if(presenceCheck){
                    updatesCounter+=1
                    setTimeout(() => {
                        backupNote(note, 'meta', setNotesUpdating)
                    }, (200 * updatesCounter))
                }
                
                
                presenceCheck = false
            }        
            
            // clean the current workspace from noteB 
            if(!threadOrCollection && dashboard.workspaceIds.includes(noteA.id)){
                newDashboard.workspaceIds = newDashboard.workspaceIds.filter((id) =>
                    id!==noteB.id
                )
            }
            else{
                newDashboard.workspaceIds = newDashboard.workspaceIds.flatMap((id) =>
                    id===noteB.id ? [noteA.id] : [id]
                )
            }

            // if noteB was open inside the collection, open noteC instead
            if(newDashboard.openedCollectionId===noteB.id){
                newDashboard.openedCollectionId=noteC.id
            }

            // if noteB was open inside the workspace, open noteC instead
            if(newDashboard.openedWorkspaceId===noteB.id || newDashboard.openedWorkspaceId===noteA.id){
                newDashboard.openedWorkspaceId=noteC.id
                newDashboard.workspaceIds = newDashboard.workspaceIds.filter(
                    (id) => id!==noteB.id && id!==noteA.id 
                )
            }

            // select noteC, backup, delete noteB and update the dashboard
            newDashboard.prevSelectedNoteId = newDashboard.selectedNoteId
            newDashboard.selectedNoteId = noteC.id;
            backupNote(noteC, 'both', setNotesUpdating)
            deleteNote(noteB.id, false, newDashboard)
            packDashboard(newDashboard)
        })
    )
}