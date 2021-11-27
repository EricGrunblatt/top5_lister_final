import React, { useState, useContext } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

const HomeToolbar = () => {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };


    function handleSortNewest() {
        handleSortMenuClose();
    }

    function handleSortOldest() {
        handleSortMenuClose();
    }

    function handleSortViews() {
        handleSortMenuClose();
    }

    function handleSortLikes() {
        handleSortMenuClose();
    }

    function handleSortDislikes() {
        handleSortMenuClose();
    }

    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="sort-by-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleSortMenuClose}
        >
            <MenuItem onClick={handleSortNewest}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortOldest}>Publish Data (Oldest)</MenuItem>
            <MenuItem onClick={handleSortViews}>Views</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes</MenuItem>
        </Menu>
    )

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            store.setSearchBar(event.target.value);
            console.log(event.target.value);
        }
    }

    function handleHome() {
        disableHome = false;
        store.setHomeButtonActive();
        history.push("/");
    }

    function handleAllUsers() {
        disableAllUsers = false;
        store.setAllUsersButtonActive();
        history.push("/");
    }

    function handleUser() {
        disableUser = false;
        store.setOneUserButtonActive();
        history.push("/");
    }
    function handleCommunity() {
        disableCommunity = false;
        store.setCommunityButtonActive();
        history.push("/");
    }

    let disableHome = false;
    let disableAllUsers = false;
    let disableUser = false;
    let disableCommunity = false;
    let disableTextField = false;
    let disableSortBy = false;

    if(!auth.loggedIn) {
        disableHome = true;
    }
    if(auth.loggedIn) {
        store.accountGuest = false;
    }

    if(store.currentList) {
        disableHome = true;
        disableAllUsers = true;
        disableUser = true;
        disableCommunity = true;
        disableTextField = true;
        disableSortBy = true;
    }

    return (
        <Box>
            <div id="list-selector-heading">
                <IconButton 
                    sx={{ color: 'black' }}
                    disabled={disableHome}
                    aria-label="home"
                    id="home-button"
                    onClick={handleHome}
                >
                    <HomeIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton 
                    sx={{ color: 'black' }}
                    disabled={disableAllUsers}
                    aria-label="allusers"
                    id="all-users-button"
                    onClick={handleAllUsers}
                >
                    <GroupIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton 
                    sx={{ color: 'black' }}
                    disabled={disableUser}
                    aria-label="user"
                    id="user-button"
                    onClick={handleUser}
                >
                    <PersonIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton
                    sx={{ color: 'black' }} 
                    disabled={disableCommunity}
                    aria-label="community"
                    id="community-button"
                    onClick={handleCommunity}
                >
                    <FunctionsIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <TextField
                    disabled={disableTextField}
                    sx={{ bgcolor: 'white', width: 1000 }}
                    id="search-bar"
                    name="name"
                    autoComplete="Search Bar"
                    defaultValue='Search'
                    onKeyPress={(event) => {
                        handleKeyPress(event)
                    }}
                    onFocus={(event) => {
                        event.target.select()
                    }}
                    inputProps={{style: {fontSize: 24}}}>
                </TextField>
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton sx={{ color: 'black', fontSize: '25px', fontWeight: 'bold' }}
                    disabled={disableSortBy}
                    onClick={handleSortMenuOpen}>
                    Sort By
                    <SortIcon sx={{ fontSize: 40 }}
                        edge="end"
                        aria-label="sort by menu"
                        aria-controls="sort-by-menu"
                        aria-haspopup="true"
                        color="inherit"/>
                </IconButton>
            </div>
            <AppBar position="static">
                {menu}
            </AppBar>
        </Box>
    )


}

export default HomeToolbar