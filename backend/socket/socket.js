import {Server} from "socket.io"
import express from "express"
import http from "http"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {  //creating new server object
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

const userSocketMap={}  //this map store socket id corressponding to  in user id  (ye user id ka socket id kya hai)
export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}
io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId]=socket.id;
        console.log(`User Connected: userId=${userId}, SocketId = ${socket.id}`);
        
        
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap)) 

socket.on('disconnect',()=>{
    if(userId){
        console.log(`User DisConnected: userId=${userId}, SocketId = ${socket.id}`);
        delete userSocketMap[userId]  // jo user disconnect hogs uski id deklete hogi usersocketmap se
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap)) // will get updated users after deleting
})
})

export {app,server,io};