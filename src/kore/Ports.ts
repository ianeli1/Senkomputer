import { EightBit } from "./EightBit";

let nothingp = {
  get() {
    return new EightBit(0);
  },
  set(x: EightBit) {
    return 0;
  },
};

export const Ports = {
  _p0: nothingp,
  _p1: nothingp,
  _p2: nothingp,
  get p0() {
    return this._p0.get();
  },
  set p0(x) {
    this._p0.set(x);
  },
  get p1() {
    return this._p1.get();
  },
  set p1(x) {
    this._p1.set(x);
  },
  get p2() {
    return this._p2.get();
  },
  set p2(x) {
    this._p2.set(x);
  },
};
