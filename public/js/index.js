let socket = io();
socket.on('connect',function(){
	console.log("Connected to server");
})
socket.on('disconnect',function(){
	console.log("Disconnected from the server");
})
socket.on("newMessage",function(message){
	console.log("new message",message);
})
socket.emit("createMessage",{
	from:"Dhruv",
	text:"heyyy how are you?"
},function(){
	console.log("server got it");
})
