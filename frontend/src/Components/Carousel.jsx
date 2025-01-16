import React, { useState, useEffect, useCallback } from 'react';
import "../styles/Carousel.css"; // Ensure this file exists and is properly configured
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
const Trademyticket_images = [
    "https://media-hosting.imagekit.io//93d3b59285a74fb4/pixelcut-export.png?Expires=1831635334&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VuR6reIH3yUaZ84Rua0zFK-fckqq~UUKaRYwlAaDPeu8j98OrD2Md~Xd~i8j~1FaIIuz8-Vys-anSOF9J~Yy-g9M1SjKi-DARJPPBCM3LBnlhRJfdBnMbCxOB39zcjyaH8GiwznCnTHUL8yol7nmxf4j7gwQwR211d8YM1CrakQBR2rSOXh6OYrVO5~2pCqf-PGNjwRMn11xYM~Zzs-8W35PyYR2PtSRiAKtUvx5u0JBpNtJQCRnd4dbHI~5Xx5IRJo2m9erlUaNHNdhOONW0nXwXzj7g5zgL7q~bza5x8gtC8i6Xzk8hSbMSpivHDdMjEr8hvOI6k8qXN3GCgjSXQ__"
    

];

function Carousel() {
    const [curr_state, Move_state] = useState(0);

    const next_state = useCallback(() => {
        Move_state((state) => (state + 1) % Trademyticket_images.length);
    }, []);

    useEffect(() => {
        console.log("Setting up interval");
        const interval_id = setInterval(() => {
            console.log("Calling next_state");
            next_state();
        }, 4000);

        return () => {
            console.log("Cleaning up interval");
            clearInterval(interval_id);
        };
    }, [next_state]);

    const prev_state = () => {
        Move_state((state) => (state - 1 + Trademyticket_images.length) % Trademyticket_images.length);
    };
     const navigate = useNavigate();
    const handlexplore = ()=>{
        navigate("/Explore")
    }


    return (
        <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="slider-container">
            <div className='explore_btn_container'><button onClick={handlexplore} className='explore_btn'>Explore</button></div>
            <button className="nav-button left" onClick={prev_state}>&#10094;</button>
            <img className="slider-image" src={Trademyticket_images[curr_state]} alt={`Image ${curr_state}`} />
            <button className="nav-button right" onClick={next_state}>&#10095;</button>
            <div id="test"><p>askwdwjdwwhwddddddd</p></div>
          
        </motion.div>
    );
}

export default Carousel;
