import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function Profile(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Details</h1>
                    <p className="main-description">Your Profile Details</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;