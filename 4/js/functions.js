function checkStringLength (string, number) {
  return string.length <= number;
}

/* function isPolindrom (string) {
  let lowerCaseString = string.toLowerCase();
  let stringWoSpaces = lowerCaseString.replaceAll(' ','')
  let splitString = stringWoSpaces.split('');
  let reverseString = splitString.reverse().join('');

  return stringWoSpaces === reverseString;
} */

function isPolindrom (string) {
  let reverseString = '';
  const lowerCaseString = string.toLowerCase();
  const spacelessString = lowerCaseString.replaceAll(' ', '');
  for (let i = spacelessString.length - 1; i >= 0; i--) {
    reverseString += spacelessString.at(i);
  }
  return spacelessString === reverseString;
}

function stringToNumber (string) {
  const spacelessString = string.replaceAll(' ', '');
  let numberString = '';
  for (let i = 0; i < spacelessString.length; i++) {
    const number = Number(spacelessString.at(i));
    if (!isNaN(number)) {
      numberString += String(number);
    }
  }
  if (numberString === ''){
    return NaN
  }
  return Number(numberString);
}

function numberToNumber (number) {
  const removeDots = String(number).replaceAll('.', '');
  const removeMinus = removeDots.replaceAll('-', '');
  return Number(removeMinus);
}


function extendString (string, minLength, extend) {
  if (string.length >= minLength) {
    return string;
  }
  if (extend.length >= minLength) {
    const splitExtend = extend.slice(0, minLength - string.length);
    return splitExtend + string;
  }
  let newString = string;
  while (newString.length < minLength) {
    const splitExtend = extend.slice(0, minLength - newString.length);
    newString = splitExtend + newString;
  }
  return newString;
}