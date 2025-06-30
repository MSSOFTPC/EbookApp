import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "Auth",
    initialState:{
        isAuth: false,
        user: null,
        searches:[],         // Active Business Only
        settings:{}  ,       // Active User Permissions Only (Only for Staff)
        bookmarks:[]  ,       // Active User Permissions Only (Only for Staff)
        continueReading:[] ,        // lastUpdatedTimeStamp used for get update
        bookAdvancedSettings:{} ,       // yaha book ki settings save hongi continue reading wagerah
        offline:[]        // offline 
    },
    reducers:{
        login:(state,action)=>{
            state.user = action?.payload
            state.isAuth = true;
        },
        logout:(state)=>{
            state.user = null;
            state.searches = [];
            state.settings = {};
            state.bookmarks = []  ;
            state.continueReading = [];
            state.isAuth = false;
            state.bookAdvancedSettings = {}
            state.offline = []
        },
        reset:(state)=>{
            state.user = null;
            state.searches = [];
            state.settings = {};
            state.isAuth = false;
        },
        manageSearches:(state,action)=>{
            state.searches = action?.payload
        },
        manageSettings:(state,action)=>{
            state.settings = action?.payload
        },
        updateContinueReading:(state,action)=>{
            state.continueReading = action?.payload
        },
        manageOffline:(state,action)=>{
           const data = action?.payload;
            const index = state.offline?.findIndex(i => i._id === data?._id);

            if (index !== -1) {
                // Update existing item
                state.offline[index] = { ...state.offline[index], ...data };
            } else {
                // Add new item
                state.offline.push(data);
            }
        },
        removeOffline: (state, action) => {
            const id = action.payload;
            state.offline = state.offline.filter(i => i._id !== id);
        },
        manageAdvancedSettings: (state, action) => {
            const { bookId, settings } = action.payload;
            if (!state.bookAdvancedSettings?.[bookId]) {
                state.bookAdvancedSettings[bookId] = settings;
            } else {
                state.bookAdvancedSettings[bookId] = {
                ...state.bookAdvancedSettings[bookId],
                ...settings,
                };
            }
            },
        updateBookmarks:(state,action)=>{
            const item = action.payload;
            const exists = state.bookmarks.find(b => b._id === item._id);

            if (exists) {
                // Remove if exists
                state.bookmarks = state.bookmarks.filter(b => b._id !== item._id);
            } else {
                // Add if not exists
                state.bookmarks.push(item);
            }
        }
    },
})

export default AuthSlice.reducer
export const {login,logout,reset,manageSearches,manageOffline,manageAdvancedSettings,manageSettings,updateContinueReading,updateBookmarks} = AuthSlice.actions