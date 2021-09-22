/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
NotesManipulation functions
Function to manipulate and change Note objects
eg: add/remove links or edit threads 
*/

import { LINKSLIMIT } from "../components/Dashboard";
import { backupNote } from "./RequestsMakers";
import { addElementAt, getCaption, removeElementAt } from "./DashboardUtils";
import { alreadyIn, mergeBothCardsOccupied } from "./Messages";

// Function to add a note to a thread if the element is not the opened thread itself
export function addToWorkspace(newDashboard, element, position){
    if(newDashboard.openedWorkspaceId===element){
        //alreadyInAlert();
    }
    else{
        newDashboard.workspaceIds = addElementAt(newDashboard.workspaceIds, position, element);
        newDashboard.selectedNoteId = element
    }
}

// Function to add note to the branches if a note is selected and the note is not already a child
// Also checks that the links respect the limits. Adds the noteToAdd to the branches of noteFrom
// and does the opposite with the roots
export function addToBranches (noteFrom, noteToAdd) {

    const notAlreadyInBranches = !noteFrom.branches.includes(noteToAdd.id);
    const notChildOfItself = noteFrom.id!==noteToAdd.id
    const branchesWithinLimit = noteFrom.branches.length < LINKSLIMIT
    const notAlreadyInRoots = !noteToAdd.roots.includes(noteFrom.id);
    const rootsWithinLimits = noteToAdd.roots.length < LINKSLIMIT

    if(notAlreadyInBranches && 
    notChildOfItself && 
    branchesWithinLimit && 
    notAlreadyInRoots && 
    rootsWithinLimits){

            noteFrom.branches.push(noteToAdd.id)
            noteToAdd.roots.push(noteFrom.id)
            return true
    }
};

// Specular function to remove a note from the branches and alert for all the threads
// that rely on that connection so that the user first has to restructure them manually
export function removeFromBranches (newDashboard, noteFrom, noteToDel) {

    // alert for all the threads that rely on the link to remove
    for(const [, note] of newDashboard.notes){
        for(let n=1; n<note.thread.length; n++){
            if(note.thread[n-1]===noteFrom.id && note.thread[n]===noteToDel.id){
                alert('The link you are tying to delete is used in the Thread : ' + getCaption(note) + '... \nPlease restructure this Thread it if you desire to proceed.')
                return false
            }
        }
    }

    // if the check is passed, remove the note from the branches of noteFrom
    var targetIdx = noteFrom.branches.findIndex(id => id===noteToDel.id);
    if(targetIdx!==-1){
        noteFrom.branches = removeElementAt(
            noteFrom.branches, 
            targetIdx
        )
    }

    // and remove the link from the roots of noteToDel
    targetIdx = noteToDel.roots.findIndex(id => id===noteFrom.id);
    if(targetIdx!==-1){
        noteToDel.roots = removeElementAt(
            noteToDel.roots, 
            targetIdx
        );
    }

    return true
}

// Function to force the removal of a note even if it appears in many other 
// threads or collections or branches
export function forceRemove(newDashboard, targetNoteId, setNotesUpdating){
    var presenceCheck = false
    for(const [, note] of newDashboard.notes){

        // remove all branches occurrences
        if(note.branches.includes(targetNoteId)){
            note.branches = note.branches.filter(
                (id) => id!==targetNoteId
            )
            presenceCheck = true
        }

        // remove all roots occurrences
        if(note.roots.includes(targetNoteId)){
            note.roots = note.roots.filter(
                (id) => id!==targetNoteId
            )
            presenceCheck = true
        }

        // redirect threads that relied on it and add new branches
        if(note.thread.includes(targetNoteId)){
            note.thread = note.thread.filter(
                (id) => id!==targetNoteId
            )
            linkThreadNotes(newDashboard, note.thread, setNotesUpdating)
            presenceCheck = true
        }

        // if any changes have been made to the current note, backup
        if(presenceCheck){
            backupNote(note, 'meta', setNotesUpdating)
        }

        presenceCheck = false           
    }
}

// Link all the pairwise consecutive notes of a thread
export function linkThreadNotes(newDashboard, thread, setNotesUpdating){

    // go through the whole thread and add the branch
    for(let i=1; i<thread.length; i++){
        const noteFrom = newDashboard.notes.get(thread[i-1])
        const noteToAdd = newDashboard.notes.get(thread[i])

        // if successful, backup
        if(addToBranches(noteFrom, noteToAdd)){
            backupNote(noteFrom, 'meta', setNotesUpdating)
            backupNote(noteToAdd, 'meta', setNotesUpdating)
        }
    }
}

