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
    selectNote
}) => { 

    const isDropDisabled = 
        draggableInfo.sourceArea!=='search-area' ||
        draggableInfo.note.id===dashboard.selectedNoteId

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
                openEditor={!mergeMode ? (note) => {dashboard.selectedNoteId=note.id; openEditor()} : () => {}}
                rootsOrBranches={rootsOrBranches}
                isDropDisabled={isDropDisabled}
            />

        </div>
    )
}

export default LinksArea