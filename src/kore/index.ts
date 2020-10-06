import { ALU } from "./ALU";
import { EightBit } from "./EightBit";
import { KASCII } from "./KASCII";
import { CacheBlock, createCacheBlock, RAMBlock } from "./memory";
import { Video } from "./video";
import { decoder } from "./Decoder";
import { CanvasHandler } from "src/CanvasHandler";

export class Kore {
  insBlock: CacheBlock;
  valBlock: CacheBlock;
  normal: EightBit;
  carry: EightBit;
  counter: number;
  cacheSize: number;
  ALU: typeof ALU;
  RAM: RAMBlock;
  video: Video;
  KASCII: typeof KASCII;
  Decoder: ReturnType<typeof decoder>;
  constructor(cacheSize: number, canvas: CanvasHandler) {
    this.ALU = ALU;
    this.insBlock = createCacheBlock(cacheSize);
    this.valBlock = createCacheBlock(cacheSize);
    this.normal = new EightBit(0);
    this.carry = new EightBit(0);
    this.counter = 0;
    this.cacheSize = cacheSize;
    this.KASCII = KASCII;
    this.Decoder = decoder.bind(this)();
    this.video = new Video(200, 100, canvas);
    this.setIns = this.setIns.bind(this);
    this.setVal = this.setVal.bind(this);
    this.clk = this.clk.bind(this);
  }

  setIns(i: number, ins: EightBit) {
    this.insBlock[i] = ins;
  }

  setVal(i: number, val: EightBit) {
    this.valBlock[i] = val;
  }

  clk() {
    const instruction = {
      ins: this.insBlock[this.counter],
      val: this.valBlock[this.counter],
      current: this.counter,
    };
    this.Decoder[instruction.ins.toInt()]();
    this.counter++;
    if (this.counter >= this.cacheSize) {
      this.counter = 0;
    }
    return instruction;
  }
}

////////////////////////////////////////////////////////
