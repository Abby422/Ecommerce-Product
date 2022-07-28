import { useParams } from "react-router";
import React, { useEffect, useState } from 'react'
import axios from "axios";

const ProductUpdate = () => {
  const [product, setProduct] = useState([])
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const { id } = useParams();


  
  useEffect(() => {
    axios.get(`http://localhost:5000/getOneProduct/${id}`)
    .then(res => setProduct(res.data.data))
    setName(product.Product_name)
    setDesc(product.Product_description)
    setQuantity(product.Quantity)
    setPrice(product.Product_price)
    setDiscount(product.Discount)
  },[id, product.Product_name, product.Product_description, product.Quantity, product.Product_price, product.Discount])
  


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
            <input type="text" value={name || ''} onChange={(e) => setName(e.target.value)} />
          </label> <br /> <br />
          <label >
            Description: <br />
            <textarea value={desc || ''} onChange={(e) => setDesc(e.target.value)} cols="50" rows="8" />
          </label> <br /> <br />
          <label>
            Quantity:
            <input type="text" value={quantity || ''} onChange={(e) => setQuantity(e.target.value)} />
          </label> <br /> <br />
          <label>
            Price:
            <input type="text" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
          </label> <br /> <br />
          <label>
            Discount:
            <input type="text" value={discount || ''} onChange={(e) => setDiscount(e.target.value)} />
          </label> <br />
          <button type="submit">submit</button>
        </form>
      </div>


    </div>
  )
}
export default ProductUpdate;