import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
function Ratings(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Ratings</h1>
                    <p className="main-description">See All your ratings here</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Ratings;