// Wrap an unsaved workspace with an empty note
export function wrapWorkspace(newDashboard, targetNoteId, setNotesUpdating, threadOrCollection){

    // check that the note is empty
    if(!newDashboard.notes.get(targetNoteId).thread.length && 
    !newDashboard.notes.get(targetNoteId).collection.length){

        // check that the dragged note is not inside the collection that it is trying to wrap
        if(!newDashboard.workspaceIds.includes(targetNoteId)){
            const targetNote = newDashboard.notes.get(targetNoteId);

            // if thread mode, add to the thread of the note and set color to yellow
            if(threadOrCollection){
                targetNote.thread = newDashboard.workspaceIds;
                targetNote.color = '#fef3bd';
                targetNote.colorPreview = '#fccb00';
                linkThreadNotes(newDashboard, targetNote.thread, setNotesUpdating)
            }

            // if collection mode, add to the collection of the note and set color to blue
            else{
                targetNote.collection = newDashboard.workspaceIds;
                targetNote.color = '#c4def6';
                targetNote.colorPreview = '#1273de';
            }

            // set the wrapping note as the selectedNote
            newDashboard.selectedNoteId = targetNoteId

            // open the note in the workspace and backup it
            openInWorkspace(threadOrCollection, newDashboard, setNotesUpdating, threadOrCollection)
            backupNote(targetNote, 'meta', setNotesUpdating)
        }
        else{
            alert(alreadyIn);
        }
    }
}

// Function to open a note in the workspace, so that the notes of the workspace 
// belong to either the notes thread or collection
export function openInWorkspace(workspaceMode, newDashboard, setNotesUpdating, threadOrCollection){

    // close and save the workspace that is already opened
    closeAndSaveWorkspace(true, newDashboard, setNotesUpdating, threadOrCollection);

    // retrieve the note we want to open
    const selectedNote = newDashboard.notes.get(newDashboard.selectedNoteId)

    // if it is thread mode, open the thread
    if(workspaceMode){
        newDashboard.workspaceIds = selectedNote.thread;
    }

    // otherwise open the collection
    else{
        newDashboard.workspaceIds = selectedNote.collection;
    }

    // set the openedWorkspaceId as the id of the note we want to open
    newDashboard.openedWorkspaceId = newDashboard.selectedNoteId;
}

// Function to close and save an active workspace
export function closeAndSaveWorkspace(leaveOpen, newDashboard, setNotesUpdating, threadOrCollection){

    // If the workspace is not empty and unsaved, as for confirmation before closing it
    if(!newDashboard.openedWorkspaceId && 
    newDashboard.workspaceIds.length && 
    !leaveOpen &&
    !window.confirm('You have an ' + (threadOrCollection ? 'unsaved thread' : 'unsaved collection') + ', do you wish to delete it and clean the Workspace?')
    ){
        return
    }

    // otherwise if there is an openedWorkspaceId, save the thread or collection in there
    else if(newDashboard.openedWorkspaceId){
        const targetNote = newDashboard.notes.get(newDashboard.openedWorkspaceId)

        if(threadOrCollection){
            targetNote.thread = newDashboard.workspaceIds;

            linkThreadNotes(newDashboard, targetNote.thread, setNotesUpdating)
        }
        else{
            targetNote.collection = newDashboard.workspaceIds;
        }

        newDashboard.openedWorkspaceId = null;
        backupNote(targetNote, 'meta', setNotesUpdating)
    }

    newDashboard.workspaceIds = [];
}

// Remove old selection and select a new note
export function noteSelector(noteToSelect, mergeMode, setMergeMode, dashboard, setDashboard, getLinks, mergeNotes){

    // If the mergeMode is not on, select a new note and update the links
    if(!mergeMode){
        if(!dashboard.selectedNoteId || dashboard.selectedNoteId!==noteToSelect.id){
            const newDashboard = {...dashboard}
            newDashboard.selectedNoteId = noteToSelect.id;
            getLinks(newDashboard)
            setDashboard(newDashboard)
        } 
    }

    // otherwise, check that there are not clashes between the two mergin notes and initialise the merging process
    else{
        if(noteToSelect.id!==dashboard.selectedNoteId){
            if(
            (noteToSelect.thread.length && dashboard.notes.get(dashboard.selectedNoteId).collection.length) ||
            (dashboard.notes.get(dashboard.selectedNoteId).thread.length && noteToSelect.collection.length)
            ){
                alert(mergeBothCardsOccupied)
            }

            else{
                mergeNotes(dashboard.notes.get(dashboard.selectedNoteId), noteToSelect);
            }
        }

        // if the user merges a note with itself, do not do anything
        else{
            setMergeMode(false);
        }
    }
}