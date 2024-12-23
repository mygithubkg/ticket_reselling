import React from "react";
import "../styles/LoginPage.css"
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handlesubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password}),
    })

    const result = await response.json();
    // console.log(response);
    // console.log(result);
    if (result.success){
      navigate('/');
      alert("User Logged In ")
    }
    else{
      if (response.status === 200){
        alert(result.message);
      }
      else{
        alert(result.message);
      }
    }
  }
  return (
    <div className="containerx">
      <form action="/login" method="POST" className="form_signin" onSubmit={handlesubmit}>
        <h1>Sign In</h1>
        <div>
        <div className="form-group"> 
          <label htmlFor="email">Email/Username</label>
          <input type="email" name="username" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required/>
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