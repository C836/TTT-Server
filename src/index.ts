import express from "express";
import cors from "cors";
import * as http from "http";
import { Server, Socket } from "socket.io";

import { generate_id } from "./utils/generate_id.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3010;

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  socket.on("create_room", () => {
    const room = generate_id();

    const response = {
      status: "created",
      key: room,
    };

    socket.join(room);
    socket.emit("room_status", response);
  });

  socket.on("join_room", async (data) => {
    const connected_users = await io.in(data).allSockets();

    const response = {
        master: {
            status: "joined_peer"
        },

        peer: {
            status: "joined",
            key: data
        }
    }

    socket.join(data);
    socket.emit("room_status", response.peer);
    socket.to(data).emit("room_status", response.master);
  });

  socket.on("send_position", (data) => {
    socket.to(data.room).emit("receive_position", data);
  });
});

server.listen(PORT, () => {
  console.log("ON Porta " + PORT);
});
