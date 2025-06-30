import { createSlice } from "@reduxjs/toolkit";

const LoaderSlice = createSlice({
    name: 'LoaderSlice',
    initialState:{ isLoading:false,  },
    reducers: {
        isloading:(state,action)=>{
            state.isLoading = action.payload
        }
    }
})

export default LoaderSlice.reducer
export const {isloading} = LoaderSlice.actions