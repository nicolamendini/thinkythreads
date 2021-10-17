/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
Dashboard component
Implements the dashboard, which is the main component of the project
Puts together the NotesPage, the Editor, the Settings and the 
iFrame used for exporting threads as PDFs later on.
Uses lazy loading since the components that it contains are big
*/

import { useState, useEffect, Suspense} from 'react';
import React from 'react'
import Dexie from 'dexie'
import { createThumbnail, getNewNote, detachFromPosition} from "../helpers/DashboardUtils";
import { exportThreadGivenProps, checkDriveFolder} from '../helpers/BackupHelper';
import { getAllNotes } from '../helpers/DownloadHelper';
import { backupNote } from '../helpers/RequestsMakers';
import { getSearchFromProps, getLinksFromProps, getWorkspace, restoreLinks } from '../helpers/DashboardPacker';
import { dragManager } from '../helpers/DragManager';
import { closeAndSaveWorkspace, collectionToThread, linkThreadNotes, noteSelector, threadToCollection } from '../helpers/NotesManupulation';
import { noteDeleter } from '../helpers/NoteDeleter';
import { noteMerger } from '../helpers/NoteMerger';
import { cleanWorkspace } from '../helpers/Messages';
import { suspenseLoader } from '../helpers/DashboardUtils';
//importing and registering the formula compiler
import "katex/dist/katex.min.css";
import katex from "katex";

window.katex = katex;

// Define the lazy loading
const NoteEditor = React.lazy(() => import("./Editor"));
const Settings = React.lazy(() => import("./Settings"));
const NotesPage = React.lazy(() => import('./NotesPage'));

// Define the limits of the app to avoid extreme usages and crashes
export const LINKSLIMIT = 150
export const WORKSPACELIMIT = 300
export const TEXTLIMIT = 1048576
export const PREVIEWLIMIT = 200

// Define some shared variables that will be accessible from all components
export const driveVariables = {authorisation: false, folderId: ''}

// Initialise the local indexedDB that will contain the notes
export const db = new Dexie('notes-db')
db.version(1).stores({
    notes: 
        'id, text, preview, branches, roots, thread, collection' + 
        ', pinned, color, colorPreview, attachedImg, version, leftLink, rightLink'
})

