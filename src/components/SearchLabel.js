/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
SearchLabel component
Gives information about the current state of the search
and the filters applied to it
*/

import React from 'react';
import { getCaption } from '../helpers/DashboardUtils';
import { VscChromeClose } from 'react-icons/vsc';

const SearchLabel = ({ 
    searchProps, 
    closeCollection, 
    dashboard,
    darkMode
}) => {

    return(
        <div className='stripe-label'>

            <div className='stripe-not-overflow' style={{width: '80vw'}}>
                NOTE FINDER  
                {searchProps.threadFilter && ' - THREADS'} 
                {searchProps.collectionFilter && ' - COLLECTIONS'}
                {
                    dashboard.openedCollectionId && ' : ' + 
                    getCaption(dashboard.notes.get(dashboard.openedCollectionId))
                }
            </div>

            {dashboard.openedCollectionId && 
                <div>
                    <VscChromeClose 
                        size='2em'
                        className='tools-btn close-btn'
                        onClick={() => closeCollection()}
                        color={darkMode ? 'white' : 'black'}
                    />
                </div>
            }

        </div>
    )
}

export default SearchLabel