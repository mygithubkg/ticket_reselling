import React from "react";
import Footer from "../Footer";
import ProfileBox from "./ProfileBox";
import "../../styles/profile/common.css";
import { Link } from "react-router-dom";
function CurrentListing(){
    return (
        <div>
            <div className="commoncontainer">
            
              <Link to="/profile1"><div className="back">Back</div></Link>
                <ProfileBox />
                
                <div className="contain">
                    <h1 className="main-heading">Current Listing</h1>
                    <p className="main-description">All your Active Listings</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentListing;