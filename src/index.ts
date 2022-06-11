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
    console.log("Conectado")

    socket.on("send-message", (data) => {
        console.log(data)
    })
})

server.listen(PORT, () => {
    console.log("ON Porta " + PORT)
})