import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let status;

    let disableAdd = false;

    if (store.currentList) {
        disableAdd = true;
        //status = <Typography variant="h4">{text}</Typography>;
    }
    else if(auth.loggedIn) {
        if(store.homeButtonActive) {
            status = 
                <>
                    <Fab 
                        disabled={disableAdd}
                        style={{ color: 'white', backgroundColor: 'black' }} 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                        <Typography variant="h2">Your Lists</Typography>   
                </>
        }    
    }
    if(store.allUsersButtonActive) {
        status = <Typography variant="h2">All Lists</Typography>
    }
    if(store.oneUserButtonActive) {
        status = <Typography variant="h2">User Lists</Typography>
    }
    if(store.communityButtonActive) {
        status = <Typography variant="h2">Community Lists</Typography>
    }

    function handleCreateNewList() {
        store.createNewList();
    }
        

    return (
        <div id="top5-statusbar">
            {status} 
        </div>
    );
}

export default Statusbar;