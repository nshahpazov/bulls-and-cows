var chai = require('chai');
var BullsAndCows = require('../bulls-and-cows');
var assert = chai.assert;

describe('BullsAndCows', function () {
  describe('#bully()', function () {
    var bc1 = new BullsAndCows('1234');
    
    it('1234 should have 1 bull  with 1567', function () {
      assert(bc1.bully('1567').bulls === 1);
    });
    
    it('1234 should have 1 cow   with 7891', function () {
      assert(bc1.bully('7891').cows === 1);
    });
    
    it('1234 should have 1 cow   with 6189', function () {
      assert(bc1.bully('6189').cows === 1);
    });

    it('1234 should have 2 cows  with 7812', function () {
      assert(bc1.bully('7812').cows === 2);
    });

    it('1234 should have 3 cows with 3127', function () {
      assert(bc1.bully('3127').cows === 3);
    });

    it('1234 should have 2 bulls with 1267', function () {
      assert(bc1.bully('1267').bulls === 2);
    });
    
    it('1234 should have 3 bulls with 1237', function () {
      assert(bc1.bully('1237').bulls === 3);
    });

    it('1234 should have 4 bulls with 1234', function () {  
      assert(bc1.bully('1234').bulls === 4);
    });
  });
});
