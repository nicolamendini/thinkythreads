/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DragManager function
Manages all the drag gestures between notes
*/

import { removeFromBranches, addToBranches, addToWorkspace, openInWorkspace, wrapWorkspace } from "./NotesManupulation";
import { addElementAt, removeElementAt } from "./DashboardUtils";
import { WORKSPACELIMIT, SHAREDMEX, initSearchProps } from "../components/Dashboard";
import { backupNote } from "./RequestsMakers";
import { moveNoteInsideGraph, moveNoteInsideArea } from "./DashboardUtils";
import { alertMergeMode, workspaceLimitReached } from "./Messages";
import { toast } from "react-toastify";

const notifyMerge = () => toast(alertMergeMode)
const notifyWorkspaceLimit = () => toast(workspaceLimitReached)

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
    setSearchProps,
    result
){

    // if the destination is invalid do not do anything
    if(result.destination===null){return}

    // if the mergeMode is on, disable the gestures
    else if(mergeMode){notifyMerge()}

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
            dropToBranches(noteFrom, result, dashboard, newDashboard, rootsOrBranches, backupNote, setNotesUpdating)
            packDashboard(newDashboard, false, false, true)
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
                if(dashboard.openedCollectionId){
                    const newDashboard = {...dashboard}
                    const targetNote = newDashboard.notes.get(newDashboard.openedCollectionId)
                    if(targetNote){
                        targetNote.collection = moveNoteInsideArea(
                            targetNote.collection,
                            result.source.index,
                            result.destination.index
                        )
                        packDashboard(newDashboard, true)
                        backupNote(targetNote, 'meta', setNotesUpdating)
                    }
                }
                else{
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
        }

        // if the destination is the search bar, open the collection of the dragging note in search
        else if(result.destination.droppableId==='search-bar'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.search[result.source.index]
            dropOnSearchBar(newDashboard, setSearchProps, packDashboard, targetNote)
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

        // if the destination is the wrapper area
        else if(result.destination.droppableId==='wrapper-area'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.workspace[result.source.index]
            manageWrapper(newDashboard, targetNote, threadOrCollection, setThreadOrCollection, setNotesUpdating)
            packDashboard(newDashboard)
        }

        // if the destination is the search bar, open the collection of the dragged note
        else if(result.destination.droppableId==='search-bar'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.workspace[result.source.index]
            dropOnSearchBar(newDashboard, setSearchProps, packDashboard, targetNote)
        }

        // if the destination was the links area aka branches area
        else if(result.destination.droppableId==='branches-area'){
            const newDashboard = {...dashboard}
            const noteFrom = newDashboard.notes.get(dashboard.workspace[result.source.index].id)
            dropToBranches(noteFrom, result, dashboard, newDashboard, rootsOrBranches, backupNote, setNotesUpdating)
            packDashboard(newDashboard, false, false, true)
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
            const targetId = dashboard.links[result.source.index].id
            const destination = result.destination.index
            workspaceAdder(dashboard, threadOrCollection, targetId, packDashboard, destination)
        }

        // if the destination is the wrapper area
        else if(result.destination.droppableId==='wrapper-area'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.links[result.source.index]
            manageWrapper(newDashboard, targetNote, threadOrCollection, setThreadOrCollection, setNotesUpdating)
            packDashboard(newDashboard)
        }

        // if the destination is the branches area itself, just reorder and update
        else if(result.destination.droppableId==='branches-area'){
            if(result.source.index!==result.destination.index){
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

        // if the destination is the search bar, open the collection of the dragging note in search
        else if(result.destination.droppableId==='search-bar'){
            const newDashboard = {...dashboard}
            const targetNote = dashboard.links[result.source.index]
            dropOnSearchBar(newDashboard, setSearchProps, packDashboard, targetNote)
        }
    }
}

const dropToBranches = (
    noteFrom, 
    result, 
    dashboard, 
    newDashboard, 
    rootsOrBranches, 
    backupNote, 
    setNotesUpdating
) => {
    const noteToAdd = newDashboard.notes.get(dashboard.selectedNoteId)
    // if we are in branches mode add noteTo to noteFrom
    if(!rootsOrBranches){
        if(addToBranches(noteToAdd, noteFrom, result.destination.index, rootsOrBranches)){
            backupNote(noteToAdd, 'meta', setNotesUpdating)
            backupNote(noteFrom, 'meta', setNotesUpdating)
        } 
    }

    // otherwise do the opposite and add noteFrom to noteTo
    else{
        if(addToBranches(noteFrom, noteToAdd, result.destination.index, rootsOrBranches)){
            backupNote(noteToAdd, 'meta', setNotesUpdating)
            backupNote(noteFrom, 'meta', setNotesUpdating)
        }   
    }
}

// Function to add a note to the workspace
export function workspaceAdder(dashboard, threadOrCollection, targetId, packDashboard, destination){

    if(destination===undefined || destination===null){
        destination = dashboard.workspaceIds.length
    }

    // check that the workspace does not break the limits
    if(dashboard.workspaceIds.length > WORKSPACELIMIT){
        notifyWorkspaceLimit()
    }

    // else if we are in thread mode, add to the thread and update the dashboard
    else if(threadOrCollection){
        const newDashboard = {...dashboard}
        addToWorkspace(newDashboard, targetId, destination)
        packDashboard(newDashboard, false, true, true)
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
                newDashboard.workspaceIds = addElementAt(newDashboard.workspaceIds, destination, targetId)
                packDashboard(newDashboard, false, true)
            }
        }
        else{
            //alreadyInAlert();
        }
    }
}

// Function to remove a note from the workspace
export function workspaceRemover(newDashboard, threadOrCollection, packDashboard, indexToRem){
    newDashboard.workspaceIds = removeElementAt(newDashboard.workspaceIds, indexToRem)
    packDashboard(newDashboard, false, true, true)
}

export function dropOnSearchBar(newDashboard, setSearchProps, packDashboard, targetNote){
    SHAREDMEX.resetSearchScroll = true
    newDashboard.openedCollectionId = targetNote.id
    setSearchProps({...initSearchProps})
    packDashboard(newDashboard, true)
}

// Function to manage the wrapper's functionality
export function manageWrapper(newDashboard, targetNote, threadOrCollection, setThreadOrCollection, setNotesUpdating){

    // if the current workspace has notes, wrap them with the target note
    if(newDashboard.workspaceIds.length>0 && !newDashboard.openedWorkspaceId){
        wrapWorkspace(newDashboard, targetNote.id, setNotesUpdating, threadOrCollection )
    }

    // otherwise just expand the note so that the workspace now contains its thread or collection
    else{
        if(targetNote.thread.length){
            openInWorkspace(true, newDashboard, setNotesUpdating, threadOrCollection, targetNote)
            setThreadOrCollection(true)
            
        }
        else if(targetNote.collection.length){
            openInWorkspace(false, newDashboard, setNotesUpdating, threadOrCollection, targetNote)
            setThreadOrCollection(false)
        }
        else{
            openInWorkspace(threadOrCollection, newDashboard, setNotesUpdating, threadOrCollection)
        }
    }
}
