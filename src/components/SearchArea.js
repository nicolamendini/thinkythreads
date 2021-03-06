/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
SearchArea component
Search Area that includes the searchBar, the Search Label
and the notes list containing the results of the search
*/

import React from 'react';
import SearchBar from './SearchBar';
import SearchLabel from './SearchLabel';
import NotesList from './NotesList';

const SearchArea = ({ 
    closeCollection, 
    dashboard, 
    darkMode, 
    addNote, 
    selectNote, 
    mergeMode, 
    threadOrCollection, 
    openEditor, 
    rootsOrBranches,
    searchProps,
    setSearchProps,
    draggableInfo,
    triggerRerender
}) => {

    // Dropping here is disabled unless the note comes from the 
    // search area itself and has a collection within it
    // The gesture is used to expand it
    const isDropDisabled = 
        !draggableInfo.note ||
        !draggableInfo.note.collection ||
        !draggableInfo.note.collection.length

    return(
        <div>
            <SearchBar 
                setSearchProps={setSearchProps} 
                searchProps={searchProps}
                isDropDisabled={isDropDisabled}
                darkMode={darkMode}
            />

            <div>
                <SearchLabel 
                    searchProps={searchProps} 
                    closeCollection={closeCollection}
                    dashboard={dashboard}
                    darkMode={darkMode}
                />
                
                <NotesList
                    notes={dashboard.search}
                    handleAddNote={addNote}
                    areaName={'search-area'}
                    handleNotePress={selectNote}
                    darkMode={darkMode}
                    selectedNote={dashboard.notes.get(dashboard.selectedNoteId)}
                    mergeMode={mergeMode}
                    threadOrCollection={threadOrCollection}
                    openEditor={openEditor}
                    rootsOrBranches={rootsOrBranches}
                    searchProps={searchProps}
                    setSearchProps={setSearchProps}
                    triggerRerender={triggerRerender}
                />
            </div> 
        </div>
    )
}

export default SearchArea