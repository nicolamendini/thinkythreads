/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DragManager function
Manages all the drag gestures between notes
*/

import { driveBackupAuthorised, WORKSPACELIMIT } from "../components/Dashboard";
import { getWorkspace, getLinksFromProps, getSearchFromProps } from "./DashboardPacker";
import { addToWorkspace, addToBranches, removeFromBranches, wrapWorkspace, openInWorkspace } from "./NotesManupulation";
import { updateConfigFile } from "./BackupHelper";
import { backupNote } from "./RequestsMakers";
import { moveNoteInsideArea, removeElementAt } from "./DashboardUtils";
import { alertMergeMode, workspaceLimitReached } from "./Messages";

// Manage the dragging and dropping rules
// all the information that is needed is contained in the result
// parameter that is provided by the DragAndDropContext component
// from React Beautiful DnD
export function dragManager(
    dashboard,
    setDashboard, 
    mergeMode, 
    threadOrCollection, 
    setThreadOrCollection,
    rootsOrBranches, 
    searchProps, 
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

            // check that the workspace does not break the limits
            const targetId = dashboard.search[result.source.index].id;
            if(dashboard.workspaceIds.length > WORKSPACELIMIT){
                alert(workspaceLimitReached)
            }

            // else if we are in thread mode, add to the thread and update the dashboard
            else if(threadOrCollection){
                const newDashboard = {...dashboard}
                addToWorkspace(newDashboard, targetId, result.destination.index);
                getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
                getWorkspace(newDashboard)
                setDashboard(newDashboard)
            }

            // else if we are in collectionMode, check that the notes collection is not 
            // already opened in dashboard and that the note is not already in, then add it
            // to the collection and update the dashboard
            else{
                if(!dashboard.openedWorkspaceId ||
                    dashboard.openedWorkspaceId!==targetId
                ){
                    if(!dashboard.workspaceIds.includes(targetId)){
                        const newDashboard = {...dashboard}
                        newDashboard.workspaceIds.push(targetId);
                        getWorkspace(newDashboard)
                        setDashboard(newDashboard)
                    }
                }
                else{
                    //alreadyInAlert();
                }
            }
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
            getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
            setDashboard(newDashboard);
        }

        // if the destination is the wrapper area
        else if(result.destination.droppableId==='wrapper-area'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.search[result.source.index]

            // if the current workspace has notes, wrap them with the target note
            if(dashboard.workspaceIds.length>0){
                wrapWorkspace(newDashboard, targetNote.id, setNotesUpdating, threadOrCollection );
            }

            // otherwise just expand the note so that the workspace now contains its thread or collection
            else{
                if(targetNote.thread.length){
                    newDashboard.selectedNoteId = targetNote.id
                    openInWorkspace(true, newDashboard, setNotesUpdating, threadOrCollection)
                    setThreadOrCollection(true)
                    
                }
                else if(targetNote.collection.length){
                    newDashboard.selectedNoteId = targetNote.id
                    openInWorkspace(false, newDashboard, setNotesUpdating, threadOrCollection)
                    setThreadOrCollection(false)
                }
            }
            packDashboard(newDashboard)
        }

        // if the destination is the search area itself just change the order of the notes
        else if(result.destination.droppableId==='search-area'){
            if(result.source.index!==result.destination.index){
                const sourceNote = dashboard.search[result.source.index]
                const targetNote = dashboard.search[result.destination.index]

                // only if not trying to move between pinned notes
                if(
                !(
                    (!targetNote.pinned && sourceNote.pinned) ||
                    (!sourceNote.pinned && targetNote.pinned)
                )
                ){
                        
                    // reorder the notes
                    const newDashboard = {...dashboard}
                    newDashboard.notesOrder = moveNoteInsideArea(
                            dashboard.notesOrder, 
                            dashboard.notesOrder.findIndex(id => id===sourceNote.id), 
                            dashboard.notesOrder.findIndex(id => id===targetNote.id)
                    )

                    // backup the new order locally and eventually on drive too
                    window.localStorage.setItem('notes-order', JSON.stringify(newDashboard.notesOrder))
                    if(driveBackupAuthorised){
                        updateConfigFile(newDashboard)
                    }

                    newDashboard.selectedNoteId = sourceNote.id
                    getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
                    getSearchFromProps(newDashboard, searchProps)
                    setDashboard(newDashboard);
                }
            }
        }

        // if the destination is the search bar, open the collection of the dragging note in search
        else if(result.destination.droppableId==='search-bar'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.search[result.source.index]
            newDashboard.openedCollectionId = targetNote.id;
            getSearchFromProps(newDashboard, searchProps)
            setDashboard(newDashboard)
        }
    }

    // if the source is the workspace area
    else if(result.source.droppableId==='workspace-area'){

        // if the destination is the search, remove that note from the workspace
        // select the dragging note and update the dashboard
        if(result.destination.droppableId==='search-area'){
            const newDashboard = {...dashboard}
            newDashboard.workspaceIds = removeElementAt(newDashboard.workspaceIds, result.source.index)
            if(result.source.index>0 && threadOrCollection){
                newDashboard.selectedNoteId = newDashboard.workspaceIds[result.source.index-1];
                getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
            }
            getWorkspace(newDashboard)
            setDashboard(newDashboard)
        }

        // if the destination is the workspace area itself, just reorder the thread or collection and update
        else if(result.destination.droppableId==='workspace-area'){
            const newDashboard = {...dashboard}
            newDashboard.workspaceIds = moveNoteInsideArea(newDashboard.workspaceIds, result.source.index, result.destination.index)
            newDashboard.selectedNoteId = newDashboard.workspaceIds[result.destination.index]
            getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
            getWorkspace(newDashboard)
            setDashboard(newDashboard)
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

            //setLinks(pack([]));
            getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
            getSearchFromProps(newDashboard, searchProps)
            setDashboard(newDashboard);
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
                getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
                getWorkspace(newDashboard)
                setDashboard(newDashboard)
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
            getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
            setDashboard(newDashboard)
        }
    }
}