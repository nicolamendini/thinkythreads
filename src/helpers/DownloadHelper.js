/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
DownloadHelper functions
Contains functions that help the retrieval of notes on GDrive
*/

import { shareDriveFolderId, db } from "../components/Dashboard";
import { createThumbnail } from "./DashboardUtils";
import { getMediaRequestById, errorCatcher, sendUpdateRequest } from "./RequestsMakers";
import { updateConfigFile, removeNoteFile } from "./BackupHelper";

// Function to create a new note from a drive file response
// takes both the metaResponse and the mediaResponse
// currIdx defines the index of the current file on drive
// notesOnDrive stores all the notes that have been found on drive
export function setNoteFromResp(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    mediaResp, 
    currIdx, 
    setNotesUpdating, 
    packDashboard,
    finishedProcesses
){

    // create the note object and add the text field and version
    const newNote = JSON.parse(metaResp.result.files[currIdx].description)
    newNote.text = mediaResp.body;
    newNote.version = parseInt(metaResp.result.files[currIdx].appProperties.version)

    // add it to the dashboard and backup locally
    newDashboard.notes.set(newNote.id, newNote);
    db.notes.put(newNote).then(

        // check if it needs a thumbnail and create it
        createThumbnail(newNote)
    )
    finishedProcesses.count += 1
    setNotesUpdating((prev) => prev-1)

    // if all the notes on drive have been processed
    if(finishedProcesses.count === metaResp.result.files.length){

        // if there is a next page of files on drive, download the files of the next page
        if(metaResp.result.nextPageToken){
            getNotesPage(
                newDashboard, 
                notesOnDrive,  
                setNotesUpdating, 
                packDashboard, 
                metaResp.result.nextPageToken
            )
        }

        // otherwise if all the files have been processed set the config file
        else{
            callSetConfig(
                notesOnDrive, 
                newDashboard, 
                packDashboard, 
                setNotesUpdating
            )
        }
    }
}

// function used to decide what config file prevails, either that on drive or local
export function callSetConfig(
    notesOnDrive, 
    newDashboard, 
    packDashboard, 
    setNotesUpdating,
    counter
){
    if(!counter){counter=0}

    // if a config file has been found and any note has been modified by data on drive,
    // overwrite the local configuration with the online one
    if(notesOnDrive.configFound){

        getMediaRequestById(notesOnDrive.configFound).then(
            (mediaResp) => {
                // if the config is not empty
                if(mediaResp.body){

                    const config = JSON.parse(mediaResp.body)
                    // first see what's on drive
                    setConfigFromDrive(newDashboard, config, packDashboard)
                }

                // this comes strictly after setConfigFromDrive
                updateDriveNotes(
                    newDashboard, 
                    notesOnDrive, 
                    setNotesUpdating, 
                    packDashboard
                )
            }).catch((error) => errorCatcher(
                error, 
                counter, 
                callSetConfig, 
                notesOnDrive, 
                newDashboard, 
                packDashboard, 
                setNotesUpdating 
            ))
    }
    else{
        updateDriveNotes(
            newDashboard, 
            notesOnDrive,  
            setNotesUpdating, 
            packDashboard
        )
    }
}

// get a single notes media given the metaResponse and the currIdx
export function getNote(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    currIdx, 
    setNotesUpdating, 
    packDashboard, 
    finishedProcesses,
    counter
){
    if(!counter){counter=0}
    getMediaRequestById(metaResp.result.files[currIdx].id).then((mediaResp) =>

        // once the media is downloaded, create an object from it and add it to dashboard
        setNoteFromResp(
            newDashboard, 
            notesOnDrive, 
            metaResp, 
            mediaResp, 
            currIdx, 
            setNotesUpdating, 
            packDashboard,
            finishedProcesses
        )

    ).catch((error) => errorCatcher(
        error, 
        counter, 
        getNote, 
        newDashboard, 
        notesOnDrive, 
        metaResp, 
        currIdx,
        setNotesUpdating,
        packDashboard,
        finishedProcesses
    ))
}

// download a whole page of files metadatas 
// so that later you can access their content individually
export function setNotesPageFromResp(
    newDashboard, 
    notesOnDrive, 
    metaResp, 
    setNotesUpdating, 
    packDashboard
){

    // keep count of the files processed for this page
    var finishedProcesses = {count: 0}

    // for all the files on drive
    for(let i=0; i<metaResp.result.files.length; i++){

        // placeholder for the noteFile object and for the note id
        const noteFile = metaResp.result.files[i]
        const noteId = noteFile.name

        // if config file encountered, store the id of the file and finish the process
        if(noteId==='___config'){
            notesOnDrive.configFound = noteFile.id
            finishedProcesses.count +=1
        }
        
        // else if the file was not a deleted one, add it to notesOnDrive
        else if(!newDashboard.notesEverDeleted[noteId]){
            const driveNoteVersion = parseInt(noteFile.appProperties.version)
            notesOnDrive.set(
                noteId, 
                driveNoteVersion
            )

            // retrieve the note and check that it exists
            const note = newDashboard.notes.get(noteId)
            if(!note || driveNoteVersion>note.version){
            
                // if not retrieve its media and download it
                getNote(
                    newDashboard, 
                    notesOnDrive, 
                    metaResp, 
                    i,  
                    setNotesUpdating, 
                    packDashboard,
                    finishedProcesses
                )
                setNotesUpdating((prev) => prev+1)
            }

            // if conditions not met, end the process 
            else{
                finishedProcesses.count +=1
            }
        }

        else{
            finishedProcesses.count +=1
        }
    }

    // if there are other pages, try with the next one
    if(metaResp.result.nextPageToken){
        getNotesPage(
            newDashboard, 
            notesOnDrive, 
            setNotesUpdating, 
            packDashboard, 
            metaResp.result.nextPageToken
        )
    }

    // otherwise update the notes on drive because they might be outdated
    else if(finishedProcesses.count === metaResp.result.files.length){
        callSetConfig(
            notesOnDrive, 
            newDashboard, 
            packDashboard, 
            setNotesUpdating
        )
    }
}

