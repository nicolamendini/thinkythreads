/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
Settings component
Allows the user to log in or out from their Google account
and shows the info page
*/

import React from 'react';
import GoogleButton from 'react-google-button';
import Info from './Info'
import {IoIosArrowRoundBack} from 'react-icons/io'

const Settings = ({ setCurrentPage, signInFunction, signOutFunction, loadedUser, GAPIloaded}) => {
        return (
            <div>
                <div className='settings-btns'>
                    <div className='settings-back'>
                        <IoIosArrowRoundBack
                            className='tools-btn'
                            onClick={() => setCurrentPage('notes')}
                            size='2.5em'
                        />
                    </div>

                    THINKYTHREADS BETA

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
                    
                </div>

                <Info />

            </div>
        );
      }

export default Settings;