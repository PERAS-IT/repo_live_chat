const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");
const { disconnect } = require("process");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  // customize server
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//show connect
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //join room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with with ID : ${socket.id} joined room: ${data} `);
  });
  //send message
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
  //show disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON 3001");
});
