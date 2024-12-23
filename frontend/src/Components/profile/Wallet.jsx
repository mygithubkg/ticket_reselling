import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function Wallet(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Wallet</h1>
                    <p className="main-description">No Wallet Transaction till now</p>
                </div>
            </div>
            <Footer />
        </div>
    );                      
}

export default Wallet;
