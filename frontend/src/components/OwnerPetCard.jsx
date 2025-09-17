import React from "react";
import binIcon from "../assets/bin.png";

const OwnerPetCard = ({ pet, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/delete/${pet._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete pet");
      }

      alert("Pet deleted successfully");
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      alert("Error deleting pet: " + error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#a4897a] backdrop-blur-md border-[1.5px] border-amber-950 rounded-xl shadow-md p-6 items-center md:items-start space-y-5 md:space-y-0 md:space-x-6 hover:shadow-lg transition"
    style={{
    background:  ' linear-gradient(135deg, rgba(125, 89, 70, 0.83) 0%, #e9d9c1 100%)',
  }}>
      {/* Pet Image */}
      <div className="w-33 h-33 rounded-full border-4 border-[#544d46d3] overflow-hidden mt-3">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pet Details */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">{pet.name}</h3>
          <span
            title={pet.vaccineStatus ? "Vaccinated" : "Not Vaccinated"}
            className="text-xs"
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
          <p>Location: {pet.location.address || "Unavailable"}</p>
        </div>

        <p className="text-white text-sm">Traits: {pet.description}</p>

        {/* Adoption Status + Delete Button */}
        <div className="mt-2 flex justify-between items-center gap-3">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              pet.adopted
                ? "bg-amber-400/70 text-white"
                : "bg-green-200/75 text-green-800"
            }`}
          >
            {pet.adopted ? "Adopted" : "Available"}
          </span>

          {!pet.adopted && (
            <button onClick={handleDelete} title="Delete Pet">
              <img
                src={binIcon}
                alt="Delete"
                className="w-7 h-6 hover:opacity-80 transition"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerPetCard;
