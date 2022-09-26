import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../redux/slices/userReducer";
import Alert from "react-bootstrap/Alert";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [setShow] = useState(true);
  const [values, setValues] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  }
  function handleMessage(user) {
    if (user.user && user.token) {
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <TiTick />
        <Alert.Heading>Successful Registration</Alert.Heading>
      </Alert>;
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    console.log(values);
    const { email, password } = values;

    await axios
      .post(
        `http://localhost:7000/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        dispatch(users(res.data));
        handleMessage(user);
        navigate("/");
      });
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <form onSubmit={handleLogin} method="POST">
          <div className="form-submission">
            <label for="email">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
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
            />
          </div>

          <button type="submit" name="login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
