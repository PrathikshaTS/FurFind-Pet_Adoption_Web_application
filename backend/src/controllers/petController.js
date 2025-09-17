const Pet = require("../models/petModel.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const addPet = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { name, age, gender, category, breed, description, vaccineStatus, latitude, longitude, address } = req.body;

    const owner = req.user._id; // verifyToken sets req.user

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "Image is required." });
    }

    const uploadResult = await uploadOnCloudinary(req.file.path);
    console.log("Cloudinary upload result:", uploadResult);

    if (!uploadResult) {
      console.error("Cloudinary upload failed");
      return res.status(500).json({ error: "Cloudinary upload failed." });
    }

    const newPet = new Pet({
      name,
      age,
      gender,
      category,
      breed,
      description,
      vaccineStatus,
      owner,
      imageUrl: uploadResult.secure_url,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        address,
      },
      
    });

    await newPet.save();
    console.log("Pet saved successfully:", newPet);

    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (err) {
    console.error("Error in addPet:", err);
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const userId = req.user._id;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Check if the user is the owner of the pet
    if (pet.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this pet" });
    }

    await Pet.findByIdAndDelete(petId);

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete pet", details: err.message });
  }
};

const getPetsByOwner = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // Finds all pets that belong to owner
    const pets = await Pet.find({ owner: ownerId});

    

    res.status(200).json({ pets });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to retrieve pets", details: err.message });
  }
};

const getFilteredPets = async (req, res) => {
  try {
    const { category, lat, lng, distance } = req.query;

    const filter = { adopted: false };

    // Category filter
    if (category && category !== "ALL") {
      filter.category = category;
    }

    // Nearby filter
    if (lat && lng) {
      const maxDistance = distance ? parseInt(distance) : 90000; 
      filter.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: maxDistance
        }
      };
    }

    const pets = await Pet.find(filter);

    if (pets.length === 0) {
      return res.status(404).json({ error: "No pets found" });
    }

    res.status(200).json({ pets });
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve pets",
      details: err.message
    });
  }
};



module.exports = { addPet, deletePet, getPetsByOwner, getFilteredPets};
