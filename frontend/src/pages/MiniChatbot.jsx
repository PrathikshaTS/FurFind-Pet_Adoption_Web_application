import React, { useRef } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MiniChatbot = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="backdrop-blur-md min-h-screen flex flex-col"
      style={{
        background: "#eae4d5",
      }}
    >
      <nav className="bg-[#7d5946] shadow-lg px-6 py-4 flex justify-between items-center h-16 border-b-2 border-slate-600">
        <Link
          to={role === "owner" ? "/dashboard" : "/home"}
          className="flex items-center space-x-2 text-xl font-semibold text-white"
        >
          <img
            src={logo}
            alt="FurFind Logo"
            className="w-11 h-11 rounded-full hover:scale-105"
          />
          <span>FurFind</span>
        </Link>
        <div className="space-x-6 text-white font-medium">
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 ml-4 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-xl bg-zinc-900/70 rounded-xl shadow-lg flex flex-col h-[500px] justify-center items-center">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/25/05/20250525051100-8LDX8POW.json"
            title="FurFind Chatbot"
            className="w-full h-full rounded-xl border-none"
            style={{ minHeight: "450px", minWidth: "100%" }}
            allow="microphone;"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default MiniChatbot;