import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/chat.css";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const ChatSystem = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [recipientId, setRecipientId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const [newUsername, setNewUsername] = useState("");

  // Verify if the user is logged in
  const handleUser = async () => {
    try {
      const response = await fetch("/verify", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        setUser(true);
        socket.emit("join", { username: result.username, userId: result.userId });
      } else {
        setUser(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleUser();

    const interval = setInterval(() => {
      handleUser();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("update_users", (users) => {
      const formattedUsers = users.map((user) => ({
        username: user.username,
        userId: user.userId,
      }));
      setConnectedUsers(formattedUsers);
    });

    return () => {
      socket.off("update_users");
    };
  }, []);

  const handleSendMessage = () => {
    if (!recipient || !recipientId) {
      alert("Please select a user to chat with.");
      return;
    }

    if (message) {
      setMessages((prev) => [...prev, `Me: ${message}`]);
      socket.emit("send_message", { recipientId, message });
      setMessage("");
    }
  };

  const handleSelectUser = async (username, userId) => {
    setRecipient(username);
    setRecipientId(userId);

    try {
      const response = await fetch(`/getMessages?recipientId=${userId}`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setMessages(result.messages.map((msg) => `${msg.sender}: ${msg.message}`));
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleAddUser = async () => {
    if (!newUsername) {
      alert("Username cannot be empty!");
      return;
    }

    try {
      const response = await fetch("/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Socket-ID": socket.id, // Pass socket.id in the headers
        },
        body: JSON.stringify({ username: newUsername }),
      });

      const result = await response.json();
      if (result.success) {
        alert("User added successfully!");
        setConnectedUsers((prevUsers) => [
          ...prevUsers,
          { username: result.user.username, userId: result.user.userId },
        ]);
        setNewUsername(""); // Clear the input field
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = () => {
    navigate("/SignIn");
  };

  return (
    <div className="chat-container">
      {!user ? (
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="chat-layout">
          <div className={`users-list ${showUsers ? "visible" : "hidden"}`}>
            {showUsers && (
              <>
                <div className="add-user">
                  <h4>Add New User</h4>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button onClick={handleAddUser}>Add User</button>
                </div>
                <ul>
                  {connectedUsers.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectUser(user.username, user.userId)}
                      className={recipient === user.username ? "active-user" : ""}
                    >
                      {user.username}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="chat-screen">
            <div className="chat-header">
              <h3>Chat with {recipient || "Select a user"}</h3>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  {msg}
                </div>
              ))}
            </div>

            {recipient && (
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystem;
  