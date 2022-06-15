import { verify, pattern_3x3, pattern_4x4 } from "./win_conditions.js"

export default function game(socket, io) {
  let movements = []
  let board = Array(9).fill("")

  socket.on("choose_player", async (data) => {
    const sockets = await io.in(data.room).allSockets();
    const connected_users = Array.from(sockets);
    const selected = connected_users[Math.round(Math.random())];

    io.in(data.room).emit("start_player", { selected: selected, board: board });
  });

  socket.on("send_position", (data) => {
    let state = data.board
    state[data.position] = data.signal

    io.in(data.room).emit("receive_position", socket.id, state);

    movements.push(data.position)
    let pattern = pattern_3x3

    verify({pattern, movements}, (win) => {
      io.in(data.room).emit("win", { winner: socket.id });
    })
  });
}
