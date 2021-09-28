/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
BackupHelper functions
Function to backup notes on drive
*/

import { db, shareDriveFolderId } from "../components/Dashboard"
import { removeElementAt } from "./DashboardUtils"
import { exportBeginDelimiter, newNoteDelimiter } from "./Messages"
import { 
    getMediaUpdateRequest, 
    getMetaUpdateRequest, 
    errorCatcher, 
    fileExistenceCheck, 
    createNoteFile 
} from "./RequestsMakers"

// Try to update the config file on drive by sendin the request
export function updateConfigLoop(newDashboard, fileId, counter){

    // The config only includes the notesOrder
    if(!counter){counter=0}
    const configBody = JSON.stringify({
        notesOrder: newDashboard.notesOrder,
    })
    getMediaUpdateRequest({text: configBody}, fileId).then(
    ).catch((error) => errorCatcher(error, counter, updateConfigLoop, newDashboard))
}

// Function to update a note file on drive
export function updateNoteFile(note, mediaOrMeta, setNotesUpdating, counter){

    // Initialise the counter of calls
    if(!counter){counter=0}

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

// Function to update the config file on drive
export function updateConfigFile(newDashboard, counter){

    if(newDashboard.checkedAgainstDrive){
        console.log('updateconfig')
        if(!counter){counter=0}

        window.gapi.client.drive.files.list({
            fields: 'files(id)',
            q:"name='___config' " +
            "and mimeType='application/json' " +
            "and trashed=false",
        }).then((resp)=>{

            // if it does not exist, create it and then call updateConfigLoop
            if(!resp.result.files.length){
                const configMetadata = {}
                createNoteFile({id: '___config'}, configMetadata).then((newResp) => {
                    updateConfigLoop(newDashboard, newResp.result.id)
                }).catch((error) => errorCatcher(error, counter, updateConfigFile, newDashboard))
            }

            // otherwise call updateConfigLoop directly
            else{ 
                updateConfigLoop(newDashboard, resp.result.files[0].id)
            }
        }).catch((error) => errorCatcher(error, counter, updateConfigFile, newDashboard))
    }

    // if the getAllNotes is not done yet config cannot update
    else{
        console.log('blocked')
    }
}

// Function to remove a file from the deletedNotes tracker
export function removeFromDeletionTracker(note, deletedNotes, setDeletedNotes){
    console.log('deleted')

    // find the index of the note to delete
    const deletedNoteIdx = deletedNotes.findIndex(id => id===note.id)
    if(deletedNoteIdx!==-1){
        const newDeletedNotes = removeElementAt(deletedNotes, deletedNoteIdx)
        setDeletedNotes(newDeletedNotes)

        // backup the deleted notes array locally
        window.localStorage.setItem('deleted-notes', JSON.stringify(newDeletedNotes))
    }
}

// Removes a notes file from drive
export function removeNoteFile(note, deletedNotes, setDeletedNotes, setNotesUpdating, counter){
    if(!counter){counter=0}

    // if it exists, try to remove
    fileExistenceCheck(note).then(function(resp){
        if(resp.result.files.length){
            window.gapi.client.drive.files.delete({
                'fileId': resp.result.files[0].id
            }).then(function() { 

                // if successful, delete from tracker as well
                removeFromDeletionTracker(note, deletedNotes, setDeletedNotes)

            }).catch((error) => 
                errorCatcher(
                    error, 
                    counter, 
                    removeNoteFile, 
                    note, 
                    deletedNotes, 
                    setDeletedNotes, 
                    setNotesUpdating
                )
            )
        }

        // if it does not exist, remove from tracker and that is it
        else{
            removeFromDeletionTracker(note, deletedNotes, setDeletedNotes)
        }
    }).catch((error) => 
        errorCatcher(
            error, 
            counter, 
            removeNoteFile, 
            note, 
            deletedNotes, 
            setDeletedNotes, 
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
            if(resp.result.files[0].id!==shareDriveFolderId){
                setDriveFolderId(resp.result.files[0].id)
            }
        }
    }).catch((error) => errorCatcher(error, counter, checkDriveFolder, setDriveFolderId))
}