import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        allProducts: (state, {payload}) =>{
            return state = payload
        },

        clearProducts: (state, {payload}) =>{
            return state = []
        },
    }
})

export const {allProducts, clearProducts} = productSlice.actions
export default productSlice.reducer