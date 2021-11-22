import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    let status;

    let disableAdd = false;

    if (store.currentList) {
        disableAdd = true;
        //status = <Typography variant="h4">{text}</Typography>;
    }
    else if(auth.loggedIn) {
        status = 
            <>
                <Fab 
                    disabled={disableAdd}
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>   
            </>
             
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