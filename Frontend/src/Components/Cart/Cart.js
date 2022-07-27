import React from 'react'
import { useSelector } from 'react-redux'
import './Cart.css'

function Cart() {
  const {cart} = useSelector(state => state.cart)

  console.log(cart)
  return (
    <div className='Cart'>
      <div className='cart-table'>
                  <div className='table-header'>
                    <h5>Product Image</h5>
                    <h5>Product Name</h5>
                    <h5>Quantity</h5>
                    <h5>Price</h5>
                    <h5>Total</h5>
                  </div>
      {cart.map(product =>(
                  <div className='product-row' key={product.Product_id}>
                    <img src={product.Product_image} alt="product"/>
                    <p>{product.Product_name}</p>
                    <div className='quantity-count'><div className='countbutton'>-</div>{product.quantity}<div className='countbutton'>+</div></div>
                    <p>{product.Product_price}</p>
                    <p>{product.Product_price * product.quantity}</p>
                  </div>
      )
      )}
      </div>
      <div><button className='call-to-action'>Checkout</button></div>
    </div>
  )
}

export default Cart