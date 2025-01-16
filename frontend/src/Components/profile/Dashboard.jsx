import React, { useEffect, useState } from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";
import { Link } from "react-router-dom";

function Dashboard() {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const [status,setstatus] = useState(false);

    const status_account = async() => {
        try{
            const response = await fetch(`${API_BASE_URL}/verify/account`,{
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok){
                const result = await response.json();
                if (result.success){
                    setstatus(true);
                }
                else{
                    setstatus(false);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        status_account();
    },[])






    const handleVerifyClick = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/verify/sendotp`, {
                method: "POST",
                credentials: "include",
            });
            console.log(response);
            if (response.ok) {
                setShowOtpInput(true);
            } else {
                console.error("Verification failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleOtpSubmit = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/verify/otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp }),
                credentials: 'include' ,
            });
            const result = await response.json();
            console.log(response)
            if (result.success) {
                alert("Account Verifed successfully");
                setShowOtpInput(false);
            } else {
                console.log(result.message)
                alert(result.message);
                setShowOtpInput(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div>
            <div className="commoncontainer">
            
              <Link to="/profile1"><div className="back">Back</div></Link>
                <ProfileBox />
                
                <div className="contain">
                    <div>
                        <h1 className="main-heading">Verify Yourself</h1>
                    </div>
                    {status ? (
                        <div>You are a verified user</div>
                    ) : (
                        <div>
                            <button onClick={handleVerifyClick} className="main-description">
                                Verify Yourself
                            </button>
                            {showOtpInput && (
                                <div>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        placeholder="Enter OTP"
                                    />
                                    <button onClick={handleOtpSubmit}>Submit OTP</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
    
export default Dashboard;