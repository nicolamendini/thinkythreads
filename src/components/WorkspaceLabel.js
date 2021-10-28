/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
WorkspaceLabel component
Gives information about the current state of the workspace
*/

import React from 'react';
import { getCaption } from '../helpers/DashboardUtils';
import { VscChromeClose } from 'react-icons/vsc';

const WorkspaceLabel = ({ 
    dashboard,
    threadOrCollection,
    closeAndSave,
    darkMode
}) => {

return(
    <div className='stripe-label'>

        <div className='stripe-not-overflow' style={{width: '80vw'}}>

            CURRENT {threadOrCollection ? ' THREAD ' : ' COLLECTION '} 
            {dashboard.openedWorkspaceId ?
                    ' : ' + getCaption(dashboard.notes.get(dashboard.openedWorkspaceId))
                : (dashboard.workspaceIds.length ? 
                    (threadOrCollection ? ' : unsaved thread ' : ' : unsaved collection ') 
            : null)
            }
        </div>

        {dashboard.workspaceIds.length || dashboard.openedWorkspaceId ?
            <div>
                <VscChromeClose 
                    size='2em'
                    className='tools-btn close-btn'
                    onClick={() => closeAndSave()}
                    color={darkMode ? 'white' : 'black'}
                />
            </div>
        : null}

    </div>
    )
}

export default WorkspaceLabel