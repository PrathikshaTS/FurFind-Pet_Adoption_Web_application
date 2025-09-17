import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const UserRequests = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/myRequests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(res.data.requests);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Something went wrong"
        );
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div
      className="backdrop-blur-md min-h-screen flex flex-col"
      style={{
        background: "#eae4d5",
      }}
    >
      {/* Navbar */}
      <nav className="bg-[#7d5946] shadow-lg px-6 py-4 flex justify-between items-center h-16 border-b-2 border-amber-900">
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

      {/* Main content */}
      <div className="p-6 ">
        <h1 className="text-3xl  mb-4 text-[#7d5946] text-center">
          My Adoption Requests
        </h1>

        {loading ? (
          <p>Loading your requests...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-xl  mt-10 text-center text-white">
            You have not made any adoption requests yet.
          </p>
        ) : (
          <div className="space-y-5 flex flex-col items-center max-h-[510px] overflow-y-auto scrollbar-amber">
            {requests.map(
              (req) =>
                req.pet && (
                  <div
                    key={req._id}
                    className="bg-[#7d5946d3] border border-slate-500 rounded-2xl p-4 shadow max-w-xl w-full   hover:shadow-lg transition duration-300 mx-auto"
                  >
                    <div className="flex items-center space-x-4">
                      {req.pet.imageUrl && ( // Add this null check
                        <div className="w-33 h-33 rounded-full border-4 border-[#462b09] overflow-hidden mt-2">
                          <img
                            src={req.pet.imageUrl}
                            alt={req.pet.name || "Pet image"} // Add fallback
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold text-white">
                          {req.pet?.name || "Unknown Pet"}{" "}
                          {/* Add optional chaining and fallback */}
                        </h2>
                        <p className="mt-1 text-sm text-white">
                          Category: {req.pet?.category || "Unknown"}{" "}
                          {/* Add optional chaining and fallback */}
                        </p>
                        <p className="text-sm text-white">
                          Owner: {req.owner?.username || "Unknown"}{" "}
                          {/* Add optional chaining */}
                        </p>
                         <p className="text-sm text-white">
                      Reason: {req.reason}
                    </p>
                    <p className=" text-sm text-white">
                      Status:{" "}
                      <span
                        className={
                          req.status === "accepted"
                            ? "text-green-400"
                            : req.status === "rejected"
                            ? "text-red-400"
                            : "text-yellow-300"
                        }
                      >
                        {req.status}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-200">
                      Requested At: {new Date(req.requestedAt).toLocaleString()}
                    </p>
                    {req.respondedAt && (
                      <p className="text-xs text-gray-200">
                        Responded At:{" "}
                        {new Date(req.respondedAt).toLocaleString()}
                      </p>    )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserRequests;
