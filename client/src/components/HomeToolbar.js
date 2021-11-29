import React, { useState, useContext } from 'react'
import api from '../api'
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

    //Sort Menu open
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Sort Menu close
    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    // Sort by date (newest)
    function handleSortNewest() {
        let listArray = store.idNamePairs;
        listArray.sort((a, b) => {
            let dateA = Date.parse(a.published.substring(4,6) + ' ' + a.published.substring(0,3) + ' ' + a.published.substring(8,12));
            let dateB = Date.parse(b.published.substring(4,6) + ' ' + b.published.substring(0,3) + ' ' + b.published.substring(8,12));
            return dateA-dateB});
        listArray.reverse();
        store.idNamePairs = listArray;
        history.push("/");
        handleSortMenuClose();
    }

    // Sort by date (oldest)
    function handleSortOldest() {
        let listArray = store.idNamePairs;
        listArray.sort((a, b) => {
            let dateA = Date.parse(a.published.substring(4,6) + ' ' + a.published.substring(0,3) + ' ' + a.published.substring(8,12));
            let dateB = Date.parse(b.published.substring(4,6) + ' ' + b.published.substring(0,3) + ' ' + b.published.substring(8,12));
            return dateA-dateB});
        store.idNamePairs = listArray;
        history.push("/");
        handleSortMenuClose();
        handleSortMenuClose();
    }

    // Sort by views
    function handleSortViews() {
        let listArray = store.idNamePairs;
        listArray.sort((a, b) => (a.views > b.views ? 1 : -1));
        listArray.reverse();
        store.idNamePairs = listArray;
        history.push("/");
        handleSortMenuClose();
    }

    // Sort by likes
    function handleSortLikes() {
        let listArray = store.idNamePairs;
        listArray.sort((a, b) => (a.likes.length > b.likes.length ? 1: -1));
        listArray.reverse();
        store.idNamePairs = listArray;
        history.push();
        handleSortMenuClose();
    }

    // Sort by dislikes
    function handleSortDislikes() {
        let listArray = store.idNamePairs;
        listArray.sort((a, b) => (a.dislikes.length > b.dislikes.length ? 1: -1));
        listArray.reverse();
        store.idNamePairs = listArray;
        history.push();
        handleSortMenuClose();
    }

    // Sort menu display
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
            <MenuItem onClick={handleSortOldest}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleSortViews}>Views</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes</MenuItem>
        </Menu>
    )

    // Handles all searches
    function handleKeyPress(event) {
        if(event.code === "Enter") {
            if(store.allUsersButtonActive || store.oneUserButtonActive || store.communityButtonActive) {
                if(event.target.value === '') {
                    store.setSearchBar(null);
                }
                else {
                    store.setSearchBar(event.target.value);
                }
                
            }
            // Community aggregate
            if(store.communityButtonActive) {
                let listArray = store.idNamePairs.filter(idPair => (idPair.published !== '' && idPair.userName === "Community-Aggregate"));
                if (listArray.some(list => list.name === event.target.value)) {
                    return;
                }
                listArray = store.idNamePairs.filter((idPair => (idPair.published !== '' && idPair.name === event.target.value))); 
                if(listArray.length === 0) {
                    return;
                }
                let aggregateVotes = [];
                let itemName;
                let votes;
                for(let i = 0; i < listArray.length; i++) {
                    for(let j = 0; j < 5; j++) {
                        let result = aggregateVotes.map(obj => obj.itemName).includes(listArray[i].items[j]);
                        if(!result) {
                            itemName = listArray[i].items[j];
                            votes = 5 - j;
                            let itemVote = {itemName, votes};
                            aggregateVotes.push(itemVote);
                        }
                        else {
                            itemName = listArray[i].items[j];
                            let itemIndex = aggregateVotes.map(obj => obj.itemName).indexOf(itemName);
                            votes = aggregateVotes[itemIndex].votes;
                            aggregateVotes.splice(itemIndex, 1);
                            votes = votes + (5 - j);
                            let newItemVote = {itemName, votes};
                            aggregateVotes.push(newItemVote);
                        }
                    }
                }
                aggregateVotes.sort((a, b) => (a.votes > b.votes ? 1 : -1));
                aggregateVotes.reverse();

                //Get list name
                let listName = event.target.value;

                //Get publish date
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let yyyy = today.getFullYear();
                let mm = monthNames[today.getMonth()];
                let publishDate = mm + " " + dd + ", " + yyyy; 

                //Get items
                let items = [];
                for(let i = 0; i < 5; i++) {
                    items[i] = aggregateVotes[i].itemName + " (Votes: " + aggregateVotes[i].votes + ")"; 
                }
                store.createAggregateList(listName, items, publishDate);
            }
        }
    }

    // User clicks on home button
    function handleHome() {
        disableHome = false;
        store.setHomeButtonActive();
        history.push("/");
    }

    // User clicks on all lists button
    function handleAllUsers() {
        disableAllUsers = false;
        store.setAllUsersButtonActive();
        history.push("/");
    }

    // User clicks on user button
    function handleUser() {
        disableUser = false;
        store.setOneUserButtonActive();
        history.push("/");
    }

    // User clicks on community button
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

    // User not logged in cannot access home menu
    if(!auth.loggedIn) {
        disableHome = true;
    }

    // User cannot be a guest if logged in
    if(auth.loggedIn) {
        store.accountGuest = false;
    }

    // No toolbar button functions when in workspace
    if(store.currentList) {
        disableHome = true;
        disableAllUsers = true;
        disableUser = true;
        disableCommunity = true;
        disableTextField = true;
        disableSortBy = true;
    }

    // Default color is black, if user clicks on button, it becomes white
    let homeButtonColor = "black";
    let allButtonColor = "black";
    let oneButtonColor = "black";
    let communityButtonColor = "black";
    if(store.homeButtonActive) {
        homeButtonColor = "white";
    }
    if(store.allUsersButtonActive) {
        allButtonColor = "white";
    }
    if(store.oneUserButtonActive) {
        oneButtonColor = "white";
    }
    if(store.communityButtonActive) {
        communityButtonColor = "white";
    }

    return (
        <Box>
            <div id="list-selector-heading">
                <IconButton 
                    sx={{ color: homeButtonColor }}
                    disabled={disableHome}
                    aria-label="home"
                    id="home-button"
                    onClick={handleHome}
                >
                    <HomeIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton 
                    sx={{ color: allButtonColor }}
                    disabled={disableAllUsers}
                    aria-label="allusers"
                    id="all-users-button"
                    onClick={handleAllUsers}
                >
                    <GroupIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton 
                    sx={{ color: oneButtonColor }}
                    disabled={disableUser}
                    aria-label="user"
                    id="user-button"
                    onClick={handleUser}
                >
                    <PersonIcon sx={{ fontSize: 40 }}/>
                </IconButton>
                <IconButton
                    sx={{ color: communityButtonColor }} 
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