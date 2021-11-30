import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import HomeToolbar from './HomeToolbar'
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
    if(store.homeButtonActive) {
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
    if (store.allUsersButtonActive) {
        let listArray = store.idNamePairs;
        if(store.searchBar !== null) {
            listArray = listArray.filter(idPair => (idPair.name === store.searchBar));
        }
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                listArray.filter(idPair => (idPair.published !== '' && idPair.userName !== 'Community-Aggregate')).map(pair => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        userName={pair.userName}

                    />
                ))
            }
            </List>;
    }
    if(store.oneUserButtonActive && store.searchBar !== null) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                store.idNamePairs.filter(idPair => (idPair.published !== '' && idPair.userName === store.searchBar)).map(pair => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        userName={pair.userName}
                    />
                ))
            }
            </List>;
    }
    if(store.communityButtonActive) {
        let listArray = store.idNamePairs;
        if(store.searchBar !== null) {
            listArray = listArray.filter(idPair => (idPair.name === store.searchBar));
        }
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                listArray.filter(idPair => (idPair.published !== '' && idPair.userName === "Community-Aggregate")).map(pair => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        userName={pair.userName}
                    />
                ))
            }
            </List>;
    }

    return (
        <div id="top5-list-selector">
            
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
            <HomeToolbar />
        </div>)
}

export default HomeScreen;