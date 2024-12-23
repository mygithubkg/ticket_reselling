
import React, { useEffect, useState } from "react";

import styles from "../styles/Header.module.css"
import {useNavigate, Link} from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    const handleSignInClick = () => {
            navigate('/SignIn'); // Navigate to login page
    };


  let [show,setshow] = useState(false)
  const handlemenu=()=>{
      setshow(!show)

  }

    const [user,setuser] = useState(false);

    const handleuser = async ()=> {
        try {
            const response = await fetch('/verify',{
                method:'GET',
                credentials: 'include',
            })
    
            const result = await response.json();
    
            if (result.success){
                setuser(true);
            }
            else{
                setuser(false);
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect (() => {
        handleuser();

        const Intervalid = setInterval(()=>{
            handleuser();
        },5000);

        return ()=>{
            clearInterval(Intervalid);
        }
    });

    return (
        <>
        <div className={styles.header}>
            <div className={styles.header_space1}>
                <img src ="https://media.istockphoto.com/id/671182996/vector/two-tickets-line-art-outline-tickets-icon-vector.jpg?s=612x612&w=0&k=20&c=6BclkDXbZ5JzOU8hKG1Z4IDNcF7_kHHC4R5EcORM8Zk=" height="100%" alt="TradeMyTicket logo" />
                <Link to='/' className={styles.logoLink}><h1  id={styles.logo}>TradeMyTicket</h1></Link>

            </div>
            <div className={styles.header_space2}>
                <Link to='/Explore' className={styles.logoLink1}><p>Explore</p></Link>
                <p><Link to="/HowItWorks" className={styles.link}>How it works!</Link></p>
                <p><Link to="/ContactUs" className={styles.link}>Contact Us</Link></p>
            </div>
            <div className={styles.header_space3}>
                <div>
                <Link to='/Seller1' className={styles.sell_button}>Sell</Link>
                </div>
                <span>
                {user ? <Link to='/profile'><p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>
                </p></Link>
                : <button onClick={handleSignInClick}>Sign In/Register</button> 
                }                   
                </span>
              
            </div>
        </div>
        </>
    );
}


export default Header;