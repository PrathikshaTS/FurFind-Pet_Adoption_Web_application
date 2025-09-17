import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import Chat from "../components/Chat";
const MyChats = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const [pets, setPets] = useState([]);

  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getPets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(res.data.pets);
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };

    if (role === "owner") {
      fetchPets();
    }
  }, [role, token]);

  return (
    <div
      className="backdrop-blur-md min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #1c1c1c 0%, #2c3e50 100%)",
      }}
    >
      {/* Navbar */}
      <nav className="bg-[#7d5946] shadow-lg px-8 py-3 flex justify-between items-center h-18 border-b border-[#e0cfa2] backdrop-blur-md">
        <Link
          to={role === "owner" ? "/dashboard" : "/home"}
          className="flex items-center space-x-3 text-2xl font-bold text-white tracking-wide drop-shadow-sm"
        >
          <img
            src={logo}
            alt="FurFind Logo"
            className="w-12 h-12 rounded-full shadow-md hover:scale-105 transition-transform"
          />
          <span>FurFind</span>
        </Link>
        <div className="space-x-6 text-[#7d4f00] font-semibold">
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 ml-4 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-grow p-6 space-x-8 bg-[#fdf6ec]/80 backdrop-blur-md">
        {/* Pet List Sidebar */}
        <div className="md:w-1/3 bg-white/80 backdrop-blur-md shadow-xl border border-[#e0cfa2] rounded-2xl p-7 max-h-[540px] overflow-y-auto scrollbar-amber">
          <h1 className="text-2xl font-bold mb-7 text-[#7d4f00] text-center tracking-wide">Select a Pet to Chat With Users</h1>
          {pets.length === 0 ? (
            <p className="text-center text-[#bfa97a]">No pets found.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className={`flex flex-row items-center bg-gradient-to-r from-[#eae4d5] to-[#fdf6ec] p-4 rounded-xl shadow-md cursor-pointer border-2 border-transparent hover:border-[#bfa97a] hover:shadow-lg transition duration-300 ${selectedPetId === pet._id ? 'ring-2 ring-[#bfa97a]' : ''}`}
                  onClick={() => setSelectedPetId(pet._id)}
                >
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-16 h-16 border-2 border-[#bfa97a] rounded-full object-cover mr-4 shadow-sm"
                  />
                  <h2 className="text-lg font-bold text-[#7d4f00]">{pet.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Chat Area */}
        <div className="w-2/3 bg-white/80 backdrop-blur-md border border-[#e0cfa2] rounded-2xl max-h-[540px] overflow-y-auto shadow-xl flex flex-col justify-between scrollbar-amber">
          {selectedPetId ? (
            <Chat
              petId={selectedPetId}
              userToken={token}
              userRole="owner"
              username={username}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#7d4f00] px-4">
              <div className="bg-[#fdf6ec] p-8 rounded-2xl shadow-lg text-center max-w-xs border border-[#e0cfa2]">
                <h2 className="text-xl font-bold mb-2">No Chat Selected!</h2>
                <p className="text-sm text-[#bfa97a]">
                  Click <span className="font-semibold text-[#7d4f00]">"Chat with Shelter"</span> on a pet card to start chatting.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyChats;
