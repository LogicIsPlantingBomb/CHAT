let socket = io();
socket.on('connect',function(){
	console.log("Connected to server");
})
socket.on('disconnect',function(){
	console.log("Disconnected from the server");
})
socket.on("newMessage",function(message){
	
	const formatedTime = moment(message.createdAt).format('LT');
	const template = document.querySelector("#message-template").innerHTML;
	const html = Mustache.render(template,{
		from:message.from,
		text:message.text,
		createdAt:formatedTime
	});
	const div = document.createElement("div");
	div.innerHTML = html
	document.querySelector('#messages').appendChild(div);
	/*console.log("new message",message);
	let li= document.createElement('li');
	li.innerText = `${message.from} ${formatedTime}:${message.text}`;
	document.querySelector('#messages').appendChild(li);*/
})
socket.on("newLocationMessage", function(message){
	const formatedTime = moment(message.createdAt).format('LT');
	console.log("Location",message);
	const template = document.querySelector("#geo-template").innerHTML;
	const html = Mustache.render(template,{
		from:message.from,
		url:message.url,
		createdAt:formatedTime
	})
	const div = document.createElement("div");
	div.innerHTML = html;

	/*let li = document.createElement("li");
	let a = document.createElement("a");
	li.innerText = `${message.from} ${formatedTime}:`;
	a.setAttribute('target','_blank');
	a.setAttribute('href',message.url);
	a.innerText="My current location";
	li.appendChild(a);*/
	document.querySelector('#messages').appendChild(div);
})
document.querySelector("#submit-btn").addEventListener("click",function(e){
	e.preventDefault();
	let messageInput= document.querySelector("input[name='message']").value;
	socket.emit("createMessage",{
		from:"User",
		text:messageInput
	},function(){
	})
})
document.querySelector("#geo").addEventListener("click",function(e){
	e.preventDefault();
	if(!navigator.geolocation){
		return alert("geolocation is not supported in your browser");
	}
	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		socket.emit("createGeo",{
			from : "user",
			lat : position.coords.latitude,
			lon : position.coords.longitude
		},function(){
			console.log("fetching coords");
		});
	},function(){
		return alert("Unable to fetch location");
	})
})
