import React, { useState } from "react";
import ProfileBox from "./ProfileBox";
import Footer from "../Footer";
import "../../styles/profile/common.css";

function Dashboard() {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");

    const handleVerifyClick = async () => {
        try {
            const response = await fetch("/verify/sendotp", {
                method: "POST",
                credentials: "include",
            });

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
            const response = await fetch("/verify/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp }), 
            });
            const result = await response.json();
            if (result.success) {
                alert("Account Verifed successfully");
            } else {
                alert("OTP verification failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <div>
                        <h1 className="main-heading">Settings</h1>
                    </div>
                    <div>
                        <button onClick={handleVerifyClick} className="main-description">Verify Yourself</button>
                    </div>
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
            </div>
        </div>
    );
}

export default Dashboard;