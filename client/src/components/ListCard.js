import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(id) {
        if (!cardStatus) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleFocus(event) {
        event.target.select();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(event.target.value !== idNamePair.name) {
                let id = event.target.id.substring("list-".length);
                store.changeListName(id, text);
            }
            store.setIsListNameEditInactive();
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let cardStatus = false;
    if(store.isListNameEditActive) {
        cardStatus = true;
    }
    let user = "By: " + auth.user.userName;
    let published = false;
    let publishedStatus = "edit";
    let publishedColor = '#FFFFF1';
    if(published) {
        publishedStatus = "Published: " + published;
        publishedColor = '#D4D5F5';
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={() => {
                handleLoadList(idNamePair._id)
            }
            }
            style={{
                border: '1px solid',
                borderColor: 'black',
                borderRadius: '10px',
                background: publishedColor,
                fontSize: '25pt',
                fontWeight: 'bold',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box style={{ fontWeight: 'normal', fontSize:'12pt' }}>{user}</Box>
                    <Box style={{ color: 'red', fontWeight: 'normal', fontSize:'13pt' }}>{publishedStatus}</Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton 
                        disabled={cardStatus}
                        onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{ fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton 
                        disabled={cardStatus}
                        onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
        </ListItem>





    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                onFocus={handleFocus}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;