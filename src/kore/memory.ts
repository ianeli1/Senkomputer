import { EightBit } from "./EightBit";

class RAMUnit {
  private _val: EightBit[];
  constructor(size: number) {
    this._val = Array(size).fill(new EightBit(0));
    this.getInsBlock = this.getInsBlock.bind(this);
    this.getValBlock = this.getValBlock.bind(this);
  }
  getIndex(i: number) {
    if (this._val.length > i) {
      return this._val[i];
    } else {
      throw new Error(`Index out of range. i=${i}, len=${this._val.length}`);
    }
  }
  getInsBlock() {
    return this._val.filter((_, index) => index % 2 === 0);
  }
  getValBlock() {
    return this._val.filter((_, index) => index % 2 === 1);
  }
  setBlock(Block: CacheBlock) {
    for (let i = 0, j = this._val.length; i < j; i++) {
      this._val[i] = new EightBit(Block[i]?.toInt() ?? 0);
    }
    return true;
  }
}

export type RAMBlock = RAMUnit[];

export function fillRAMBlockWithText(text: string, ramBlock: RAMBlock) {
  const array = text.split(" ").map((x) => +x);
  const blockLen = 32;
  for (let i = 0, j = array.length / blockLen; i < j; i++) {
    const block = array
      .slice(i * blockLen, (i + 1) * blockLen)
      .map((x) => new EightBit(x));

    ramBlock[i].setBlock(block);
  }
  return true;
}

export function createRAMBlock(size: number): RAMBlock {
  let temp = [];
  for (let i = 0; i < size; i++) {
    temp[i] = new RAMUnit(32);
  }
  return temp;
}

export interface CacheBlock {
  [key: number]: EightBit;
}

export function createCacheBlock(len: number): CacheBlock {
  let block = {};
  for (let i = 0; i < len; i++) {
    block[i] = new EightBit(0);
  }
  return block;
}
