import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
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



// import { listProducts } from '../redux/actions/productActions';
// import { addItem, decrementItem, incrementItem, removeItem } from '../redux/actions/cartActions'

// const Products = () => {
//     const dispatch = useDispatch();
//     const productList = useSelector(state => state.productList)
//     const { loading, error, products } = productList;
//     const { cartItems }  = useSelector(state => state.cart)
    
//     useEffect(() => {
//         dispatch(listProducts())
//     }, [dispatch])

//     return (
//         <section className="container">
//            <h1>Available Vehicles</h1>
//             {loading ? (
//                 <h2>Loading</h2>
//             ) : error ? (
//                 <h2>{error}</h2>
//             ) :
//                 <div className="products">
//                     {products.map((vehicle) => {
//                         const inCart = cartItems.find((item) => item.id === vehicle.id ? true : false);
//                         const fetchQuantity = () => {
//                             if (cartItems.length === 0) {
//                               return 0;
//                             } else {
//                               return cartItems?.find((car) => car.id === vehicle.id).quantity;
//                             }
//                           };
//                         return (
//                             <div key={vehicle.id} className="card">
//                                 <Link to={`${vehicle.id}`}>
//                                     <img src={vehicle.imgSrc} alt={vehicle.name} />
//                                 </Link>
//                                 <p>Model: {vehicle.model}</p>
//                                 <p>Make: {vehicle.make}</p>
//                                 <p>Price: ${vehicle.price.toLocaleString()}</p>
//                                 {inCart ? (
//                             <div className="buttons">
//                                 <div className="units">
//                                     <button onClick={() => {
//                                         if (fetchQuantity() <= 1) {
//                                             dispatch(removeItem(vehicle.id));
//                                         } else {
//                                             dispatch(decrementItem(vehicle.id));
//                                         }
//                                 }}>-</button>
//                                 <div class="number">{fetchQuantity()}</div>
//                                 <button onClick={ () => dispatch(incrementItem(vehicle.id))}>+</button>  
//                                 </div>
//                                 <div className="view-cart">
//                                     <Link to="/cart"><button>View Cart</button></Link>
//                                 </div>
//                             </div>
//                             ) : (
//                             <div class="add-to-cart" >
//                                 <button onClick={
//                                     () => dispatch(addItem(vehicle.id))
//                                 }><AiOutlineShoppingCart className="cart-icon" />Add to Cart </button>

//                             <Link to={`${vehicle.id}`}><button>View Details</button></Link>
//                             </div>        
//                           ) }    
//                             </div>
//                         )
//                     })}
//                 </div>
//             }
//         </section>
//     )
// }
