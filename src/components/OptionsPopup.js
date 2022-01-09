/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
OptionsPopup component
Tiny component that defines the options popup of the editor
It appears when the three dots are clicked
*/

import { FiMoreVertical } from "react-icons/fi"
import Popup from "reactjs-popup"
import React from 'react'

const OptionsPopup = ({
    selectedNote,
    open,
    setOpen,
    saveAndExit,
    exportThread,
    threadCollectionSwap,
    openOccurrences,
    moveToTheExtremity
}) => {

    return (
        <Popup trigger={
            <div>
                <FiMoreVertical
                    className='tools-btn'
                    size='1.5em'
                    onClick={()=>setOpen(true)}
                />   
            </div>
        } 
        nested
        modal
        open={open} 
        >   
            <div className='menu-popup'>

                <button 
                    className='popup-btn tools-btn'
                    onClick={() => {openOccurrences(); saveAndExit()}}
                >
                    Show Threads or Collections that contain this Note
                </button>

                <button 
                    className='popup-btn tools-btn'
                    onClick={() => {moveToTheExtremity(true); saveAndExit(true)}}
                >
                    Save and move to the end of the Search
                </button>

                <button 
                    className='popup-btn tools-btn'
                    onClick={() => {moveToTheExtremity(); saveAndExit(true)}}
                >
                    Save and move to the beginning of the Search
                </button>

                {selectedNote.thread.length ?
                    <div>

                        <button 
                            className='popup-btn tools-btn'
                            onClick={() => exportThread()}
                        >
                            Print or Export whole Thread
                        </button>

                        <button 
                            className='popup-btn tools-btn'
                            onClick={() => threadCollectionSwap(true)}
                        >
                            Convert Thread to Collection
                        </button>

                    </div> 
                    : 
                    (selectedNote.collection.length ?
                        <div>

                            <button 
                                className='popup-btn tools-btn'
                                onClick={() => threadCollectionSwap(false)}
                            >
                                Convert Collection to Thread
                            </button>

                        </div>
                    : null)
                }
            </div>
        </Popup>
    )
}
export default OptionsPopup