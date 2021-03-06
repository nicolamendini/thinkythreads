/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
EditorFooter component
Defines the buttons of the footer and calls the respective functions
*/

import { FcIdea, FcSettings, FcParallelTasks, FcBrokenLink, FcLink, FcImport, FcCheckmark, FcCancel} from 'react-icons/fc'
import { AiOutlineDisconnect, AiOutlineLink, AiOutlineImport, AiOutlineStop } from 'react-icons/ai';
import { GoLightBulb } from 'react-icons/go'
import { VscSettingsGear, VscCheck, VscSync } from 'react-icons/vsc';
import { IoIosGitBranch } from 'react-icons/io';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { driveNotConnected, mergeModeOn } from '../helpers/Messages';
import React from 'react'
import { toast } from 'react-toastify';
import { SHAREDMEX } from './Dashboard';

const notifyMerge = () => SHAREDMEX.toasts && toast(mergeModeOn);
const notifyDrive = () => SHAREDMEX.toasts && toast(driveNotConnected);
const notifySynch = () => SHAREDMEX.toasts && toast('Synchronising your notes...')

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

    const darkModeSwitch = () =>{
        window.localStorage.setItem('dark-mode', !darkMode)
        setDarkMode((previousDarkMode) => !previousDarkMode)
    }
    return(
        <div className='page-footer'
            style={darkMode ? 
                {borderTop: '1px solid #2a2a2a', backgroundColor: '#1b1b1b'} 
                : 
                {borderTop: '#dddddd', background: 'linear-gradient(#eeeeee, white)', boxShadow: '0 0 3px #bbbbbb'}
            }
        >
            {darkMode ?
                <VscSettingsGear
                    className='tools-btn'
                    onClick={() => setCurrentPage('settings')}
                    size='2.5em'
                    style={{transform: 'scale(0.75)'}}
                />
                :
                <FcSettings
                    className='tools-btn'
                    onClick={() => setCurrentPage('settings')}
                    size='2.5em'
                />
            }

            {!threadOrCollection ? (
                darkMode ? 
                    <AiOutlineDisconnect
                        onClick={() =>
                            threadOrCollectionManage(
                                !threadOrCollection
                            )
                        }
                        size='2.5em'
                        className='tools-btn'
                        style={{transform: 'rotate(45deg) scale(0.85)'}}
                    />
                :
                    <FcBrokenLink
                        onClick={() =>
                            threadOrCollectionManage(
                                !threadOrCollection
                            )
                        }
                        size='2.5em'
                        className='tools-btn'
                    />
            )
            :
            (
                darkMode ?
                    <AiOutlineLink
                        onClick={() =>
                            threadOrCollectionManage(
                                !threadOrCollection
                            )
                        }
                        size='2.5em'
                        className='tools-btn'
                        style={{transform: 'rotate(45deg) scale(0.85)'}}
                    />
                :
                    <FcLink
                        onClick={() =>
                            threadOrCollectionManage(
                                !threadOrCollection
                            )
                        }
                        size='2.5em'
                        className='tools-btn'
                    />
                )
            }
            {
                darkMode ?
                    <IoIosGitBranch
                        onClick={() =>
                            setRootsOrBranches(
                                (previous) => !previous
                            )
                        }
                        size='2em'
                        className='tools-btn'
                        style={!rootsOrBranches && {transform: 'scaleY(-1)'}}
                    />
                :
                    <FcParallelTasks
                        onClick={() =>
                            setRootsOrBranches(
                                (previous) => {
                                    SHAREDMEX.toasts && toast(
                                        previous ?
                                            'The Branches Mode is on, now you will see the effectual links between notes' 
                                            : 
                                            'The Roots Mode is on, now you will see the causal links between notes' 
                                        )
                                    return !previous
                                }
                            )
                        }
                        size='2.3em'
                        className='tools-btn'
                        style={rootsOrBranches ? {transform: 'scaleY(-1) rotate(90deg)'} : {transform: 'rotate(90deg)'}}
                    />
            }

            {selectedNote ?
                darkMode ?
                    <AiOutlineImport
                        onClick={() =>{
                                setMergeMode(
                                    (previous) => !previous
                                )
                                if(!mergeMode){
                                    notifyMerge()
                                }
                            }
                        }
                        size='1.8em'
                        className='tools-btn'
                        style={{transform:'scaleX(1.1) rotate(-90deg)'}}
                    /> 
                :
                    <FcImport
                        onClick={() =>{
                                setMergeMode(
                                    (previous) => !previous
                                )
                                if(!mergeMode){
                                    SHAREDMEX.toasts && notifyMerge()
                                }
                            }
                        }
                        size='2.3em'
                        className='tools-btn'
                        style={{transform:'scaleY(1.15) rotate(-90deg)'}}
                    />    
            : null}

            {darkMode ?
                <GoLightBulb
                    onClick={() => darkModeSwitch()}
                    size='2.5em'
                    className='tools-btn'
                    style={{transform: 'scaleY(0.7) scaleX(0.7)'}}
                />  
            :
                <FcIdea
                onClick={() => darkModeSwitch()}
                size='2.5em'
                className='tools-btn'
                />  
            }

            {loadedUser ? (
                notesUpdating>0?

                    darkMode ? 
                        <VscSync 
                            size='2em'
                        /> 
                    :
                        <Loader 
                            type="Circles" 
                            color="#00BFFF" 
                            height='1.8em'
                            width='2.3em'
                        /> 

                :

                    darkMode ? 
                        <VscCheck
                            size='2em'
                            className='tools-btn'
                            onClick={()=>{ notifySynch(); synchNotes()}}
                            style={{transform: 'scaleY(0.85)'}}
                        />
                    :
                        <FcCheckmark
                            size='2.3em'
                            className='tools-btn'
                            onClick={()=>{notifySynch(); synchNotes()}}
                        />
            ) :

            darkMode ?
                <AiOutlineStop
                    size='1.8em'
                    onClick={()=>notifyDrive()}
                    style={{transform: 'scaleX(-1)'}}
                />
            :
                <FcCancel
                    size='2.3em'
                    onClick={()=>notifyDrive()}
                />
            }

        </div>
    );
}

export default Footer;