import React, { useState, useEffect, useCallback } from 'react';
import "../styles/Carousel.css"; // Ensure this file exists and is properly configured

const Trademyticket_images = [
    'https://media-hosting.imagekit.io//4c445833cbef4510/pixelcut-export.png?Expires=1735323671&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=psyj~~jlj4u~Swioali9h-V90Gvim6Ia1-30aVaeqbRVdprGC8o6K8e4oNgiyXRTheQi6Gfw2U880rG-GtPLGJf8gxLMEEtrvDaQW9Hnyhi4iLS9ELJTw6Y8OVNuCF-v7GoKset-ZEhLgdD5HTeu58ycM9XpMrpQkf1cl7bHPQEoWrEOO~giEvXyn63emmbPnxeBNZNbK0gAyLWSM3C~z7q1R2sZ8jg3YKKkVDlIWN45xle5JqRfYFt0GjBwyMlYINFtJaaCW7oFKVTzWvtYGySwxwOkA0WwOYzMBJMj6vwdV--N7hqvf4tTZq9wt3yvHhu5mruaaCkm0Qyitc3WYQ__',

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

    return (
        <div className="slider-container">
            <button className="nav-button left" onClick={prev_state}>&#10094;</button>
            <img className="slider-image" src={Trademyticket_images[curr_state]} alt={`Image ${curr_state}`} />
            <button className="nav-button right" onClick={next_state}>&#10095;</button>
        </div>
    );
}

export default Carousel;
