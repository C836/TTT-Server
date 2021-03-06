import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";

import rooms from "./actions/rooms.js";
import game from "./actions/game.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3010;

app.use(cors());

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  rooms({socket, io})
  game({socket, io})
});

server.listen(PORT, () => {
  console.log("ON Porta " + PORT);
});