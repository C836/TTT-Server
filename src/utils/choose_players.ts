import { io } from "../server.js";

export async function choose_player(room: string) {
  const sockets = await io.in(room).allSockets();
  const connected_users = Array.from(sockets);
  const selected = connected_users[Math.round(Math.random())];

  return selected
}