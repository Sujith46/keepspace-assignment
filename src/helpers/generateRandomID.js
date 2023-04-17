const characters = "0123456789";

export function generateID(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return Number(result);
}

// console.log(generateString(5));
