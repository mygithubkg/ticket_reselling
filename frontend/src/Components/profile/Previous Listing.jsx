import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
import { Link } from "react-router-dom";

function PreviousListing(){
    return (
        <div>
            <div className="commoncontainer">
           
              <Link to="/profile1"><div className="back">Back</div></Link>
                <ProfileBox />
            
                <div className="contain">
                    <h1 className="main-heading">Previous Listing</h1>
                    <p className="main-description">All your InActive Listings</p>
                </div>
            </div>
        </div>
    );
}

export default PreviousListing;