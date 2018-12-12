var expect  = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');



describe('generateMessage',()=>{
    it('should generate correct message object',() => {

        var from= 'Jen';
        var text = 'some message';

        var message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});


    });
})

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{

        var from= 'Jen';
        var latitude = 16;
        var longitude = 18;
        var url = 'https://www.google.com/maps?q=16,18';

        var locationInfo = generateLocationMessage(from,latitude,longitude);

        expect(typeof locationInfo.createdAt).toBe('number');
        expect(locationInfo).toMatchObject({from});
    })
})