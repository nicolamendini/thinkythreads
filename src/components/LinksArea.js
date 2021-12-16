/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
LinksArea component
Defines the lowest row of notes of the dashboard
which shows the links starting from/coming into the selectedNote
Based of a rootsOrBranches flag
*/

import React from 'react';
import NotesList from './NotesList';
import { getCaption } from '../helpers/DashboardUtils';
import { SHAREDMEX } from './Dashboard';

// LinksArea component,
// takes the dashboard to get the notes from,
// The darkmode flag
// some draggableInfo to know where the drags start from
const LinksArea = ({ 
    dashboard, 
    darkMode, 
    mergeMode, 
    threadOrCollection, 
    openEditor, 
    rootsOrBranches,
    draggableInfo,
    triggerRerender,
    selectNote
}) => { 

    // Flag to check whether a note is allowed to be dropped in the links area
    const isDropDisabled = 
        (draggableInfo.note && draggableInfo.note.id===dashboard.selectedNoteId)

    // function to open the editor when a note is double clicked from the links area
    // requires a special function to do so because it cannot undergo the usual process of 
    // only being selected, because otherwise that selection would change the links area itself
    // and lead to unstable navigation
    const openEditorForLinks = (note) => {
        if(!mergeMode){
            SHAREDMEX.editorModeSelection = 'prev'
            dashboard.prevSelectedNoteId = dashboard.selectedNoteId
            dashboard.selectedNoteId = note.id
            openEditor()
        }
    }

    return (
        <div>

            <label className='stripe-label stripe-not-overflow' style={{width: '90vw'}}>
                {!rootsOrBranches ? ' BRANCHES' : ' ROOTS'}
                {dashboard.selectedNoteId && ' - ' + getCaption(dashboard.notes.get(dashboard.selectedNoteId))} 
            </label>

            <NotesList
                notes={dashboard.links}
                areaName={'branches-area'}
                darkMode={darkMode}
                handleNotePress={selectNote}
                selectedNote={dashboard.notes.get(dashboard.selectedNoteId)}
                mergeMode={mergeMode}
                threadOrCollection={threadOrCollection}
                openEditor={openEditorForLinks}
                rootsOrBranches={rootsOrBranches}
                isDropDisabled={isDropDisabled}
                triggerRerender={triggerRerender}
            />

        </div>
    )
}

export default LinksArea