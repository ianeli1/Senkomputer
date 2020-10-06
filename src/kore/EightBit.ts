export class EightBit {
  val: number;

  constructor(val: Array<boolean> | number | string) {
    //TODO: figure out how to limit this to 8 elements
    if (typeof val == "number") {
      this.val = val;
    } else {
      if (val.length == 8) {
        let temp = 0;
        for (let i = 7; i >= 0; i--) {
          temp = temp + +val[i] * 2 ** (7 - i);
        }
        this.val = temp;
      } else {
        this.val = 0;
        console.trace("EightBit received an invalid boolean array:", val);
      }
    }
  }
  toBin() {
    let binOutput = "";
    let temp = this.val;
    while (temp) {
      binOutput = (temp % 2) + binOutput;
      temp = Math.floor(temp / 2);
    }
    while (binOutput.length < 8) {
      binOutput = "0" + binOutput;
    }
    return binOutput;
  }
  toHex() {
    let temp = "";
    let tempVal = this.val;
    while (tempVal) {
      temp =
        tempVal % 16 > 9
          ? ["A", "B", "C", "D", "E", "F", "G"][(tempVal % 16) - 10] + temp
          : (tempVal % 16) + temp;
      tempVal = Math.floor(tempVal / 16);
    }
    return "0x" + (temp.length ? temp : 0);
  }
  toInt() {
    return this.val;
  }
  toArr() {
    return this.toBin()
      .split("")
      .map((x) => Boolean(+"x"));
  }
  toString() {
    return this.toBin();
  }
}
