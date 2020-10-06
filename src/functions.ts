export function binToInt(x: boolean[] | string) {
  let out = 0;
  for (let i = x.length - 1; i >= 0; i--) {
    out = out + +x[i] * 2 ** (x.length - 1 - i);
  }
  return out;
}

export function intToBin(x: number) {
  let temp = "";
  let tempVal = x;
  while (tempVal) {
    temp = (tempVal % 2) + temp;
    tempVal = Math.floor(tempVal / 2);
  }
  while (temp.length < 64) {
    temp = "0" + temp;
  }
  return temp;
}

export function intToHex(x: number) {
  let temp = "";
  let tempVal = x;
  while (tempVal) {
    temp =
      tempVal % 16 > 9
        ? ["A", "B", "C", "D", "E", "F", "G"][(tempVal % 16) - 10] + temp
        : (tempVal % 16) + temp;
    tempVal = Math.floor(tempVal / 16);
  }
  return "0x" + (temp.length ? temp : 0);
}
