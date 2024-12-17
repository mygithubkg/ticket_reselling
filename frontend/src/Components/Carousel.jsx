import React, { useState } from 'react';
import "../styles/Carousel.css" // For styling

// Images to display
const Trademyticket_images = [
    'https://via.placeholder.com/600x300?text=Image+1',
    'https://via.placeholder.com/600x300?text=Image+2',
    'https://via.placeholder.com/600x300?text=Image+3',
    'https://via.placeholder.com/600x300?text=Image+4',
];


function Carousel(){
    // Setting initial state and defining method to move Images
    const [curr_state, Move_state] = useState(0);

    // Moves to previous slide
    const prev_state = () => { 
        Move_state((state) => (state - 1 + Trademyticket_images.length) % Trademyticket_images.length);
    }

    // Move to next slide
    const next_state = () => { 
        Move_state((state) => (state + 1) % Trademyticket_images.length);
    }

    return (
        <div className="slider-container">
            <button className="nav-button left" onClick={prev_state}>&#10094;</button>
            <img className="slider-image" src={Trademyticket_images[curr_state]} alt={`Image ${curr_state}`} />
            <button className="nav-button right" onClick={next_state}>&#10095;</button>
        </div>
        

    );
}

export default Carousel;
