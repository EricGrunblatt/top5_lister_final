import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import HomeToolbar from './HomeToolbar.js'
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { GlobalStoreContext } from '../store/index.js'
import { useHistory } from 'react-router-dom'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [text, setText] = useState("");

    let currentListName = store.currentList.name;
    let items = store.currentList.items;

    function handleSave() {
        store.currentList.name = currentListName;
        store.currentList.items = items;
        store.updateCurrentList();
        console.log(items.length);
        history.push("/");
    }

    let disablePublish = false;
    const repeatMap = new Set();
    for (let i = 0; i < items.length; i++) {
        if(!repeatMap.has(items[i])) {
            repeatMap.add(items[i]);
        }
        else {
            disablePublish = true;
        }
    }

    function handleListChange(event) {
        currentListName = event.target.value;
    }

    function handleItemChange(event) {
        console.log(event.target.id);
        items[event.target.id] = event.target.value;
    }

    function handleFocus(event) {
        event.target.select();
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
            <div id="edit-items" sx={{ width: '100%', bgcolor: '#C4A036' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                            defaultValue={item}
                        ></Top5Item>
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
                        defaultValue={currentListName}
                        onFocus={handleFocus}
                        onChange={handleListChange}
                        autofocus>
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