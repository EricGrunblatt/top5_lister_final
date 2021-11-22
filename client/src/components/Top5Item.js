import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    
    function handleItemFocus(event) {
        event.target.select();
    }

    function handleToggleItemEdit(event) {
        if(!editActive) {
            event.stopPropagation();
            toggleItemEdit();
        }
    }

    function toggleItemEdit() {
        let newActive = !editActive;
        if(newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            if(event.target.value === "" || event.target.value === " ") {
                store.updateItem(index, "?");
            }
            else if(props.text !== event.target.value) {
                store.updateItem(index, event.target.value);
            }
            store.setIsItemEditInactive();
            toggleItemEdit();
        }
    }

    let { index } = props;
    let itemClass = "top5-item";


    if(editActive) {
        return (
            <TextField
                margin="auto"
                required
                fullWidth
                id={"item-" + (index+1)}
                label={"Item " + (index+1) + " Name"}
                name="name"
                autoComplete={"Item " + (index+1) + " Name"}
                className={itemClass}
                onFocus={handleItemFocus}
                onKeyPress={handleKeyPress}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
        );
    }
    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.index}
                className={itemClass}
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton aria-label='edit' 
                    onClick={(event) => {
                        handleToggleItemEdit(event)
                    }}
                >
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1 }}>{props.text}</Box>
            </ListItem>
    )
}

export default Top5Item;