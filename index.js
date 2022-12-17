import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running.");
});

io.on('connection', (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callended");
    });
    //console.log(socket.id)

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        // console.log(userToCall)
        io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    });

    socket.on("answercall", (data) => {
        // console.log(data.to)
        io.to(data.to).emit("callaccepted", data.signal);
    })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))