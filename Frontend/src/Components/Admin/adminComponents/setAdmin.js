import axios from "axios";
import { useEffect, useState } from "react";

const SetAdmin = () => {
    const[data, setData]=useState([])



 useEffect(()=>{
     axios.get('http://localhost:6000/getAllUsers')
    .then((res)=>console.log(res.data.data))
 })
    

    return (  
        <div className="setAdmin">
            <p>Set admin</p>
        </div>
    );
}
 
export default SetAdmin;