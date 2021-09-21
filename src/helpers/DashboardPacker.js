/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DashboardPacker functions
Update the functions based on the new states of the dashboard
*/

import { copyNote } from "./DashboardUtils";

// Change the search as the user is typing
export function getSearchFromProps(newDashboard, searchProps){

    // go through all the notes and decide whether each note should be inserted
    var newSearch = [];
    var insertingNote = [];
    
    for(let key of newDashboard.notesOrder){

        const note = newDashboard.notes.get(key);

        // if the note exists
        if(note){
            insertingNote = [];

            // if the text matched with the text on the searchBar insert it
            if(note.preview.replace( /(<([^>]+)>)/ig, '').toLowerCase().includes(searchProps.searchText)){

                insertingNote=[note]

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
                        newSearch = [copyNote(insertingNote[0]), ...newSearch];
                    }
                    else{
                        newSearch = [...newSearch, copyNote(insertingNote[0])];
                    }
                }
            }
        }
        else{
            console.log('noteOfSearchNotFoundError!')
        }
    }

    newDashboard.search = newSearch;
    // eslint-disable-next-line
}

// Function to pack the workspace
export function getWorkspace(newDashboard){
    newDashboard.workspace = newDashboard.workspaceIds.flatMap((id) =>
    newDashboard.notes.get(id) ? [copyNote(newDashboard.notes.get(id))] : 
    !console.log('noteOfWorkspaceNotFoundError!')&&[])
} 

// Get the notes that are links of the selectedNote based on the direction of links given by rootsOrBranches
export function getLinksFromProps(newDashboard, rootsOrBranches){
        
    if(newDashboard.selectedNoteId){

        if(rootsOrBranches){
            newDashboard.links = newDashboard.notes.get(newDashboard.selectedNoteId).roots.flatMap(
                (id) => newDashboard.notes.get(id) ? copyNote(newDashboard.notes.get(id)) : !console.log('noteOfLinksNotFoundError')&&[]
            );
        }
        else{
            newDashboard.links = newDashboard.notes.get(newDashboard.selectedNoteId).branches.flatMap(
                (id) => newDashboard.notes.get(id) ? copyNote(newDashboard.notes.get(id)) : !console.log('noteOfLinksNotFoundError')&&[]
            );
        }
    }
    else{
        newDashboard.links = [];
    }
}