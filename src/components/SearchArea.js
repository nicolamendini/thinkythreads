/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
SearchArea component
Search Area that includes the searchBar, the Search Label
and the notes list containing the results of the search
*/

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchLabel from './SearchLabel';
import NotesList from './NotesList';

export var searchState = {searchEmpty:true, firstSlice:true}

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
    draggableInfo
}) => {

    // Dropping here is disabled unless the note comes from the 
    // search area itself and has a collection within it
    // The gesture is used to expand it
    const isDropDisabled = 
        draggableInfo.sourceArea!=='search-area' ||
        !draggableInfo.note.collection.length

    const [cleanFilters, setCleanFilters] = useState({areSlicesScrolled: false, areFiltersOn: false, goClean: false})

    return(
        <div>
            <SearchBar 
                setSearchProps={setSearchProps} 
                searchProps={searchProps}
                isDropDisabled={isDropDisabled}
                darkMode={darkMode}
                cleanFilters={cleanFilters}
                setCleanFilters={setCleanFilters}
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
                    cleanFilters={cleanFilters}
                    setCleanFilters={setCleanFilters}
                />
            </div> 
        </div>
    )
}

export default SearchArea