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
  let lowerCaseString = string.toLowerCase();
  let spacelessString = lowerCaseString.replaceAll(' ', '');
  for (let i = spacelessString.length - 1; i >= 0; i--) {
    reverseString += spacelessString.at(i);
  }
  return spacelessString === reverseString;
}

function stringToNumber (string) {
  let spacelessString = string.replaceAll(' ', '');
  let numberString = '';
  console.log(numberString);
  for (let i = 0; i < spacelessString.length; i++) {
    let number = Number(spacelessString.at(i));
    if (!isNaN(number)) {
      numberString += String(number);
    }
  }
  console.log(numberString);
  return Number(numberString);
}

function addToString (string, minLength, extend) {
  if (string.length >= minLength) {
    return string
  }
  while
}
