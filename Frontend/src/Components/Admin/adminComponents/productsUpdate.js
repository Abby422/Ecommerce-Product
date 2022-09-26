import { useParams } from "react-router";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const ProductsUpdate = () => {
  const [product, setProduct] = useState([])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const { id } = useParams();


  
  useEffect(() => {
    axios.get(`http://localhost:5000/getOneProduct/${id}`)
    .then(res => setProduct(res.data.data))
  }, [id])
  


  // console.log(products[0])
  // console.log(id)

  const handleSubmit = async () => {
    let updatedProduct = {
      id: id,
      name: name,
      desc: desc,
      price: price,
      quantity: quantity,
      discount: discount
    }
    await axios.post(`http://localhost:5000/updateProduct`, { ...updatedProduct })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
    console.log(updatedProduct)
  }




  return (
    <div className='productUpdate'>
      <div className="title">
        <p>Update Products</p>
        <p>{id}</p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <img src={product.Product_image} alt="" width="300px" height="200px" /> <br /> <br />
          <label>
            Name:
            <input type="text" value={product.Product_name} onChange={(e) => setName(e.target.value)} />
          </label> <br /> <br />
          <label >
            Description: <br />
            <textarea value={product.Product_description} onChange={(e) => setDesc(e.target.value)} cols="50" rows="8" />
          </label> <br /> <br />
          <label>
            Quantity:
            <input type="text" value={product.Quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label> <br /> <br />
          <label>
            Price:
            <input type="text" value={product.Product_price} onChange={(e) => setPrice(e.target.value)} />
          </label> <br /> <br />
          <label>
            Discount:
            <input type="text" value={product.Discount} onChange={(e) => setDiscount(e.target.value)} />
          </label> <br />
          <button type="submit">submit</button>
        </form>
      </div>


    </div>
  )
}
export default ProductsUpdate;