import { SLICESIZE, SHAREDMEX } from "./Dashboard"
import { pastelCols, vividCols } from "./ColorPicker"
import { manageWrapper, workspaceAdder, workspaceRemover } from "../helpers/NotesManupulation"

const Mousetrap = require('mousetrap')

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
    const selectInDir = (dir) => {
        const selectedNoteIdx = dashboard.search.findIndex(note => note.id===dashboard.selectedNoteId)
        if(selectedNoteIdx!==-1){
            if(
                dir==='left' && 
                selectedNoteIdx > SHAREDMEX.currentSearchSlice*SLICESIZE
            ){
                const noteToLeft = dashboard.search[selectedNoteIdx-1]
                selectNote(noteToLeft)
                SHAREDMEX.usingScrollKeys = true
            }
            else if(
                dir==='right' && 
                selectedNoteIdx < dashboard.search.length-1 && 
                selectedNoteIdx < (SHAREDMEX.currentSearchSlice+1)*SLICESIZE+SLICESIZE-1
                ){
                const noteToRight = dashboard.search[selectedNoteIdx+1]
                selectNote(noteToRight)
                SHAREDMEX.usingScrollKeys = true
            }
        }
    }

    const safeDelete = () => {
        if(dashboard.selectedNoteId){
            if(window.confirm('Delete note?')){
                deleteNote(dashboard.selectedNoteId)
            }
        }
    }

    const addNoteOverride = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            // internet explorer
            e.returnValue = false
        }
        addNote()
    }

    const pinNoteWithKey = () => {

        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        if(selectedNote){
            const newDashboard = {...dashboard}
            selectedNote.pinned = !selectedNote.pinned
            packDashboard(newDashboard, true)
            setDelayedNoteUpdate({note: selectedNote, delay: 1500, metaOrMedia: 'meta'})
        }
    }

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

    const spacebarKeyAction = () => {
        const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)
        if(selectedNote){
            const newDashboard = {...dashboard}
            manageWrapper(newDashboard, selectedNote, threadOrCollection, setThreadOrCollection, setNotesUpdating)
            packDashboard(newDashboard)
        }
    }

    const workspaceAddKey = () => {
        const targetId = dashboard.selectedNoteId
        if(dashboard.notes.get(targetId)){
            workspaceAdder(dashboard, threadOrCollection, targetId, packDashboard)
        }
    }

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

    const saveWorkspaceKey = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            // internet explorer
            e.returnValue = false;
        }
        closeAndSave()
    }

    const moveToExtremityWithKey = (endOrBeginning) => {
        moveToTheExtremity(endOrBeginning, true)
        const newDashboard = {...dashboard}
        packDashboard(newDashboard, true)
    }

    const findOccurrencesKey = () => {
        openOccurrences()
        packDashboard({...dashboard}, false, true)
    }

    Mousetrap.bind('shift+left', () => currentPage==='notes' && !mergeMode && moveToExtremityWithKey(false))
    Mousetrap.bind('shift+right', () => currentPage==='notes' && !mergeMode && moveToExtremityWithKey(true))
    Mousetrap.bind('left', () => currentPage==='notes' && !mergeMode && selectInDir('left'))
    Mousetrap.bind('right', () => currentPage==='notes' && !mergeMode && selectInDir('right'))
    Mousetrap.bind('p', () => currentPage==='notes' && pinNoteWithKey())
    Mousetrap.bind('enter', () => currentPage==='notes' && dashboard.selectedNoteId && !mergeMode && openEditor())
    Mousetrap.bind('d', () => currentPage==='notes' && !mergeMode && safeDelete())
    Mousetrap.bind('a', (e) => currentPage==='notes' && !mergeMode && addNoteOverride(e))
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
