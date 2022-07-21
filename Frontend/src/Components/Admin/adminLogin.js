import React from "react";
import './adminLogin.css'

const Adminlogin = () => {
    return (
        <div className="adminLogin">
            <div className="form">
                <p>login</p>
                <br />
                <form action="">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        required
                        placeholder="Enter your email"
                    /><br /><br />
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        required
                        placeholder="Enter your password" />
                </form>
            </div>
        </div>
    );
}

export default Adminlogin;