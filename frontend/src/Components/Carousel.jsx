import React, { useState, useEffect, useCallback } from 'react';
import "../styles/Carousel.css"; // Ensure this file exists and is properly configured
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
const Trademyticket_images = [
    "https://media-hosting.imagekit.io//83a53cd2a7554622/pexels-photo-8261823.webp?Expires=1735834334&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lNztvpi5ykSur2DLKmH1m2XvQP4kAnBTMmk5D~XEa8hCFPk2srYeWUq-Gjs2oCYd7MU7AsOLzocS4gR7jwuZCItV4Rob6yhe9-DHD1~Tz-47kTvrP~CUZqhy52jdhfmrZhKr06x5woYIXO~N~fik2klEKwE-~KJOFie5F4dX535beX~A7SomDb2fG6EnvNkqZkYbzG1hvtpCZlsiLjarWmPcat0QnaPcZhzVaJmHRdS6OREKpt5PPL7oBbJDxUiZ2e2xyRoUQMf5hD~~YCClVpZ~~bkiI4D7osfsaozH3fJWQ53FKrnXDe2ENjHIkcRO0Qx~KVdTWpiFEx7fHnktog__",

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
