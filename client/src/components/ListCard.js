import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useHistory } from 'react-router-dom'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair } = props;
    const history = useHistory();
    const [open, setOpen] = useState("");

    function handleLoadList(id) {
        // CHANGE THE CURRENT LIST
        store.setCurrentList(id);
    }

    function handleLike() {
        if(thumbUpColor === "black") {
            thumbUpColor = "white";
        }
        else {
            thumbUpColor = "black";
        }
        idNamePair.likes = idNamePair.likes + 1;
        store.updateList(idNamePair);
        history.push("/");
    }

    function handleDislike() {
        if(thumbDownColor === "white") {
            thumbDownColor = "black";
        }
        else {
            thumbDownColor = "white";
        }
        idNamePair.dislikes = idNamePair.dislikes + 1;
        store.updateList(idNamePair);
        history.push("/");
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let publishedStatus = <div onClick={() => {
        handleLoadList(idNamePair._id)
    }}><Link style={{ color:'red' }}to="/">edit</Link></div>;

    let openButton = "";
    if(!open) {
        openButton = (
            <Box sx={{ translate: -12 }}>
                <Button style={{ maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px' }}
                    onClick={() => {
                        handleOpenList()
                    }}
                     >
                    <KeyboardArrowDownIcon style={{ color: 'black', fontSize:'30pt'}} />
                </Button>
            </Box>
        )
    }
    let closeButton = "";
    if(open) {
        closeButton = (
            <Box sx={{ translate: -12 }}>
                <Button style={{ maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px' }}
                    onClick={() => {
                        handleCloseList()
                    }}
                     >
                    <KeyboardArrowUpIcon style={{ color: 'black', fontSize:'30pt'}} />
                </Button>
            </Box>
        )
    }

    let thumbsUp, thumbsDown, views;
    let userName = idNamePair.userName;
    let publishDate = "";
    let publishedColor = '#FFFFF1';
    let dateEditColor = "red";
    let thumbUpColor = "black";
    let thumbDownColor = "black";

    if(idNamePair.published !== '') {
        publishedStatus = "Published: ";
        publishedColor = '#D4D5F5';
        dateEditColor = "black";

        // Shows thumbs up with number of likes
        thumbsUp = (
            <Box sx={{ display: 'flex' }}>
                <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                    onClick={handleLike} aria-label='like'>
                    <ThumbUpIcon style={{ color: thumbUpColor, fontSize:'30pt' }}/>
                </Button>
                <Box sx={{ fontSize: '25pt' }}>
                    {idNamePair.likes}
                </Box>
                <Box sx={{ p: 1 }}></Box>
            </Box>
        )

        // Shows thumbs down with number of dislikes
        thumbsDown = (
            <Box sx={{ display: 'flex' }}>
                <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                    onClick={handleDislike} aria-label='dislike'>
                    <ThumbDownIcon style={{ color: thumbDownColor, fontSize:'30pt'}} />
                </Button>
                <Box sx={{ fontSize: '25pt' }}>
                    {idNamePair.dislikes}
                </Box>
                <Box sx={{ p: 1 }}></Box>
            </Box>
        )

        // Shows publish date
        publishDate = (      
            <Box style={{ display: 'flex', color: 'green', fontWeight: 'bold', fontSize:'13pt' }}>
                {idNamePair.published}
            </Box>
        )

        // Displays views
        views = (
            <Box sx={{ translate: -120, display: 'flex', fontSize: '13pt'}}>
                <Box>
                    Views:
                </Box>
                <Box sx={{ p: 1 }}></Box>
                <Box sx={{ flexGrow: 1 }}
                    style={{ color: '#B2323C' }}>
                    {idNamePair.views}
                </Box> 
            </Box>
        )
    }

    function handleCloseList() {
        setOpen("");
    }

    function handleOpenList() {
        //Handles the list when user presses open
        setOpen(
            <div>
                <Box sx={{ p: 1 }}></Box> 
                <Box style={{ display: 'flex', height: '200px' }}>
                    <Box sx={{ width: '50%' }} 
                        style={{ color: '#D4AF3B', borderRadius: '10px', width: '100%', display: 'flex', height: '200px', backgroundColor: '#2C3271'}}>
                        1. 
                    </Box>
                    <Box sx={{ p: 0.5 }}></Box>  
                    <Box style={{ borderRadius: '10px', backgroundColor: '#D4AF3B' }}>
                        Comments
                    </Box>
                </Box>
            </div>
            
        )
        if(idNamePair.published !== '') {
            idNamePair.views = idNamePair.views + 1;
            store.updateList(idNamePair);
            history.push("/");
        }
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
            <Box sx={{ width: '40%', p: 1, flexGrow: 1 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        {idNamePair.name}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        {thumbsUp}
                        {thumbsDown}
                        <Box sx={{ display: 'flex' }}>
                            <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                                onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                                <DeleteIcon style={{ color: 'black', fontSize:'35pt'}} />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                    By:  
                    <Box sx={{ p: 1 }}></Box>      
                    <Box style={{ display: 'flex', color: 'blue', fontWeight: 'bold', fontSize:'12pt' }}>
                        {userName}
                    </Box> 
                </Box>
                {open}
                <Box style={{ display: 'flex', color: dateEditColor, fontWeight: 'bold', fontSize:'13pt' }}
                    sx={{ marginTop: 1, flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            {publishedStatus}
                            <Box sx={{ p: 1 }}></Box>
                            <Box sx={{ display: 'flex' }}>
                                {publishDate}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {views}
                        <Box sx={{ p: 1 }}></Box>
                        {openButton}
                        {closeButton}
                    </Box>
                </Box>
            </Box>
        </ListItem>


    return (
        cardElement
    );
}

export default ListCard;