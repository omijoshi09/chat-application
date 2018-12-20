const expect = require('expect');

var {isRealString} = require('./validation');



//should reject non-string values

describe('isRealString',()=> {
    it('should reject non-string values',()=>{

        var resultString = isRealString(98);
        expect(resultString.toBe(false));

    });

    //Should reject string with only spaces

    it('Should reject string with only spaces',()=>{

        var resultString = isRealString(' ');
        expect(resultString.toBe(false));

    })

    //Should allow string with non-space characters

    it('Should allow string with non-space characters',()=>{

        var resultString = isRealString(' Andrew ');
        expect(resultString.toBe(false));

    })
});





