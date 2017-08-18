"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var {postcode2barcode, barcode2postcode} = require("../lib/main.js");

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

    it("should convert 10-digit postcode to barcode", function(){
        var postcode = '12345-6789';
        var barcode = postcode2barcode(postcode);

        expect(barcode).to.equal('|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|');
    });

    it("should calculate check digit correctly", function(){
        var postcode = '450561234';
        var barcode = postcode2barcode(postcode);

        expect(barcode).to.equal('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
    });

    it("should convert barcode to 5-digit postcode", function(){
        var postcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
        var barcode = barcode2postcode(postcode);

        expect(barcode).to.equal('95713');
    });

    it("should convert barcode to 10-digit postcode", function(){
        var postcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        var barcode = barcode2postcode(postcode);

        expect(barcode).to.equal('12345-6789');
    });
});