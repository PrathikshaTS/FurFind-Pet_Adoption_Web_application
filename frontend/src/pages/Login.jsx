import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import petImage from "../assets/heroBanner.jpg";
import backgroundImage from "../assets/loginBackground.webp";

import { motion } from "framer-motion";
import axios from "axios";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      // console.log("Token:", res.data.token);
      setError("");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.username);

      if (res.data.user.role === "user") {
        navigate("/home");
      } else if (res.data.user.role === "owner") {
        navigate(`/dashboard`);
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  // className="min-h-screen flex items-center justify-center bg-gray-300"
  return (
    <div
      className=" min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2  shadow-xl rounded-xl overflow-hidden w-[90%] max-w-4xl  h-[510px] ">
        {/* Left side */}
        <div
          className="flex flex-col items-center justify-center p-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${petImage})` }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3 }}
            className="text-4xl font-semibold mb-4 text-gray-100 shadow-lg text-center"
          >
            Find Your Fur-Ever Friend Here.
          </motion.h1>
        </div>

        {/* Right side */}
        <div className="p-10 bg-white/40 backdrop-blur-lg rounded-r-xl shadow-md flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-800 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-md font-medium text-gray-800 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 font-sans mt-3">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 bg-amber-500 text-md text-white py-2 rounded-lg hover:bg-amber-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-800">
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
