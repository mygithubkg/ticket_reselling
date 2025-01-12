import React from "react";
import "../styles/LoginPage.css"
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

  const handlesubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password}),
      credentials: 'include',
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
  return (<div className="container-login">
 
  
    
    
    
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
        <button type="submit">
          Login
        </button>
        </div>
        <div>
          <Link to='/Register'><div className="new_user">New User?  Register Now</div></Link>
        </div>
      </form>
    </div> <div className="image-login" id="1">
    <img id="img-login" src="https://plus.unsplash.com/premium_photo-1724772007456-3d7dc11e0c86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  </div>
    </div>
  );
}


export default LoginPage;