import React, { useState } from "react";
import "../styles/LoginPage.css"
import { Link, redirect, useNavigate } from "react-router-dom";

function RegisterPage() {

  const [pass,setpass] = useState('');
  const [conpass,setconpass] = useState('');
  const [err,seterr] = useState({pass:'',conpass:''});
  const navigate = useNavigate();

  const handlepasschange = (e) =>{
    setpass(e.target.value);
    validatePass(e.target.value);
  };

  const handleconpasschange = (e) =>{
    setconpass(e.target.value);
  };

  const validatePass = (pass) => {
    let error = '';
    if (pass.length < 8){
      error = 'Password must be at least 8 characters long';
    }
    seterr((prevstate) => ({...prevstate, pass: error}));
  }

  const validateConPass = (password, confirmpassword) =>{
    let error = '';
    if (password !== confirmpassword){
      error = 'Both Password did not match!';
    }
    seterr((prevstate) => ({...prevstate, conpass: error}));
  }
  const handleGoogleSignIn = () => {
    // Redirect the user to your server's Google OAuth endpoint
    navigate('/auth/google');
  };
  
  const handleSubmit = async (e) => { 
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = pass;
    e.preventDefault(); 
    validatePass(pass); 
    validateConPass(pass, conpass);
    if ((!err.pass && !err.conpass) && (pass === conpass)) {
      const response = await fetch('/register', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username, password}),
        }
      )
      const result = await response.json();
      if (result.success){
        navigate('/');
      }
      else{
        console.log(response.status);
        if (response.status === 200){
          navigate('/SignIn');
          alert(result.message);
        }
        else{
          alert(result.message);
        }
      }
    }
  }

  return (
    <div className="container-login">
    <div className="containerx">
      <form className="form_signin" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
        <div className="form-group"> 
          <label htmlFor="email">Email/Username</label>
          <input type="email" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handlepasschange} value={pass} required/>
          {err.pass && <p>{err.pass}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirm password">Confirm Password</label>
          <input type="password" name="con_password" onChange={handleconpasschange} value={conpass} required/>
          {err.conpass && <p>{err.conpass}</p>}
        </div>
        </div>
        
        
        <div>
        <button type="submit">
          Register
        </button>
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          Sign in with Google
        </button>
        </div>
        <div>
          <Link to='/SignIn'><div className="already_register">Already Registered? Login Now</div></Link>
        </div>
      </form>
      
    </div><div className="image-login" id="1">
    <img id="img-login" src="https://plus.unsplash.com/premium_photo-1724772007456-3d7dc11e0c86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  </div>
    </div>
  );
}


export default RegisterPage;