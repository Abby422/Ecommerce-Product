import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartReducer';
import detailsReducers from './slices/detailsReducers';
import productReducers from './slices/productReducers'
import userReducer from './slices/userReducer';

const store = configureStore({
    reducer: {
        products: productReducers,
        product: detailsReducers,
        user: userReducer,
        cart: cartReducer,
    }
})

export default store;