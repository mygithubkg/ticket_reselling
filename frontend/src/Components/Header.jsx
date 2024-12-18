import React from "react";
import styles from "../styles/Header.module.css"
import {useNavigate, Link} from "react-router-dom";


function Header(){
    const navigate = useNavigate();
    const handleSignInClick = () => {
            navigate('/SignIn'); // Navigate to login page
    };
    return (
        <>
        <div className={styles.header}>
            <div className={styles.header_space1}>
                <img src ="https://media.istockphoto.com/id/671182996/vector/two-tickets-line-art-outline-tickets-icon-vector.jpg?s=612x612&w=0&k=20&c=6BclkDXbZ5JzOU8hKG1Z4IDNcF7_kHHC4R5EcORM8Zk=" height="100%" alt="TradeMyTicket logo" />
                <Link to='/' className={styles.logoLink}><h1  id={styles.logo}>TradeMyTicket</h1></Link>

            </div>
            <div className={styles.header_space2}>
                <Link to='/Explore' className={styles.logoLink1}><p>Explore</p></Link>
                <p>How it works!</p>
                <p>Contact Us</p>
            </div>
            <div className={styles.header_space3}>
                <Link to='/Addevent' className={styles.sell_button}>sell</Link>
                <span>
                <button onClick={handleSignInClick}>Sign In/Register</button>
                </span>
            </div>
        </div>
        </>
    );
}


export default Header;