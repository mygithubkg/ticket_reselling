// import React, { useState, useEffect, useRef } from "react";
// // import { io } from "socket.io-client";
// import "../styles/chat.css";

// const socket = io("http://localhost:5000");

// const MessageDropdown = () => {
//     // to catch all listeners
//     socket.onAny((event, ...args) => {
//         console.log(event, args);
//     });

//     const [isOpen, setIsOpen] = useState(false);
//     const [newMessage, setNewMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const dropdownRef = useRef(null);


//     useEffect(()=>{
//         socket.on("receive_message", (data)=>{
//             setMessages((prevMessages)=>[
//                 ...prevMessages,
//                 `${data.user}: ${data.text}`
//             ]);
//         });

//         return ()=>{
//             socket.off("receive_message");
//         }
//     });
//     useEffect(() => {
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//     };
//     }, []);

//     // Handle sending messages
//     const handleSendMessage = (newMessage) => {
//     if (newMessage.trim()) {
//         socket.emit("message", { user: "Me", text: newMessage });
//         setNewMessage(""); // Clear input after sending
//     }
//     };

//     // Listen for incoming messages
//     useEffect(() => {
//     socket.on("message", (message) => {
//         console.log("Received message:", message); // Log received message
//         setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//         socket.off("message");
//     };
//     }, []);

//     return (
//     <div className="message-dropdown" ref={dropdownRef}>
//         <button className="message-toggle" onClick={() => setIsOpen(!isOpen)}>
//         💬 Messages
//         </button>

//         {isOpen && (
//         <div className="message-dropdown-content">
//             <div className="message-list">
//             {messages.map((msg, index) => (
//                 <div key={index} className="message-item">
//                 <strong>{msg.user}:</strong> {msg.text}
//                 </div>
//             ))}
//             </div>
//             <div className="message-input-container">
//             <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={() => handleSendMessage(newMessage)}>Send</button>
//             </div>
//         </div>
//         )}
//     </div>
//     );
//     };

//     export default MessageDropdown;
