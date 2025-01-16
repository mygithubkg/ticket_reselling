import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
import { Link } from "react-router-dom";

function Wallet(){
    return (
        <div>
            <div className="commoncontainer">
        
              <Link to="/profile1"><div className="back">Back</div></Link>
                <ProfileBox />
                
                <div className="contain">
                    <h1 className="main-heading">Wallet</h1>
                    <p className="main-description">No Wallet Transaction till now</p>
                </div>
            </div>
        </div>
    );                      
}

export default Wallet;
