"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var postcode2barcode = require("../lib/main.js");

describe("Postnet", function(){

    it("should convert 5-digit postcode to barcode", function(){
        var postcode = '95713';
        var barcode = postcode2barcode(postcode);
        
        expect(barcode).to.equal('||:|:::|:|:|:::|:::||::||::|:|:|');
    });

    it("should convert 9-digit postcode to barcode", function(){
        var postcode = '123456789';
        var barcode = postcode2barcode(postcode);

        expect(barcode).to.equal('|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|');
    });
});