import { EightBit } from "./EightBit";

export const ALU = {
  add(x: EightBit, y: EightBit) {
    return new EightBit(x.toInt() + y.toInt());
  },
  dif(x: EightBit, y: EightBit) {
    return new EightBit(x.toInt() - y.toInt());
  },
  invdif(x: EightBit, y: EightBit) {
    return new EightBit(y.toInt() - x.toInt());
  },
  mult(x: EightBit, y: EightBit) {
    return new EightBit(x.toInt() * y.toInt());
  },
  div(x: EightBit, y: EightBit) {
    return new EightBit(Math.floor(x.toInt() / y.toInt()));
  },
  fdiv(x: EightBit, y: EightBit) {
    return new EightBit(0); //NYI
  },
  and(x: EightBit, y: EightBit) {
    let xS = x.toBin();
    let yS = y.toBin();
    let out = "";
    for (let i = 0; i < 8; i++) {
      out = out + (xS[i] == yS[i] ? "1" : "0");
    }
    return new EightBit(out);
  },
  or(x: EightBit, y: EightBit) {
    let xS = x.toBin();
    let yS = y.toBin();
    let out = "";
    for (let i = 0; i < 8; i++) {
      out = out + +xS[i] || +yS[i] ? "1" : "0";
    }
    return new EightBit(out);
  },
  xor(x: EightBit, y: EightBit) {
    /*//TODO: fix this crap lmao
        let xS = x.toBin()
        let yS = y.toBin()
        let out = ""
        for(let i = 0; i < 8; i++){
            out = out + (!xS[i] == yS[i] || xS[i] == !Math.floor(yS[i]) ? "1" : "0")
        }   
        return new EightBit(out)*/
    return new EightBit(0);
  },
  not(x: EightBit, y: EightBit) {
    let xS = x.toBin();
    let out = "";
    for (let i = 0; i < 8; i++) {
      out = out + +!Math.floor(+xS[i]);
    }
    return new EightBit(out);
  },
  shiftLeft(x: EightBit, y: EightBit) {
    return new EightBit(0); //TBI
  },
  gt(x: EightBit, y: EightBit) {
    return new EightBit(+(x.toInt() > y.toInt()));
  },
  st(x: EightBit, y: EightBit) {
    return new EightBit(+(x.toInt() < y.toInt()));
  },
  shiftRight(x: EightBit, y: EightBit) {
    return new EightBit(0); //TBI
  },
};
