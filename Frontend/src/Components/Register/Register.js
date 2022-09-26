import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { users } from "../../redux/slices/userReducer";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios
      .post(`http://localhost:7000/register`, values, {headers: { "Content-type": "application/json" },})
      .then((res) => {
        dispatch(users(res.data));
        alert("Successful registration");
        localStorage.setItem('user',JSON.stringify(res.data.user));
        localStorage.setItem('token',JSON.stringify(res.data.token));
        navigate("/");
      });
    } catch (error) {
      alert("error : " + error)
    }
    
  }

  return (
    <div className="form-container">
        <form onSubmit={handleRegister} method="POST">
          <h2 id="form-header">Register</h2>
          <div className="form-submission">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submission">
            <label for="userName">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submission">
            <label for="Name">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              name="Name"
              value={values.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submission">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submission">
            <button type="submit" name="register">
            Register
          </button>
          </div>
          
        </form>
    </div>
  );
}

export default Register;
