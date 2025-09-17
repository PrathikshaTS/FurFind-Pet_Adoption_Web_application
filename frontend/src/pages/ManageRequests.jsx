import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const OwnerRequests = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [orders, setOrders] = useState([]);
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
          `${import.meta.env.VITE_BACKEND_URL}/api/users/viewRequests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data.orders);
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

  const handleDecision = async (orderId, decision) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/respondRequest/${orderId}`,
        { status: decision },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the status in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: decision }
            : order.pet._id ===
              prevOrders.find((o) => o._id === orderId).pet._id
            ? { ...order, status: "rejected" }
            : order
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong"
      );
    }
  };

  return (
    <div
      className="backdrop-blur-md min-h-screen flex flex-col"
      style={{
        background: "#eae4d5",
      }}
    >
      {/* Navbar */}
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

      {/* Content */}
      <div className="p-6 ">
        <h1 className="text-3xl  mb-4 text-gray-900/90 text-center">
          Adoption Requests for Your Pets
        </h1>

        {loading ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-xl  mt-10 text-center text-gray-900/90">
            No adoption requests found for your pets.
          </p>
        ) : (
          <div className="space-y-5 flex flex-col items-center max-h-[510px] overflow-y-auto scrollbar-amber">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#a4897a] border border-slate-500 rounded-2xl p-4 shadow max-w-xl w-full  hover:shadow-gray-500 transition duration-300 mx-auto"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order.pet.imageUrl}
                    alt={order.pet.name}
                    className="w-32 h-32 rounded-lg border-2 border-gray-400 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {order.pet.name}
                    </h2>
                    <p className="text-sm text-white">
                      Category: {order.pet.category}
                    </p>
                    <p className="text-sm text-white">
                      Requested by: {order.requester.username}
                    </p>
                    <p className="text-sm text-white">
                      Reason: {order.reason}
                    </p>
                    <p className="text-sm text-white">
                      Status:{" "}
                      <span className={"text-yellow-300"}>
                        {order.status}...
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-100">
                      Requested At:{" "}
                      {new Date(order.requestedAt).toLocaleString()}
                    </p>
                    {order.status === "pending" && (
                      <div className="mt-3 space-x-3">
                        <button
                          onClick={() => handleDecision(order._id, "accepted")}
                          className="px-3 py-1 bg-blue-900/60 border hover:bg-blue-950 text-white rounded-md text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(order._id, "rejected")}
                          className="px-3 py-1 bg-red-800 hover:bg-red-900 border text-white rounded-md text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OwnerRequests;
