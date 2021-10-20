/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
NotesPage component
Main notes page, as opposed to Editor page or settings page
Wraps the noteDragDropContext and the Footer
*/

import React from 'react';
import Footer from './Footer'
import NoteDragContext from './NotesDragContext';

const NotesPage = ({ 
    darkMode,
    dashboard,
    handleOnDragEnd,
    GAPIloaded,
    currentUser,
    setCurrentPage,
    notesUpdating,
    setDarkMode,
    closeCollection,
    addNote,
    selectNote,
    mergeMode,
    setMergeMode,
    openEditor,
    rootsOrBranches,
    closeAndSave,
    threadOrCollection,
    threadOrCollectionManage,
    setRootsOrBranches,
    searchProps,
    setSearchProps,
    synchNotes,
    editorMode
}) => {

    return(

        <div className={darkMode ? 'container dark-mode' : 'container'}>

            <NoteDragContext 
                handleOnDragEnd={handleOnDragEnd}
                closeCollection={closeCollection}
                dashboard={dashboard}
                darkMode={darkMode}
                addNote={addNote}
                selectNote={selectNote}
                mergeMode={mergeMode}
                threadOrCollection={threadOrCollection}
                openEditor={openEditor}
                rootsOrBranches={rootsOrBranches}
                closeAndSave={closeAndSave}
                searchProps={searchProps}
                setSearchProps={setSearchProps}
                editorMode={editorMode}
            />

            <Footer 
                threadOrCollectionManage={threadOrCollectionManage}
                threadOrCollection={threadOrCollection}
                setRootsOrBranches={setRootsOrBranches}
                rootsOrBranches={rootsOrBranches}
                setDarkMode={setDarkMode}
                mergeMode={mergeMode}
                setMergeMode={setMergeMode}
                selectedNote={dashboard.notes.get(dashboard.selectedNoteId)}
                setCurrentPage={setCurrentPage}
                notesUpdating={notesUpdating}
                loadedUser={GAPIloaded && currentUser}
                synchNotes={synchNotes}
                darkMode={darkMode}
            />
            
        </div>
    )
}
export default NotesPage