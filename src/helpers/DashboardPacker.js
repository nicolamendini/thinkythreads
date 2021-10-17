/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DashboardPacker functions
Update the functions based on the new states of the dashboard
*/

import { copyNote } from "./DashboardUtils"
import { backupNote } from "./RequestsMakers"

// Change the search as the user is typing
export function getSearchFromProps(newDashboard, searchProps){

    // go through all the notes and decide whether each note should be inserted
    var newSearch = []
    var insertingNote = []
    var key = null
    var note = {rightLink : newDashboard.firstNoteId}

    for(let i=0; i<newDashboard.notes.size; i++){

        key = note.rightLink
        note = newDashboard.notes.get(key)

        insertingNote = []

        // if the text matched with the text on the searchBar insert it
        if(note.preview.replace( /(<([^>]+)>)/ig, '').toLowerCase().includes(searchProps.searchText)){

            insertingNote=[note]

            if(searchProps.colorFilter!=='#ededed' && searchProps.colorFilter!==note.colorPreview){
                insertingNote=[]
            }

            // if the thread filter and the collections filters are on but the note has none, remove it
            if(insertingNote.length && searchProps.collectionFilter && searchProps.threadFilter){
                if(!note.thread.length && !note.collection.length){
                    insertingNote=[]
                }
            }

            // if the thread filter is on but the note has none, remove it from the insertion
            else if(insertingNote.length && searchProps.threadFilter){
                if(!note.thread.length){
                    insertingNote=[]
                }
            }

            // if the collection filter is on but the note has none, remove it from the insertion
            else if(insertingNote.length && searchProps.collectionFilter){
                if(!note.collection.length){
                    insertingNote=[]
                }
            }

            // If a collection is opened add a new constraint
            if(insertingNote.length && newDashboard.openedCollectionId){
                if(!newDashboard.notes.get(newDashboard.openedCollectionId).collection.includes(note.id)){
                    insertingNote=[]
                }
            }

            // if the note is pinned, put at the beginning, if not, at the end
            if(insertingNote.length){
                if(note.pinned){
                    newSearch = [copyNote(insertingNote[0]), ...newSearch]
                }
                else{
                    newSearch = [...newSearch, copyNote(insertingNote[0])]
                }
            }
        }
    }

    newDashboard.search = newSearch
    // eslint-disable-next-line
}

// Function to pack the workspace
export function getWorkspace(newDashboard){
    const removingIdxs = []
    const newWorkspace = newDashboard.workspaceIds.flatMap(
        (id, index) => reportAndAdd(
            newDashboard, 
            id, 
            index, 
            removingIdxs, 
            'noteOfWorkspaceNotFoundError!'
        )
    )
    newDashboard.workspace = newWorkspace
    if(removingIdxs.length){
        newDashboard.workspaceIds = removeFromSequence(removingIdxs, newDashboard.workspaceIds)

    }
} 

// Get the notes that are links of the selectedNote based on the direction of links given by rootsOrBranches
export function getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating){
        
    if(newDashboard.selectedNoteId){

        const selectedNote = newDashboard.notes.get(newDashboard.selectedNoteId)
        const removingIdxs = []

        if(rootsOrBranches){
            newDashboard.links = selectedNote.roots.flatMap(
                (id, index) => reportAndAdd(
                    newDashboard, 
                    id, 
                    index, 
                    removingIdxs, 
                    'noteOfLinksNotFoundError'
                )   
            )
            if(removingIdxs.length){
                selectedNote.roots = removeFromSequence(removingIdxs, selectedNote.roots)
                backupNote(selectedNote, 'meta', setNotesUpdating)
            }
        }
        else{
            newDashboard.links = selectedNote.branches.flatMap(
                (id, index) => reportAndAdd(
                    newDashboard, 
                    id, 
                    index, 
                    removingIdxs, 
                    'noteOfLinksNotFoundError'
                )
            )
            if(removingIdxs.length){
                selectedNote.branches = removeFromSequence(removingIdxs, selectedNote.branches)
                backupNote(selectedNote, 'meta', setNotesUpdating)
            }   
        }
    }
    else{
        newDashboard.links = []
    }
}

// Removes several elements from a sequence
// Used if some ghost ids are present in some sequence
export function removeFromSequence(removingIdxs, sequence){
    return sequence.filter(
        (e, idx) => !removingIdxs.includes(idx)
    )
}

// if the note corresponding to the id exists, return it
// otherwise show an error report
export function reportAndAdd(newDashboard, id, index, removingIdxs, message){
    const note = newDashboard.notes.get(id)

    if(note){
        return [copyNote(newDashboard.notes.get(id))]
    }

    else{
        removingIdxs.push(index)
        errorAlert(message, id, newDashboard)
        return []
    }
}

export function errorAlert(message, id, newDashboard){
    window.alert(
        '-------- BETA VERSION ERROR REPORT ------- \n' + 
        '---- PLEASE SHARE WITH THE DEVELOPER --- \n' +
        'along with some info about what you did to get here \n' +
        'EMAIL: nicolamendini0@gmail.com \n' +
        'THANK YOU!' +
        '\n\nERROR: \n' + 
        message + 
        '\n\nNOTE: \n' + 
        id + '\n' +
        '\n\nNOTES-ORDER: \n' + 
        newDashboard.notesOrder + 
        '\n\nLINKS: \n' + 
        newDashboard.links +
        '\n\nWORKSPACE-IDS: \n' +
        newDashboard.workspaceIds
    )
}

export function restoreLinks(newDashboard, backup){
    var prevNote = {id: null, rightLink: null}

    for(const [, note] of newDashboard.notes){
        
        note.leftLink = prevNote.id
        prevNote.rightLink = note.id
        prevNote = note
    }

    prevNote.rightLink = null

    newDashboard.firstNoteId = prevNote.id
    for(const [, note] of newDashboard.notes){
        backup(note, 'meta')
    }
}