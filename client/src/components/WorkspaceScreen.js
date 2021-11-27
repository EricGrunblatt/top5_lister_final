import { useContext, useState, useEffect } from 'react'
import HomeToolbar from './HomeToolbar.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem';
import { GlobalStoreContext } from '../store/index.js'
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [disablePublish, setDisPublish] = useState(false);

    let listArray = store.idNamePairs.filter(list => (list.ownerEmail === auth.user.email && list.published !== '')).map(list => list.name);
    console.log(listArray);
    useEffect(() => {
        handleAllChanges();
    }, []);

    // Disable publish if list name/items are repeated or if anything is not alphanumeric
    function handleAllChanges() {
        const repeatItem = store.currentList.items.some(
            (item, index) => store.currentList.items.indexOf(item) !== index)
        let listDuplicates = 0;
        for(let i = 0; i < listArray.length; i++) {
            if(listArray[i] === store.currentList.name) {
                listDuplicates++;
            }
        }
        let alphanumeric = true;
        for(let i = 0; i < store.currentList.items.length; i++) {
            if(!store.currentList.items[i].match(/^[a-zA-Z0-9 _-]+$/)) {
                alphanumeric = false;
            }
        }
        if(!store.currentList.name.match(/^[a-zA-Z0-9 _-]+$/)) {
            alphanumeric = false;
        }
        if (repeatItem || listDuplicates >= 1 || !alphanumeric) {
            setDisPublish(true);
        }
        else {
            setDisPublish(false);
        }
    }

    function handleListChange(event) {
        store.currentList.name = event.target.value;
        handleAllChanges();
    }

    function handleItemChange(event, index) {
        store.currentList.items[index] = event.target.value;
        handleAllChanges();
    }

    function handleFocus(event) {
        event.target.select();
    }

    function handleSave() {
        store.updateCurrentList();
        history.push("/");
    }

    function handlePublish() {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let yyyy = today.getFullYear();
        let mm = monthNames[today.getMonth()];
        let publishDate = mm + " " + dd + ", " + yyyy; 
        store.currentList.published = publishDate;
        store.updateCurrentList();

        history.push("/");
    }

    let editItems = "";
    if (store.currentList) {
        editItems = (
            <div id="edit-items" sx={{ width: '100%' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <ListItem
                            id={'item-' + (index+1)}
                            key={"top5-item-" + (index+1)}
                            className="top5-item"
                            sx={{ display: 'flex', p: 1 }}
                            style={{
                                width: '95%',
                                borderRadius: '20px'
                            }}
                        >
                            <TextField
                                sx={{ bgcolor: '#C4A036', width: '100%' }}
                                style={{ borderRadius: '10px' }}
                                defaultValue={item}
                                onFocus={handleFocus}
                                onChange={(event) => {
                                    handleItemChange(event, index)
                                }}
                            >
                            </TextField>
                        </ListItem>
                    ))
                }
            </div>)
    }
    return (
        <div>
            <div id="top5-list-selector">
                <HomeToolbar />
            </div>
            <div id="top5-workspace">
                <div id="list-name-textbox">
                    <TextField 
                        sx={{ width: 400, bgcolor:'white' }}
                        size="small"
                        defaultValue={store.currentList.name}
                        onFocus={handleFocus}
                        onChange={(event) => {
                            handleListChange(event)
                        }}>
                    </TextField>
                </div>
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number">1.</div>
                        <div className="item-number">2.</div>
                        <div className="item-number">3.</div>
                        <div className="item-number">4.</div>
                        <div className="item-number">5.</div> 
                    </div>
                    {editItems}
                </div>
                <div id="workspace-buttons">
                    <Button sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black', bgcolor: 'white' }}
                        onClick={handleSave}>
                        Save
                    </Button>
                    <Box sx={{ p: 1 }}></Box>
                    <Button sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black', bgcolor: 'white' }}
                        disabled={disablePublish}
                        onClick={handlePublish}>
                        Publish
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen;