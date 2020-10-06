import { KASCII_ROM } from "../constants";
import { EightBit } from "./EightBit";
import { createCacheBlock } from "./memory";

export const KASCII = {
  mem: createCacheBlock(1024), //1KB of text memory, only 802B needed for 40*20, first 2 bytes are for indexing
  get x() {
    return this.mem[0].toInt();
  },
  set x(val) {
    if (val < 40) this.mem[0] = new EightBit(val);
    else this.mem[0] = new EightBit(0);
  },
  get y() {
    return this.mem[1].toInt();
  },
  set y(val) {
    if (val < 20) this.mem[1] = new EightBit(val);
    else this.mem[1] = new EightBit(0);
  },
  set char(x: number) {
    this.mem[40 * this.y + this.x + 2] = new EightBit(x);
  },
  get char() {
    return this.mem[40 * this.y + this.x + 2].toInt(); //TODO: idk man
  },
  rom: KASCII_ROM,
};
