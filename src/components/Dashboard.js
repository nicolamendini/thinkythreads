/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
Dashboard component
Implements the dashboard, which is the main component of the project
*/

import { useState, useEffect} from 'react';
import React from 'react'
import Dexie from 'dexie'
import { createThumbnail} from "../helpers/DashboardUtils";
import { checkDriveFolder} from '../helpers/BackupHelper';
import { getAllNotes } from '../helpers/DownloadHelper';
import { backupNote } from '../helpers/RequestsMakers';
import { getSearchFromProps, getLinksFromProps, getWorkspace, checkLinksSanity } from '../helpers/DashboardPacker';

//importing and registering the formula compiler
import "katex/dist/katex.min.css";
import katex from "katex";
import DashboardOperations from './DashboardOperations';

window.katex = katex

// Define the limits of the app to avoid extreme usages and crashes
export const LINKSLIMIT = 150
export const WORKSPACELIMIT = 300
export const TEXTLIMIT = 1048576
export const PREVIEWLIMIT = 200
export const SLICESIZE = 12

// Define some shared variables that will be accessible from all components
export const driveVariables = {authorisation: false, folderId: ''}

export const initSearchProps = {
    searchText:'', 
    threadFilter: false, 
    collectionFilter: false,
    colorFilter: '#ededed',
    imgFilter: false,
    goClean: false,
    areSlicesScrolled: false
}

// Initialise the local indexedDB that will contain the notes
export const db = new Dexie('notes-db')
db.version(1).stores({
    notes: 
        'id, text, preview, branches, roots, thread, collection' + 
        ', pinned, color, colorPreview, attachedImg, version, leftLink, rightLink'
})

// object containing several useful variables that have to be shared between classes
// editorModeSelection tells whether the editor should select the current selected note or the
// previously selected note once it is closed, based on where the note was opened from in the dashboard
// usingScrollKeys tells whether the user is scrolling with the keyboard
//currentSearchSlice tells at what slice of note the search area is currently at
export const SHAREDMEX = {
    editorModeSelection: 'curr',
    usingScrollKeys: false,
    currentSearchSlice: window.localStorage.getItem('current-slice-search-area'),
    closingEditor: false,
    resetSearchScroll: false,
    toasts: true,
    setSearchSlice: 0
}

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
            prevSelectedNoteId: null,
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
    const [searchProps, setSearchProps] = useState({...initSearchProps})
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
    // Note to update but with a delay, used for several functions
    const [delayedNoteUpdate, setDelayedNoteUpdate] = useState({
        note: null, 
        delay: 0, 
        metaOrMedia: '',
        callbackFunction: null,
        beforeFunction: null
    })
    // mock state used to trigger the rerendering of specific notes only inside the list of notes
    // the alternative would be to rerender eerything but its quite expensive
    const [triggerRerender, setTriggerRerender] = useState(true)

    // Effect called only when the component is first loaded
    // Retrieves the notes from the db
    useEffect(() => {
        const newDashboard = {...dashboard}
        db.notes.toArray().then(function(resp){
            resp.forEach((note) => {
                newDashboard.notes.set(note.id, note)
                createThumbnail(note)
            })

            // If the note doesn't have a left link, it's because it's the first of the sequence
            for(const [, note] of newDashboard.notes){
                if(!note.leftLink){
                    newDashboard.firstNoteId = note.id
                }
            }
            packDashboard(newDashboard)
        })

        // retrieve and set the dark mode as it was set by the user last
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
        const delayDebounceFn = setTimeout(() => {
            const newDashboard = {...dashboard}
            packDashboard(newDashboard, true)
          }, 200)
      
          return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line
	}, [searchProps])

    // Effect that controls the delayed update of a note
    // takes the note, a function to run before calling the backup, 
    // and a callback to call afterwards
    useEffect(() => {
        if(delayedNoteUpdate.note){
            const delayUpdateNote = setTimeout(() => {
                if(delayedNoteUpdate.beforeFunction){
                    delayedNoteUpdate.beforeFunction()
                }
                backup(delayedNoteUpdate.note, delayedNoteUpdate.metaOrMedia)
                if(delayedNoteUpdate.callbackFunction){
                    delayedNoteUpdate.callbackFunction()
                }
            }, delayedNoteUpdate.delay)
            return () => clearTimeout(delayUpdateNote)
        }
    // eslint-disable-next-line
	}, [delayedNoteUpdate])

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

    // Utils function to synchronise all the notes with GDRIVE
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

        checkLinksSanity(newDashboard, backup)

        // Flags that control what parts of the dashboard should be recomputed
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

    return(
        <DashboardOperations 
            dashboard={dashboard}
            notesUpdating={notesUpdating}
            setNotesUpdating={setNotesUpdating}
            backup={backup}
            packDashboard={packDashboard}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            mergeMode={mergeMode}
            setMergeMode={setMergeMode}
            threadOrCollection={threadOrCollection}
            setThreadOrCollection={setThreadOrCollection}
            rootsOrBranches={rootsOrBranches}
            setRootsOrBranches={setRootsOrBranches}
            triggerRerender={triggerRerender}
            setTriggerRerender={setTriggerRerender}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchProps={searchProps}
            setSearchProps={setSearchProps}
            GAPIloaded={GAPIloaded}
            currentUser={currentUser}
            synchNotes={synchNotes}
            signInFunction={signInFunction}
            signOutFunction={signOutFunction}
            setDelayedNoteUpdate={setDelayedNoteUpdate}
        />
    )
}

export default Dashboard;
