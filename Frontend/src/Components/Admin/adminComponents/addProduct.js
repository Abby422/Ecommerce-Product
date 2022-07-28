import axios from "axios";
import { useState } from "react";

const AddProduct = () => {

 

    const [category, setCategory ] = useState('Kitchen and Dining');
    const[desc, setDesc] = useState('')
    const[img, setImg]=useState('')
    const[price, setPrice]= useState('')
    const[quantity, setQuantity]=useState('')
    const [name, setName]= useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const product ={
            categoryName: category,
            productName: name,
            productDesc:desc,
            productImg:img,
            productPrice:price,
            quantity:quantity
        }

        await axios.post(`http://localhost:5000/addProduct`, {...product})
        .then(res=>{
            console.log(res)
            console.log(res.data)
        })
        console.log(product)
    }



    return (
        <div className="addProduct">
            <div className="title">
            <p >Add Product</p>
            </div>
            <div className="addProductForm">
                <form onSubmit={handleSubmit}>
                    <label>
                        category: 
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="Kitchen and Dining">Kitchen and Dining</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Lighting">Lighting</option>
                        </select>
                    </label><br />
                    <label>
                        Product Name:
                        <input type="text"
                        autoComplete="off" value={name} onChange={(e)=>setName(e.target.value)} />
                    </label><br />
                    <label>
                        Product Description: <br />
                        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} cols="50" rows="8" />
                    </label><br />
                    <label>
                        Image Link:
                        <input type="text" value={img} onChange={(e)=>setImg(e.target.value)} />
                    </label><br />
                    <label >
                        Product price:
                        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </label><br />
                    <label>
                        quantity:
                        <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                    </label><br />

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;