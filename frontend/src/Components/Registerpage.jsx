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

  const handleSubmit = async (e) => { 
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = pass;
    
    e.preventDefault(); 
    validatePass(pass); 
    validateConPass(pass, conpass);
    if (!err.pass && !err.conpass) {
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