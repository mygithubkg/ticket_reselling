import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function Manage() {
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Manage Account</h1>
                    <p className="main-description">Effortlessly Manage Your Account</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Manage;
