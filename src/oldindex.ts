import { CanvasHandler } from "./CanvasHandler";
import { Kore } from "./kore";
import { EightBit } from "./kore/EightBit";
import { CacheBlock } from "./kore/memory";
const _cacheSize = 8;
const cnv = document.getElementById("screen") as HTMLCanvasElement;
const clk = document.getElementById("clk");
const updBtn = document.getElementById("write");
const clkBtn = document.getElementById("clkBtn");
const table = {
  ins: (() => {
    let temp = [];
    for (let i = 0; i < _cacheSize; i++) {
      temp.push(document.getElementById("i" + i));
    }
    return temp;
  })(),
  val: (() => {
    let temp = [];
    for (let i = 0; i < _cacheSize; i++) {
      temp.push(document.getElementById("v" + i));
    }
    return temp;
  })(),
};
const [ins, val] = [
  document.getElementById("ins"),
  document.getElementById("val"),
];

function updateTable(
  insBlock: CacheBlock,
  valBlock: CacheBlock,
  current: number
) {
  if (ins && val) {
    ins.innerText = insBlock[current].toInt().toString();
    val.innerText = valBlock[current].toInt().toString();
  }
  for (let i = 0; i <= 7; i++) {
    const ins = table.ins[i];
    const val = table.val[i];
    if (ins && val) {
      ins.innerText = insBlock[i].toInt().toString();
      ins.classList.remove("current");
      val.innerText = valBlock[i].toInt().toString();
      val.classList.remove("current");
    }
  }
  const insCurr = table.ins[current];
  const valCurr = table.val[current];
  if (insCurr && valCurr) {
    insCurr.classList.add("current");
    valCurr.classList.add("current");
  }
}

if (cnv && clk && updBtn && clkBtn) {
  cnv.height = 400;
  cnv.width = 800;
  const canvas = new CanvasHandler(cnv);
  const kore = new Kore(_cacheSize, canvas);
  clkBtn.addEventListener("click", () => {
    console.log({ instruction: kore.clk() });
    updateTable(kore.insBlock, kore.valBlock, kore.counter);
  });
  updBtn.addEventListener("click", () => {
    for (let i = 0; i <= 7; i++) {
      const ins = table.ins[i];
      const val = table.val[i];
      if (ins && val) {
        console.log(`${i} => ins: ${ins.innerText}, val: ${val.innerText}`);
        kore.setIns(i, new EightBit(+(ins.innerText || 0)));
        kore.setVal(i, new EightBit(+(val.innerText || 0)));
      }
    }
    updateTable(kore.insBlock, kore.valBlock, kore.counter);
  });
}
