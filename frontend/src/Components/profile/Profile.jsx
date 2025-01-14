import React, { useState, useEffect } from "react";
import ProfileBox from "./ProfileBox";
import "../../styles/profile/common.css";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const [userDetails, setUserDetails] = useState({
        fullName: "",
        age: "",
        email: "",
        role: "Buyer",
        gender: "Male",
        phoneNumber: "",
        otherDetails: "",
    });
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/usersinfo`, {
                    method: 'POST',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                if (data) {
                    setUserDetails({
                        fullName: data.full_name || "",
                        age: data.age || "",
                        email: data.username || "",
                        role: data.want_to || "Buyer",
                        gender: data.gender || "Male",
                        phoneNumber: data.phone_number || "",
                        otherDetails: data.bio || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Optional: Handle unauthenticated users
            }
        };
        fetchData();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async(e) => {
        e.preventDefault();
        const full_name = userDetails.fullName;
        const want_to = userDetails.role;
        const phone_number = userDetails.phoneNumber;
        const gender = userDetails.gender;
        const age = userDetails.age;
        const bio = userDetails.otherDetails;
        const username = userDetails.email;
        const response = await fetch(`${API_BASE_URL}/save`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username,full_name,bio,age,want_to,gender,phone_number}),
        })
        const result = await response.json();
        if (result.success){
            alert("Profile details saved successfully!");
            setIsEditing(false);
        }
        else{
            alert(result.message);
        }
    };

    return (
        <div>
            <div className="commoncontainer">
                <ProfileBox />
                <div className="contain">
                    <div>
                        <h1 className="main-heading">Profile Details</h1>
                        <p className="main-description">Edit Your Details here</p>
                    </div>
                    <div>
                        {isEditing ? (
                            <form className="profile-form">
                                <div className="form-group-profile">
                                    <label className="form-labels">Full Name:</label>
                                    <input
                                        className="form-inputs"
                                        type="text"
                                        name="fullName"
                                        value={userDetails.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Age:</label>
                                    <input
                                        className="form-inputs"
                                        type="number"
                                        name="age"
                                        value={userDetails.age}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Email:</label>
                                    <input
                                        className="form-inputs"
                                        type="email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Role:</label>
                                    <select
                                        className="form-select"
                                        name="role"
                                        value={userDetails.role}
                                        onChange={handleChange}
                                    >
                                        <option value="Buyer">Buyer</option>
                                        <option value="Seller">Seller</option>
                                        <option value="Buyer and Seller">Buyer and Seller</option>
                                    </select>
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Gender:</label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={userDetails.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Phone Number:</label>
                                    <input
                                        className="form-inputs"
                                        type="text"
                                        name="phoneNumber"
                                        value={userDetails.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group-profile">
                                    <label className="form-labels">Bio:</label>
                                    <textarea
                                        className="form-text"
                                        name="otherDetails"
                                        value={userDetails.otherDetails}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button type="button" onClick={handleSave} className="save-button">
                                    Save
                                </button>
                            </form>
                        ) : (
                            <div className="profile-details">
                                <p className="detaile_in_details">
                                    <p><strong>Full Name:</strong> {userDetails.fullName}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Age:</strong> {userDetails.age}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Email:</strong> {userDetails.email}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Role:</strong> {userDetails.role}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Gender:</strong> {userDetails.gender}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
                                </p>
                                <p className="detaile_in_details">
                                    <p><strong>Bio:</strong> {userDetails.otherDetails}</p>
                                </p>
                                <button onClick={handleEditToggle} className="edit-button">
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
