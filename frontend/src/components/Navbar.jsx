import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const role = localStorage.getItem("role"); // Get the role 

  return (
    <nav className="bg-[#7d5946] shadow-lg px-6 py-4 flex justify-between items-center h-16 border-b-2 border-amber-900">
      {/* Logo */}
      <Link
        to={role === "owner" ? "/dashboard" : "/home"}
        className="flex items-center space-x-2 text-2xl font-semibold text-white"
      >
        <img src={logo} alt="FurFind Logo" className="w-11 h-11 rounded-full hover:scale-105" />
        <span>FurFind</span>
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 text-white font-medium">
        {role === "owner" ? (
          <>
          <Link
            to="/manage-requests"
            className="hover:text-amber-400 transition duration-300"
          >
            Manage Requests
          </Link>

          <Link
        to="/myChats"
        className="hover:text-amber-400 transition duration-300"
      >
        My Chats
      </Link>
          </>
          
        ) : (
          <>
      <Link
        to="/my-requests"
        className="hover:text-amber-400 transition duration-300"
      >
        My Requests
      </Link>

      {/* 🆕 Pet Care Guide link for users */}
      <Link
        to="/pet-care"
        className="hover:text-amber-400 transition duration-300"
      >
        Paw Guide
      </Link>
      <Link
        to="/chatBot"
        className="hover:text-amber-400 transition duration-300"
      >
        Ask ChatBot
      </Link>
    </>
          

        )}

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 ml-4 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
