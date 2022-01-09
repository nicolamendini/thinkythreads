/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
SortingPopup
helps the used put the note in the correct threads or collections
straight from the editor
*/

import Popup from "reactjs-popup"
import React, { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { BsFolderPlus } from 'react-icons/bs'
import { getCaption, removeElementAt } from "../helpers/DashboardUtils";
import { linkThreadNotes } from "../helpers/NotesManupulation";
import { backupNote } from "../helpers/RequestsMakers";

// get the difference between the current tick box selection and the previous
const getDifference = (oldValues, newValues) => {

    // notes that have been added
    const toAdd = newValues.flatMap((note) => 
        oldValues.includes(note) ? [] : note
    )

    // notes that have been removed
    const toRem = oldValues.flatMap((note) => 
        newValues.includes(note) ? [] : note
    )

    return [toAdd, toRem]
}

// removes a note from a thread or a collection based on what structure is given
const removeFrom = (structure, dashboard) => {
    const idx = structure.findIndex(id => id===dashboard.selectedNoteId)
    var newStruct = structure
    if(idx!==-1){
        newStruct = removeElementAt(structure, idx)
    }
    return newStruct
}

// adds or removes from threads or collection based on what has been selected by the user
const addStructures = (dashboard, newStruct, oldStruct, setNotesUpdating, threadsOrColl) => {

    // get the changes
    const [toAdd, toRem] = getDifference(oldStruct, newStruct)

    // if anything was added, add
    for(const note of toAdd){
        const currentNote = dashboard.notes.get(note.value)
        if(threadsOrColl){
            currentNote.thread.push(dashboard.selectedNoteId)
            linkThreadNotes(dashboard, currentNote.thread, setNotesUpdating)
        }
        else{
            currentNote.collection.push(dashboard.selectedNoteId)
        }

        // backup the note containing the thread
        backupNote(currentNote, "meta", setNotesUpdating)
        
        // update the workspace if needed
        if(currentNote.id===dashboard.openedWorkspaceId){
            if(threadsOrColl){
                dashboard.workspaceIds = [...currentNote.thread]
            }
            else{
                dashboard.workspaceIds = [...currentNote.collection]
            }
        }
    }

    // if anything was removed, remove
    for(const note of toRem){
        const currentNote = dashboard.notes.get(note.value)
        if(threadsOrColl){
            currentNote.thread = removeFrom(currentNote.thread, dashboard)
            linkThreadNotes(dashboard, currentNote.thread, setNotesUpdating)
        }
        else{
            currentNote.collection = removeFrom(currentNote.collection, dashboard)
        }

        // backup the note containing the collection
        backupNote(currentNote, "meta", setNotesUpdating)

        // update the workspace if needed
        if(currentNote.id===dashboard.openedWorkspaceId){
            if(threadsOrColl){
                dashboard.workspaceIds = [...currentNote.thread]
            }
            else{
                dashboard.workspaceIds = [...currentNote.collection]
            }
        }
    }

    return true
}

const SorterPopup = ({
    selectedNote,
    open,
    setOpen,
    dashboard,
    setNotesUpdating
    
}) => {

    const threadOptions = [...dashboard.notes.values()].flatMap(
        (note) => note.thread.length && note.id!==selectedNote.id ? {label: getCaption(note), value: note.id} : [])

    const collectionOptions = [...dashboard.notes.values()].flatMap(
        (note) => note.collection.length && note.id!==selectedNote.id ? {label: getCaption(note), value: note.id} : [])

    const [selectedThreads, setSelectedThreads] = useState(
        threadOptions.flatMap((note) => dashboard.notes.get(note.value).thread.includes(selectedNote.id) ? note : [])
    )

    const [selectedCollections, setSelectedCollections] = useState(
        collectionOptions.flatMap((note) => dashboard.notes.get(note.value).collection.includes(selectedNote.id) ? note : [])
    )

    return (

        <Popup trigger={
            <div>
                <BsFolderPlus
                    className='tools-btn'
                    size='1.5em'
                    onClick={()=>setOpen(true)}
                />   
            </div>
        } 
        nested
        modal
        open={open}
        >   
                <div className='sorter'>
                    
                    <MultiSelect
                        className="sorter-btn sb1"
                        options={threadOptions}
                        value={selectedThreads}
                        onChange={(newThreads) => addStructures(dashboard, newThreads, selectedThreads, setNotesUpdating, true) 
                            && setSelectedThreads(newThreads)
                        }
                        valueRenderer={() => {return "Threads containing this note"}}
                        hasSelectAll={false}
                        ClearSelectedIcon={" "}
                    />

                    <MultiSelect
                        className="sorter-btn sb2"
                        options={collectionOptions}
                        value={selectedCollections}
                        onChange={(newCollections) => addStructures(dashboard, newCollections, selectedCollections, setNotesUpdating)
                            && setSelectedCollections(newCollections)
                        }
                        valueRenderer={() => {return "Collections containing this note"}}
                        hasSelectAll={false}
                        ClearSelectedIcon={" "}
                    />

                    <div onClick={()=>setOpen(false)} style={{height: "150px"}}></div>

                </div>
        </Popup>
    )
}
export default SorterPopup