import React from "react";
import "../styles/LoginPage.css"
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="containerx">
      <form action="/register" method="POST" className="form_signin">
        <h1>Register</h1>
        <div>
        <div className="form-group"> 
          <label htmlFor="email">Email/Username</label>
          <input type="email" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm password">Confirm Password</label>
          <input type="password" name="password" />
        </div>
        </div>
        
        <div>
          <Link to='/SignIn'>Already Registered? Login Now</Link>
        </div>
        <div>
        <button type="submit">
          Register
        </button>
        </div>
      </form>
    </div>
  );
}


export default RegisterPage;