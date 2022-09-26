import React from 'react'
import './Product.css'
import {IoCartOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector  } from 'react-redux'
import { addItem, incrementQuantity, decrementQuantity, removeItem } from '../../redux/slices/cartReducer'


const style = {textDecoration : 'none'}
function Product({shopProducts}) {
  const dispatch = useDispatch()
  const {cart} = useSelector((state) =>(state.cart))
  const cartItem = cart.find(item => item.Product_id === shopProducts.Product_id? true : false)
  const quantity = cart.map((product) => {
    if (product.Product_id === shopProducts.Product_id) {
      return product.quantity;
    } else {
      return "";
    }
  });
  const handleDecrement = () => {
    if (quantity < 2) {
      dispatch(removeItem(shopProducts.Product_id));
    }
    dispatch(decrementQuantity(shopProducts.Product_id));
  };

  const handleIncrement = () => {
    if (quantity < shopProducts.Quantity) {
      dispatch(incrementQuantity(shopProducts.Product_id));
    }
    return quantity;
  };
  return (
        <div key={shopProducts.Product_id} className='products-card'>
            <div>
                <img src={shopProducts.Product_image} alt='Product' /> 
                <h5>{shopProducts.Product_name}</h5>
                <h6>Price: $ {shopProducts.Product_price}</h6>
            </div>
            <div className='product-action'>
              <Link to={`/${shopProducts.Product_id}`} style={style}>
              <button className='call-to-action-button'>View More</button>
              </Link>

              {cartItem ? 
              <button className='call-to-action-button'><div className="count-button" onClick={handleDecrement} >-</div><div>{quantity}</div><div className="count-button" onClick={handleIncrement}>+</div></button>
              :
              <button className='call-to-action-button' onClick={_ =>{dispatch(addItem(shopProducts))}}> <IoCartOutline/>Add to cart</button>
              }
            </div>
        </div>
        
    
  )
}

export default Product