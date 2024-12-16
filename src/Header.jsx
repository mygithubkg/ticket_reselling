import React from "react";

function Header(){
    return (
        <div>
            <div className="header_space1">
                <img src ="yes.com" alt="TradeMyTicket logo" />
                <h1>TradeMyTicket</h1>
            </div>
            <div className="header_space2">
                <p>Explore</p>
                <p>How it works!</p>
                <p>Contact Us</p>
            </div>
            <div className="header_space3">
                <p>Sell</p>
                <p>Sign/Register</p>
            </div>
        </div>
    );
}


export default Header;