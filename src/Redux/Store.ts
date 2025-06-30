import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/Redux/Slice/AuthSlice";
import LoaderSlice from "@/Redux/Slice/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore , persistReducer } from 'redux-persist'


const reducers = combineReducers({
   AuthSlice,
   LoaderSlice,
})

const parsitsConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist:['AuthSlice','CounterSlice']
}

const parsist = persistReducer(parsitsConfig,reducers)

const Store = configureStore({
    reducer:parsist,
    middleware:(getdefaultmiddleware)=>{
        return getdefaultmiddleware({serializableCheck:false})
    }
})



export type RootState = ReturnType<typeof Store.getState>;
export type AuthDispatch = typeof Store.dispatch;

export const persisterStore = persistStore(Store)
export default Store