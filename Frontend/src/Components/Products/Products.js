import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import axios from 'axios'
import './Products.css'
import { allProducts } from '../../redux/slices/productReducers'
import Product from '../Product/Product'

const ProductUrl = 'http://localhost:5000/allProducts'
function Products() {
    const dispatch = useDispatch()
    const shopProducts = useSelector(state => state.products)

    useEffect(() =>{
        axios.get(ProductUrl).then(res => dispatch(allProducts(res.data.data)))
    }, [])
  return (
    <div className='products_container'>
        <div><h2>SHOP</h2></div>
        <div className='products'>
        {shopProducts?
          shopProducts.map((shopProducts) =>
                (<Product shopProducts={shopProducts}/>)
            )
            :
            <h1>Please Wait :)</h1>
          }
        </div>
    </div>
  )
}

export default Products

