import express from "express"
import cors from "cors"
import * as http from "http"
import { Server, Socket } from "socket.io"

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3010

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH"]
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_position", (data) => {
        socket.to(data.room).emit("receive_position", data)
    })
})

server.listen(PORT, () => {
    console.log("ON Porta " + PORT)
})