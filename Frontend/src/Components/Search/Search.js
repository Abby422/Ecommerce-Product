import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import './Search.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { allProducts } from '../../redux/slices/productReducers'
import Product from '../Product/Product'


function Search() {
    const params = useParams()
    const searchData = params
    const search = searchData.search
    const dispatch = useDispatch()
    const shopProducts = useSelector(state => state.products)
    console.log(search)
    useEffect(() =>{
        axios.get(`http://localhost:5000/search/?query=${search}`).then(res => dispatch(allProducts(res.data.Data)))
    }, [search])

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

export default Search