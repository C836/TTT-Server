import express from "express";
import cors from "cors";
import * as http from "http";
import { Server, Socket } from "socket.io";

import rooms from "./actions/rooms.js";

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
  rooms(socket)
});

server.listen(PORT, () => {
  console.log("ON Porta " + PORT);
});
