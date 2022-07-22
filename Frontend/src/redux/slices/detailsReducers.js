import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        productDetail: (state, {payload}) =>{
            return state = payload
        },

    }
})

export const {productDetail} = detailSlice.actions
export default detailSlice.reducer