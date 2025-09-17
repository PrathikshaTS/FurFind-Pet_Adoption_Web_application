const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderRole: { type: String, enum: ["user", "owner"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
messageSchema.index({ petId: 1, createdAt: 1 });
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
