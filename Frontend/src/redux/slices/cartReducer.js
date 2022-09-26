import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:  {cart : []},
    reducers: {
        addItem: (state, {payload}) =>{
            state.cart =  [...state.cart, {...payload, quantity: 1 }] 
        },
        incrementQuantity: (state, {payload}) =>{
           const newCart = state.cart.map(item =>{
                if(item.Product_id === payload){
                    item.quantity++
                }
                    return item
           })
            state.cart = newCart
        },
        decrementQuantity: (state, {payload}) =>{
            const newCart = state.cart.map(item => {
                if(item.Product_id === payload){
                    item.quantity--
                }
                 return item
            })
                state.cart = newCart
        },
        removeItem: (state, {payload}) =>{
            const newCart = state.cart.filter(item => item.Product_id !== payload)
            state.cart = newCart
        },
    }

})

export const {addItem, incrementQuantity, decrementQuantity, removeItem} = cartSlice.actions
export default cartSlice.reducer