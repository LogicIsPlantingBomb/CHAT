const path = require('path');
const express = require('express');
const socketIO = require("socket.io"); 
const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;
const http = require("http");
const {generateMessage,generateLocation} = require("./utils/message"); 
const {isRealString} = require("./utils/isRealString");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection',(socket)=>{
	console.log("A new user just connected");

	socket.on("join",(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback("Name and room are required");
		};
		socket.join(params.room);
 		socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
    		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
	});
	socket.on("createMessage",(message,callback)=>{
		console.log("createMessage",message);
		io.to(message.room).emit("newMessage",generateMessage(message.from,message.text));
		callback();
	});

	socket.on("disconnect",()=>{
		console.log("User disconnected");
	});
	socket.on("createGeo",(coords,callback)=>{
		io.to(coords.room).emit("newLocationMessage",generateLocation(coords.from,coords.lat ,coords.lon));
		callback();
		console.log(coords);
	});
});
server.listen(port,()=>{
	console.log(`server is running on port ${port}`);
});
