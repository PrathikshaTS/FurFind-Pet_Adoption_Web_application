import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import petImage from "../assets/heroBanner.jpg";
import backgroundImage from "../assets/loginBackground.webp";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          username,
          password,
          role,
        }
      );

      setError("");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2  shadow-xl rounded-xl overflow-hidden w-[90%] max-w-4xl h-[520px]">
        {/* Left side */}
        <div
          className="flex flex-col items-center justify-center p-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${petImage})` }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            className="text-4xl font-semibold mb-4 text-gray-100 shadow-lg text-center"
          >
            Start Your Journey With a New Friend!
          </motion.h1>
        </div>

        {/* Right side */}
        <div className="p-10 bg-white/50 backdrop-blur-lg rounded-r-xl shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
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
              <label className="block text-sm font-medium text-gray-800 mb-1">
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

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Role
              </label>
              <div className="flex gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-amber-500 "
                  />
                  <span className="ml-2 text-gray-700">User</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={role === "owner"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-amber-500"
                  />
                  <span className="ml-2 text-gray-700">Owner</span>
                </label>
              </div>
            </div>
            {error && <p className="text-red-600 font-sans mt-3">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 bg-amber-500 text-white text-md py-2 rounded-lg hover:bg-amber-600 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-800">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
