import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { FaEdit } from 'react-icons/fa';


const SetAdmin = () => {
    // const change = 'constant'
    const [data, setData] = useState([])
    const[role, setRole]=useState()
    const[id, setId] = useState()




    console.log(data)

    useEffect(() => {
        axios.get('http://localhost:7000/getAllUsers')
            .then(res => setData(res.data.data))
    }, [id])

    useEffect(()=>{
        let user={
            userID:id,
            role:role
        }

        axios.post(`http://localhost:5000/setAdmin`, {...user})
        .then(res=>{
            console.log(role)
            console.log(id)
        })
    },[role, id])


    // (e)=>setRole(e.target.value)
    // setId(obj.User_Id)
    const handleChange = (value, id)=>{
        setRole(value)
        setId(id)
    }

    return (
        <div className="setAdmin">

            <div className="title">
                <p>Set Admin</p>
            </div>
            <div className="table">
                <table cellSpacing="0"
                    style={{
                        width: "90%",
                        height: "auto",
                        padding: "5px 10px",
                        border: "1px black solid",
                        margin: "10px",
                        marginLeft:"40px"
                    }}>
                    <thead

                        style={{
                            border: "1px solid black",
                            borderRadius:"20px"
                        }}>
                        <tr>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>IsDeleted</th>
                            <th>User Role</th>

                        </tr>
                    </thead>
                    <tbody

                        style={{
                            textAlign: "center"
                        }}>

                        {Object.values(data).map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.Email}</td>
                                <td>{obj.Name}</td>
                                {obj.IsDeleted ? <td>true</td> : <td>false</td>}
                                <td>
                                    <select value={obj.User_role || ''} onChange={(e)=>handleChange(e.target.value, obj.User_Id)}>
                                        <option value="Admin">admin</option>
                                        <option value="User">user</option>
                                    </select>
                                </td>


                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default SetAdmin;