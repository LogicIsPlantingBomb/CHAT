const moment = require("moment");

let generateMessage = (from,text,room)=>{
	return {
		from,
		text,
		room,
		createdAt:moment().valueOf()
	};
};
let generateLocation = (from,lat,lon,room)=>{
	return {
		from,
		url:`https://www.google.com/maps?q=${lat},${lon}`,
		room,
		createdAt:moment().valueOf()
	};
};

module.exports = {generateMessage,generateLocation};
