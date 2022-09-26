import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { MdDeleteSweep } from "react-icons/md";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/slices/cartReducer";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="Cart">
      {cart.length === 0?
      <h5>Your cart is empty </h5>
      :
      <div className="Cart">
      <div className="cart-table">
        <div className="table-header">
          <h5>Product Image</h5>
          <h5>Product Name</h5>
          <h5>Quantity</h5>
          <h5>Price</h5>
          <h5>Total</h5>
        </div>
        {cart.map((product) => (
          <div className="product-row" key={product.Product_id}>
            <img src={product.Product_image} alt="product" />
            <p>{product.Product_name}</p>
            <div className="quantity-count">
              <div
                className="countbutton"
                onClick={() => {
                  if (product.quantity < 2) {
                    dispatch(removeItem(product.Product_id));
                  }
                  dispatch(decrementQuantity(product.Product_id));
                }}
              >
                -
              </div>
              {product.quantity}
              <div
                className="countbutton"
                onClick={() => {
                  if (product.quantity < product.Quantity) {
                    dispatch(incrementQuantity(product.Product_id))(
                      product.quantity
                    );
                  }
                }}
              >
                +
              </div>
            </div>
            <p>{product.Product_price}</p>
            <p>{product.Product_price * product.quantity}</p>
            <MdDeleteSweep
              onClick={() => {
                dispatch(removeItem(product.Product_id));
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <button className="call-to-action">Checkout</button>
      </div>
    </div>
    }
      
    </div>
    
  );
}

export default Cart;
