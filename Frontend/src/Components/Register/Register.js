import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../redux/slices/userReducer";
import Alert from 'react-bootstrap/Alert';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState("");
  const [setShow] = useState(true)

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  }
  function handleMessage(user){
     if(user.user && user.token){
        (<Alert variant="success" onClose={() => setShow(false)} dismissible>
        <TiTick />
        <Alert.Heading>Successful Registration</Alert.Heading>
        </Alert>)
     }
  }
  async function handleRegister(e) {
    e.preventDefault();
    console.log(values);

    await axios
      .post(`http://localhost:7000/register`, values, {headers: { "Content-type": "application/json" },})
      .then((res) => {
        dispatch(users(res.data));
        handleMessage(user);
        navigate("/");
      });
  }

  console.log(user); //user.token && user.user(for username and email)
  return (
    <div className="form-container">
      <div className="form-content">
        <form onSubmit={handleRegister} method="POST">
          <div className="form-submission">
            <label for="email">Email:</label>
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
            <label for="userName">Username:</label>
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
            <label for="Name">Name:</label>
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
            <label for="password">Password:</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" name="register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
