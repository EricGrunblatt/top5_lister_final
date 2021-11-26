import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from "@mui/system";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    
    function handleFocus(event) {
        event.target.select();
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
                    width: '95%',
                    borderRadius: '20px'
                    
                }}
            >
                <TextField
                    sx={{ width: '100%' }}
                    defaultValue={props.text}
                    onFocus={handleFocus}
                    autofocus
                    >
                </TextField>
            </ListItem>
    )
}

export default Top5Item;