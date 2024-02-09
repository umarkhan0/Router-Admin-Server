import express from "express";
const app = express();
import router from "./routes/index.js";
import chalk from "chalk";
import Message from "./models/chat.js";
import cors from "cors";
import mongoose from "./db/index.js";
import 'dotenv/config.js';
import { Server } from "socket.io";
import { createServer } from "http";
const PORT = process.env.PORT || 8000
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
    console.log(chalk.blue("db connected!"));
});
app.use(express.json());
app.use("/", (req, res, next) => {
    next()
    app.use("/api", router);
});
const httpServer = createServer(app)
httpServer.listen(PORT, () => {
    console.log("Server is runing port", PORT);
});
app.use(cors())



const io = new Server(httpServer, { cors: "*" });
io.on("connection", async (socket) => {

    console.log("Made soket connection");
    socket.on("messge", async (data) => {
        try {
            const messege = new Message(data);
            await messege.save();
            let adminMessege = await Message.find({ sender: data.sender });
            let userMessege = await Message.find({ sender: data.reciver });
            let allMesseges = adminMessege.concat(userMessege)
            allMesseges.sort((a, b) => a.timestamp - b.timestamp);
            socket.emit("allMesseges", allMesseges);
        } catch (e) {
            console.log(e);
        };
    });
    socket.on("chatGet", async (data) => {
        let adminMessege = await Message.find({ sender: `Admin${data.name}` });
        let userMessege = await Message.find({ sender: data.name });
        let allMesseges = adminMessege.concat(userMessege)
        allMesseges.sort((a, b) => a.timestamp - b.timestamp);
        socket.emit("allMesseges", allMesseges);
    });
});