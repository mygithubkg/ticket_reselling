import React from "react";
import "../styles/LoginPage.css"
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="containerx">
      <form action="/login" method="POST" className="form_signin">
        <h1>Sign In</h1>
        <div>
        <div className="form-group"> 
          <label htmlFor="email">Email/Username</label>
          <input type="email" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        </div>
        
        <div>
          <Link to='/Register'>New User? Register Now</Link>
        </div>
        <div>
        <button type="submit">
          Login
        </button>
        </div>
      </form>
    </div>
  );
}


export default LoginPage;