/*
Author: Nicola Mendini
Date: 11/2021
ThinkyThreads Project
ColorPicker component
Implements the color picker element of the 
rich text editor. Used to select the color 
for the note from a selection of pastel colors
*/

import { GithubPicker } from "react-color"
import { BsDropletHalf } from "react-icons/bs"
import Popup from "reactjs-popup"

// Arrays containing the colors allowed for the notes, both for light and dark mode
export const vividCols = ['#b80000', '#db3e00', '#fccb00', '#008b02', '#006b76', '#1273de', '#5300eb', '#ededed']
export const pastelCols = ['#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#d4c4fb', '#ffffff']

// Utils function needed to set the color through a switch
// Takes the chosen color, the current selected note and 
// A function to set the state of the editor
const setColor = (
    color, 
    selectedNote, 
    setBackColor, 
    setHasChanged, 
    setSearchProps,
) => {

    // Only used if the picker is in the dashboard
    // Set the color used as a filter for the notes of the search
    if(setSearchProps){
        setSearchProps(
            (searchProps) => {
                const newSearchProps = {...searchProps}
                newSearchProps.colorFilter = color.hex
                return newSearchProps
            }
        )
        return 
    }

    // if the color was changed, tell the editor
    setHasChanged(true)
    selectedNote.colorPreview = color.hex;

    // switch case defining the corresponding vivid/pastel colors
    switch(color.hex) {
        case vividCols[0]:
            selectedNote.color = pastelCols[0]
            break;
        case vividCols[1]:
            selectedNote.color = pastelCols[1]
            break;
        case vividCols[2]:
            selectedNote.color = pastelCols[2]
            break;
        case vividCols[3]:
            selectedNote.color = pastelCols[3]
            break;
        case vividCols[4]:
            selectedNote.color = pastelCols[4]
            break;
        case vividCols[5]:
            selectedNote.color = pastelCols[5]
            break;
        case vividCols[6]:
            selectedNote.color = pastelCols[6]
            break;
        case vividCols[7]:
            selectedNote.color = pastelCols[7]
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
    setSearchProps,
    searchCleanerCheck
}) => {

    return (
        <Popup
            trigger={
                <div 
                className='tools-btn' 
                style={{color : searchProps ? searchProps.colorFilter : undefined, fontSize: '19px'}
                }>
                    {searchProps ? '⬤' :
                        <BsDropletHalf
                            size='1.4em'
                        />
                    }
                </div>
            } 
            nested
            modal
        >
            <div className='picker'>
                <GithubPicker 
                    onChange={(color)=> 
                        setColor(
                            color, 
                            selectedNote, 
                            setBackColor, 
                            setHasChanged, 
                            setSearchProps, 
                            searchCleanerCheck
                        )
                    }
                    colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#5300EB', '#EDEDED']}
                    triangle='hide'
                />
            </div>
        </Popup>
    )
}
export default ColorPicker