// Function to get the metas of a whole drive page
export function getNotesPage(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    packDashboard, 
    targetPageToken, 
    counter
){

    if(!counter){counter=0}
    // list all files that are in that folder
    window.gapi.client.drive.files.list({
        fields: 'nextPageToken, files(description, id, name, appProperties)',
        q:"mimeType='application/json' and trashed=false and '" + 
        shareDriveFolderId + "' in parents",
        pageToken: targetPageToken

    }).then((metaResp) => {

        setNotesPageFromResp(
            newDashboard, 
            notesOnDrive, 
            metaResp, 
            setNotesUpdating, 
            packDashboard
        )
        
    }).catch((error) => errorCatcher(
        error, 
        counter, 
        getNotesPage, 
        newDashboard, 
        notesOnDrive, 
        setNotesUpdating,
        packDashboard,
        targetPageToken
    ))
}

// Function that starts the recursion, try to restore notes from drive
// if not, update the notes on drive if needed
export function getAllNotes(
    newDashboard, 
    setNotesUpdating, 
    packDashboard, 
    counter
){

    // notesOnDrive keeps track of the backup/restoring process
    if(!counter){counter=0}
    const notesOnDrive = new Map()
    notesOnDrive.configFound = false

    getNotesPage(
        newDashboard, 
        notesOnDrive,  
        setNotesUpdating, 
        packDashboard
    )
}

// Sets a config file from the .config on drive
export function setConfigFromDrive(newDashboard, config){

    newDashboard.notesEverDeleted = {...newDashboard.notesEverDeleted, ...config.notesEverDeleted}

    for(const id of newDashboard.notesOrder){
        if(newDashboard.notesEverDeleted[id]){
            // no need to call the note deleter because there will be no dependencies
            // as all the other local notes have already been updated
            newDashboard.notes.delete(id)
            db.notes.delete(id)
        }
    }
    // remove from notes orders as well
    newDashboard.notesOrder = newDashboard.notesOrder.filter(id => !newDashboard.notesEverDeleted[id])
    config.notesOrder = config.notesOrder.filter(id => !newDashboard.notesEverDeleted[id])

    // ensured that the config file includes all the notes
    const intersection = [...new Set([...newDashboard.notesOrder, ...config.notesOrder])]

    // if the config contains all the updates, just use it as it is
    if(
        intersection.length===config.notesOrder.length && 
        intersection.length > newDashboard.notesOrder.length
    ){
        newDashboard.notesOrder = config.notesOrder
    }

    // if the intersection contains more than either, use it
    else if(
        intersection.length > config.notesOrder.length && 
        intersection.length > newDashboard.notesOrder.length
    ){
        newDashboard.notesOrder = intersection
    }

    // backing up values received from drive
    window.localStorage.setItem('notes-order', JSON.stringify(newDashboard.notesOrder))
    window.localStorage.setItem('notes-ever-deleted', JSON.stringify(newDashboard.notesEverDeleted))

    // make sure you are not removing a note that is employed in the dashboard
    if(newDashboard.notesEverDeleted[newDashboard.selectedNoteId]){
        newDashboard.selectedNoteId = null
    }
    if(newDashboard.notesEverDeleted[newDashboard.openedCollectionId]){
        newDashboard.openedCollectionId = null
    }
    if(newDashboard.notesEverDeleted[newDashboard.openedWorkspaceId]){
        newDashboard.openedWorkspaceId = null
    }
    newDashboard.workspaceIds = newDashboard.workspaceIds.filter(
        (id) => !newDashboard.notesEverDeleted[id]
    )
}

// Update the notes on google drive if they might be outdated
export function updateDriveNotes(
    newDashboard, 
    notesOnDrive, 
    setNotesUpdating, 
    packDashboard
){
    var updatesCounter = 0

    for(const [key, note] of newDashboard.notes){

        const sampleVersion = notesOnDrive.get(key)

        // for each of the notes that need to be updated, send a request
        if(!sampleVersion || sampleVersion<note.version){
            updatesCounter+=1
            sendUpdateRequest(key, updatesCounter, setNotesUpdating)
        }
        // remove all the notes that are validated locally, all the remaining one will be deleted
        if(sampleVersion){
            notesOnDrive.delete(key)
        }
    }

    // remove the notes that remained
    for(const [removedNoteId,] of notesOnDrive){

        updatesCounter+=1
        setTimeout(() => {
            setNotesUpdating((prev) => prev+1)
            removeNoteFile({id: removedNoteId}, setNotesUpdating)
        }, (200 * updatesCounter))
    }

    if(newDashboard.notesOrder.length !== newDashboard.notes.size){
        console.log('orderlost')
        newDashboard.notesOrder = [...newDashboard.notes.keys()]
    }

    // Once finished update the config file on drive
    newDashboard.checkedAgainstDrive = true
    console.log('updatingconfig')
    updateConfigFile(newDashboard)
    console.log(newDashboard)
    packDashboard(newDashboard)
}