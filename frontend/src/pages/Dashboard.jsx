import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import OwnerPetCard from "../components/OwnerPetCard";

const Dashboard = () => {
  const [pets, setPets] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [vaccineStatus, setVaccineStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Handle image upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const fetchMyPets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/getPets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPets(res.data.pets);
    } catch (err) {
      console.error(
        "Error fetching your pets:",
        err.response?.data || err.message
      );
      setPets([]);
    }
  };

  useEffect(() => {
    fetchMyPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch coordinates using pincode
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`,
        {
          headers: {
            "User-Agent": "MyPetAdoptionApp",
          },
        }
      );

      const data = await response.json();

      if (!data || data.length === 0) {
        alert("Invalid pincode or location not found");
        return;
      }

      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("category", category);
      formData.append("breed", breed);
      formData.append("description", description);
      formData.append("vaccineStatus", vaccineStatus ? "true" : "false");
      formData.append("address", address);
      formData.append("pincode", pincode);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", selectedFile); // pet image

      const token = localStorage.getItem("token");
      // Send to backend
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert("Pet added successfully!");
        // Reseting form fields
        setName("");
        setAge("");
        setGender("");
        setCategory("");
        setBreed("");
        setDescription("");
        setVaccineStatus(false);
        setSelectedFile(null);
        setAddress("");
        setPincode("");
        fetchMyPets();
      } else {
        alert(result.error || "Failed to add pet");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="backdrop-blur-md  min-h-screen flex flex-col"
      style={{
        background: "#d9ccad",
      }}
    >
      <Navbar />
      <div className="flex flex-grow p-3 space-x-6 bg-white/20 backdrop-blur-xs">
        {/* Left section */}
        <div className="md:w-1/3 bg-gradient-to-br from-[#fdf6ec] via-[#bfa97a]/60 to-[#7d4f00]/30 backdrop-blur-xl shadow-2xl border border-amber-200 rounded-2xl p-8 max-h-[540px] overflow-y-auto scrollbar-amber">
          <h2 className="text-3xl font-bold text-amber-700/70 mb-8 text-center tracking-wide drop-shadow-lg flex items-center justify-center gap-2">
            
            ✎ Add a New Pet
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter pet's name"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter pet's age"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                required
              >
                <option value="">Select Category</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Breed
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter pet's breed"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter pet's description"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Vaccine Status
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={vaccineStatus}
                  onChange={() => setVaccineStatus(!vaccineStatus)}
                  className="w-5 h-5 accent-amber-500"
                />
                <span className="ml-3 text-amber-900">Vaccinated</span>
              </div>
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Upload Pet Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 bg-white/90 rounded-xl shadow"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Address (City)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-3 bg-white/90 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 transition"
                placeholder="Enter pincode"
                required
              />
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-amber-500 text-white py-3 px-8 text-base rounded-xl hover:bg-amber-600 transition font-bold shadow-lg"
              >
                Add Pet
              </button>
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="w-2/3 ">
          <h2 className="text-xl font-semibold mb-3 text-[#71462fd3] text-center">
            Pets You've Added
          </h2>
          <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-200">
            {pets.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                {pets.map((pet) => (
                  <OwnerPetCard
                    key={pet._id}
                    pet={pet}
                    onDelete={fetchMyPets}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No pets uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
