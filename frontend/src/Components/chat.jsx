import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "../styles/chat.css";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const MessageDropdown = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const [user, setUser] = useState(false);
  
  // Checking user is Login or not
  const handleUser = async () => {
      try {
          const response = await fetch('/verify', {
              method: 'GET',
              credentials: 'include',
          });

          const result = await response.json();

          if (result.success) {
              setUser(true);
              socket.emit("join", result.username); // Send the username when joining
          } else {
              setUser(false);
          }
      } catch (err) {
          console.log(err);
      }
  };

  // To Check when user get's logged out, [] treated as a dependency array
  useEffect(() => {
      handleUser();

      const interval = setInterval(() => {
          handleUser();
      }, 5000);
      
      return () => {
          clearInterval(interval);
      };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
        console.log("Message received:", data);
        setMessages((prevMessages) => [
            ...prevMessages,
            `${data.recipient}: ${data.message}`, // Adjust rendering logic as needed
        ]);
    });

    return () => {
        socket.off("receive_message");
    };
}, []);


  

  const handleSendMessage = () => {
    if (recipient && message) {
      setMessages((prevMessages) => [
          ...prevMessages,
          `Me: ${message}`, // Show 'Me' for sender's messages
      ]);
      // Send the private message to the server
      socket.emit("send_message", { recipient, message });
      setMessage(""); // Clear message input
    }
  };

  const handleLogin = () => {
    navigate('/SignIn')
  };

  return (
    <div>
      {!user ? (
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Recipient username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>

          <div>
            <h3>Messages:</h3>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDropdown;