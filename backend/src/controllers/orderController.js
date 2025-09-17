const Order = require("../models/orderModel.js");
const Pet = require("../models/petModel.js");

const createAdoptionRequest = async (req, res) => {
  try {
    const petId = req.params.petId;
    const userId = req.user._id;
    const { reason } = req.body;

    if (!reason || reason.trim() === "") {
      return res.status(400).json({ error: "Adoption reason is required" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const existingRequest = await Order.findOne({ pet: petId, requester: userId });
    if (existingRequest) {
      return res.status(400).json({ error: "You have already requested to adopt this pet" });
    }

    const order = new Order({
      pet: petId,
      requester: userId,
      owner: pet.owner,
      reason: reason.trim(),
    });

    await order.save();

    res.status(201).json({ message: "Adoption request submitted successfully", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to create adoption request", details: err.message });
  }
};

const getAllRequestsForOwner = async (req, res) => {
    try {
      const userId = req.user._id;
  
      let orders = await Order.find({ owner: userId }) 
      .populate("pet")
      .populate("requester", "username");
       orders = orders.filter(order => order.pet && order.pet.adopted === false && order.status === "pending");
      if (orders.length === 0) {
        return res.status(404).json({ message: "No adoption requests for your pets." });
      }
  
      res.status(200).json({ orders });
    } catch (err) {
      console.error("Get Requests Error:", err);

      res.status(500).json({ error: "Failed to retrieve adoption requests", details: err.message });
    }
  };
  
  const respondToAdoptionRequest = async (req, res) => {
    try {
      const userId = req.user._id; // owner
      const { requestId } = req.params;
      const { status } = req.body;
  
      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
  
      const order = await Order.findById(requestId).populate("pet");
  
      if (!order) {
        return res.status(404).json({ error: "Adoption request not found" });
      }
  
      // Update the status of the order
      order.status = status;
      order.respondedAt = new Date();
      await order.save();
  
      if (status === "accepted") {
        order.pet.adopted = true;
        await order.pet.save();
  
        await Order.updateMany(
          { pet: order.pet._id, _id: { $ne: order._id }, status: "pending" },
          { status: "rejected" }
        );
      }

      res.status(200).json({ message: `Request ${status} successfully`, order });
    } catch (err) {
      res.status(500).json({ error: "Failed to update adoption request", details: err.message });
    }
  };


  const getUserAdoptionRequests = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const requests = await Order.find({ requester: userId })
        .populate("pet", "name category imageUrl adopted") 
        .populate("owner", "username") 
        .select("status reason requestedAt respondedAt");
  
      if (requests.length === 0) {
        return res.status(404).json({ message: "You have not made any adoption requests." });
      }
  
      res.status(200).json({ requests });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch your adoption requests", details: err.message });
    }
  };
  
module.exports = {
    createAdoptionRequest,getAllRequestsForOwner,respondToAdoptionRequest,getUserAdoptionRequests
};