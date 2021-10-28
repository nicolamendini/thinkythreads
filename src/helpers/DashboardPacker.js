/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DashboardPacker functions
Update the functions based on the new states of the dashboard
*/

import { copyNote } from "./DashboardUtils"
import { backupNote } from "./RequestsMakers"

const decideForInsertion = (note, searchProps, newSearch) => {

    if(note){
        var insertingNote = []

        // if the text matched with the text on the searchBar insert it
        if(note.preview.replace( /(<([^>]+)>)/ig, '').toLowerCase().includes(searchProps.searchText)){

            insertingNote=[note]

            if(searchProps.imgFilter && !note.attachedImg){
                insertingNote=[]
            }

            if(insertingNote.length && searchProps.colorFilter!=='#ededed' && searchProps.colorFilter!==note.colorPreview){
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

            // if the note is pinned, put at the beginning, if not, at the end
            if(insertingNote.length){
                if(note.pinned){
                    newSearch.notes = [copyNote(insertingNote[0]), ...newSearch.notes]
                }
                else{
                    newSearch.notes = [...newSearch.notes, copyNote(insertingNote[0])]
                }
            }
        }
    }
    else{
        console.log('exceeded')
    }
}

// Change the search as the user is typing
export function getSearchFromProps(newDashboard, searchProps){

    // go through all the notes and decide whether each note should be inserted
    const newSearch = Object.create(null)
    newSearch.notes = []
    var note = {rightLink : newDashboard.firstNoteId}

    // if a collection is opened
    if(newDashboard.openedCollectionId){
        const targetNote = newDashboard.notes.get(newDashboard.openedCollectionId)
        if(targetNote){
            for(const id of targetNote.collection){
                note = newDashboard.notes.get(id)
                decideForInsertion(note, searchProps, newSearch)
            }
        }
        else{console.log('collection note does not exist')}
    }

    // otherwise go through all the notes
    else{
        for(let i=0; i<newDashboard.notes.size; i++){
            note = newDashboard.notes.get(note.rightLink)
            decideForInsertion(note, searchProps, newSearch)
        }
    }

    newDashboard.search = newSearch.notes
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

const updateElement = (note, updatesCounter, backup) => {
    updatesCounter.n += 1
    setTimeout(() => {
        backup(note, 'meta')
    }, (200 * updatesCounter.n))
}

export function checkLinksSanity(newDashboard, backup){

    // if there is more than one note
    if(newDashboard.notes.size < 2){
        return
    }

    var lastNote = null
    var temp = null
    var updatesCounter = Object.create(null)
    updatesCounter.n = 0
    var prevNote = newDashboard.notes.get(newDashboard.firstNoteId)
    var currNote = null
    var noteTracker = Object.create(null)
    var updateNextNote = false

    // FIRST NOTE SANITY
    // recover first note if it temporarily got lost of track from firstNoteId
    if(!prevNote || prevNote.leftLink){
        console.log('first note temporarily inexistent or has a left link')
        // TEST PASSED
        for(const [, note] of newDashboard.notes){
            if(!note.leftLink){
                newDashboard.firstNoteId = note.id
                prevNote = note
                console.log('better prev note found')
            }
            if(!note.rightLink){
                lastNote = note
                console.log('last note found')
            }
        }

        // if there are no other good candidates to be a first node, 
        // use the one that was already stored and  get rid of the wrong link
        if(prevNote && prevNote.leftLink){
            prevNote.leftLink = null
            updateElement(prevNote, updatesCounter, backup)
            console.log('removing wrong left link')
        }

        // trying to recover the first note going backwards
        if(lastNote && !prevNote){
            prevNote = lastNote
            for(const [,] of newDashboard.notes){
                temp = newDashboard.notes.get(prevNote.leftLink)
                if(temp && !noteTracker[temp.id]){
                    prevNote = temp
                }
                else{
                    newDashboard.firstNoteId = prevNote.id
                    prevNote.leftLink = null
                    updateElement(prevNote, updatesCounter, backup)
                    console.log('backwards recevery first note')
                    break
                }
                noteTracker[prevNote.id] = true
            }
           noteTracker = Object.create(null)
        }

        // otherwise pick the first note in the map and go on
        if(!prevNote){
            for(const [, note] of newDashboard.notes){
                prevNote = note
                prevNote.leftLink = null
                newDashboard.firstNoteId = prevNote.id
                updateElement(prevNote, updatesCounter, backup)
                console.log('last note not found, random picking a first note')
                break
            }
        }
    }

    noteTracker[prevNote.id] = true

    // ALL OTHER NOTES' SANITY
    // for each note, check that it has links and that it is connected to the neighbours
    for(let i=1; i<newDashboard.notes.size; i++){

        // try to access the current note
        currNote = newDashboard.notes.get(prevNote.rightLink)

        // if the right link was correct
        if(currNote){

            // if there is a loop, discard the note
            if(noteTracker[currNote]){
                console.log('loop found: ', i)
                currNote = null
            }

            // check that the left link of the found note is correct
            else if(currNote.leftLink!==prevNote.id){
                console.log('left link wrong, fixing: ', i)
                currNote.leftLink = prevNote.id
                updateNextNote = true
            }
        }

        // if the current note was not found
        if(!currNote){
            console.log('the successor does not exist: ', i)

            // try to find a match by scrolling in the opposite direction
            for(const [, note] of newDashboard.notes){
                if(note.leftLink===prevNote.id && !noteTracker[note.id]){
                    console.log('found match: ', i)
                    currNote = note
                    prevNote.rightLink = currNote.id
                    updateElement(prevNote, updatesCounter, backup)
                    break
                }
            }

            // hard recovery, try to pick the most suitable note
            if(!currNote){
                for(const [, note] of newDashboard.notes){
                    // only consider them if they have not been encountered before
                    if(!noteTracker[note.id]){
                        // if we haven't find a replacement yet
                        // or the replacement we've found is the last note
                        // replace again because it's a better choice
                        if(!currNote || !currNote.rightLink){
                            currNote = note
                        }
                        // if we find a note that has a defective left link
                        // that's the best we can aim for at this stage so use it and break
                        if(!newDashboard.notes.get(note.leftLink)){
                            console.log('slightly better hard choice found')
                            currNote = note
                            break
                        }
                    }
                }
                console.log('hard choice made: ', i)
                prevNote.rightLink = currNote.id
                currNote.leftLink = prevNote.id
                updateElement(prevNote, updatesCounter, backup)
                updateNextNote = true
            }
        }

        // move the head ahead and eventually update
        noteTracker[currNote.id] = true
        prevNote = currNote
        if(updateNextNote){
            updateElement(prevNote, updatesCounter, backup)
            updateNextNote = false
        }
    }

    // at the end, check the last note
    if(currNote.rightLink){
        console.log('last note had a right link')
        currNote.rightLink = null
        updateElement(currNote, updatesCounter, backup)
    }
}