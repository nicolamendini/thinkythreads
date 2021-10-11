/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
ColorPicker component
Implements the color picker element of the 
rich text editor. Used to select the color 
for the note from a selection of pastel colors
*/

import { GithubPicker } from "react-color"
import { BsDropletHalf } from "react-icons/bs"
import Popup from "reactjs-popup"

// Utils function needed to set the color through a switch
// Takes the chosen color, the current selected note and 
// A function to set the state of the editor
const setColor = (color, selectedNote, setBackColor, setHasChanged, setSearchProps) => {

    // Only used if the picker is in the dashboard
    if(setSearchProps){
        setSearchProps(
            (searchProps) => ({
                searchText: searchProps.searchText, 
                threadFilter: searchProps.threadFilter, 
                collectionFilter: searchProps.collectionFilter,
                colorFilter: color.hex
            })
        )
        return 
    }

    setHasChanged(true)
    selectedNote.colorPreview = color.hex;

    switch(color.hex) {
        case '#b80000':
            selectedNote.color = '#EB9694'
            break;
        case '#db3e00':
            selectedNote.color = '#FAD0C3'
            break;
        case '#fccb00':
            selectedNote.color = '#FEF3BD'
            break;
        case '#008b02':
            selectedNote.color = '#C1E1C5'
            break;
        case '#006b76':
            selectedNote.color = '#BEDADC'
            break;
        case '#1273de':
            selectedNote.color = '#C4DEF6'
            break;
        case '#5300eb':
            selectedNote.color = '#d4c4fb'
            break;
        case '#ededed':
            selectedNote.color = '#ffffff'
            break;
        default:
            break
    }
    setBackColor({color: selectedNote.color, colorPreview: selectedNote.colorPreview})
}

// Color Picker component
// Takes the current selected note and 
//a function to set the color state of the editor
const ColorPicker = ({
    selectedNote,
    setBackColor,
    setHasChanged,
    searchProps,
    setSearchProps
}) => {

    return (
        <Popup
            trigger={
                <div className='tools-btn' style={{color : searchProps ? searchProps.colorFilter : undefined, fontSize: '19px'}}>
                    {searchProps ? '⬤' :
                        <BsDropletHalf
                            size='1.6em'
                        />
                    }
                </div>
            } 
            nested
            modal
            position='right'
        >
            <div className='picker'>
                <GithubPicker 
                    onChange={(color)=> setColor(color, selectedNote, setBackColor, setHasChanged, setSearchProps)}
                    colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#5300EB', '#EDEDED']}
                    triangle='hide'
                />
            </div>
        </Popup>
    )
}
export default ColorPicker