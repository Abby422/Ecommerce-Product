import React, {useEffect} from 'react'
import './ProductDetail.css'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import axios from 'axios'
import {IoCartOutline} from 'react-icons/io5'
import { useParams } from 'react-router'
import { productDetail } from '../../redux/slices/detailsReducers'


function ProductDetail() {
    const dispatch = useDispatch()
    const productId = useParams()
    const productDetails = useSelector(state => state.product)

    useEffect(() =>{
        axios.get(`http://localhost:5000/product/${productId.productId}`).then(res => dispatch(productDetail(res.data.data[0])))
    }, [])
  return (
    <div key={productDetails.Product_id}>
        <div className='product'>
            <div><img src={productDetails.Product_image} alt='product display'/></div>
            <div className='detail-container'>
              <div className='detail-content'>
                <div>
                <h3>{productDetails.Product_name}</h3>
                <p>{productDetails.Product_description}</p>
                <p>Price <div className='productPrice'>{productDetails.Product_price}</div></p>
                <p>Products Available {productDetails.Quantity}</p>
                </div>

                <div className='product-buttons'>
                  <button><IoCartOutline/>Add to cart</button>
                </div>
              </div>
            </div>
            
          
        </div>
    </div>
  )
}

export default ProductDetail


// {shopProducts.map(decor =>{
//     return (<div key={decor.Product_id} className='products-card'>
//             <img src={decor.Product_image} alt='Product' /> {/*add a link to an image */}
//             <h5>{decor.Product_name}</h5>
//             <h6>{decor.Product_price}</h6>
//             <button><IoCartOutline/>Add to cart</button>
//         </div>)
// })
// }