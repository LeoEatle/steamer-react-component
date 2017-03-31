// var assert = require('assert');

// Karma不支持require语法，因为是跑在浏览器环境
var assert = chai.assert;
describe('Array', function() {
    describe('#indexOf()', function(){
        it("should return -1 when the value is not present", function(){
            assert.equal(-1, [1,2,3].indexOf(4));
            //assert.equal(-1, 3+2);
        })
    })
}) 

describe('Test', function(){
    it("I just want to try pending test", function(){
        assert.isOk(true, 'I suppose a failed test here');
    })
})


console.log("karma");