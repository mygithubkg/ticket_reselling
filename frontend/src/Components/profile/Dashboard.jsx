import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
function Dashboard(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Dashboard</h1>
                    <p className="main-description">Nothing Here</p>
                </div>
            </div>
        </div>
        


    );
}

export default Dashboard;