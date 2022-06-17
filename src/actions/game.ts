import { Server, Socket } from "socket.io";
import { choose_player } from "../utils/choose_players.js";
import { verify, pattern_3x3, pattern_4x4 } from "./win_conditions.js";

const EMPTY_BOARD = Array(9).fill("");

export interface Socket_Config{
  socket: Socket,
  io: Server
}

export default function game({socket, io}:Socket_Config) {
  let movements:number[] = [];
  let board = EMPTY_BOARD;

  socket.on("choose_player", async (room) => {
    const selected = await choose_player(room);

    const response = {
      board: board,
      selected: selected
    };

    io.in(room).emit("start_player", response);
  });

  socket.on("send_position", (data) => {
    const { room, position, board, signal } = data
    let state = board;
    state[position] = signal;

    const response = {
      id: socket.id,
      board: state,
    };

    io.in(room).emit("receive_position", response);

    movements.push(position);
    let pattern = pattern_3x3;

    verify({ pattern, movements }, () => {
      const response = {
        winner: socket.id
      }

      io.in(room).emit("win", response);
    });
  });

  socket.on("reset", (data) => {
    const { room, winners } = data
    let state = Array(9).fill("");

    movements = []

    const response = {
      winners: winners,
      board: state
    }

    io.in(room).emit("reset", response);
    io.in(room).emit("reset_movements");
  });

  socket.on("reset_movements", () => {
    movements = []
  })
}
