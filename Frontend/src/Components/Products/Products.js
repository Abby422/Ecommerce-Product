import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import axios from 'axios'
import './Products.css'
import { allProducts } from '../../redux/slices/productReducers'
import {IoCartOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'


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
        {shopProducts.map(decor =>{
                return (<div key={decor.Product_id} className='products-card'>
                        <div className='product-display'>
                        <img src={decor.Product_image} alt='Product' /> 
                        <h5>{decor.Product_name}</h5>
                        <h6>{decor.Product_price}</h6>
                        </div>
                        <div className='product-action'>
                        <button><IoCartOutline/>Add to cart</button>
                        <Link to={`/${decor.Product_id}`}><button>View More</button></Link>
                        </div>
                    </div>)
            })
          }
        </div>
    </div>
  )
}

export default Products

