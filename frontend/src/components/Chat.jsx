import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";
import sendButton from "../assets/sendButton.png";

const Chat = ({ petId, userToken, userRole, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Join the pet's room on mount
  useEffect(() => {
    if (!petId) return;

    socket.emit("joinRoom", petId);

    // Fetch initial chat history
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/chat/${petId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    fetchMessages();

    return () => {
      socket.emit("leaveRoom", petId); // Add this if you implement leaveRoom on server
    };
  }, [petId]);

  // Listen for real-time incoming messages
  useEffect(() => {
    if (!petId) return;

    const handleMessage = (msg) => {
      console.log("Received message:", msg);
      if (msg.petId === petId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [petId]);

  // Send a message
  const handleSend = async () => {
    if (!newMsg.trim()) return;

    const msgData = {
      petId,
      message: newMsg,
      senderRole: userRole,
      sender: { username },
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to DB first
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/chat/${petId}`,
        msgData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Then emit to socket
      socket.emit("sendMessage", msgData);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-white/85 rounded-2xl shadow-xl text-[#7d4f00] border border-[#e0cfa2] relative overflow-hidden">
      <h2 className="text-2xl font-extrabold mb-4 text-[#7d4f00] tracking-wide text-center drop-shadow-sm">
        Chat about this pet
      </h2>
      <div className="flex-grow mb-4 space-y-3 overflow-y-auto scrollbar-amber px-1">
        {messages.map((msg) => (
          <div
            key={msg._id || msg.id}
            className={`px-4 py-2 rounded-2xl max-w-[80%] shadow-md flex flex-col ${
              msg.senderRole === "user"
                ? "bg-gradient-to-l from-[#e0cfa2] to-[#fdf6ec] self-end text-right border border-[#bfa97a]"
                : "bg-gradient-to-r from-[#c4b188] to-[#be9d67] self-start text-left border border-[#e0cfa2]"
            }`}
          >
            <div className={`text-xs font-bold mb-1 ${msg.senderRole === "user" ? "text-[#7d4f00]" : "text-[#fff]"}`}>
              {msg.sender?.username || "Unknown"}
            </div>
            <div className={`text-base ${msg.senderRole === "user" ? "text-[#7d4f00]" : "text-white"}`}>{msg.message}</div>
            <div className={`text-[11px] mt-1 ${msg.senderRole === "user" ? "text-[#bfa97a]" : "text-[#fdf6ec]"}`}>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3 mt-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-grow p-3 rounded-full text-[#7d4f00] border border-[#e0cfa2] bg-[#fdf6ec] placeholder-[#bfa97a] focus:outline-none focus:ring-2 focus:ring-[#bfa97a] transition"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="flex items-center justify-center bg-gradient-to-r from-[#bfa97a] to-[#e7b86a] hover:from-[#e7b86a] hover:to-[#bfa97a] text-white rounded-full w-12 h-12 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#bfa97a]"
        >
          <img src={sendButton} alt="Send" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
