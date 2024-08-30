const expect = require('expect');
const { generateMessage,generateLocation } = require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        const from = 'Dhruv';
        const text = 'some random message';
        const message = generateMessage(from, text);
	
	expect.expect(typeof message.createdAt).toBe('number');
        expect.expect(message).toMatchObject({ from, text });
    });
});
describe('Generate Location Message',()=>{
	it("should generate a linkl of my location",()=>{
		let from = "Dhruv";
		let lat = 15 , lon = 56;
		let url = `https://www.google.com/maps?q=${lat},${lon}`;
		let message = generateLocation(from,lat,lon);

		expect.expect(typeof message.createdAt).toBe("number");
		expect.expect(message).toMatchObject({from,url});
	});

}) 
