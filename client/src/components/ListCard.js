import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
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
    const { idNamePair, user } = props;

    function handleLoadList(id) {
        if (!cardStatus) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleLike() {
        if(thumbUpColor === "black") {
            thumbUpColor = "white";
        }
        else {
            thumbUpColor = "black";
        }
    }

    function handleDislike() {
        if(thumbDownColor === "white") {
            thumbDownColor = "black";
        }
        else {
            thumbDownColor = "white";
        }
    }

    function handleViews(idNamePair) {
        idNamePair.views = idNamePair.views + 1;
        store.updateList(idNamePair);
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

    let publishedStatus = <div onClick={() => {
        handleLoadList(idNamePair._id)
    }}><Link style={{ color:'red' }}to="/">edit</Link></div>;

    let thumbsUp, thumbsDown, views;
    let userName = idNamePair.userName;
    let publishedColor = '#FFFFF1';
    let dateEditColor = "red";
    let thumbUpColor = "black";
    let thumbDownColor = "black";

    if(idNamePair.published !== '') {
        publishedStatus = "Published: " + idNamePair.published;
        publishedColor = '#D4D5F5';
        dateEditColor = "black";
        views = idNamePair.views;
        thumbsUp = (
            <Box sx={{ p: 1 }}>
                <IconButton 
                    disabled={cardStatus}
                    onClick={handleLike} aria-label='like'>
                    <ThumbUpIcon style={{ color: thumbUpColor, fontSize:'30pt' }} />
                </IconButton>
                <Box sx={{ p: 1 }}></Box>
                <Box sx={{ fontSize: '15px'}}>
                    Views: {views}
                </Box>
            </Box>
        )
        thumbsDown = (
            <Box sx={{ p: 1 }}>
                <IconButton 
                    disabled={cardStatus}
                    onClick={handleDislike} aria-label='dislike'>
                    <ThumbDownIcon style={{ color: thumbDownColor, fontSize:'30pt'}} />
                </IconButton>
                <Box sx={{ p: 2 }}></Box>
            </Box>
        )
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                border: '1px solid',
                borderColor: 'black',
                borderRadius: '10px',
                background: publishedColor,
                fontSize: '20pt',
                fontWeight: 'bold',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box  width='5%' style={{ display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                        By:  
                        <Box sx={{ p: 1 }}></Box>      
                        <Box style={{ display: 'flex', color: 'blue', fontWeight: 'bold', fontSize:'12pt' }}>
                            {userName}
                        </Box> 
                    </Box>
                    <Box style={{ color: dateEditColor, fontWeight: 'bold', fontSize:'13pt' }}>
                        {publishedStatus}
                    </Box>
                </Box>
                {thumbsUp}
                {thumbsDown}
                <div>
                    <Box>
                        <IconButton 
                            disabled={cardStatus}
                            onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                            <DeleteIcon style={{ color: 'black', fontSize:'30pt'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ transform: 'rotate(90deg)' }}>
                        <IconButton
                            onClick={() => {
                                handleViews(idNamePair)
                            }}>
                            <DoubleArrowIcon style={{ color: 'black', fontSize:'20pt'}} />
                        </IconButton>
                    </Box>
                </div>
        </ListItem>


    return (
        cardElement
    );
}

export default ListCard;