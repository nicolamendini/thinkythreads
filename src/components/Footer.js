/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
EditorFooter component
Defines the buttons of the footer and calls the respective functions
*/

import { FcIdea, FcSettings, FcParallelTasks, FcBrokenLink, FcLink, FcImport, FcCheckmark, FcCancel} from 'react-icons/fc'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { driveNotConnected, mergeModeOn } from '../helpers/Messages';
import React from 'react'

// Footer component
// takes the threadOrCollection state and a function to change it,
// rootsOrBranches state and a function to chage it,
// a function to switch the darkMode state
// mergeMode state and a function to change it,
// the selectedNote,
// a function to change the current page, used to move to settings page,
// the notesUpdating flag to show the animation
// and the loadedUser flag to pass to the settings
// Most of the props are used to show the correct icons and switch states
const Footer = ({
    threadOrCollectionManage, 
    threadOrCollection, 
    setRootsOrBranches, 
    rootsOrBranches, 
    setDarkMode, 
    mergeMode, 
    setMergeMode,
    selectedNote,
    setCurrentPage,
    notesUpdating,
    loadedUser,
    synchNotes,
    darkMode
}) => {
    return(
        <div className='page-footer'
            style={{
                borderTop: darkMode ? '1px solid #303030' : '1px solid #cccccc'
            }}
        >
            <FcSettings
                className='tools-btn'
                onClick={() => setCurrentPage('settings')}
                size='2.5em'
            />

            {!threadOrCollection &&
                <FcBrokenLink
                    onClick={() =>
                        threadOrCollectionManage(
                            !threadOrCollection
                        )
                    }
                    size='2.5em'
                    className='tools-btn'
                />
            }

            {threadOrCollection &&
                <FcLink
                    onClick={() =>
                        threadOrCollectionManage(
                            !threadOrCollection
                        )
                    }
                    size='2.5em'
                    className='tools-btn'
                />
            }

            {threadOrCollection && 
                <FcParallelTasks
                    onClick={() =>
                        setRootsOrBranches(
                            (previous) => !previous
                        )
                    }
                    size='2.5em'
                    className='tools-btn'
                    style={rootsOrBranches&&{transform: 'scaleX(-1)'}}
                />
            }

            {selectedNote ?
                <FcImport
                    onClick={() =>{
                            setMergeMode(
                                (previous) => !previous
                            )
                            if(!mergeMode){
                                alert(mergeModeOn)
                            }
                        }
                    }
                    size='2.3em'
                    className='tools-btn'
                    style={{transform:'scaleY(1.15) rotate(-90deg)'}}
                />    
            : null}

            <FcIdea
                onClick={() =>
                    setDarkMode(
                        (previousDarkMode) => !previousDarkMode
                    )
                }
                size='2.5em'
                className='tools-btn'
            />  

            {loadedUser ? (
                notesUpdating>0?

                    <Loader 
                        type="Circles" 
                        color="#00BFFF" 
                        height='1.8em'
                        width='2.3em'
                    /> :

                    <FcCheckmark
                        size='2.3em'
                        className='tools-btn'
                        onClick={()=>synchNotes()}
                    />
            ) :

            <FcCancel
                size='2.3em'
                onClick={()=>alert(driveNotConnected)}
            />
            }

        </div>
    );
}

export default Footer;