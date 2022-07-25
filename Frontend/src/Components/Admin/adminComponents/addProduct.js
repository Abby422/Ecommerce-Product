import axios from "axios";
import { useState } from "react";

const AddProduct = () => {

 

    const { category, setCategory } = useState('Kitchen and Dining');
    const{desc, setDesc} = useState('')
    const{img, setImg}=useState('')
    const{price, setPrice}= useState(0)
    const{quantity, setQuantity}=useState(0)
    const {name, setName}= useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();

        const product ={
            categoryName: category,
            productName: name,
            productDesc:desc,
            productImg:img,
            productPrice:price,
            quantity:quantity
        }

        axios.post(`http://localhost:5000/addProduct`,{product})
        .then(res=>{
            console.log(res)
            console.log(res.data)
        })
        console.log(product)
    }

    const categoryChange = (e) => {
        setCategory(e.target.value)
    }
    const nameChange = (e)=>{
        setName(e.target.value)
    }
    const descChange = (e)=>{
        setDesc(e.target.value)
    }
    const imgChange = (e)=>{
        setImg(e.target.value)
    }
    const priceChange = (e)=>{
        setPrice(e.target.value)
    }
    const quanityChange =(e)=>{
        setQuantity(e.target.value)
    }

    return (
        <div className="addProduct">
            <p>Add Product</p>
            <div className="addProductForm">
                <form onSubmit={()=>handleSubmit}>
                    <label>
                        category:
                        <select value={category} onChange={()=>categoryChange}>
                            <option value="Kitchen and Dining">Kitchen and Dining</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Lighting">Lighting</option>
                        </select>
                    </label><br />
                    <label>
                        Product Name:
                        <input type="text"
                        autoComplete="off" value={name} onChange={()=>nameChange} />
                    </label><br />
                    <label>
                        Product Description: <br />
                        <textarea value={desc} onChange={()=>descChange} cols="30" rows="10" />
                    </label><br />
                    <label>
                        Image Link:
                        <input type="text" value={img} onChange={()=>imgChange} />
                    </label><br />
                    <label >
                        Product price:
                        <input type="text" value={price} onChange={()=>priceChange}/>
                    </label><br />
                    <label>
                        quantity:
                        <input type="text" value={quantity} onChange={()=>quanityChange} />
                    </label><br />

                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    );
}

export default AddProduct;