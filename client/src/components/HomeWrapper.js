import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    
    if (auth.loggedIn || store.accountGuest)
        return <HomeScreen />
    else
        return <SplashScreen />
}