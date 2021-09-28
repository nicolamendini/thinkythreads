/*
Author: Nicola Mendini
Date: 13/09/2021
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
    exportThread
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
            <div className='blurrer' onClick={() => setOpen(false)}>
                <div className='modal menu-popup'>

                    <button 
                        className='popup-btn tools-btn'
                        onClick={() => saveAndExit('get-occurrences')}
                    >
                        Show Threads or Collections that contain this Note
                    </button>

                    {selectedNote.thread.length ?
                        <div>

                            <button 
                                className='popup-btn tools-btn'
                                onClick={() => exportThread()}
                            >
                                Print or Export whole Thread
                            </button>

                        </div> : null
                    }
                </div>
            </div>
        </Popup>
    )
}
export default OptionsPopup