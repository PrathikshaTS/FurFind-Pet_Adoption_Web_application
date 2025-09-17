import React, { useState, useEffect } from "react";
import heroSection from "../assets/heroSection.png";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import Footer from "../components/Footer";
import axios from "axios";
import Chat from "../components/Chat";
import { motion } from "framer-motion";
import filter from "../assets/filter.png";
const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [nearby, setNearby] = useState(false);
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleNearbyChange = (e) => setNearby(e.target.checked);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Get user location when "Nearby Pets" is ticked
  useEffect(() => {
    if (nearby) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("Location access denied", err);
        }
      );
    }
  }, [nearby]);

  // Fetch pets
  const fetchPets = async () => {
    try {
      let query = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/users/allPets?adopted=false`;

      if (category !== "ALL") query += `&category=${category}`;
      if (nearby && location.lat && location.lng) {
        query += `&lat=${location.lat}&lng=${location.lng}&distance=80000`;
      }

      const res = await axios.get(query, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(res.data.pets);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setPets([]);
    }
  };

  // Initial fetch + Polling every 5 seconds
  useEffect(() => {
    fetchPets(); // Fetch immediately on load

    const interval = setInterval(fetchPets, 5000); // 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, [category, nearby, location]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#eae4d5",
      }}
    >
      <Navbar />
      {/* Hero-section */}
      <div className="relative w-full flex justify-center items-center bg-[#eae4d5]">
        <img
          src={heroSection}
          alt="Adopt Love Save a Life"
          className="w-full max-w-[1366px] max-h-[470px] object-contain ml-20 md:ml-50"
        />

        {/* Text Overlay */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute left-10 md:left-60 top-50 transform -translate-y-1/2 text-left max-w-md"
        >
          <h1 className="text-4xl md:text-7xl   font-bold text-[#7d4f00] drop-shadow-lg">
            Adopt Love.
            <br />
            Save a Life.
          </h1>
          
          <p className="mt-4 text-[#7d4f00] text-lg md:text-xl font-semibold font-serif">
            Thousands of pets are waiting for a forever home. Browse, connect,
            and make a difference today.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow ">
        <div className="w-full md:w-1/4 p-4">
          <div className="bg-white/85 backdrop-blur-md text-[#7d5946] p-6 rounded-xl shadow-lg border border-white/30">
            <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-1">
              <img src={filter} alt="Filter Icon" className="w-6 h-6 inline-block" />
              Filter
            </h2>

            <div className="mb-4">
              <label htmlFor="category" className="block mb-2 text-lg">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full p-2 bg-[#7d5946] text-white rounded-md"
              >
                <option value="ALL">All</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
                <option value="Bird">Birds</option>
              </select>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="nearby"
                checked={nearby}
                onChange={handleNearbyChange}
                className="mr-2 accent-[#7d5946] "
              />
              <span className="text-lg">Show nearby pets</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col space-y-4 max-h-[510px] overflow-y-auto scrollbar-amber">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <PetCard
                key={pet._id}
                pet={pet}
                setSelectedPetId={setSelectedPetId}
              />
            ))
          ) : (
            <p className="text-gray-100 text-3xl text-center">No pets found.</p>
          )}
        </div>
        <div className=" md:block md:w-1/3 p-1 max-h-[510px] overflow-y-auto scrollbar-amber   border-l-2 border-gray-700">
          {/* Chat component */}

          {selectedPetId ? (
            <Chat
              petId={selectedPetId}
              userToken={token}
              userRole="user"
              username={username}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg h-full text-white px-4 border-2 border-[#7d5946] bg-[#fdf6ec]">
              <div className=" p-6 rounded-2xl shadow-lg text-center max-w-xs bg-[#7d5946]">
                <h2 className="text-xl font-semibold mb-2">
                  No Chat Selected !
                </h2>
                <p className="text-sm text-slate-200">
                  Click{" "}
                  <span className="font-medium text-white">
                    "Chat with Shelter"
                  </span>{" "}
                  on a pet card to start chatting.
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

export default Home;
