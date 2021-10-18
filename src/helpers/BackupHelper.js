/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
BackupHelper functions
Function to backup notes on drive
*/

import { db, driveVariables } from "../components/Dashboard"
import { exportBeginDelimiter, newNoteDelimiter } from "./Messages"
import { 
    getMediaUpdateRequest, 
    getMetaUpdateRequest, 
    errorCatcher, 
    fileExistenceCheck, 
    createNoteFile
} from "./RequestsMakers"

// Function to update a note file on drive
export function updateNoteFile(note, mediaOrMeta, setNotesUpdating, counter){

    // Initialise the counter of calls
    if(!counter){
        setNotesUpdating((prev) => prev+1)
        counter=0
    }

    // Try to access the file
    fileExistenceCheck(note).then((resp)=>{

        // If it does not exist
        if(!resp.result.files.length){

            // create it by calling this function again in media mode
            createNoteFile(note).then(() => {

                if(mediaOrMeta!=='meta'){
                    updateNoteFile(note, 'media', setNotesUpdating)
                }
                else{
                    setNotesUpdating((prev) => prev-1)
                }

            }).catch((error) => 
                errorCatcher(
                    error, 
                    counter, 
                    updateNoteFile, 
                    note, 
                    mediaOrMeta, 
                    setNotesUpdating
                )
            )
        }

        // if the file exists, get its id and initialise a placeholder for the 
        // request function that is needed
        else{
            const fileId = resp.result.files[0].id
            var requestFunction = null

            // if the request is media or both, it is a media request
            if(mediaOrMeta==='media' || mediaOrMeta==='both'){
                requestFunction = getMediaUpdateRequest
            }

            // otherwise just ask for a meta request
            else if(mediaOrMeta==='meta'){
                requestFunction = getMetaUpdateRequest
            }
            requestFunction(note, fileId).then(function() {
                // if the request is both, update meta as well after updating media
                if(mediaOrMeta==='both'){
                    setNotesUpdating((prev) => prev-1)
                    updateNoteFile(note, 'meta', setNotesUpdating)
                }

                // otherwise update finished and decrease the active updates counter
                else{
                    console.log('updated')
                    setNotesUpdating((prev) => prev-1)
                }

            }).catch((error) => 
                errorCatcher(
                    error, 
                    counter, 
                    updateNoteFile, 
                    note, 
                    mediaOrMeta, 
                    setNotesUpdating
                )
            )
        }
    }).catch((error) =>     
        errorCatcher(
            error, 
            counter,    
            updateNoteFile, 
            note, 
            mediaOrMeta, 
            setNotesUpdating
        )
    )
}

// Removes a notes file from drive
export function removeNoteFile(note, setNotesUpdating, counter){
    if(!counter){
        setNotesUpdating((prev) => prev+1)
        counter=0
    }

    // if it exists, try to remove
    fileExistenceCheck(note).then(function(resp){
        if(resp.result.files.length){
            window.gapi.client.drive.files.delete({
                'fileId': resp.result.files[0].id
            }).then(function() { 
                setNotesUpdating((prev) => prev-1)

            }).catch((error) => 
                errorCatcher(
                    error, 
                    counter, 
                    removeNoteFile, 
                    note,  
                    setNotesUpdating
                )
            )
        }
        else{
            setNotesUpdating((prev) => prev-1)
        }
    }).catch((error) => 
        errorCatcher(
            error, 
            counter, 
            removeNoteFile, 
            note, 
            setNotesUpdating
        )
    )
}

// Function to export a thread as a PDF or print
export function exportThreadGivenProps(dashboard){

    // get all notes from DB that belong to thread and extract text
    db.notes.bulkGet(dashboard.notes.get(dashboard.selectedNoteId).thread).then((wholeNotes) => {
        const selectedThreadText = wholeNotes.map((note) => note.text);

        // concatenate all of them with delimiters 
        const reducer = (accumulator, currentValue) => accumulator + 
             newNoteDelimiter
            + currentValue;

        // add the start delimiter
        const htmlText = 
            exportBeginDelimiter + 
            selectedThreadText.reduce(reducer);

        // print it
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(htmlText);
        pri.document.close();
        pri.focus();
        pri.print();
    })
}

// Check for the existence of the thinkythreads folder
export function checkDriveFolder(setDriveFolderId, counter){

    console.log('checkingfolder')
    if(!counter){counter=0}

    window.gapi.client.drive.files.list({
      q:"name='thinkythreads-data' " +
      "and mimeType='application/vnd.google-apps.folder' " +
      "and trashed=false",
    }).then((resp)=>{

        // if it does not exist, create it
        if(!resp.result.files.length){
            var fileMetadata = {
            'name': 'thinkythreads-data',
            'mimeType': 'application/vnd.google-apps.folder'
            };
            window.gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id'
            }).then((newResp) => {
                    
                // after creation, set the driveFolder state to the new folder
                setDriveFolderId(newResp.result.id)

            }).catch((error) => errorCatcher(error, counter, checkDriveFolder, setDriveFolderId))
        }
        else{
            if(resp.result.files[0].id!==driveVariables.folderId){
                setDriveFolderId(resp.result.files[0].id)
            }
        }
    }).catch((error) => errorCatcher(error, counter, checkDriveFolder, setDriveFolderId))
}