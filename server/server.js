const path = require('path');
const express = require('express');
const socketIO = require("socket.io"); 
const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;
const http = require("http");
const {generateMessage} = require("./utils/message"); 

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log("A new user just connected");
	socket.emit('newMessage',generateMessage("Admin","Welcome to the server"));
	socket.broadcast.emit("newMessage",generateMessage("Admin","new member just joined"));
	socket.on("createMessage",(message,callback)=>{
		console.log("createMessage",message);
		io.emit("newMessage",generateMessage(message.from,message.text));
		callback();
	})

	socket.on("disconnect",()=>{
		console.log("User disconnected");
	})
})
server.listen(port,()=>{
	console.log(`server is running on port ${port}`);
})

