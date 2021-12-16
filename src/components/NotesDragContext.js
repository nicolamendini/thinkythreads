/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
NoteDragContext component
Defines drag and drop context by using the React Beautiful DnD package
*/

import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SearchArea from './SearchArea';
import WorkspaceArea from './WorkspaceArea';
import LinksArea from './LinksArea';

// Function that is called when a drag starts
// Stores information about the note that has been moved and its
// original position inside a state that then gets passed
const onDragStart = (start, dashboard, setDraggableInfo) => {

    // give some short tactile feedback
    if (window.navigator.vibrate) {
        window.navigator.vibrate(25);
    }

    // Initialise the draggableInfo state
    const draggableInfo = {}
    const sourceArea = start.source.droppableId
    draggableInfo.sourceArea = sourceArea
    const sourceIndex = start.source.index
    var noteFound = null

    // return the note itself so that it is possible to access some 
    // of its properties, eg: the collection that it contains
    // this is used for some special gestures such as the dragging
    // into the searchBar gesture
    if(sourceArea==='workspace-area'){
        noteFound = dashboard.workspace[sourceIndex]
    }
    else if(sourceArea==='search-area'){
        noteFound = dashboard.search[sourceIndex]
    }
    else if(sourceArea==='branches-area'){
        noteFound = dashboard.links[sourceIndex]
    }
    
    if(noteFound){
        draggableInfo.note = noteFound
    }
    setDraggableInfo(draggableInfo)
}

const NoteDragContext = ({ 
    handleOnDragEnd,
    closeCollection,
    dashboard,
    darkMode,
    addNote,
    selectNote,
    mergeMode,
    threadOrCollection,
    openEditor,
    rootsOrBranches,
    closeAndSave,
    searchProps,
    setSearchProps,
    triggerRerender
}) => {

    const [draggableInfo, setDraggableInfo] = useState({
        sourceArea: '',
        note: {id: null}
    })

    return(

        <DragDropContext 
            onDragEnd={handleOnDragEnd} 
            onDragStart={(start) => onDragStart(start, dashboard, setDraggableInfo)}
        >
                
            <SearchArea 
                closeCollection={closeCollection} 
                dashboard={dashboard} 
                darkMode={darkMode}
                addNote={addNote}
                selectNote={selectNote}
                mergeMode={mergeMode} 
                threadOrCollection={threadOrCollection}
                openEditor={openEditor}
                rootsOrBranches={rootsOrBranches}
                searchProps={searchProps}
                setSearchProps={setSearchProps}
                draggableInfo={draggableInfo}
                triggerRerender={triggerRerender}
            />                 

            
            <WorkspaceArea 
                dashboard={dashboard}
                darkMode={darkMode}
                selectNote={selectNote}
                mergeMode={mergeMode} 
                threadOrCollection={threadOrCollection} 
                openEditor={openEditor} 
                rootsOrBranches={rootsOrBranches}
                closeAndSave={closeAndSave}
                draggableInfo={draggableInfo}
                triggerRerender={triggerRerender}
            />

            <LinksArea 
                dashboard={dashboard}
                darkMode={darkMode}
                mergeMode={mergeMode}
                threadOrCollection={threadOrCollection}
                openEditor={openEditor}
                rootsOrBranches={rootsOrBranches}
                draggableInfo={draggableInfo}
                triggerRerender={triggerRerender}
                selectNote={selectNote}
            />

        </DragDropContext>
    )
}
export default NoteDragContext