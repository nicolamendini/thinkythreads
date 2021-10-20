/*
Author: Nicola Mendini
Date: 13/09/2021
ThinkyThreads Project
SearchBar component
*/

import React, { useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FcSearch } from 'react-icons/fc'
import { BiSearchAlt } from 'react-icons/bi'
import ColorPicker from './ColorPicker'
import { BsPaperclip } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import { scrollTarget } from './NotesList'

const searchCleanerCheck = (newSearchProps, cleanFilters, setCleanFilters) => {
	const newCleanFilters = {...cleanFilters}
	if(
		newSearchProps.threadFilter ||
		newSearchProps.collectionFilter || 
		newSearchProps.imgFilter ||
		newSearchProps.colorFilter!=='#ededed' ||
		newSearchProps.searchText
	){
		newCleanFilters.areFiltersOn = true
	}
	else{
		newCleanFilters.areFiltersOn = false
	}
	setCleanFilters(newCleanFilters)
}

const cleanSearch = (cleanFilters, setCleanFilters, setSearchProps) => {
	const newCleanFilters = {...cleanFilters}
	newCleanFilters.goClean = true
	newCleanFilters.areFiltersOn = false
	const newSearchProps = {
		searchText:'', 
		threadFilter: false, 
		collectionFilter: false,
		colorFilter: '#ededed',
		imgFilter: false
	}
	scrollTarget.beginning = true
	setCleanFilters(newCleanFilters)
	setSearchProps(newSearchProps)
}

const SearchBar = ({ 
	setSearchProps, 
	searchProps ,
	isDropDisabled,
	darkMode,
	cleanFilters,
	setCleanFilters
}) => {	

	useEffect(() => {
		if(cleanFilters.goClean){
			const newCleanFilters = {...cleanFilters}
			newCleanFilters.goClean = false
			setCleanFilters(newCleanFilters)
		}
	// eslint-disable-next-line
	}, [cleanFilters])

	return (

		<Droppable 
			droppableId={'search-bar'}
			isDropDisabled={isDropDisabled}
		>
			{(provided, snapshot) => (
                <div 
                    className={darkMode ? 'search-dark' : 'search-bright'}
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
				>

					{		
					cleanFilters.areSlicesScrolled || cleanFilters.areFiltersOn ?
					
						<VscChromeClose 
						size='1.6em'
						className='tools-btn'
						onClick={() => cleanSearch(cleanFilters, setCleanFilters, setSearchProps)}
						color={darkMode ? '#666666' : '#464646'}
						style={{padding: '3px 2px 3px 3px'}}
						/>

						:

						darkMode ?
							<BiSearchAlt className='search-icons' size='2em' style={{transform: 'scale(0.8)'}}/>
						:
							<FcSearch className='search-icons' size='2em' />
					}
					{provided.placeholder}

					<input
						onChange={(event) => {
							const newSearchProps = {...searchProps}
							newSearchProps.searchText = event.target.value.toLowerCase()
							searchCleanerCheck(newSearchProps, cleanFilters, setCleanFilters)
							setSearchProps(newSearchProps)
						}}
						type='text'
						placeholder={
							snapshot.isDraggingOver ?
								'Work within this collection'
							: 
								'Type to search'
							}
						value={searchProps.searchText}
					/>

					<span 
						className='search-filter tools-btn' 
						style={searchProps.imgFilter ?  {color:'red'} : {}}
						onClick={() => {
							const newSearchProps = {...searchProps}
							newSearchProps.imgFilter = !newSearchProps.imgFilter
							searchCleanerCheck(newSearchProps, cleanFilters, setCleanFilters)
							setSearchProps(newSearchProps)
						}}
					>
						<BsPaperclip 
							size='0.9em' 
							style={{marginTop: '4px', transform: 'rotate(180deg)'}}
						/>
					</span>

					<span 
						className='search-filter tools-btn' 
						style={searchProps.threadFilter ?  {color:'red'} : {}}
						onClick={() => {
							const newSearchProps = {...searchProps}
							newSearchProps.threadFilter = !newSearchProps.threadFilter
							searchCleanerCheck(newSearchProps, cleanFilters, setCleanFilters)
							setSearchProps(newSearchProps)
						}}
					>
						T
					</span>

					<span 
						className='search-filter tools-btn'
						style={searchProps.collectionFilter ? {color:'red'} : {}}
						onClick={() => {
							const newSearchProps = {...searchProps}
							newSearchProps.collectionFilter = !newSearchProps.collectionFilter
							searchCleanerCheck(newSearchProps, cleanFilters, setCleanFilters)
							setSearchProps(newSearchProps)
						}}
					>
						C
					</span>

					<span style={{margin: '0 5px 0 0'}}>
						<ColorPicker 
							setBackColor={{}}
							setHasChanged={{}}
							searchProps={searchProps}
							setSearchProps={setSearchProps}
							searchCleanerCheck={
								(newSearchProps) => 
								searchCleanerCheck(newSearchProps, cleanFilters, setCleanFilters)
							}
						/>
					</span>

				</div>
			)}

		</Droppable>
	);
};

export default SearchBar;
