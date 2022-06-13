import { generate_id } from "../utils/generate_id.js";

export default function rooms(socket) {
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
    };

    socket.join(data);
    socket.emit("room_status", response.peer);
    socket.to(data).emit("room_status", response.master);
  });

  socket.on("send_position", (data) => {
    socket.to(data.room).emit("receive_position", data);
  });
}
