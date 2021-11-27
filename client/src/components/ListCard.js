import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    const [open, setOpen] = useState(false);

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

    let openList = "";
    let arrowTransform = 'rotate(0deg)';
    let arrowTranslate = 3;
    function handleOpenList() {
        /*arrowTransform = 'rotate(180deg)';
        arrowTranslate = -3;
        openList = (
            <Box className="list-card-items">
                Hello
            </Box>
        )*/
        if(idNamePair.published !== '') {
            idNamePair.views = idNamePair.views + 1;
            store.updateList(idNamePair);
            history.push("/");
        }
    }

    let cardStatus = false;
    if(store.isListNameEditActive) {
        cardStatus = true;
    }

    let publishedStatus = <div onClick={() => {
        handleLoadList(idNamePair._id)
    }}><Link style={{ color:'red' }}to="/">edit</Link></div>;

    let thumbsUp, thumbsDown;
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
        thumbsUp = (
            <Box sx={{ p: 1 }}>
                <IconButton 
                    disabled={cardStatus}
                    onClick={handleLike} aria-label='like'>
                    <ThumbUpIcon style={{ color: thumbUpColor, fontSize:'30pt' }} />
                </IconButton>
                {idNamePair.likes}
                <Box sx={{ p: 1 }}></Box>
                <Box sx={{ fontSize: '15px'}}>
                    Views: {idNamePair.views}
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
                {idNamePair.dislikes}
                <Box sx={{ p: 2 }}></Box>
            </Box>
        )
        publishDate = (      
            <Box style={{ display: 'flex', color: 'green', fontWeight: 'bold', fontSize:'13pt' }}>
                {idNamePair.published}
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
                    <Box  width='5%' 
                        style={{ display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}
                        sx={{ marginTop: 1 }}>
                        By:  
                        <Box sx={{ p: 1 }}></Box>      
                        <Box style={{ display: 'flex', color: 'blue', fontWeight: 'bold', fontSize:'12pt' }}>
                            {userName}
                        </Box> 
                    </Box>
                    {openList}
                    <Box style={{ display: 'flex', color: dateEditColor, fontWeight: 'bold', fontSize:'13pt' }}
                        sx={{ marginTop: 1 }}>
                        {publishedStatus}
                        <Box sx={{ p: 1 }}></Box>
                        {publishDate}
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
                            <DeleteIcon style={{ color: 'black', fontSize:'35pt'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ translate: arrowTranslate, transform: arrowTransform }}>
                        <IconButton
                            onClick={() => {
                                handleOpenList()
                            }}>
                            <KeyboardArrowDownIcon style={{ color: 'black', fontSize:'30pt'}} />
                        </IconButton>
                    </Box>
                </div>
        </ListItem>


    return (
        cardElement
    );
}

export default ListCard;