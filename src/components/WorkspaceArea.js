/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
WorkspaceArea component
Contains the current workspace the user is working on
*/

import React from 'react';
import NotesList from './NotesList';
import WorkspaceLabel from './WorkspaceLabel';

const WorkspaceArea = ({ 
    dashboard, 
    darkMode, 
    selectNote, 
    mergeMode, 
    threadOrCollection, 
    openEditor, 
    rootsOrBranches,
    closeAndSave,
    draggableInfo,
    triggerRerender
}) => { 

    return (
        <div>

            <WorkspaceLabel 
                dashboard={dashboard}
                threadOrCollection={threadOrCollection}
                closeAndSave={closeAndSave}
                darkMode={darkMode}
            />                

            <NotesList
                notes={dashboard.workspace}
                areaName={'workspace-area'}
                handleNotePress={selectNote}
                darkMode={darkMode}
                selectedNote={dashboard.notes.get(dashboard.selectedNoteId)}
                mergeMode={mergeMode}
                threadOrCollection={threadOrCollection}
                openEditor={openEditor}
                workspaceFlag={!dashboard.openedWorkspaceId}
                rootsOrBranches={rootsOrBranches}
                draggableInfo={draggableInfo}
                triggerRerender={triggerRerender}
            />

        </div>
    )
}

export default WorkspaceArea