/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
LinksArea component
Defines the lowest row of notes of the dashboard
which shows the links starting from/coming into the selectedNote
Based of a rootsOrBranches flag
*/

import React from 'react';
import NotesList from './NotesList';
import { getCaption } from '../helpers/DashboardUtils';
import { editorMode } from './Dashboard';

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
    draggableInfo
}) => { 

    const isDropDisabled = 
        draggableInfo.sourceArea==='workspace-area' ||
        (draggableInfo.note && draggableInfo.note.id===dashboard.selectedNoteId)

    const openEditorForLinks = (note) => {
        if(!mergeMode){
            editorMode.selection = 'prev'
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
                handleNotePress={() => {}}
                selectedNote={dashboard.notes.get(dashboard.selectedNoteId)}
                mergeMode={mergeMode}
                threadOrCollection={threadOrCollection}
                openEditor={openEditorForLinks}
                rootsOrBranches={rootsOrBranches}
                isDropDisabled={isDropDisabled}
            />

        </div>
    )
}

export default LinksArea