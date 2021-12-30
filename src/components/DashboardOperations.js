/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DashboardOperations component
Contains the main operations on notes such as creation, update, removal, etc
Provides links between the ui elements and bigger functions contained in the helpers
*/

import React from 'react'
import { addElementAt, getNewNote, moveNoteInsideGraph} from "../helpers/DashboardUtils";
import { exportThreadGivenProps} from '../helpers/BackupHelper';
import { backupNote } from '../helpers/RequestsMakers';
import { currOrPrevNoteDecice } from '../helpers/DashboardUtils';
import { dragManager } from '../helpers/DragManager';
import { closeAndSaveWorkspace, collectionToThread, 
    linkThreadNotes, noteSelector, threadToCollection } from '../helpers/NotesManupulation';
import { noteDeleter } from '../helpers/NoteDeleter';
import { noteMerger } from '../helpers/NoteMerger';
import { cleanWorkspace } from '../helpers/Messages';
import DashboardTree from './DashboardTree';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db, SHAREDMEX } from './Dashboard';

const notify = () => toast(cleanWorkspace);

const DashboardOperations = ({
    dashboard,
    notesUpdating,
    setNotesUpdating,
    backup,
    packDashboard,
    currentPage,
    setCurrentPage,
    mergeMode,
    setMergeMode,
    threadOrCollection,
    setThreadOrCollection,
    rootsOrBranches,
    setRootsOrBranches,
    triggerRerender,
    setTriggerRerender,
    darkMode,
    setDarkMode,
    searchProps,
    setSearchProps,
    GAPIloaded,
    currentUser,
    synchNotes,
    signInFunction,
    signOutFunction,
    setDelayedNoteUpdate

}) => {

    // Add a new note to the notes hashmap and put it first in the Search Order
    const addNote = async () => {

        const newDashboard = {...dashboard}
        const newNote = getNewNote()

        // Adding the new note to the HashMap and selecting it
        newDashboard.notes.set(newNote.id, newNote)
        newDashboard.prevSelectedNoteId = newDashboard.selectedNoteId
        newDashboard.selectedNoteId = newNote.id

        const oldFirstNote = newDashboard.notes.get(newDashboard.firstNoteId)
        // Making it first note and linking it
        if(oldFirstNote){
            newNote.rightLink = newDashboard.firstNoteId
            oldFirstNote.leftLink = newNote.id
        }
        newDashboard.firstNoteId = newNote.id

        // If the note is added when a collection is open, add it to that collection 
        // And backup the meta of the note that contains the collection
        if(newDashboard.openedCollectionId){
            const collectionNote = newDashboard.notes.get(newDashboard.openedCollectionId)
            collectionNote.collection = addElementAt(collectionNote.collection, 0, newNote.id)
            backup(collectionNote, 'meta')
        }

        // Backup the new note and the notes order
        db.notes.put(newNote)
        backup(newNote, 'meta')
        if(oldFirstNote){
            backup(oldFirstNote, 'meta')
        }

        // Update the dashboard and open the editor component
        packDashboard(newDashboard)
        setCurrentPage('editor')
        SHAREDMEX.editorModeSelection = 'prev'
    }

    // Update a note after the editor is closed
    const updateNote = async (newSelectedNote) => {

        // If the action selected from the editor was to get all the occurences,
        // open them in the workspace
        const newDashboard = {...dashboard}

        // Backup and update the dashboard such that it contains the updated note
        newDashboard.notes.set(newSelectedNote.id, newSelectedNote)

        newDashboard.selectedNoteId = newSelectedNote.id

        backup(newSelectedNote, 'both')
        currOrPrevNoteDecice(newDashboard)
        packDashboard(newDashboard)
    }

    // Delete a note by calling the note deleter function
    const deleteNote = async (removingId, reselect, newDashboard) => {

        // If no newDashboard is given, use the one from the state
        // used because sometimes many operations have to happen on the same
        // dashboard before the UI update is called, improves efficiency
        if(!newDashboard){
            newDashboard = {...dashboard}
        }

        noteDeleter(
            removingId, 
            reselect, 
            newDashboard, 
            mergeMode, 
            setMergeMode,
            setNotesUpdating,
            packDashboard
        )

        // If the mergeMode was true, set it to false
        // This happens when the merging procedure is called
        if(mergeMode){
            setMergeMode(false)
        }
    }

    // Function that manges all the dragging gestures between notes of the UI
    const handleOnDragEnd = async (result) => {
        dragManager(
            dashboard, 
            mergeMode, 
            threadOrCollection, 
            setThreadOrCollection,
            rootsOrBranches, 
            setNotesUpdating,
            packDashboard,
            setSearchProps,
            result
        )
    }

    // Function that changes the mode of the dashboard
    // but it has to be unwrapped otherwise show an alert
    // if its unwrapped it switched by converting the workspace
    // to get rid of repeated notes for collections
    const threadOrCollectionManage = async () => {
        if(dashboard.openedWorkspaceId){
            notify()
        }
        else{
            if(threadOrCollection){
                const newDashboard = {...dashboard}
                newDashboard.workspaceIds = [...new Set([...newDashboard.workspaceIds])]
                packDashboard(newDashboard)
                setThreadOrCollection(false)
                SHAREDMEX.toasts && 
                    toast('The Collection Mode is on, no links will be stored when you create groups of notes')
            }
            else{
                setThreadOrCollection(true)
                SHAREDMEX.toasts && 
                    toast('The Thread Mode is on, links between consecutive notes will be stored')
            }
        }
    }

    // Function that calls the noteSelector
    // called when a note is selected (click on)
    const selectNote = async (noteToSelect) => {
        noteSelector(
            noteToSelect, 
            mergeMode, 
            setMergeMode, 
            dashboard, 
            packDashboard, 
            mergeNotes
        )
    }   

    // Function that calls the noteMerger when a note is selected in mergeMode on
    const mergeNotes = async (noteA, noteB) => {
        noteMerger(
            noteA, 
            noteB, 
            setMergeMode, 
            dashboard, 
            setNotesUpdating, 
            threadOrCollection, 
            packDashboard, 
            deleteNote
        )
    }

    // Function that closes the workspace and eventually saves it inside a note
    // Takes a leaveOpen flag that does not update the dashboard if true
    // used to perform multiple operations on the same dashboard before UI can update
    const closeAndSave = async (leaveOpen, newDashboard) => {
        if(!newDashboard){
            newDashboard={...dashboard}
        }

        closeAndSaveWorkspace(
            newDashboard, 
            setNotesUpdating, 
            threadOrCollection
        )

        if(!leaveOpen){
            packDashboard(newDashboard)
        }
    }

    // Function that opens the occurences of a note among all the other notes
    const openOccurrences = () => {
        

        closeAndSave(true, dashboard)

        // applies a filter that checks if the current note is either in a thread or 
        // collection of any other note
        dashboard.workspaceIds = [...dashboard.notes.keys()].filter(
            (id) => 
                dashboard.notes.get(id).thread.includes(dashboard.selectedNoteId) ||
                dashboard.notes.get(id).collection.includes(dashboard.selectedNoteId)
        )

        // Set workspace mode to false (collection mode)
        setThreadOrCollection(false)
    }

    // Utils function that exports the thread as PDF or to print
    const exportThread = () => {
        exportThreadGivenProps(dashboard)
    }

    // Utils function that opens the editor by first retrieving the 
    // note from the local indexedDB because the text is not stored 
    // on the RAM for efficiency 
    const openEditor = () => {
        db.notes.get(dashboard.selectedNoteId).then((dbNote) => {
            dashboard.notes.set(dashboard.selectedNoteId, dbNote)
            setCurrentPage('editor')
        })
    }

    // Function that closes the opened collection of the Search area
    const closeCollection = () => {
        const newDashboard = {...dashboard}
        newDashboard.openedCollectionId = null
        SHAREDMEX.resetSearchScroll = true
        packDashboard(newDashboard, true)
    }

    // swap between thread or collection
    const threadCollectionSwap = (threadCollectionFlag) => {

        const newDashboard = {...dashboard}
        const selectedNote = newDashboard.notes.get(newDashboard.selectedNoteId)
        if(threadCollectionFlag){
            threadToCollection(selectedNote)
        }
        else{
            collectionToThread(selectedNote)
            linkThreadNotes(newDashboard, selectedNote.thread, setNotesUpdating)
            if(newDashboard.openedCollectionId===newDashboard.selectedNoteId){
                newDashboard.openedCollectionId=null
            }
        }
        if(newDashboard.openedWorkspaceId===newDashboard.selectedNoteId){
            setThreadOrCollection(!threadOrCollection)
        }
        packDashboard(newDashboard)
        backup(selectedNote, 'meta')
        setCurrentPage('notes')
    }

    // Function to move a note all the way to the end of the search
    const moveToTheExtremity = (endOrBeginning, doBackup) => {

        var targetNote = null
        if(endOrBeginning){
            // find the last note
            for(const [, note] of dashboard.notes){
                if(!note.rightLink){
                    targetNote = note
                }
            }
        }
        else{
            targetNote = dashboard.notes.get(dashboard.firstNoteId)
        }

        if(!targetNote || targetNote.id===dashboard.selectedNoteId){
            return
        }

        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        if(!selectedNote || selectedNote.pinned){
            return
        }

        moveNoteInsideGraph(
            dashboard, 
            dashboard.selectedNoteId, 
            targetNote.id, 
            !endOrBeginning, 
            (note) => backupNote(note, 'meta', setNotesUpdating),
            !doBackup
        )
    }

    // show all notes that are not connected to other notes or present in any collection
    const showIsolatedNotes = () => {
        const newDashboard = {...dashboard}
        closeAndSaveWorkspace(newDashboard, setNotesUpdating, threadOrCollection)

        const copyMap = new Map(dashboard.notes)
        for(const [, note] of dashboard.notes){
            for(const id of note.branches){
                copyMap.delete(id)
            }
            for(const id of note.roots){
                copyMap.delete(id)
            }
            for(const id of note.collection){
                copyMap.delete(id)
            }
        }
        const lostNotes = [...copyMap.keys()]
        
        newDashboard.workspaceIds = lostNotes
        packDashboard(newDashboard, false, true)
        setCurrentPage('notes')
    }

    const getStats = () => {
        const stats = {}
        stats.numberOfNotes = dashboard.notes.size
        stats.numberOfLinks = 0
        for(const [, note] of dashboard.notes){
            stats.numberOfLinks += note.branches.length
        }
        return stats
    }

    return (
        <DashboardTree 
            dashboard={dashboard}
            selectNote={selectNote}
            deleteNote={deleteNote}
            addNote={addNote}
            packDashboard={packDashboard}
            setDelayedNoteUpdate={setDelayedNoteUpdate}
            triggerRerender={triggerRerender}
            setTriggerRerender={setTriggerRerender}
            threadOrCollection={threadOrCollection}
            setThreadOrCollection={setThreadOrCollection}
            notesUpdating={notesUpdating}
            setNotesUpdating={setNotesUpdating}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            openEditor={openEditor}
            moveToTheExtremity={moveToTheExtremity}
            closeAndSave={closeAndSave}
            mergeMode={mergeMode}
            setMergeMode={setMergeMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            GAPIloaded={GAPIloaded}
            currentUser={currentUser}
            closeCollection={closeCollection}
            rootsOrBranches={rootsOrBranches}
            setRootsOrBranches={setRootsOrBranches}
            searchProps={searchProps}
            setSearchProps={setSearchProps}
            threadOrCollectionManage={threadOrCollectionManage}
            synchNotes={synchNotes}
            updateNote={updateNote}
            exportThread={exportThread}
            openOccurrences={openOccurrences}
            signInFunction={signInFunction}
            signOutFunction={signOutFunction}
            threadCollectionSwap={threadCollectionSwap}
            handleOnDragEnd={handleOnDragEnd}
            showIsolatedNotes={showIsolatedNotes}
            getStats={getStats}
        />
    )
}

export default DashboardOperations