const Message = require("../models/MessageModel.js");

const getMessagesForPet = async (req, res) => {
  try {
    const messages = await Message.find({ petId: req.params.petId })
      .sort({ createdAt: 1 })
      .populate("sender", "username");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const postMessageForPet = async (req, res) => {
  const { message, senderRole } = req.body;

  if (!message || !senderRole) {
    return res.status(400).json({ error: "Message and senderRole are required" });
  }

  try {
    const newMessage = new Message({
      petId: req.params.petId,
      sender: req.user.id,
      senderRole,
      message
    });

    const savedMessage = await newMessage.save();
    await savedMessage.populate("sender", "username");
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = {
  getMessagesForPet,
  postMessageForPet
};