import { CanvasHandler } from "src/CanvasHandler";
import { KASCII } from "./KASCII";

function bit2D(xS: number, yS: number) {
  let block = [];
  for (let y = 0; y < yS; y++) {
    let tempBlock = [];
    for (let x = 0; x < xS; x++) {
      tempBlock.push(false);
    }
    block.push(tempBlock);
  }
  return block;
}

export class Video {
  private vram: boolean[][];
  private mode: 0 | 1 | 2; //TODO: use these haha
  x: number;
  y: number;
  canvas: CanvasHandler;
  constructor(x: number = 200, y: number = 100, canvas: CanvasHandler) {
    this.vram = bit2D(x, y);
    this.mode = 0;
    this.x = x;
    this.y = y;
    this.canvas = canvas;
  }

  render() {
    //very inefficient, but does its job
    if (this.mode == 0) {
      for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 200; x++) {
          this.vram[y][x] =
            x % 5 == 0
              ? false
              : KASCII.rom[
                  KASCII.mem[
                    40 * Math.floor(y / 5) + Math.floor(x / 5) + 2
                  ].toInt()
                ][(x % 5) - 1 + (y % 5) * 4];
        }
      }
    }
  }

  display(clear = true) {
    if (clear) this.canvas.clear();
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 200; x++) {
        this.vram[y][x] ? this.canvas.drawPixel(x, y) : 0;
      }
    }
  }

  clearMemory() {
    this.vram = bit2D(this.x, this.y);
  }
}
