import { useEffect, useState } from "react";
import axios from "axios";

const PetCard = ({ pet, setSelectedPetId }) => {
  const [city, setCity] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setReason("");
  };

  return (
    <div className="flex flex-col md:flex-row  backdrop-blur-md rounded-xl border-[1.5px] border-amber-950 hover:shadow-2xl transition p-3 items-center  md:items-start space-y-6 md:space-y-0 md:space-x-6 "
    style={{
    background: ' linear-gradient(135deg, rgba(90, 60, 40, 0.9) 0%, #e9d9c1 100%)',
  }}>
      {/*PEt Image */}
      <div className="w-33 h-33 rounded-full border-4 border-[#462b09] overflow-hidden mt-5">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pet Details*/}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">{pet.name}</h3>
          <span
            title={pet.vaccineStatus ? "Vaccinated" : "Not Vaccinated"}
            className="text-xs p-x-4 text-white"
          >
            {pet.vaccineStatus ? "💉 Vaccinated" : "⚠️ Not Vaccinated"}
          </span>
        </div>
        <div className="text-white mt-2 text-sm">
          <p>Breed: {pet.breed}</p>
          <p>
            Age: {pet.age} {pet.age === 1 ? "yr" : "yrs"}
          </p>
          <p>Gender: {pet.gender}</p>
        </div>

        <p className="text-white text-sm">
          Location: {pet.location.address || "Unavailable"}
        </p>
        <p className="text-white text-sm">Traits: {pet.description}</p>

        {/* Buttons */}
        <div className="mt-2 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            className="bg-blue-950/80 border hover:bg-blue-950 text-white px-2 py-2 rounded-lg  transition-all duration-200 text-sm w-full sm:w-auto"
            onClick={openModal}
          >
            Request to Adopt
          </button>
          <button
            onClick={() => setSelectedPetId(pet._id)}
            className="bg-slate-700 text-white px-2 py-2 rounded-lg hover:bg-slate-800 border transition-all duration-200 text-sm w-full sm:w-auto"
          >
            Chat with Shelter
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-[#7d5946] shadow-2xl border border-white/20 rounded-2xl p-4 w-full max-w-md space-y-2 animate-fadeIn">
            <h2 className="text-xl font-bold text-white/80 drop-shadow-sm">
              Why do you want to adopt {pet.name}?
            </h2>
            <textarea
              className="w-full p-2 rounded-lg border border-gray-300 bg-gray-200 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none"
              rows={4}
              placeholder="Write your reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-600 border-1 border-white text-white rounded-lg hover:bg-gray-700 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-950/70 border hover:bg-blue-950 text-white rounded-lg shadow-sm transition"
                onClick={async () => {
                  if (!reason.trim()) {
                    alert("Reason is required.");
                    return;
                  }
                  try {
                    const token = localStorage.getItem("token");
                    await axios.post(
                      `${import.meta.env.VITE_BACKEND_URL}/api/users/request/${
                        pet._id
                      }`,
                      { reason },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    alert("Adoption request submitted!");
                    closeModal();
                  } catch (err) {
                    alert(
                      err?.response?.data?.error ||
                        err?.message ||
                        "Failed to submit request"
                    );
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCard;
