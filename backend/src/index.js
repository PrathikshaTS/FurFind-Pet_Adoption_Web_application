const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnect.js");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");
const socketIo = require("socket.io"); 

const app = express();
const server = http.createServer(app);

// Set up Socket.IO on the server
const io = socketIo(server, {
  cors: {
    origin:process.env.CLIENT_URL,
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/users", userRoutes);

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("joinRoom", (petId) => {
    socket.join(petId);
    console.log(`User joined room for petId: ${petId}`);
  });

  socket.on("sendMessage", (data) => {
     try {
      // Broadcast to everyone in the room INCLUDING the sender
      io.to(data.petId).emit("receiveMessage", data);
      console.log("Message broadcasted to room:", data.petId);
    } catch (err) {
      console.error("Error broadcasting message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

// Start the server
const port = process.env.PORT || 8001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