// Dashboard component, 
// takes the Google sign in and out functions
// a GAPIloaded flag to know when the GoogleAPI script has been loaded
// and the current user to make sure that the user has logged in
// the username di per se is not used
const Dashboard = ({
    signInFunction, 
    signOutFunction, 
    GAPIloaded, 
    currentUser
}) => {

    // Main state of the dashboard containing all the correlated variables
    // they are put together to minimise the number of renderings and 
    // avoid clashes due to asynchronous state updating
	const [dashboard, setDashboard] = useState(
        {
            notes: new Map(), 
            firstNoteId: '',
            workspaceIds: [],
            selectedNoteId: null,
            openedCollectionId: null,
            openedWorkspaceId: null,
            search: [],
            links: [],
            workspace: [],
            checkedAgainstDrive: true
        }
    );

    // State that defines the search, in particular
    // the text in the search bar and the state of the two buttons on it
    const [searchProps, setSearchProps] = useState({
        searchText:'', 
        threadFilter: false, 
        collectionFilter: false,
        colorFilter: '#ededed'
    })

    // State that defines whether the user wants to see Roots or Branches
    const [rootsOrBranches, setRootsOrBranches] = useState(false);
    // State that defines the workspace mode currently on
    const [threadOrCollection, setThreadOrCollection] = useState(false);
    // State that defines whereas the mergemode is on
    const [mergeMode, setMergeMode] = useState(false);
    // State that defines the page of the dashboard, whether notes, 
    // editor or settings
    const [currentPage, setCurrentPage] = useState('notes');
    // State that defines the current ID of the thinkythreads folder on drive
    const [driveFolderId, setDriveFolderId] = useState(null);
    // Darkmode flag
    const [darkMode, setDarkMode] = useState(false);
    // State tha keeps the count of how many notes are updating at the moment
    const [notesUpdating, setNotesUpdating] = useState(0)

    // Effect called only when the component is first loaded
    // Retrieves the notes from the db
    useEffect(() => {
        const newDashboard = {...dashboard}
        db.notes.toArray().then(function(resp){
            resp.forEach((note) => {
                newDashboard.notes.set(note.id, note)
                createThumbnail(note)
            })

            for(const [, note] of newDashboard.notes){
                if(!note.leftLink){
                    newDashboard.firstNoteId = note.id
                }
            }

            packDashboard(newDashboard)
        })

        const darkModeStored = window.localStorage.getItem('dark-mode')
        if(darkModeStored){
            setDarkMode(darkModeStored==='true')
        }
    // eslint-disable-next-line
    },[])

    // Effect that is called every time the rootsOrBranches switch changes
    // Refreshed the Links area of the dashboard
    useEffect(() => {
        const newDashboard = {...dashboard}
        packDashboard(newDashboard, false, false, true)
    // eslint-disable-next-line
	}, [rootsOrBranches])

    // Effect that is called every time the searchProps change
    // Refreshed the Search area of the dashboard
    useEffect(() => {
        const newDashboard = {...dashboard}
        packDashboard(newDashboard, true)
    // eslint-disable-next-line
	}, [searchProps])

    // Effect that kicks in when either GAPIloaded
    // or currentUser change
    // Accesses the user's Drive and checks for the existence of
    // a thinkythreads folder
    useEffect(() => {
        driveVariables.authorisation = false
        if(GAPIloaded && currentUser){
            driveVariables.authorisation = true
            checkDriveFolder(setDriveFolderId);
        }
    // eslint-disable-next-line
    },[GAPIloaded, currentUser])


    // Once the folder is found or created, this effect retrieves all notes from drive
    useEffect(() => {
        driveVariables.folderId = driveFolderId
        if(GAPIloaded && currentUser && driveFolderId){
            synchNotes()
        }
    // eslint-disable-next-line
    },[driveFolderId, GAPIloaded, currentUser])

    useEffect(() => {
        if(!dashboard.selectedNoteId && currentPage==='editor'){
            setCurrentPage('notes')
        }
    // eslint-disable-next-line
    },[dashboard])

    const synchNotes = (newDashboard) => {
        if(!newDashboard){
            newDashboard = {...dashboard}
        }
        if(newDashboard.checkedAgainstDrive){
            console.log('synching')
            newDashboard.checkedAgainstDrive = false
            getAllNotes(
                newDashboard, 
                setNotesUpdating, 
                packDashboard
            )
        }
    }

    // Utils function used to backup a note
    // takes the note itself and a metaOrMedia
    // flag that controls whether there should be a partial or full backup
    // eg: links, colour, pinned, etc (meta) or/and main body text (media)
    const backup = async (note, metaOrMedia) => {
        backupNote(note, metaOrMedia, setNotesUpdating)
    }

    // Utils function used to refresh the whole dashboard and not just individual areas
    const packDashboard = (newDashboard, sFlag, wFlag, lFlag) => {

        if(!checkLinksSanity(newDashboard)){
            restoreLinks(newDashboard, backup)
        }

        const allFalse = !sFlag && !wFlag && !lFlag
        if(allFalse || sFlag){ 
            getSearchFromProps(newDashboard, searchProps)
        }
        if(allFalse || wFlag){
            getWorkspace(newDashboard)
        }
        if(allFalse || lFlag){
            getLinksFromProps(newDashboard, rootsOrBranches, setNotesUpdating)
        }
        setDashboard(newDashboard)
    }

    const checkLinksSanity = (newDashboard) => {

        // if there is more than one note
        if(newDashboard.notes.size > 1){

            var prevNote = newDashboard.notes.get(newDashboard.firstNoteId)
            var currNote = null
            var nextNote = null

            // if the first note has links
            if(prevNote && !prevNote.leftLink){

                if(prevNote.rightLink){
                    currNote = newDashboard.notes.get(prevNote.rightLink)

                    // for each note, check that it has links and that it is connected to the neighbours
                    for(let i=1; i<newDashboard.notes.size-1; i++){

                        if(currNote && currNote.rightLink){

                            nextNote = newDashboard.notes.get(currNote.rightLink)
                            if(nextNote){
                                if(!(
                                    currNote.rightLink && 
                                    currNote.leftLink &&
                                    prevNote.rightLink &&
                                    nextNote.leftLink &&
                                    currNote.leftLink===prevNote.id &&
                                    currNote.rightLink===nextNote.id
                                )){
                                    console.log('sequence disconnected at: ', {...prevNote}, {...currNote}, {...nextNote})
                                    return false
                                }

                                // move the head ahead
                                prevNote = currNote
                                currNote = nextNote
                            }
                            else{
                                console.log('the successor does not exist')
                                return false
                            }
                        }
                        else{
                            console.log('an element doesnt have a successor or the current element does not exist')
                            return false
                        }
                    }

                    if(!(currNote.leftLink && !currNote.rightLink)){
                        console.log('last note has a right link')
                        return false
                    }
                }
                else{
                    console.log('first note has no right link')
                    return false
                }
            }
            else {
                console.log('first note problem: ', prevNote)
                return false
            }
        }
        return true
    }

    // Add a new note to the notes hashmap and put it first in the Search Order
	const addNote = async () => {

        const newDashboard = {...dashboard}
        const newNote = getNewNote()

        // Adding the new note to the HashMap and selecting it
        newDashboard.notes.set(newNote.id, newNote)
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
            collectionNote.collection.push(newNote.id)
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
	}

    // Update a note after the editor is closed
    const updateNote = async (newSelectedNote, action, moveToEndFlag) => {

        // If the action selected from the editor was to get all the occurences,
        // open them in the workspace
        const newDashboard = {...dashboard}
        if(action==='get-occurrences'){
            openOccurrences(newDashboard)
        }

        // Backup and update the dashboard such that it contains the updated note
        newDashboard.notes.set(newSelectedNote.id, newSelectedNote)
        newDashboard.selectedNoteId = newSelectedNote.id

        if(moveToEndFlag){
            moveToTheEnd(newSelectedNote, newDashboard)
        }
        backup(newSelectedNote, 'both')
        packDashboard(newDashboard)
    }

    // Delete a note by calling the note deleter function
    const deleteNote = async (removingId, forceFlag, newDashboard) => {

        // If no newDashboard is given, use the one from the state
        // used because sometimes many operations have to happen on the same
        // dashboard before the UI update is called, improves efficiency
        if(!newDashboard){
            newDashboard = {...dashboard}
        }

        noteDeleter(
            removingId, 
            forceFlag, 
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
            result
        )
    }

    // Function that changes the mode of the dashboard
    // but it has to be unwrapped otherwise show an alert
    // if its unwrapped it switched by converting the workspace
    // to get rid of repeated notes for collections
    const threadOrCollectionManage = async () => {
        if(dashboard.openedWorkspaceId){
            alert(cleanWorkspace)
        }
        else{
            if(threadOrCollection){
                const newDashboard = {...dashboard}
                newDashboard.workspaceIds = [...new Set([...newDashboard.workspaceIds])]
                packDashboard(newDashboard)
                setThreadOrCollection(false)
            }
            else{
                setThreadOrCollection(true)
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
            leaveOpen, 
            newDashboard, 
            setNotesUpdating, 
            threadOrCollection
        )

        if(!leaveOpen){
            packDashboard(newDashboard)
        }
    }

    // Function that opens the occurences of a note among all the other notes
    const openOccurrences = async (newDashboard) => {

        closeAndSave(true, newDashboard);

        // applies a filter that checks if the current note is either in a thread or 
        // collection of any other note
        newDashboard.workspaceIds = [...dashboard.notes.keys()].filter(
            (id) => 
                dashboard.notes.get(id).thread.includes(dashboard.selectedNoteId) ||
                dashboard.notes.get(id).collection.includes(dashboard.selectedNoteId)
        )

        // Set workspace mode to false (collection mode)
        setThreadOrCollection(false);
    }

    // Utils function that exports the thread as PDF or to print
    const exportThread = async () => {
        exportThreadGivenProps(dashboard)
    }

    // Utils function that opens the editor by first retrieving the 
    // note from the local indexedDB because the text is not stored 
    // on the RAM for efficiency 
    const openEditor = async () => {
        db.notes.get(dashboard.selectedNoteId).then((dbNote) => {
            dashboard.notes.set(dashboard.selectedNoteId, dbNote)
            setCurrentPage('editor')
        })
    }
    
    // Function that closes the opened collection of the Search area
    const closeCollection = async () => {
        const newDashboard = {...dashboard}
        newDashboard.openedCollectionId = null
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
    const moveToTheEnd = (note, newDashboard) => {

        var performUpdate = false
        if(!newDashboard){
            performUpdate = true
            newDashboard = {...dashboard}
        }

        // find the last note
        var lastNote = null
        for(const [, note] of newDashboard.notes){
            if(!note.rightLink){
                lastNote = note
            }
        }

        if(lastNote){
            // remove the note from its current position
            detachFromPosition(newDashboard, note)

            // attach it at the end
            lastNote.rightLink = note.id
            note.leftLink = lastNote.id
            delete note.rightLink

            if(performUpdate){
                packDashboard(newDashboard, true)
            }
        }
    }

	return (
        <div>

            {currentPage==='notes' && 
                <Suspense fallback={suspenseLoader}>
                    <NotesPage 
                        darkMode={darkMode}
                        dashboard={dashboard}
                        handleOnDragEnd={handleOnDragEnd}
                        GAPIloaded={GAPIloaded}
                        currentUser={currentUser}
                        setCurrentPage={setCurrentPage}
                        notesUpdating={notesUpdating}
                        setDarkMode={setDarkMode}
                        closeCollection={closeCollection}
                        addNote={addNote}
                        selectNote={selectNote}
                        mergeMode={mergeMode}
                        setMergeMode={setMergeMode}
                        openEditor={openEditor}
                        rootsOrBranches={rootsOrBranches}
                        closeAndSave={closeAndSave}
                        threadOrCollection={threadOrCollection}
                        threadOrCollectionManage={threadOrCollectionManage}
                        setRootsOrBranches={setRootsOrBranches}
                        searchProps={searchProps}
                        setSearchProps={setSearchProps}
                        synchNotes={synchNotes}
                    />
                </Suspense>
                
            }

            {currentPage==='editor' && dashboard.selectedNoteId && 

                <Suspense fallback={suspenseLoader}>
                    <NoteEditor 
                        setCurrentPage={setCurrentPage} 
                        dashboard={dashboard} 
                        updateNote={updateNote}
                        deleteNote={deleteNote}
                        darkMode={darkMode}
                        exportThread={exportThread}
                        threadCollectionSwap={threadCollectionSwap}
                        moveToTheEnd={moveToTheEnd}
                    />
                </Suspense>
            }

            <iframe title='printer' id="ifmcontentstoprint" style={
                {
                    height: '0px', 
                    width: '0px', 
                    position: 'absolute', 
                    border: '0'
                    }
                }>
            </iframe>

            {currentPage==='settings' && 

                <Suspense fallback={suspenseLoader}>
                    <Settings 
                        setCurrentPage={setCurrentPage} 
                        signInFunction={signInFunction} 
                        signOutFunction={signOutFunction} 
                        loadedUser={currentUser} 
                        GAPIloaded={GAPIloaded}/>
                </Suspense>
            }

        </div>
	);
};

export default Dashboard;
