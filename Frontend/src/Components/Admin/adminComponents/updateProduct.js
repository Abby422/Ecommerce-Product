import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const UpdateProduct = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/adminProducts`)
      .then(res => setProducts(res.data.data))
  }, [])
  console.log(products)

  return (
    <div className="updateProduct">
      <div className="title">
        <p >Update Product</p>
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
            marginLeft: "40px"
          }}
        >
          <thead
            style={{
              border: "1px solid black",
              borderRadius: "20px"
            }}>
            <tr>
              <th>Edit</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>IsAvailable</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center"
            }}
          >
            {products.map((product, index) => (
              <tr key={index}>
                <td className='td1'>
                  <Link to={`/admin/updateProduct/${product.Product_id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td><img src={product.Product_image} alt="" width='100px' height='70px' /></td>
                <td>{product.Product_name}</td>
                <td>{product.Product_description.slice(0, 100)}...</td>
                <td>${product.Product_price}.00</td>
                <td>{product.Quantity}</td>
                <td>${product.Discount}.00</td>
                {product.IsAvailable ? <td>Available</td> : <td>Not Available</td>}
                {!product.isDeleted? <td>Not Deleted</td> : <td>Deleted</td> }
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default UpdateProduct;