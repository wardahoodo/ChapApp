const express = require("express");
const app = express();
const http = require("http");
const cors= require("cors");
const {Server} =require("socket.io");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    
});
 io.on("connection", (Socket)=>{
    console.log(`User Connect: ${Socket.id}`)
    Socket.on("join_room", (data)=>{
        Socket.join(data)
        console.log(`user with ID:${Socket.id} joined room: ${data} `)
    })
    Socket.on("send_message", (data)=>{
        Socket.to(data.room).emit("recieve_message", data)
    })
   

  

 Socket.on("disconnect", ()=>{
    console.log("User Disconnected", Socket.id)
 });
});

server.listen(3001, ()=>{
console.log("Server is running")
}
)