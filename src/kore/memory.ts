import { EightBit } from "./EightBit";

class RAMUnit {
  private _val: EightBit[];
  constructor(size: number) {
    this._val = Array(size).fill(new EightBit(0));
  }
  getIndex(i: number) {
    if (this._val.length > i) {
      return this._val[i];
    } else {
      throw new Error(`Index out of range. i=${i}, len=${this._val.length}`);
    }
  }
}

export interface RAMBlock {
  [key: number]: RAMUnit;
}

export function createRAMBlock(size: number): RAMBlock {
  let temp = {};
  for (let i = 0; i < size; i++) {
    temp[i] = new RAMUnit(0);
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
