import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author Eric Grunblatt
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair } = props;
    const history = useHistory();
    const [open, setOpen] = useState("");
    const { auth } = useContext(AuthContext);

    function handleLoadList(id) {
        // CHANGE THE CURRENT LIST
        store.setCurrentList(id);
    }

    function handleLike() {
        if(idNamePair.likes.includes(auth.user.userName)) {
            let index = idNamePair.likes.indexOf(auth.user.userName);
            idNamePair.likes.splice(index, 1);
        }
        else {
            if(idNamePair.dislikes.includes(auth.user.userName)) {
                let index = idNamePair.likes.indexOf(auth.user.userName);
                idNamePair.dislikes.splice(index, 1);
            }
            idNamePair.likes.push(auth.user.userName);
        }
        store.updateList(idNamePair);
        history.push("/");
    }

    function handleDislike() {
        if(idNamePair.dislikes.includes(auth.user.userName)) {
            let index = idNamePair.dislikes.indexOf(auth.user.userName);
            idNamePair.dislikes.splice(index, 1);
        }
        else {
            if(idNamePair.likes.includes(auth.user.userName)) {
                let index = idNamePair.likes.indexOf(auth.user.userName);
                idNamePair.likes.splice(index, 1);
            }
            idNamePair.dislikes.push(auth.user.userName);
        }
        store.updateList(idNamePair);
        history.push("/");
    }

    function handleGoToUser() {
        store.searchBar = idNamePair.userName;
        store.oneUserButtonActive = true;
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

    let thumbsUp, thumbsDown, views;
    let garbageCan = <Box sx={{ p: '20px' }}></Box>;
    let userName = idNamePair.userName;
    let publishDate = "";
    let publishedColor = '#FFFFF1';
    let dateEditColor = "red";
    let thumbUpColor = "black";
    let thumbDownColor = "black";
    let closeButton = "";
    let textfield = "";
    let commentWidth = '0%';
    let itemWidth = '100%';
    let disableThumbs = false;

    if (!auth.loggedIn) {
        disableThumbs = true;
    }
    else {
        if(idNamePair.likes.includes(auth.user.userName)) {
            thumbUpColor = "white";
        }
        if(idNamePair.dislikes.includes(auth.user.userName)) {
            thumbDownColor = "white";
        }
        if(idNamePair.ownerEmail === auth.user.email && store.homeButtonActive) {
            garbageCan = (
                <Box sx={{ display: 'flex' }}>
                    <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                        onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{ color: 'black', fontSize:'35pt'}} />
                    </Button>
                </Box>
            )
        }
    }

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

    if(idNamePair.published !== '') {
        publishedStatus = "Published: ";
        publishedColor = '#D4D5F5';
        dateEditColor = "black";
        commentWidth = '50%';
        itemWidth = '50%';

        // Shows thumbs up with number of likes
        thumbsUp = (
            <Box sx={{ display: 'flex' }}>
                <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                    onClick={handleLike} aria-label='like' disabled={disableThumbs}>
                    <ThumbUpIcon style={{ color: thumbUpColor, fontSize:'30pt' }}/>
                </Button>
                <Box sx={{ marginTop: '10%', fontSize: '20pt' }}>
                    {idNamePair.likes.length}
                </Box>
                <Box sx={{ p: 1 }}></Box>
            </Box>
        )

        // Shows thumbs down with number of dislikes
        thumbsDown = (
            <Box sx={{ display: 'flex' }}>
                <Button style={{ maxWidth: '50px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
                    onClick={handleDislike} aria-label='dislike' disabled={disableThumbs}>
                    <ThumbDownIcon style={{ color: thumbDownColor, fontSize:'30pt'}} />
                </Button>
                <Box sx={{ marginTop: '10%', fontSize: '20pt' }}>
                    {idNamePair.dislikes.length}
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

        textfield = (
            <Box sx={{ marginBottom: '0%' }}>
                <TextField
                    sx={{ top: '10px', width: '100%', bgcolor:'white' }}
                    style={{ borderRadius: '10px' }}
                    size="small"
                    defaultValue="Add Comment"
                    onFocus={(event) => {
                        event.target.select()
                    }}
                    onKeyPress={(event) => {
                        handleKeyPress(event)
                    }}
                >
                </TextField>              
            </Box>  
        )
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            let userName = auth.user.userName;
            let text = event.target.value;
            let comment = {userName, text};
            idNamePair.comments.push(comment);
            store.updateList(idNamePair);
            setOpen(
                <Box>
                    <Box sx={{ p: 1 }}></Box> 
                        <Box style={{ display: 'flex' }}>
                            <Box sx={{ width: itemWidth }} 
                                style={{ color: '#D4AF3B', borderRadius: '10px', display: 'flex', backgroundColor: '#2C3271'}}>
                            <Box>
                                <Box style={{ marginTop: 8, marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>1. {idNamePair.items[0]}</Box>
                                <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>2. {idNamePair.items[1]}</Box>
                                <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>3. {idNamePair.items[2]}</Box>
                                <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>4. {idNamePair.items[3]}</Box>
                                <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>5. {idNamePair.items[4]}</Box>
                            </Box> 
                        </Box>
                        <Box sx={{ p: 0.5 }}></Box>  
                        <Box style={{ width: commentWidth }} sx={{ height: '250px' }}>
                            <Box sx={{ overflow: 'auto', height: '80%' }}>
                                <List sx={{ padding: 0 }}>
                                {
                                    idNamePair.comments.map(comment => (
                                        <Box sx={{ flexDirection: 'column', display: 'flex', border: 1, marginBottom: 1 }}
                                            key={comment._id}
                                            style={{ borderColor: 'black', color: 'blue', width: '94%', borderRadius: '10px', backgroundColor: '#D4AF3B'}} 
                                        >
                                            <Box style={{ marginLeft: 10, marginRight: 10, display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                                                <Link onClick={() => {handleGoToUser(userName)}} style={{ color: 'blue' }} to='/'>{comment.userName}</Link>
                                            </Box> 
                                            <Box style={{ marginLeft: 10, marginRight: 10, fontWeight: 'normal', fontSize: '15pt', color: 'black' }}>
                                                {comment.text}
                                            </Box>   
                                        </Box>
                                    ))
                                }    
                                </List>
                            </Box>
                            {textfield}
                        </Box>
                    </Box>
                </Box>      
            )
            history.push("/");
        }
    }

    function handleCloseList() {
        setOpen("");
    }

    function handleOpenList() {
        //Handles the list when user presses open
        setOpen(
            <Box>
                <Box sx={{ p: 1 }}></Box> 
                    <Box style={{ display: 'flex' }}>
                        <Box sx={{ width: itemWidth }} 
                            style={{ color: '#D4AF3B', borderRadius: '10px', display: 'flex', backgroundColor: '#2C3271'}}>
                        <Box>
                            <Box style={{ marginTop: 8, marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>1. {idNamePair.items[0]}</Box>
                            <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>2. {idNamePair.items[1]}</Box>
                            <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>3. {idNamePair.items[2]}</Box>
                            <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>4. {idNamePair.items[3]}</Box>
                            <Box style={{ marginBottom: 8, marginLeft: 8, fontSize: '25pt' }}>5. {idNamePair.items[4]}</Box>
                        </Box> 
                    </Box>
                    <Box sx={{ p: 0.5 }}></Box>  
                    <Box style={{ width: commentWidth }} sx={{ height: '250px' }}>
                        <Box sx={{ overflow: 'auto', height: '80%' }}>
                            <List sx={{ padding: 0 }}>
                            {
                                idNamePair.comments.map(comment => (
                                    <Box sx={{ flexDirection: 'column', display: 'flex', border: 1, marginBottom: 1 }}
                                        key={comment._id}
                                        style={{ borderColor: 'black', color: 'blue', width: '94%', borderRadius: '10px', backgroundColor: '#D4AF3B'}} 
                                    >
                                        <Box style={{ marginLeft: 10, marginRight: 10, display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                                            <Link onClick={() => {handleGoToUser()}} style={{ color: 'blue' }} to='/'>{userName}</Link>
                                        </Box> 
                                        <Box style={{ marginLeft: 10, marginRight: 10, fontWeight: 'normal', fontSize: '15pt', color: 'black' }}>
                                            {comment.text}
                                        </Box>   
                                    </Box>
                                ))
                            }    
                            </List>
                        </Box>
                        {textfield}
                    </Box>
                </Box>
            </Box>    
        );   
        if(idNamePair.published !== '') {
            idNamePair.views = idNamePair.views + 1;
        }
        store.updateList(idNamePair);
        history.push("/");
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
                        {garbageCan}
                    </Box>
                </Box>
                <Box style={{ display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                    By:  
                    <Box sx={{ p: 1 }}></Box>      
                    <Box style={{ display: 'flex', fontWeight: 'bold', fontSize:'12pt' }}>
                        <Link onClick={() => {
                            handleGoToUser()}}
                            style={{ color: 'blue' }} to='/'>{userName}</Link>
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