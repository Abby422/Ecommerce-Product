import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Products.css'
import {IoCartOutline} from 'react-icons/io5'

function Products() {
    const shopProducts = [{
        "Product_id" : 4,
        "Catergory_id": 2,
        "Product_image" : 'https://images.unsplash.com/photo-1616873424982-e406f6af8eef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        "Product_name": "Sky Couch",
        "Product_description" : "This sleek and stylish couch is sure to be the center of any living room. The tan leather upholstery will keep you looking and feeling at home while the extra wide cushions give you plenty of room to kick back and relax. Add your favorite modern style coffee table, complete with a chrome frame and sticky rubber feet, and you will have the perfect place to unwind.",
        "Product_price": 349,
        "Quantity" : 10
    },
    {
        "Product_id" : 5,
        "Catergory_id": 2,
        "Product_image" : 'https://images.unsplash.com/photo-1616873424982-e406f6af8eef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        "Product_name": "Sky Couch",
        "Product_description" : "This sleek and stylish couch is sure to be the center of any living room. The tan leather upholstery will keep you looking and feeling at home while the extra wide cushions give you plenty of room to kick back and relax. Add your favorite modern style coffee table, complete with a chrome frame and sticky rubber feet, and you will have the perfect place to unwind.",
        "Product_price": 349,
        "Quantity" : 10
    },
    {
        "Product_id" : 6,
        "Catergory_id": 2,
        "Product_image" : 'https://images.unsplash.com/photo-1616873424982-e406f6af8eef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        "Product_name": "Sky Couch",
        "Product_description" : "This sleek and stylish couch is sure to be the center of any living room. The tan leather upholstery will keep you looking and feeling at home while the extra wide cushions give you plenty of room to kick back and relax. Add your favorite modern style coffee table, complete with a chrome frame and sticky rubber feet, and you will have the perfect place to unwind.",
        "Product_price": 349,
        "Quantity" : 10
    }
]
  return (
    <div className='products_container'>
        <div><h2>SHOP</h2></div>
        <div className='products'>
            {shopProducts.map(decor =>{
                return (<div key={decor.Product_id} className='products-card'>
                        <img src={decor.Product_image} alt='Product' /> {/*add a link to an image */}
                        <h5>{decor.Product_name}</h5>
                        <h6>{decor.Product_price}</h6>
                        <button><IoCartOutline/>Add to cart</button>
                    </div>)
            })}
        </div>
    </div>
  )
}

export default Products

