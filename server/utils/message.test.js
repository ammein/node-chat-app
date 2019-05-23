var expect = require('expect');
var {generateMessage} = require('./message');


describe('Generate Message' , ()=>{
    it('should generate the correct message object' , ()=>{
        var from = 'Amin Shazrin';
        var text = 'Hey Bro';
        var res = generateMessage(from , text);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from,text});
    });
});