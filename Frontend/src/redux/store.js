import { configureStore } from '@reduxjs/toolkit'
import detailsReducers from './slices/detailsReducers';
import productReducers from './slices/productReducers'

const store = configureStore({
    reducer: {
        products: productReducers,
        product: detailsReducers,
    }
})

export default store;