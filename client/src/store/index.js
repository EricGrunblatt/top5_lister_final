import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_ITEM_EDIT_INACTIVE: "SET_ITEM_EDIT_INACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    HOME_BUTTON_ACTIVE: "HOME_BUTTON_ACTIVE",
    ALL_USERS_BUTTON_ACTIVE: "ALL_USERS_BUTTON_ACTIVE",
    ONE_USER_BUTTON_ACTIVE: "ONE_USER_BUTTON_ACTIVE",
    COMMUNITY_BUTTON_ACTIVE: "COMMUNITY_BUTTON_ACTIVE",
    STORE_SEARCH_BAR: "STORE_SEARCH_BAR",
    ACCOUNT_GUEST: "ACCOUNT_GUEST",
    SET_TO_FALSE: "SET_TO_FALSE"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listMarkedForDeletion: null,
        homeButtonActive: false,
        allUsersButtonActive: false,
        oneUserButtonActive: false,
        communityButtonActive: false,
        searchBar: null,
        accountGuest: false
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: store.searchBar,
                    accountGuest: store.accountGuest
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: null,
                    accountGuest: false
                });
            }
            // HOME BUTTON ACTIVE
            case GlobalStoreActionType.HOME_BUTTON_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: true,
                    allUsersButtonActive: false,
                    oneUserButtonActive: false,
                    communityButtonActive: false,
                    searchBar: null,
                    accountGuest: false
                });
            }
            // ALL USERS BUTTON ACTIVE
            case GlobalStoreActionType.ALL_USERS_BUTTON_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: false,
                    allUsersButtonActive: true,
                    oneUserButtonActive: false,
                    communityButtonActive: false,
                    searchBar: null,
                    accountGuest: store.accountGuest
                });
            }
            // ONE USER BUTTON ACTIVE
            case GlobalStoreActionType.ONE_USER_BUTTON_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: false,
                    allUsersButtonActive: false,
                    oneUserButtonActive: true,
                    communityButtonActive: false,
                    searchBar: null,
                    accountGuest: store.accountGuest
                });
            }
            // COMMUNITY BUTTON ACTIVE
            case GlobalStoreActionType.COMMUNITY_BUTTON_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: false,
                    allUsersButtonActive: false,
                    oneUserButtonActive: false,
                    communityButtonActive: true,
                    searchBar: null,
                    accountGuest: store.accountGuest
                });
            }
            // COMMUNITY BUTTON ACTIVE
            case GlobalStoreActionType.STORE_SEARCH_BAR: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: store.homeButtonActive,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: payload,
                    accountGuest: store.accountGuest
                });
            }
            // ACCOUNT GUEST ACTIVE
            case GlobalStoreActionType.ACCOUNT_GUEST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    homeButtonActive: false,
                    allUsersButtonActive: store.allUsersButtonActive,
                    oneUserButtonActive: store.oneUserButtonActive,
                    communityButtonActive: store.communityButtonActive,
                    searchBar: store.searchBar,
                    accountGuest: true
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                            store.currentList = top5List;
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            userName: auth.user.userName,
            likes: [],
            dislikes: [],
            comments: [],
            published: "",
            views: 0
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION CREATES A COMMUNITY AGGREGATE LIST
    store.createAggregateList = async function (listName, items, publishDate) {
        let payload = {
            name: listName,
            items: items,
            ownerEmail: "Community-Aggregate",
            userName: "Community-Aggregate",
            likes: [],
            dislikes: [],
            comments: [],
            published: publishDate,
            views: 0
        };
        let response = await api.createTop5List(payload);
        if(response.data.success) {
            async function getNewLists() {
                response = await api.getTop5ListPairs();
                if(response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairsArray
                    });
                }
            }
            getNewLists();
        }
        else {
            console.log("API FAILED TO CREATE AN AGGREGATE LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.updateList = async function (idNamePair) {
        const response = await api.updateTop5ListById(idNamePair._id, idNamePair);
        if(response.data.success) {
            console.log("List updated");
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION DISABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditInactive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_INACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION DISABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditInactive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_INACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES HOME BUTTON 
    store.setHomeButtonActive = function () {
        storeReducer({
            type: GlobalStoreActionType.HOME_BUTTON_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES ALL USERS BUTTON 
    store.setAllUsersButtonActive = function () {
        storeReducer({
            type: GlobalStoreActionType.ALL_USERS_BUTTON_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES ONE USER BUTTON 
    store.setOneUserButtonActive = function () {
        storeReducer({
            type: GlobalStoreActionType.ONE_USER_BUTTON_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES COMMUNITY BUTTON 
    store.setCommunityButtonActive = function () {
        storeReducer({
            type: GlobalStoreActionType.COMMUNITY_BUTTON_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION SETS SEARCH BAR
    store.setSearchBar = function (search) {
        storeReducer({
            type: GlobalStoreActionType.STORE_SEARCH_BAR,
            payload: search
        });
    }

    // THIS FUNCTION SETS ACCOUNT GUEST TO TRUE
    store.setAccountGuest = function () {
        storeReducer({
            type: GlobalStoreActionType.ACCOUNT_GUEST,
            payload: null
        })
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };