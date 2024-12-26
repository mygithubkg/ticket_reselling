import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/SignIn'); // Navigate to login page
    };

    const [show, setShow] = useState(false);
    const handleMenu = () => {
        setShow(!show);
    };

    const [user, setUser] = useState(false);

    const handleUser = async () => {
        try {
            const response = await fetch('/verify', {
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

    useEffect(() => {
        handleUser();

        const interval = setInterval(() => {
            handleUser();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_space1}>
                    <img src="" height="100%" alt="" />
                    <Link to="/" className={styles.logoLink}>
                        <h1 id={styles.logo}>Trade<p className={styles.my}>My</p>Ticket</h1>
                    </Link>
                </div>
                <div className={styles.header_space2}>
                    <Link to="/Explore" className={styles.logoLink1}><p>Explore</p></Link>
                    <p><Link to="/HowItWorks" className={styles.link}>How it works!</Link></p>
                    <p><Link to="/ContactUs" className={styles.link}>Contact Us</Link></p>
                </div>
                <div className={styles.header_space3}>
                    <div>
                        <Link to='/Seller1' className={styles.sell_button}>Sell</Link>
                    </div>
                    <div className={styles.divider}></div>
                    <span>
                        {user ? (
                            <Link to='/profile'>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                </p>
                            </Link>
                        ) : (
                            <button onClick={handleSignInClick}>Sign In/Register</button>
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
                        <Link to="/Explore" className={styles.menuItem}>Explore</Link>
                        <Link to="/HowItWorks" className={styles.menuItem}>How it works!</Link>
                        <Link to="/ContactUs" className={styles.menuItem}>Contact Us</Link>
                        <Link to="/Seller1" className={styles.menuItem}>Sell</Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
