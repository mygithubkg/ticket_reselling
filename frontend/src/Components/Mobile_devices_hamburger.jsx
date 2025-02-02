import React, { useEffect, useState,useRef } from "react";
import "../styles/Mobile_devices_hamburger.css";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  const handleSignInClick_1 = () => {
    setIsOpen(!isOpen);
    navigate("/SignIn"); // Navigate to login page
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      // debug
      // console.log(result);

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
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);

  return (
    <nav className="menu" ref={menuRef}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`menu-options ${isOpen ? "open" : ""}`}>
        <Link
          to="/Explore"
          //   className={styles.menuItem}
          onClick={toggleMenu}
        >
          {" "}
          Explore{" "}
        </Link>
        <Link to="/HowItWorks" onClick={toggleMenu}>
          How it works!
        </Link>
        <Link to="/ContactUs" onClick={toggleMenu}>
          Contact Us
        </Link>
        <Link to="/Seller1" className={styles.menuItem} onClick={toggleMenu}>
          Buy
        </Link>
        {user ? (
          <Link to="profile1">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="Black"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </p>
          </Link>
        ) : (
          <button onClick={handleSignInClick_1} className={styles.button_sign}>
            Sign In/Register
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
