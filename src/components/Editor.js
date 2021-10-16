/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
Editor component
Initialises the Quill rich text editor
with its own toolbar and defines the action of the footer bar
*/

import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState, useRef} from "react"
import EditorFooter from "./EditorFooter"
import ImageCompress from 'quill-image-compress';
import ImageResize from '@taoqf/quill-image-resize-module'
import { TEXTLIMIT } from './Dashboard';
import { charLimit } from '../helpers/Messages';

// Register the imageCompressor and resizer
Quill.register("modules/imageCompressor", ImageCompress);
Quill.register('modules/imageResize', ImageResize);

// Define what elements to have in the editor toolbar and in what order
const modules = {
    toolbar: [ 
            //{ 'size': ['small', 'normal', 'large'] },
            { 'header': '1' },
            { 'header': '2' },
            'bold', 
            'italic', 
            'underline',
            'strike',
            { 'color': [] }, 
            { 'background': [] },
            {'list': 'ordered'}, 
            {'list': 'bullet'},
            { 'align': [] }, 
            'image',
            'code-block',
            'formula',
            'blockquote',
            'link'
        ],
    
    // Image compressor props, kicks in automatically if max size is exceeded
    imageCompressor: {
          maxWidth: 800,
          maxHeight: 800,
          imageType: 'image/jpeg',
          debug: false,
    },

    history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
    },

    clipboard: {
        matchVisual: false
    },

    imageResize: {
        parchment: Quill.import('parchment'),
        modules: [ 'Resize', 'DisplaySize' ]
    }
}

// Function needed to solve a bug of Android keyboard with Quill editor
// taken from https://github.com/quilljs/quill/issues/3240#issuecomment-849679016
// Basically, the cursor position was not going newline when pressing enter
// Massive thank you albertaleksieiev!
const googleKeyboardWorkaround = (delta, editor) => {

    // retrieves the editors selection
    var ops = delta['ops']
    var oldSelection = editor.getSelection()
    if(oldSelection){
        var oldPos = oldSelection.index
        var oldSelectionLength = oldSelection.length

        // only applies the workaround if the last operation performed is not one of the following
        if (
        ops[0]["retain"] === undefined || 
        !ops[1] || 
        !ops[1]["insert"] || 
        !ops[1]["insert"] || 
        ops[1]["insert"] !== "\n" || 
        oldSelectionLength > 0
        ) {
            return
        }

        // applies the workaround if a space has been pressed and the cursor has not 
        // moved within 30 milliseconds
        setTimeout(function () {
            var newPos = editor.getSelection().index
            if (newPos === oldPos) {
            console.log("Change selection bad pos")
            editor.setSelection(editor.getSelection().index + 1, 0)
            }
        }, 30);
    }
}

// Function that updates the editor state
// takes the new value of the editor (the html of the text)
// the delta, which is a more comprehensive state of the editor which
// includes the operations performed, the editorRef that is used to 
// access the getSelection method and the setEditorState function that updates the 
// local state variable of this component
const handleChange = (value, delta, editorRef, setEditorState) => {

    // if the editor has finished initialising
    if(editorRef.current){

        // apply the workaround
        const quill = editorRef.current.editor
        googleKeyboardWorkaround(delta, quill);

        // if the length of the note exceeds the maximum limit
        // don't save any further text and send an alert
        if(value.length < TEXTLIMIT){
            setEditorState(value)
        }
        else{
            alert(charLimit)
        }
    } 
}

// NoteEditor component definition
// takes a function setCurrentPage that allows it to go back to the notes
// pace once editing is done, the selectedNote to edit, an updateNote function
// to actualise the update, a deleteNote function to delete the note if the 
// note is empty, the darkMode flad and the export thread function
const NoteEditor = ({ 
    setCurrentPage, 
    dashboard, 
    updateNote, 
    deleteNote, 
    darkMode,
    exportThread,
    threadCollectionSwap,
    moveToTheEnd

}) => {

    const selectedNote = dashboard.notes.get(dashboard.selectedNoteId)

    // State of the editor, contains the html of the text that is being inserted by the user
    const [editorState, setEditorState] = useState(selectedNote.text ? selectedNote.text : '');
    // State that stores the background color of a note
    const [backColor, setBackColor] = useState({color: selectedNote.color, colorPreview: selectedNote.colorPreview})
    // Reference to the Quill object so that it is possible to access its methods
    const editorRef = useRef(null);

    return (
            <div 
                className='container'
                style={ darkMode ?
                {backgroundColor: '#171717', color: 'white'} 
                :                
                {backgroundColor: backColor.color}
                }
            >            
            <div
                className='color-flag'
                style={ darkMode ? (backColor.color!=='#ffffff' ? 
                    {backgroundImage: 'linear-gradient(20deg, #171717 90%, ' + backColor.colorPreview + ' 90%)', color: 'white'} 
                    : {backgroundColor: '#171717', color: 'white'}) :
                    {backgroundColor: backColor.color}
                }
            ></div>
                <div className="editor no-scrollbar" id="editor">
                    <ReactQuill 
                        style={{zoom: 1.4}}
                        theme="snow"
                        value={editorState}
                        onChange={(value, delta) => handleChange(value, delta, editorRef, setEditorState)}
                        modules={modules}
                        placeholder={'Write your next idea here...'}
                        ref={editorRef}
                        scrollingContainer={'#editor'}
                    />
                </div>

                <EditorFooter 
                    setCurrentPage={setCurrentPage} 
                    selectedNote={selectedNote}
                    updateNote={updateNote}
                    editorState={editorState}
                    deleteNote={deleteNote}
                    darkMode={darkMode}
                    exportThread={exportThread}
                    setBackColor={setBackColor}
                    threadCollectionSwap={threadCollectionSwap}
                    moveToTheEnd={moveToTheEnd}
                    />
            </div>
        );
      }

export default NoteEditor;