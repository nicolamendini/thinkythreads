/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DragManager function
Manages all the drag gestures between notes
*/

import { WORKSPACELIMIT } from "../components/Dashboard";
import { addToWorkspace, addToBranches, removeFromBranches, manageWrapper, workspaceAdder, workspaceRemover } from "./NotesManupulation";
import { backupNote } from "./RequestsMakers";
import { moveNoteInsideGraph, moveNoteInsideArea } from "./DashboardUtils";
import { alertMergeMode, workspaceLimitReached } from "./Messages";

// Manage the dragging and dropping rules
// all the information that is needed is contained in the result
// parameter that is provided by the DragAndDropContext component
// from React Beautiful DnD
export function dragManager(
    dashboard,
    mergeMode, 
    threadOrCollection, 
    setThreadOrCollection,
    rootsOrBranches, 
    setNotesUpdating,
    packDashboard,
    result
){

    // if the destination is invalid do not do anything
    if(result.destination===null){return}

    // if the mergeMode is on, disable the gestures
    else if(mergeMode){alert(alertMergeMode)}

    // if the source of the dragging is the search 
    else if(result.source.droppableId==='search-area'){

        // if it goes to the workspace
        if(result.destination.droppableId==='workspace-area'){
            const targetId = dashboard.search[result.source.index].id
            const destination = result.destination.index
            workspaceAdder(dashboard, threadOrCollection, targetId, packDashboard, destination)
        }

        // if the destination was the links area aka branches area
        else if(result.destination.droppableId==='branches-area'){
            const newDashboard = {...dashboard}
            const noteFrom = newDashboard.notes.get(dashboard.search[result.source.index].id)
            const noteToAdd = newDashboard.notes.get(dashboard.selectedNoteId)
            
            // if we are in branches mode add noteTo to noteFrom
            if(!rootsOrBranches){
                if(addToBranches(noteToAdd, noteFrom)){
                    backupNote(noteToAdd, 'meta', setNotesUpdating)
                    backupNote(noteFrom, 'meta', setNotesUpdating)
                } 
            }

            // otherwise do the opposite and add noteFrom to noteTo
            else{
                if(addToBranches(noteFrom, noteToAdd)){
                    backupNote(noteToAdd, 'meta', setNotesUpdating)
                    backupNote(noteFrom, 'meta', setNotesUpdating)
                }   
            }
            packDashboard(newDashboard, false, false, true);
        }

        // if the destination is the wrapper area
        else if(result.destination.droppableId==='wrapper-area'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.search[result.source.index]
            manageWrapper(newDashboard, targetNote, threadOrCollection, setThreadOrCollection, setNotesUpdating)
            packDashboard(newDashboard)
        }

        // if the destination is the search area itself just change the order of the notes
        else if(result.destination.droppableId==='search-area'){
            if(result.source.index!==result.destination.index){
                const sourceNote = dashboard.search[result.source.index]
                const targetNote = dashboard.search[result.destination.index]
                var dir = result.source.index > result.destination.index
                // only if not trying to move between pinned notes
                if(
                !(
                    (!targetNote.pinned && sourceNote.pinned) ||
                    (!sourceNote.pinned && targetNote.pinned)
                )
                ){
                        
                    // reorder the notes
                    const newDashboard = {...dashboard}
                    if(sourceNote.pinned){
                        dir = !dir
                    }
                    moveNoteInsideGraph(
                        newDashboard, 
                        sourceNote.id, 
                        targetNote.id, 
                        dir, 
                        (note) => backupNote(note, 'meta', setNotesUpdating)
                    )
                    newDashboard.prevSelectedNoteId = newDashboard.selectedNoteId
                    newDashboard.selectedNoteId = sourceNote.id
                    packDashboard(newDashboard, true, false, true)
                }
            }
        }

        // if the destination is the search bar, open the collection of the dragging note in search
        else if(result.destination.droppableId==='search-bar'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.search[result.source.index]
            newDashboard.openedCollectionId = targetNote.id;
            packDashboard(newDashboard, true)
        }
    }

    // if the source is the workspace area
    else if(result.source.droppableId==='workspace-area'){

        // if the destination is the search, remove that note from the workspace
        // select the dragging note and update the dashboard
        if(result.destination.droppableId==='search-area'){
            const newDashboard = {...dashboard}
            const indexToRem = result.source.index
            workspaceRemover(newDashboard, threadOrCollection, packDashboard, indexToRem)
        }

        // if the destination is the workspace area itself, just reorder the thread or collection and update
        else if(result.destination.droppableId==='workspace-area'){
            const newDashboard = {...dashboard}
            newDashboard.workspaceIds = moveNoteInsideArea(newDashboard.workspaceIds, result.source.index, result.destination.index)
            newDashboard.prevSelectedNoteId = newDashboard.selectedNoteId
            newDashboard.selectedNoteId = newDashboard.workspaceIds[result.destination.index]
            packDashboard(newDashboard, false, true, true)
        }
    }

    // if the source is the branches area
    else if(result.source.droppableId==='branches-area'){

        // if the destination is the search, remove a link
        if(result.destination.droppableId==='search-area'){
            const newDashboard = {...dashboard}
            const noteFrom = newDashboard.notes.get(dashboard.links[result.source.index].id);
            const noteToRem = newDashboard.notes.get(dashboard.selectedNoteId)

            // if branches mode, remove noteToRem from noteFrom
            if(!rootsOrBranches){
                if(removeFromBranches(newDashboard, noteToRem, noteFrom)){
                    backupNote(noteToRem, 'meta', setNotesUpdating)
                    backupNote(noteFrom, 'meta', setNotesUpdating)
                }
            }

            //otherwise do the opposite
            else{
                if(removeFromBranches(newDashboard, noteFrom, noteToRem)){
                    backupNote(noteToRem, 'meta', setNotesUpdating)
                    backupNote(noteFrom, 'meta', setNotesUpdating)
                }
            }

            packDashboard(newDashboard, true, false, true);
        }

        // if the destination is the workspace area, add to thread
        // not a case for the collections because links are only visible in thread mode
        else if(result.destination.droppableId==='workspace-area'){
            if(dashboard.workspaceIds.length > WORKSPACELIMIT){
                alert(workspaceLimitReached)
            }
            else{
                const newDashboard = {...dashboard}
                addToWorkspace(newDashboard, dashboard.links[result.source.index].id, result.destination.index);
                packDashboard(newDashboard, false, true, true)
            }
        }

        // if the destination is the branches area itself, just reorder and update
        else if(result.destination.droppableId==='branches-area'){
            const newDashboard = {...dashboard}
            const targetNote = newDashboard.notes.get(newDashboard.selectedNoteId)
            if(rootsOrBranches){
                targetNote.roots = moveNoteInsideArea(
                    targetNote.roots, 
                    result.source.index, 
                    result.destination.index
                )
            }
            else{
                targetNote.branches = moveNoteInsideArea(
                    targetNote.branches, 
                    result.source.index, 
                    result.destination.index
                )
            }
            backupNote(targetNote, 'meta', setNotesUpdating)
            packDashboard(newDashboard, false, false, true)
        }
    }
}