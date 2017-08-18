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
  return 10 - sum(normalPostcode) % 10;
}

function toBarcode(i) {
  return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'][i];
}

function toIntArray(normalPostcode) {
  return normalPostcode.split("").map(ch => parseInt(ch));
}

function transform(normalPostcode, checkDigit) {
  return [...toIntArray(normalPostcode), checkDigit].map(i => toBarcode(i)).join('');
}

function format(rawBarcode) {
  const frame = '|';
  return frame + rawBarcode + frame;
}

function postcode2barcode(postcode){
  let normalPostcode = normalize(postcode);
  let checkDigit = calculateCheckDigit(normalPostcode);
  let rawBarcode = transform(normalPostcode, checkDigit);
  return format(rawBarcode);
}

module.exports = postcode2barcode;
