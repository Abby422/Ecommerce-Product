import React, { useState } from 'react'
import './Product.css'
import {IoCartOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {useDispatch ,useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartReducer'


function Product({shopProducts}) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [count, setCount] = useState(0)
console.log(cart)
  const cartItem = cart.find(item => item.Product_id === shopProducts.Product_id? true : false)
  const quantity =  ()=>{
    if (cart.length === 0) {
      return 0;
    }else{
      return cart.find(product => product.Product_id === shopProducts.Product_id).Quantity
    }
  }
  console.log(quantity())
  return (
        <div key={shopProducts.Product_id} className='products-card'>
            
                <img src={shopProducts.Product_image} alt='Product' /> 
                <h5>{shopProducts.Product_name}</h5>
                <h6>Price: $ {shopProducts.Product_price}</h6>
            
            <div className='product-action'>
                <Link to={`/${shopProducts.Product_id}`}><button>View More</button></Link>
                
              {cartItem ? (<div><button onClick={() => setCount(count - 1)}>-</button><div>{quantity()}</div><button onClick={() => setCount(count + 1)}>+</button></div>)
              :
              <button onClick={_ => {
                dispatch(addItem(shopProducts))
              }}><IoCartOutline/>Add to cart</button>
              }
            </div>
        </div>
        
    
  )
}

export default Product