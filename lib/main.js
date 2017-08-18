const barcodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
  ':||::', '|:::|', '|::|:', '|:|::'];

function normalize(postcode) {
  return postcode.replace('-', '');
}

function sum(normalPostcode) {
  let sum = 0;
  for (let i of toIntArray(normalPostcode)) {
    sum += i;
  }
  return sum;
}

function calculateCheckDigit(normalPostcode) {
  const _sum = sum(normalPostcode);
  return (10 - _sum % 10) % 10;
}

function toBarcode(i) {
  return barcodes[i];
}

function toIntArray(normalPostcode) {
  return normalPostcode.split("").map(ch => parseInt(ch));
}

function transformToBarcode(normalPostcode, checkDigit) {
  return [...toIntArray(normalPostcode), checkDigit].map(i => toBarcode(i)).join('');
}

function formatBarcode(rawBarcode) {
  const frame = '|';
  return frame + rawBarcode + frame;
}

function postcode2barcode(postcode){
  let normalPostcode = normalize(postcode);
  let checkDigit = calculateCheckDigit(normalPostcode);
  let rawBarcode = transformToBarcode(normalPostcode, checkDigit);
  return formatBarcode(rawBarcode);
}

function removeFrame(barcode) {
  return barcode.substring(1, barcode.length - 1);
}

function toNumber(code) {
  return barcodes.findIndex(barcode => barcode === code);
}

function splitByLength(rawBarcode, number) {
  let array = [];
  for (let i = 0; i < rawBarcode.length / number; i++) {
    array.push(rawBarcode.substr(i * number, number));
  }
  return array;
}

function transformToPostcode(rawBarcode) {
  return splitByLength(rawBarcode, 5).map(code => toNumber(code));
}

function removeCheckDigit(postcodeWithCheckDigit) {
  return postcodeWithCheckDigit.slice(0, postcodeWithCheckDigit.length - 1);
}

function formatPostcode(rawPostcode) {
  if (rawPostcode.length === 9) {
    rawPostcode.splice(5, 0, '-');
  }
  return rawPostcode.join('');
}

function barcode2postcode(barcode) {
  let rawBarcode = removeFrame(barcode);
  let postcodeWithCheckDigit = transformToPostcode(rawBarcode);
  let rawPostcode = removeCheckDigit(postcodeWithCheckDigit);
  return formatPostcode(rawPostcode);
}

module.exports = {postcode2barcode, barcode2postcode};
