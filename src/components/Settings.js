/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
Settings component
Allows the user to log in or out from their Google account
and shows the info page
*/

import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import Info from './Info'
import {IoIosArrowRoundBack} from 'react-icons/io'
import { SHAREDMEX } from './Dashboard';
import Switch from "react-switch";

const Settings = ({ 
    darkMode,
    setCurrentPage, 
    signInFunction, 
    signOutFunction, 
    loadedUser, 
    GAPIloaded,
    showIsolatedNotes, 
    stats
}) => {

    const toastsInit = SHAREDMEX.toasts
    const [toasts, setToasts] = useState(toastsInit)

    return (
        <div className='settings-page' style={darkMode ? {backgroundColor: '#171717', color: 'white'} : {}}>
            <div className='settings-btns'>
                <div className='settings-back'>
                    <IoIosArrowRoundBack
                        className='tools-btn'
                        onClick={() => setCurrentPage('notes')}
                        size='2.5em'
                    />
                </div>

                THINKYTHREADS BETA v1.0.1

                { GAPIloaded && (!loadedUser ?

                <GoogleButton
                    id="signin-btn"
                    label="Sign in with Google"
                    onClick={() => signInFunction()}
                /> :

                <GoogleButton
                    label="Sign out"
                    onClick={() => signOutFunction()}
                />
                )}

                <br></br>
                You have {stats.numberOfNotes} notes and {stats.numberOfLinks} links.


                <div className='settings-inline' style={darkMode ? {backgroundColor: '#101010', color: 'white'} : {}}>
                    <span style={{paddingTop:'5px'}}>Dashboard Toast Notifications</span>
                    <span>
                        <Switch onChange={
                            (newToasts) => {
                                window.localStorage.setItem('dashboard-toasts', newToasts)
                                SHAREDMEX.toasts = newToasts
                                setToasts(newToasts)
                            }} 
                            checked={toasts} 
                        />
                    </span>
                </div>

                <div className='settings-inline tools-btn' style={darkMode ? {backgroundColor: '#101010', color: 'white'} : {}} 
                    onClick={()=>showIsolatedNotes()}
                >
                    <span style={{paddingTop:'5px'}}>Show Isolated Notes</span>
                </div>
                
            </div>

            <Info />

        </div>
    )
}

export default Settings