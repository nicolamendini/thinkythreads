/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
KeyboardBindings Component
contains all the keyboard bindings that are applied to the dashboard and their relative functions
*/

import { SLICESIZE, SHAREDMEX } from "./Dashboard"
import { pastelCols, vividCols } from "./ColorPicker"
import { workspaceAdder, workspaceRemover, manageWrapper } from "../helpers/DragManager"

const Mousetrap = require('mousetrap')
const controller = Object.create(null)
controller.enabled = true
controller.resetTimer = 0
controller.waitTimer = 250
controller.timer = controller.resetTimer

const KeyboardBindings = ({ 
	dashboard,
    selectNote,
    deleteNote,
    addNote,
    packDashboard,
    setDelayedNoteUpdate,
    setTriggerRerender,
    threadOrCollection,
    setThreadOrCollection,
    setNotesUpdating,
    currentPage,
    openEditor,
    closeAndSave,
    moveToTheExtremity,
    mergeMode,
    openOccurrences

}) => {

    // Function to select a new note and thus allow navigation with the left and right arrows
    const selectInDir = (e, dir) => {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            // internet explorer
            e.returnValue = false;
        }
        if(controller.enabled){
            controller.enabled = false
            controller.timer = controller.resetTimer

            const selectedNoteIdx = dashboard.search.findIndex(note => note.id===dashboard.selectedNoteId)
            if(
                selectedNoteIdx!==-1 && 
                selectedNoteIdx>=(SHAREDMEX.currentSearchSlice)*SLICESIZE &&
                selectedNoteIdx<=(SHAREDMEX.currentSearchSlice+1)*SLICESIZE+SLICESIZE-1
            ){
                if(dir==='left'){
                    if(selectedNoteIdx!==0){
                        const noteToLeft = dashboard.search[selectedNoteIdx-1]
                        setTriggerRerender((prev) => !prev)
                        selectNote(noteToLeft)
                        SHAREDMEX.usingScrollKeys = true
                        if(selectedNoteIdx===SHAREDMEX.currentSearchSlice*SLICESIZE){
                            SHAREDMEX.setSearchSlice = -1
                        }
                    }
                    else{
                        document.getElementById('search-area').scrollLeft=0
                    }
                }
                else if(dir==='right'){
                    if(selectedNoteIdx!==dashboard.search.length-1){
                        const noteToRight = dashboard.search[selectedNoteIdx+1]
                        setTriggerRerender((prev) => !prev)
                        selectNote(noteToRight)
                        SHAREDMEX.usingScrollKeys = true
                        if(selectedNoteIdx===(SHAREDMEX.currentSearchSlice+1)*SLICESIZE+SLICESIZE-1){
                            SHAREDMEX.setSearchSlice = +1
                        }
                    }
                    else{
                        document.getElementById('search-area').scrollLeft=1000000
                    }
                }
            }
            setTimeout(()=>{controller.enabled = true}, controller.timer)
        }
    }

    // Function to delete a note when pressing d
    const safeDelete = () => {
        if(dashboard.selectedNoteId){
            if(window.confirm('Delete the note?')){
                deleteNote(dashboard.selectedNoteId, true)
            }
        }
    }

    // Function to pin or unpin a note when pressing p, uses delayed update for efficiency
    // otherwise it would have to refresh the dashboard immediately at each click which
    // could be problematic if the user clicks very quickly
    const pinNoteWithKey = () => {
        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        if(selectedNote){
            const newDashboard = {...dashboard}
            selectedNote.pinned = !selectedNote.pinned
            packDashboard(newDashboard, true)
            setDelayedNoteUpdate({note: selectedNote, delay: 1500, metaOrMedia: 'meta'})
        }
    }

    // Function to change the color of a note with the number keys 1-8
    const changeColorWithKey = (index) => {
        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        const sameNoteInSearch = dashboard.search.find(note => note.id===dashboard.selectedNoteId)
        const sameNoteInWorkspace = dashboard.workspace.find(note => note.id===dashboard.selectedNoteId)
        if(selectedNote){
            selectedNote.color = pastelCols[index-1]
            selectedNote.colorPreview = vividCols[index-1]
            setDelayedNoteUpdate({note: selectedNote, delay: 1500, metaOrMedia: 'meta'})
        }
        if(sameNoteInSearch){
            sameNoteInSearch.color = pastelCols[index-1]
            sameNoteInSearch.colorPreview = vividCols[index-1]
        }
        if(sameNoteInWorkspace){
            sameNoteInWorkspace.color = pastelCols[index-1]
            sameNoteInWorkspace.colorPreview = vividCols[index-1]
        }
        setTriggerRerender((prev) => !prev)
    }

    // Wrapper functions with spacebar
    const spacebarKeyAction = () => {
        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        if(selectedNote){
            const newDashboard = {...dashboard}
            manageWrapper(newDashboard, selectedNote, threadOrCollection, setThreadOrCollection, setNotesUpdating)
            packDashboard(newDashboard)
        }
    }

    // Function to add the selected note to the workspace
    const workspaceAddKey = () => {
        const targetId = dashboard.selectedNoteId
        if(dashboard.notes.get(targetId)){
            workspaceAdder(dashboard, threadOrCollection, targetId, packDashboard)
        }
    }

    // Remove the selected note from the workspace
    const workspaceRemKey = () => {
        const newDashboard = {...dashboard}
        const selectedNote = newDashboard.notes.get(newDashboard.selectedNoteId)
        if(selectedNote){
            var indexToRem = newDashboard.workspaceIds.findIndex(id => id===selectedNote.id)
            if(indexToRem !== -1){
                workspaceRemover(newDashboard, threadOrCollection, packDashboard, indexToRem)
            }
        }
    }

    // Function to save the workspace with ctrl+s
    const saveWorkspaceKey = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            // internet explorer
            e.returnValue = false;
        }
        closeAndSave()
    }

    // Function to move a note all the way to the end or beginning of the search sequence
    const moveToExtremityWithKey = (endOrBeginning) => {
        moveToTheExtremity(endOrBeginning, true)
        packDashboard({...dashboard}, true)
    }

    // function to find all the occurences of a note
    const findOccurrencesKey = () => {
        openOccurrences()
        packDashboard({...dashboard}, false, true)
    }

    Mousetrap.bind('shift+left', () => currentPage==='notes' && !mergeMode && moveToExtremityWithKey(false))
    Mousetrap.bind('shift+right', () => currentPage==='notes' && !mergeMode && moveToExtremityWithKey(true))
    Mousetrap.bind('left', (e) => currentPage==='notes' && !mergeMode && selectInDir(e,'left'))
    Mousetrap.bind('right', (e) => currentPage==='notes' && !mergeMode && selectInDir(e,'right'))
    Mousetrap.bind('p', () => currentPage==='notes' && pinNoteWithKey())
    Mousetrap.bind('enter', () => currentPage==='notes' && dashboard.selectedNoteId && !mergeMode && openEditor())
    Mousetrap.bind('d', () => currentPage==='notes' && !mergeMode && safeDelete())
    Mousetrap.bind('a', () => currentPage==='notes' && !mergeMode && addNote())
    Mousetrap.bind('down', () => currentPage==='notes' && !mergeMode && workspaceAddKey())
    Mousetrap.bind('up', () => currentPage==='notes' && !mergeMode && workspaceRemKey())
    Mousetrap.bind('1', () => currentPage==='notes' && changeColorWithKey(1))
    Mousetrap.bind('2', () => currentPage==='notes' && changeColorWithKey(2))
    Mousetrap.bind('3', () => currentPage==='notes' && changeColorWithKey(3))
    Mousetrap.bind('4', () => currentPage==='notes' && changeColorWithKey(4))
    Mousetrap.bind('5', () => currentPage==='notes' && changeColorWithKey(5))
    Mousetrap.bind('6', () => currentPage==='notes' && changeColorWithKey(6))
    Mousetrap.bind('7', () => currentPage==='notes' && changeColorWithKey(7))
    Mousetrap.bind('8', () => currentPage==='notes' && changeColorWithKey(8))
    Mousetrap.bind('space', () => currentPage==='notes' && !mergeMode && spacebarKeyAction())
    Mousetrap.unbind(['ctrl+s', 'meta+s'])
    Mousetrap.bind(['ctrl+s', 'meta+s'], (e) => currentPage==='notes' && !mergeMode && saveWorkspaceKey(e))
    Mousetrap.bind(['ctrl+/', 'meta+/'], () => currentPage==='notes' && !mergeMode && findOccurrencesKey())

    return null
}

export default KeyboardBindings
