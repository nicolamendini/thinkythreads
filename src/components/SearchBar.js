/*
Author: Nicola Mendini
Date: 11/2021
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
import { SHAREDMEX } from './Dashboard'


const SearchBar = ({ 
	setSearchProps, 
	searchProps ,
	isDropDisabled,
	darkMode
}) => {	

	useEffect(() => {
		if(searchProps.goClean && !searchProps.areSlicesScrolled){
			const newSearchProps = {...searchProps}
			newSearchProps.goClean = false
			setSearchProps(newSearchProps)
		}
	// eslint-disable-next-line
	}, [searchProps])

	// function to check whether any search filters are active
	const searchCleanerCheck = () => {
		if(
			searchProps.threadFilter ||
			searchProps.collectionFilter || 
			searchProps.imgFilter ||
			searchProps.colorFilter!=='#ededed' ||
			searchProps.searchText ||
			searchProps.areSlicesScrolled
		){
			return true
		}
		return false
	}

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
					searchCleanerCheck() ?
					
						<VscChromeClose 
							size='1.6em'
							className='tools-btn search-icons'
							onClick={() => setSearchProps({
								searchText:'', 
								threadFilter: false, 
								collectionFilter: false,
								colorFilter: '#ededed',
								imgFilter: false,
								goClean: true,
								areSlicesScrolled: searchProps.areSlicesScrolled
							})}
							color={darkMode ? '#666666' : '#464646'}
							style={{paddingTop: '3px', transform:'scale(0.8)'}}
						/>

						:

						darkMode ?
							<BiSearchAlt className='search-icons' size='2em' />
						:
							<FcSearch className='search-icons' size='2em' />
					}
					{provided.placeholder}

					<input
						onChange={(event) => {
							const newSearchProps = {...searchProps}
							newSearchProps.searchText = event.target.value.toLowerCase()
							setSearchProps(newSearchProps)
							SHAREDMEX['search-area-scroll'] = 0
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
							setSearchProps(newSearchProps)
							SHAREDMEX['search-area-scroll'] = 0
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
							setSearchProps(newSearchProps)
							SHAREDMEX['search-area-scroll'] = 0
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
							setSearchProps(newSearchProps)
							SHAREDMEX['search-area-scroll'] = 0
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
						/>
					</span>

				</div>
			)}

		</Droppable>
	);
};

export default SearchBar;
