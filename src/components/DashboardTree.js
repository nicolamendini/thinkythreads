/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
DashboardTree component
Contains the main connections between the ui elements of the dashboard
and manages the page switch. Also defines all the dependencies
*/

import KeyboardBindings from "./KeyboardBindings"
import { Suspense } from "react"
import { suspenseLoader } from "../helpers/DashboardUtils"
import React from "react"
import { ToastContainer } from "react-toastify"

// Define the lazy loading
const NoteEditor = React.lazy(() => import("./Editor"))
const Settings = React.lazy(() => import("./Settings"))
const NotesPage = React.lazy(() => import('./NotesPage'))


const DashboardTree = ({
    dashboard,
    selectNote,
    deleteNote,
    addNote,
    packDashboard,
    setDelayedNoteUpdate,
    triggerRerender,
    setTriggerRerender,
    threadOrCollection,
    setThreadOrCollection,
    notesUpdating,
    setNotesUpdating,
    currentPage,
    setCurrentPage,
    openEditor,
    moveToTheExtremity,
    closeAndSave,
    mergeMode, 
    setMergeMode,
    darkMode,
    setDarkMode,
    GAPIloaded,
    currentUser,
    closeCollection,
    rootsOrBranches,
    setRootsOrBranches,
    searchProps, 
    setSearchProps,
    threadOrCollectionManage,
    synchNotes,
    updateNote,
    exportThread,
    openOccurrences,
    signInFunction,
    signOutFunction,
    threadCollectionSwap,
    handleOnDragEnd
}) => {

return (
        <div>
            <KeyboardBindings
                dashboard={dashboard}
                selectNote={selectNote}
                deleteNote={deleteNote}
                addNote={addNote}
                packDashboard={packDashboard}
                setDelayedNoteUpdate={setDelayedNoteUpdate}
                setTriggerRerender={setTriggerRerender}
                threadOrCollection={threadOrCollection}
                setThreadOrCollection={setThreadOrCollection}
                setNotesUpdating={setNotesUpdating}
                currentPage={currentPage}
                openEditor={openEditor}
                closeAndSave={closeAndSave}
                moveToTheExtremity={moveToTheExtremity}
                mergeMode={mergeMode}
                openOccurrences={openOccurrences}
            />

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
                        triggerRerender={triggerRerender}
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
                        moveToTheExtremity={moveToTheExtremity}
                        openOccurrences={openOccurrences}
                        packDashboard={packDashboard}
                        setDelayedNoteUpdate={setDelayedNoteUpdate}
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

            <ToastContainer/>
        </div>
	)
}

export default DashboardTree