import React from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
function Orders(){
    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <h1 className="main-heading">Orders</h1>
                    <p className="main-description">All your Recent Orders</p>
                </div>
            </div>
        </div>
    );
}

export default Orders;