import { useContext } from 'react';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);

    const handleGuest = () => {
        store.setAccountGuest();
    };

    return (
        <div id="splash-screen">
            Welcome to The<br />
            Top 5 Lister!
            <div id="splash-screen-description">
                The site where you can share your own <br /> 
                Top 5 Lists and view the lists made by <br />
                your friends, and the rest of the <br />
                community!
            </div>
            <div>
                <Button sx={{ marginRight: 4 }} style={{ color: 'black', fontSize: '12pt', fontWeight: 'bold', backgroundColor: 'white' }}>
                    <Link to='/login/'>Login</Link>
                </Button>
                <Button sx={{ marginRight: 4 }} style={{ color: 'black', fontSize: '12pt', fontWeight: 'bold', backgroundColor: 'white' }}>
                    <Link to='/register/'>Create New Account</Link>
                </Button>
                <Button onClick={handleGuest} style={{ color: 'black', fontSize: '12pt', fontWeight: 'bold', backgroundColor: 'white' }}>
                    <Link to='/'>Continue as Guest</Link>
                </Button>
            </div>
            <div id="splash-screen-creator">
                Created by: Eric Grunblatt
            </div>
        </div>
        
    )
}