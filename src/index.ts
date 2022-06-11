import express from "express"
import cors from "cors"
import * as http from "http"
import { Server } from "socket.io"

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

server.listen(PORT, () => {
    console.log("ON Porta " + PORT)
})