import React from "react";
import Footer from "../Footer";
import ProfileBox from "./ProfileBox";
import "../../styles/profile/common.css";
function CurrentListing(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Current Listing</h1>
                    <p className="main-description">All your Active Listings</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CurrentListing;