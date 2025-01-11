import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { delay, easeIn, motion , whileHover} from 'framer-motion';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import env from "dotenv";

env.config();



function Header() {

    // Managing web pages
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/SignIn'); // Navigate to login page
    };
    const handleSignInClick_1 = () => {
        setShow(!show);
        navigate('/SignIn'); // Navigate to login page
    };

    // Declaring user 
    const [user, setUser] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    // Checking user is Login or not
    const handleUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/verify`, {
                method: 'GET',
                credentials: 'include',
            });

            const result = await response.json();

            if (result.success) {
                setUser(true);
            } else {
                setUser(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // To Check when user get's logged out, [] treated as a dependency array
    useEffect(() => {
        handleUser();

        const interval = setInterval(() => {
            handleUser();
        }, 5000);
        
        return () => {
            clearInterval(interval);
        };
    }, []);


    // For Responsive website
    const [show, setShow] = useState(false);
    const handleMenu = () => {
        setShow(!show);
    };

    const middlevar = {
        hidden: { scale: 0.8 },
        show: {
            scale: [1, 1.1, 1],
            transition: { duration: 1, staggerChildren: 2, ease: "easeOut", delay: 1 }
        },
        whileHover: {
            scale: [1.15],
            transition: { duration: 0.2 } // Add spring easing for smooth animation
        }
    }






    return (
        <>
            <div className={styles.header}>
                <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0, scale: [1, 1, 1.5, 1] }} transition={{ type: "spring", staggerChildren: 10, y: { type: "spring" }, duration: 1, ease: "easeOut", delay: 0.5 }} className={styles.header_space1}>
                    <img src="" height="100%" alt="" />
                    <Link to="/" className={styles.logoLink}>
                        <h1 id={styles.logo}>Trade<p className={styles.my}>My</p>Ticket</h1>

                    </Link>
                </motion.div>
                <motion.div variants={middlevar} initial="hidden" animate="show" className={styles.header_space2}>
                    <Link to="/Explore" className={styles.logoLink1}><motion.p whileHover={middlevar.whileHover} variants={middlevar}>Explore</motion.p></Link>
                    <Link to="/HowItWorks" className={styles.link}><motion.p whileHover={middlevar.whileHover} variants={middlevar}>How it works!</motion.p></Link>
                    <Link to="/ContactUs" className={styles.link}><motion.p whileHover={middlevar.whileHover} variants={middlevar}>Contact Us</motion.p></Link>
                </motion.div>
                <div className={styles.header_space3}>
                    <motion.div
                        
                        whileHover={{
                         
                            backgroundColor:["#ffffff"]
                           
                         
                        }}
                        transition={{
                            duration:1,
                            
                            ease: "easeInOut",
                            
                            
                        }}
                    >
                        <Link to='/Seller1' className={styles.sell_button}>Sell</Link>
                    </motion.div>
                    <div className={styles.divider}></div>
                    <span>
                        {user ? (
                            <Link to='/profile'>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                </p>
                            </Link>
                        ) : (
                            <button onClick={handleSignInClick} className={styles.button_sign}>Sign In/Register</button>
                        )}
                    </span>
                    <div
                        onClick={handleMenu} className={styles.menu_icon}>|||
                    </div>
                </div>
            </div>

            {/* Conditional rendering of the menu */}
            {show && (
                <div className={styles.menu}>
                    <div className={styles.menu_container}>
                        <Link to="/Explore" className={styles.menuItem} onClick={handleMenu}>Explore</Link>
                        <Link to="/HowItWorks" className={styles.menuItem} onClick={handleMenu}>How it works!</Link>
                        <Link to="/ContactUs" className={styles.menuItem} onClick={handleMenu}>Contact Us</Link>
                        <Link to="/Seller1" className={styles.menuItem} onClick={handleMenu}>Sell</Link>
                        {user ? (
                            <Link to='/profile'>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                </p>
                            </Link>
                        ) : (
                            <button onClick={handleSignInClick_1} className={styles.button_sign}>Sign In/Register</button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
