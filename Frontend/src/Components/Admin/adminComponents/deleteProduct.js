import React, { useEffect, useState } from 'react'
import axios from "axios";
// import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeleteProduct = () => {
    const [products, setProducts] = useState([])
    const [id, setId]=useState(0)

    useEffect(() => {
      axios.get(`http://localhost:5000/adminProducts`)
        .then(res => setProducts(res.data.data))
      },[])
      // console.log(products)

      const handleDelete = async ()=>{
        await axios.post(`http://localhost:5000/deleteProduct`, id)
        .then(res=>{
          console.log(res)
        })

      }

      const handleClick=(id)=>{
          setId(id)
          handleDelete()
      }
    
    return ( 
        <div className="deleteProduct">
            <div className="title">
            <p >Delete Product</p>
            </div>
        <div className="table">
        <table
          cellSpacing="0"
          style={{
            width: "90%",
            height: "auto",
            padding: "5px 10px",
            border: "1px black solid",
            margin: "10px",
            marginLeft:"40px"
          }}
        >
          <thead
            style={{
              border: "1px solid black",
              borderRadius: "20px"
            }}>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>IsAvailable</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center"
            }}
          >
            {products.map((product, index)=>(
              <tr key={index}>
                <td><img src={product.Product_image} alt="" width='100px' height='70px'/></td>
                <td>{product.Product_name}</td>
                <td>{product.Product_description.slice(0, 100)}...</td>
                <td>${product.Product_price}.00</td>
                <td>{product.Quantity}</td>
                <td>${product.Discount}.00</td>
                {product.IsAvailable ? <td>Available</td> : <td>Not Available</td> }
                <td><RiDeleteBin6Line
                    onClick={()=>handleClick(product.Product_id)}
                  style={{
                    cursor:"pointer"
                  }}
                /></td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
        </div>
     );
}
 
export default DeleteProduct;