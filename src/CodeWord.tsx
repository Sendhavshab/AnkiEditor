// Simple mapping object to convert characters
const charMap: { [key: string]: string } = {
  a: "q",
  b: "w",
  c: "e",
  d: "r",
  e: "t",
  f: "y",
  g: "u",
  h: "i",
  i: "o",
  j: "p",
  k: "a",
  l: "s",
  m: "d",
  n: "f",
  o: "g",
  p: "h",
  q: "j",
  r: "k",
  s: "l",
  t: "z",
  u: "x",
  v: "c",
  w: "v",
  x: "b",
  y: "n",
  z: "m",
  // Add more mappings as needed
};

// Function to convert a string to a simple code word
export function stringToCodeWord(str: string): string {
  let codeWord = "";
  for (let i = 0; i < str.length; i++) {
    // Check if character exists in the mapping object
    if (charMap.hasOwnProperty(str[i])) {
      // Append mapped character to code word
      codeWord += charMap[str[i]];
    } else {
      // If character is not in mapping object, keep it unchanged
      codeWord += str[i];
    }
  }
  return codeWord;
}

// Function to convert a simple code word back to original string
export function codeWordToString(codeWord: string): string {
  let originalString = "";
  // Invert the mapping object to get original characters
  const reverseMap: { [key: string]: string } = {};
  for (const key in charMap) {
    reverseMap[charMap[key]] = key;
  }
  for (let i = 0; i < codeWord.length; i++) {
    // Check if character exists in the reverse mapping object
    if (reverseMap.hasOwnProperty(codeWord[i])) {
      // Append original character to original string
      originalString += reverseMap[codeWord[i]];
    } else {
      // If character is not in reverse mapping object, keep it unchanged
      originalString += codeWord[i];
    }
  }
  return originalString;
}
