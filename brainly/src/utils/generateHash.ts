export const generateHash = (len: number) => {
  let options = "qwertyuioplkjhgfdsazxcvbnm1234567890";
  let length = options.length;
  let hash = "";
  for (let i = 0; i < len; i++) {
    hash += options[Math.floor(Math.random() * length)];
  }
  return hash;
};
