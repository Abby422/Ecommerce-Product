import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        incart: (state, {payload}) =>{
            return state = payload
        },
        addItem: (state, {payload}) =>{
            let cart = [];
            const product = payload.Product_id
            const cartItem = cart.find(item => item.Product_id === payload.Product_id? true : false)

            return{
                ...state,
                cart : cartItem ?
                cart.map(item => item.Product_id = payload.Product_id ?
                    {...item, Quantity: item.Quantity + 1 }: item)
                    :
                    [...cart, {...product, Quantity: 1}]
            }
        }
    }
})

export const {incart, addItem} = cartSlice.actions
export default cartSlice.reducer