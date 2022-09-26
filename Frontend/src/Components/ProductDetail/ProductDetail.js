import React, { useEffect } from "react";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { productDetail } from "../../redux/slices/detailsReducers";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../../redux/slices/cartReducer";

function ProductDetail() {
  const dispatch = useDispatch();
  const productId = useParams();
  const productDetails = useSelector((state) => state.product);

  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const cartItem = cart.find((item) =>
    item.Product_id === productDetails.Product_id ? true : false
  );

  const quantity = cart.map((product) => {
    if (product.Product_id === productDetails.Product_id) {
      return product.quantity;
    } else {
      return "";
    }
  });

  const handleIncrement = () => {
    if (quantity < productDetails.Quantity) {
      dispatch(incrementQuantity(productDetails.Product_id));
    }
    return quantity;
  };

  const handleDecrement = () => {
    if (quantity < 2) {
      dispatch(removeItem(productDetails.Product_id));
    }
    dispatch(decrementQuantity(productDetails.Product_id));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${productId.productId}`)
      .then((res) => dispatch(productDetail(res.data.data[0])));
  }, []);
  return (
    <div key={productDetails.Product_id}>
      <div className="product">
        <div className="productImage">
          <img src={productDetails.Product_image} alt="product display" />
        </div>
        <div className="detail-container">
          <div className="detail-content">
            <div>
              <h2>{productDetails.Product_name}</h2>
              <p>{productDetails.Product_description}</p>
              <div>
                Price : {productDetails.Product_price}
              </div>

              <p>Products Available {productDetails.Quantity}</p>
            </div>

            <div className="product-buttons">
              {cartItem ? (
                <div className="call-to-action-button">
                  <button className="count-button" onClick={handleDecrement}>
                    -
                  </button>
                  <div>{quantity}</div>
                  <button className="count-button" onClick={handleIncrement}>
                    +
                  </button>
                </div>
              ) : (
                <button className="call-to-action-button" onClick={() => dispatch(addItem(productDetails))}>
                  <IoCartOutline />
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
