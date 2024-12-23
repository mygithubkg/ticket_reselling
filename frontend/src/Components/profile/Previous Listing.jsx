import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function PreviousListing(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Previous Listing</h1>
                    <p className="main-description">All your InActive Listings</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PreviousListing;