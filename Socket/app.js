import express from "express"; // Optional, if you want to serve with Express
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app); // Create HTTP server to work with Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust in production for specific origins
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

// Add a user to the online user list if they are not already there
const addUser = (userId, socketId) => {
  const userExists = onlineUsers.some((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
    // console.log(`User added: ${userId}, connected with socket ID: ${socketId}`);
  }
};

// Remove a user by their socket ID when they disconnect
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log(`User with socket ID ${socketId} disconnected and removed.`);
};

// Find a user by their user ID
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// Handle client connections and disconnections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // When a new user joins, add them to the online user list
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("updateUserList", onlineUsers); // Optional: Broadcast the updated user list
  });

  // Handle sending messages
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiverId}:`, data);
    } else {
      console.log(`User ${receiverId} not found.`);
    }
  });

  // When a user disconnects, remove them from the online user list
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("updateUserList", onlineUsers); // Optional: Update the list for other clients
  });
});

// Listen on a specified port
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
