import { generate_id } from "../utils/generate_id.js";

import { Socket_Config } from "./game.js";

export default function rooms({socket, io}: Socket_Config) {
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
    const response = {
      master: {
        status: "joined_peer",
      },

      peer: {
        status: "joined",
        key: data,
      },

      starting: {
        status: "starting"
      }
    };

    socket.join(data);
    socket.emit("room_status", response.peer);
    socket.to(data).emit("room_status", response.master);

    setTimeout(() => {
        io.in(data).emit("room_status", response.starting);
    }, 3000);
  });
}
