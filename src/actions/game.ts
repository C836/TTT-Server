export default function game(socket, io) {
  socket.on("choose_player", async (data) => {
    const sockets = await io.in(data.room).allSockets();
    const connected_users = Array.from(sockets);
    const selected = connected_users[Math.round(Math.random())];

    io.in(data.room).emit("start_player", { selected: selected });
  });

  socket.on("send_position", (data) => {
    socket.emit("register_position", data);
    socket.to(data.room).emit("receive_position", data);
  });
}
