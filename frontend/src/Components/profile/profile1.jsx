import React from "react";
import "../../styles/profile/Profilebox.css";
import {useNavigate} from "react-router-dom";

function Profile1(){
    const Navigate = useNavigate();

    const handleProfile = ()=>{
        Navigate('/profile')
    }
    const handleDashboard = ()=>{
        Navigate('/profile/dashboard')
    }
    const handleOrders = ()=>{
        Navigate('/profile/orders')
    }
    // const handleWallet = ()=>{
    //     Navigate('/profile/wallet')
    // }
    const handleRecentEvents = ()=>{
        Navigate('/profile/recentevents')
    }
    const handleCurrentListing = ()=>{
        Navigate('/profile/currentlisting')
    }
    const handlePreviousListing = ()=>{
        Navigate('/profile/previouslisting')
    }
    const handleRatings = ()=>{
        Navigate('/profile/ratings')
    }
    const handleManage = ()=>{
        Navigate('/profile/manage')
    }
    return (
    
        <div className="abc">
        <div className="profile_container1">
            <button className="profile" onClick={handleProfile}>Profile</button>
            <button onClick={handleRatings}className="profile">Your Ratings</button>
            <button className="profile" onClick={handleDashboard}>Dashboard</button>
            <button className="profile" onClick={handleOrders}>Orders</button>
            {/* <button className="profile" onClick={handleWallet}>Wallet</button> */}
            <button className="profile" onClick={handleRecentEvents}>Recent Events</button>
            <button className="profile" onClick={handleCurrentListing}>Current Listing</button>
            <button className="profile" onClick={handlePreviousListing}>Previous Listing</button>
            <button className="profile" onClick={handleManage}>Manage Account</button>
        </div></div>
    );
}

export default Profile1;
