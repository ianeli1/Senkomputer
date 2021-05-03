import { Kore } from ".";
import { EightBit } from "./EightBit";
import { createCacheBlock } from "./memory";

const nothing = () => void null;

export const decoder = function (this: Kore) {
  return {
    0: nothing,
    1: nothing,
    2: () => {
      this.valBlock[this.valBlock[this.counter].toInt()] = new EightBit(0);
    },
    3: () => {
      this.valBlock[this.valBlock[this.counter].toInt()] = this.normal;
    },
    4: () => {
      this.normal = this.valBlock[this.counter];
    },
    5: () => {
      this.valBlock[this.valBlock[this.counter].toInt()] = this.carry;
    },
    6: () => {
      this.normal = this.valBlock[this.counter];
    },
    7: () => {
      this.counter = this.valBlock[this.counter].toInt();
    },
    8: () => {
      if (this.normal.toInt() == 1)
        this.counter = this.valBlock[this.counter].toInt();
    },
    9: nothing,
    10: () => {
      this.normal = this.ALU.add(this.normal, this.valBlock[this.counter]);
    },
    11: () => {
      this.normal = this.ALU.dif(this.normal, this.valBlock[this.counter]);
    },
    12: () => {
      this.normal = this.ALU.invdif(this.normal, this.valBlock[this.counter]);
    },
    13: () => {
      this.normal = this.ALU.mult(this.normal, this.valBlock[this.counter]);
    },
    14: () => {
      this.normal = this.ALU.div(this.normal, this.valBlock[this.counter]);
    },
    15: nothing,
    16: nothing,
    17: nothing,
    18: () => {
      this.normal = this.ALU.and(this.normal, this.valBlock[this.counter]);
    },
    19: () => {
      this.normal = this.ALU.or(this.normal, this.valBlock[this.counter]);
    },
    20: () => {
      this.normal = this.ALU.xor(this.normal, this.valBlock[this.counter]);
    },
    21: () => {
      this.normal = this.ALU.not(this.normal, this.valBlock[this.counter]);
    },
    22: nothing,
    23: nothing,
    24: () => {
      this.normal = this.ALU.st(this.normal, this.valBlock[this.counter]);
    },
    25: () => {
      this.normal = this.ALU.gt(this.normal, this.valBlock[this.counter]);
    },
    26: nothing,
    27: () => {
      const block = this.RAM[this.valBlock[this.counter].toInt()];

      this.insBlock = block.getInsBlock();
      this.valBlock = block.getValBlock();
    },
    28: () => {
      const block = this.RAM[this.valBlock[this.counter].toInt()];
      block.setBlock(
        Array(this.cacheSize * 2).map((_, index) =>
          index % 2 === 0 ? this.insBlock[index] : this.valBlock[index]
        )
      );
    },
    29: nothing,
    30: nothing,
    31: nothing,
    32: nothing,
    33: nothing,
    34: nothing,
    35: nothing,
    36: nothing,
    37: nothing,
    38: nothing /*() => {
      this.normal =
        this.EEPROM[this.valBlock[this.counter].toInt()] || new EightBit(0);
    }*/,
    39: nothing /*() => {
      this.EEPROM[this.valBlock[this.counter].toInt()] = this.normal;
    }*/,
    40: nothing,
    41: () => {
      this.video.clearMemory();
      this.video.display();
    },
    42: () => {
      this.video.render();
      this.video.display();
    },
    43: nothing,
    44: nothing,
    45: () => {
      this.KASCII.y = this.valBlock[this.counter].toInt();
    },
    46: () => {
      this.KASCII.x = this.valBlock[this.counter].toInt();
    },
    47: () => {
      this.KASCII.char = this.valBlock[this.counter].toInt();
    },
    48: () => {
      this.KASCII.char = this.valBlock[this.counter].toInt();
      this.KASCII.x = this.KASCII.x + 1;
      if (this.KASCII.x == 0) this.KASCII.y = this.KASCII.y + 1;
    },
    49: () => {
      this.KASCII.mem = createCacheBlock(1024);
    },
    50: nothing,
    51: nothing,
    71: () => void console.log("Hello world", this),
  };
};
