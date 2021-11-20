import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal'
import AuthContext from '../auth'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                store.idNamePairs.filter(idPair => (idPair.ownerEmail === auth.user.email)).map(pair => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    function handleHome() {
        disableHome = false;
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
        <div id="top5-list-selector">
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
            <div id="list-selector-heading">
                <Fab 
                    disabled={disableHome}
                    color="black" 
                    aria-label="home"
                    id="home-button"
                    onClick={handleHome}
                >
                    <HomeIcon font-size="large" />
                </Fab>
                <Fab 
                    disabled={disableAllUsers}
                    color="black" 
                    aria-label="allusers"
                    id="all-users-button"
                    onClick={handleAllUsers}
                >
                    <GroupIcon />
                </Fab>
                <Fab 
                    disabled={disableUser}
                    color="black" 
                    aria-label="user"
                    id="user-button"
                    onClick={handleUser}
                >
                    <PersonIcon />
                </Fab>
                <Fab 
                    disabled={disableCommunity}
                    color="black" 
                    aria-label="community"
                    id="community-button"
                    onClick={handleCommunity}
                >
                    <GroupIcon />
                </Fab>
            </div>
            
        </div>)
}

export default HomeScreen;