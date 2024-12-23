import React, { useState, useEffect, useCallback } from 'react';
import "../styles/Carousel.css"; // Ensure this file exists and is properly configured

const Trademyticket_images = [
    'https://media-hosting.imagekit.io//2ee7fd4da96c43c1/Screenshot%202024-12-23%20200749.png?Expires=1735137488&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=d5DhG0avOH6AQtPAb752tyhQ1mvwcQYHEk02SHFX-WMEXQ0PNkMq6RfcR67WgLYAlobhllAWPTKxgTC~q0JAmMlTboL1MRkrjJ2cNVB~jXEloxr3sVwLdKjIp7BgdJLFZ~vAjzOesUDJOKB6laPpU6hLTySEY~vJm996JYlZt-ecoGMa8NeTUEmteTPAkLutis6j-lDFW-66NPRNN-82Et48a~kLR6u6EtAYpJInUDBLcECj5Gvc4~xbBlYBkhbkBh68r4Gq6VZgQGbqPQLbk1BPjiLbJNqLzJnZBM1-wHoJGD~AwWbcfclCjiojcj4plvkRG2jRNyEisGunEaDgcQ__',
    'https://via.placeholder.com/600x300?text=Image+2',
    'https://media-hosting.imagekit.io//2ee7fd4da96c43c1/Screenshot%202024-12-23%20200749.png?Expires=1735137488&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=d5DhG0avOH6AQtPAb752tyhQ1mvwcQYHEk02SHFX-WMEXQ0PNkMq6RfcR67WgLYAlobhllAWPTKxgTC~q0JAmMlTboL1MRkrjJ2cNVB~jXEloxr3sVwLdKjIp7BgdJLFZ~vAjzOesUDJOKB6laPpU6hLTySEY~vJm996JYlZt-ecoGMa8NeTUEmteTPAkLutis6j-lDFW-66NPRNN-82Et48a~kLR6u6EtAYpJInUDBLcECj5Gvc4~xbBlYBkhbkBh68r4Gq6VZgQGbqPQLbk1BPjiLbJNqLzJnZBM1-wHoJGD~AwWbcfclCjiojcj4plvkRG2jRNyEisGunEaDgcQ__',
    'https://via.placeholder.com/600x300?text=Image+4',
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
