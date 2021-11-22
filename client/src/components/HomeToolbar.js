import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import WorkspaceScreen from './WorkspaceScreen'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom'

const HomeToolbar = () => {
    const history = useHistory();

    function handleHome() {
        disableHome = false;
        history.push("/");
    }

    function handleAllUsers() {
        disableAllUsers = false;
    }

    function handleUser() {
        disableUser = false;
    }
    function handleCommunity() {
        disableCommunity = false;
    }

    let disableHome = false;
    let disableAllUsers = false;
    let disableUser = false;
    let disableCommunity = false;

    return (
        <div>
            <div id="list-selector-heading">
                <IconButton 
                    disabled={disableHome}
                    aria-label="home"
                    id="home-button"
                    onClick={handleHome}
                >
                    <HomeIcon />
                </IconButton>
                <IconButton 
                    disabled={disableAllUsers}
                    aria-label="allusers"
                    id="all-users-button"
                    onClick={handleAllUsers}
                >
                    <GroupIcon />
                </IconButton>
                <IconButton 
                    disabled={disableUser}
                    aria-label="user"
                    id="user-button"
                    onClick={handleUser}
                >
                    <PersonIcon />
                </IconButton>
                <IconButton 
                    disabled={disableCommunity}
                    aria-label="community"
                    id="community-button"
                    onClick={handleCommunity}
                >
                    <GroupIcon />
                </IconButton>
                <TextField
                    
                    required
                    width="40px"
                    id="search-bar"
                    name="name"
                    autoComplete="Search Bar"
                    className='list-card'
                    defaultValue='Search'
                    inputProps={{style: {fontSize: 24}}}
                    autoFocus
                />
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton>
                    <SortIcon sx={{ fontSize: 40}} />
                </IconButton>
            </div>
        </div>
    )


}

export default HomeToolbar