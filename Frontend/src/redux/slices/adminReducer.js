import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:[],
    loggedIn:false
}

const adminSlice = createSlice({
    name:'adminLoggedIn',
    initialState,

    reducers:{
        admin:(state, action)=>{
            state.admin = action.payload
        },
        loggedIn:(state, action)=>{
            state.loggedIn = action.payload
        }
    }
})

export const { admin, loggedIn} = adminSlice.actions;
export default adminSlice.reducer