 import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        users: (state, {payload}) =>{
            return state = payload
        }
    }
})

export const {users} = userSlice.actions
export default userSlice.reducer