import axios from "axios";
import React, { useState } from "react";
import './adminLogin.css';
import { useDispatch} from 'react-redux';
import { admin, loggedIn } from "../../redux/slices/adminReducer";


const Adminlogin = () => {


    const [email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    const dispatch = useDispatch()

    const adminDetails={
        email:email,
        password:password
    }

    const handleLogin=()=>{
        axios.post(`http://localhost:7000/adminogin`, {...adminDetails})
        .then(res=>{
            console.log(res)
            if(res.data.message === "Successful login")
                dispatch(loggedIn(true))
                dispatch(admin(res.data))
        })

    }


    return (
        <div className="adminLogin">
            <div className="form">
                <p>login</p>
                <br />
                <form onSubmit={handleLogin}>
                    <label >Email:
                    <input type="email"
                        required
                        placeholder="Enter your email"
                        onChange={(e)=>setEmail(e.target.value)}
                            />

                    </label><br /><br />
                    <label>Password:
                    <input type="password"
                        required
                        placeholder="Enter your password"
                        onChange={(e)=>setPassword(e.target.value)}
                        />

                    </label> <br /> <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Adminlogin;