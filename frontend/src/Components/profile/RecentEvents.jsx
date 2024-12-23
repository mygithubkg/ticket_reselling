import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function Recent(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Recent Events</h1>
                    <p className="main-description">Your Recent Searches</p>
                </div>
            </div>
        </div>
    );
}

export default Recent;