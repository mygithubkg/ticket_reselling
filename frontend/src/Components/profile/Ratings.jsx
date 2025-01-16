import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
import { Link } from "react-router-dom";
function Ratings(){
    return (
        <div>
            <div className="commoncontainer">
            
              <Link to="/profile1"><div className="back">Back</div></Link>
                <ProfileBox />
            
                <div className="contain">
                    <h1 className="main-heading">Ratings</h1>
                    <p className="main-description">See All your ratings here</p>
                </div>
            </div>
        </div>
    );
}

export default Ratings;