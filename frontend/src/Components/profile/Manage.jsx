import React from "react";
import ProfileBox from "./ProfileBox";
import "../../styles/profile/common.css";
import { useNavigate } from "react-router-dom";

function Manage() {

    const Navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const handlelogout = async ()=> {
        const response = await fetch(`${API_BASE_URL}/logout`,{
            method: 'POST',
            credentials: 'include',
        })
        
        const result = await response.json();

        if (result.success){
            Navigate('/');
            alert("Successfully Logout");
        }else{
            alert("Try Again after some time")
        }
    }

    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <div>
                        <h1 className="main-heading">Manage Account</h1>
                        <p className="main-description">Effortlessly Manage Your Account</p>
                    </div>
                    <div className="logout">
                        <button onClick={handlelogout}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manage;
