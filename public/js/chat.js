let socket = io();
function scroll(){
	let messages = document.querySelector("#messages").lastElementChild;
	messages.scrollIntoView();
}
socket.on('connect',function(){
	 let searchQuery = window.location.search.substring(1);
  	let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');

  	socket.emit('join', params, function(err) {
  	  if(err){
  	    alert(err);
  	    window.location.href = '/';
  	  }else {
      	console.log('No Error');
   	 }
  	})
	socket.params = params;
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
	scroll();
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
	scroll();
})
document.querySelector("#submit-btn").addEventListener("click",function(e){
	e.preventDefault();
	let messageInput= document.querySelector("input[name='message']").value;
	socket.emit("createMessage",{
		from:"User",
		text:messageInput,
		room:socket.params.room
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
			lon : position.coords.longitude,
			room : socket.params.room
		},function(){
			console.log("fetching coords");
		});
	},function(){
		return alert("Unable to fetch location");
	})
})
