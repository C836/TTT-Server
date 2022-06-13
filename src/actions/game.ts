export default function game(socket, io) {
  socket.on("send_position", (data) => {
    socket.to(data.room).emit("receive_position", data);
  });
}
