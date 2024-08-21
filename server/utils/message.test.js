const expect = require('expect');
const { generateMessage } = require('./message');

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        const from = 'Dhruv';
        const text = 'some random message';
        const message = generateMessage(from, text);
	
	expect.expect(typeof message.createdAt).toBe('number');
        expect.expect(message).toMatchObject({ from, text });
    });
});

