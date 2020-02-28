function createCacheBlock(len){
    let block = {};
    for (let i = 0; i < len; i++){
        block[i] = new EightBit(0);
    }
    return block;
}
class EightBit{
    constructor(val){
        let _val = null;
        if (typeof val == "string") {
            if(val.length == 8){
                let temp = 0;
                for(let i = 7; i >= 0; i--){
                    temp = temp + val[i]*(2**[7-i])
                }
                _val = temp
            }
        }
        else _val = val
        if (_val < 255) this.val = _val; //saves it as a number, int
        else this.val = 0;
    }
    toBin(){
        let temp = "";
        let tempVal = this.val;
        while (tempVal){
            temp = tempVal%2 + temp
            tempVal = parseInt(tempVal/2);
        }
        while (temp.length < 8){
            temp = "0" + temp;
        }
        return temp
    }
    toHex(){
        let temp = "";
        let tempVal = this.val;
        while (tempVal){
            temp = tempVal%16 > 9 ? ["A","B","C","D","E","F","G"][tempVal%16 - 10] + temp : tempVal%16 + temp
            tempVal = parseInt(tempVal/16);
        }
        return "0x" + (temp.length ? temp : 0);
    }
    toInt() {
        return this.val;
    }
    toArr() {

    }

}

const _cacheSize = 8;
window.EightBit = EightBit;
window.clk = document.getElementById("clk")
let [ins, val] =  [document.getElementById("ins"), document.getElementById("val")];
let updBtn = document.getElementById("write")
window.table = {
    ins: (() => {
        let temp = []
        for(let i = 0; i <= 7; i++){
            temp.push(document.getElementById("i"+i))
        }
        return temp
    })(),
    val: (() => {
        let temp = []
        for(let i = 0; i <= 7; i++){
            temp.push(document.getElementById("v"+i))
        }
        return temp
    })()

}

window.InsBlk = createCacheBlock(_cacheSize);
window.ValBlk = createCacheBlock(_cacheSize);

updBtn.addEventListener("click", () => {
    for(let i = 0; i <= 7; i++){
        window.InsBlk[i] = new EightBit(+window.table.ins[i].innerText);
        window.ValBlk[i] = new EightBit(+window.table.val[i].innerText)
    }
})


window.Counter = {
    _val: 0,
    onClock() {
        ins.innerText = window.InsBlk[this._val].toHex();
        val.innerText = window.ValBlk[this._val].toInt();
        for(let i = 0; i <= 7; i++){
            window.table.ins[i].innerText = window.InsBlk[i].toInt()
            window.table.val[i].innerText = window.ValBlk[i].toInt()
            window.table.ins[i].classList.remove('current')
            window.table.val[i].classList.remove('current')
        }
        window.table.ins[this._val].classList.add('current')
        window.table.val[this._val].classList.add('current')

    },
    clear(x = 0) { this._val = 0; },
    set val(x) {
        this._val = x >= _cacheSize ? 0 : x;
        window.clk.innerText = this._val
        this.onClock();
        //if val exceeds its expected value, it resets to 0
    },
    get val() {
        return this._val;
    },
    clk() {
        window.dec0der[window.InsBlk[this._val].toInt()]()
        this.val = this.val + 1;
        if (this.val >= _cacheSize) this.val = 0;
    }
}
let clkBtn = document.getElementById("clkBtn")
clkBtn.addEventListener("click", () => window.Counter.clk())

window.normal = new EightBit(0)
window.carry = new EightBit(0)



window.ALU = {
    add(x,y){
        return new EightBit(x.toInt()+y.toInt())
    },
    dif(x,y){
        return new EightBit(x.toInt()-y.toInt())
    },
    invdif(x,y){
        return new EightBit(y.toInt()-x.toInt())
    },
    mult(x,y){
        return new EightBit(x.toInt()*y.toInt())
    },
    div(x,y){
        return new EightBit(Math.floor(x.toInt()/y.toInt()))
    },
    fdiv(x,y){
        return new EightBit(0)//NYI
    },
    and(x,y){
        let xS = x.toBin()
        let yS = y.toBin()
        let out = ""
        for(let i = 0; i < 8; i++){
            out = out + (xS[i] == yS[i] ? "1" : "0")
        }
        return new EightBit(out)
    },
    or(x,y){
        let xS = x.toBin()
        let yS = y.toBin()
        let out = ""
        for(let i = 0; i < 8; i++){
            out = out + (Math.floor(xS[i]) || Math.floor(yS[i]) ? "1" : "0")
        }
        return new EightBit(out)
    },
    xor(x,y){
        let xS = x.toBin()
        let yS = y.toBin()
        let out = ""
        for(let i = 0; i < 8; i++){
            out = out + (!Math.floor(xS[i]) == yS[i] || xS[i] == !Math.floor(yS[i]) ? "1" : "0")
        }
        return new EightBit(out)
    },
    not(x,y){
        let xS = x.toBin();
        let out = ""
        for(let i = 0; i < 8; i++){
            out = out + +!Math.floor(xS[i])
        }
        return new EightBit(out)
    },
    shiftLeft(x,y){
        return new EightBit(0) //TBI
    },
    gt(x,y){
        return new EightBit(+(x.toInt() > y.toInt()))
    },
    st(x,y){
        return new EightBit(+(x.toInt() < y.toInt()))
    },
    shiftRight(x,y){
        return new EightBit(0) //TBI
    },
}

window.AUX = {

}

function nothing(x){
    return null;
}



function bit2D(xS,yS){
    let block = [];
    for (let y = 0; y < yS; y++){
        let tempBlock = []
        for(let x = 0; x < xS; x++){
            tempBlock.push(false);
        }
        block.push(tempBlock)
    }
    return block
}



window.KASCII = {
    mem: createCacheBlock(1024), //1KB of text memory, only 802B needed for 40*20, first 2 bytes are for indexing
    get x() {
        return this.mem[0].toInt()
    },
    set x(val) {
        if(val < 40) this.mem[0] = new EightBit(val);
        else this.mem[0] = new EightBit(0);
    },
    get y() {
        return this.mem[1].toInt()
    },
    set y(val) {
        if(val < 20) this.mem[1] = new EightBit(val);
        else this.mem[1] = new EightBit(0);
    },
    set char(x){
        this.mem[40*this.y+this.x+2] = new EightBit(x)
    },
    get char(){
        return this.mem[40*this.y+this.x+2]
    },
    rom: {
        0: [0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0],
        32: [0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0],
        65: [1,1,1,1,
            1,0,0,1,
            1,1,1,1,
            1,0,0,1,
            1,0,0,1],
        66: [1,1,1,1,
            1,0,0,1,
            1,0,1,0,
            1,0,0,1,
            1,1,1,1],
        67: [0,1,1,1,
            1,0,0,0,
            1,0,0,0,
            1,0,0,0,
            0,1,1,1],
        68: [1,1,1,0,
            1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            1,1,1,0],
        69: [1,1,1,1,
            1,0,0,0,
            1,1,1,1,
            1,0,0,0,
            1,1,1,1],
        70: [1,1,1,1,
            1,0,0,0,
            1,1,1,1,
            1,0,0,0,
            1,0,0,0],
        71: [0,1,1,1,
            1,0,0,0,
            1,0,1,1,
            1,0,0,1,
            0,1,1,0],
        72: [1,0,0,1,
            1,0,0,1,
            1,1,1,1,
            1,0,0,1,
            1,0,0,1],
        73: [0,1,1,1,
            0,0,1,0,
            0,0,1,0,
            0,0,1,0,
            0,1,1,1],
        74: [1,1,1,1,
            0,0,0,1,
            0,0,0,1,
            1,0,0,1,
            0,1,1,0],
        75: [1,0,0,1,
            1,0,1,0,
            1,1,0,0,
            1,0,1,0,
            1,0,0,1],
        76: [1,0,0,0,
            1,0,0,0,
            1,0,0,0,
            1,0,0,0,
            1,1,1,1],
        77: [1,0,0,1,
            1,1,1,1,
            1,0,0,1,
            1,0,0,1,
            1,0,0,1],
        78: [1,0,0,1,
            1,1,0,1,
            1,0,1,1,
            1,0,0,1,
            1,0,0,1],
        79: [0,1,1,0,
            1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            0,1,1,0],
        80: [1,1,1,0,
            1,0,0,1,
            1,1,1,0,
            1,0,0,0,
            1,0,0,0],
        81: [0,1,1,0,
            1,0,0,1,
            1,0,0,1,
            1,0,1,1,
            0,1,1,1],
        82: [1,1,1,0,
            1,0,0,1,
            1,1,1,0,
            1,0,1,0,
            1,0,0,1],
        83: [0,1,1,1,
            1,0,0,0,
            0,1,1,0,
            0,0,0,1,
            1,1,1,0],
        84: [0,1,1,1,
            0,0,1,0,
            0,0,1,0,
            0,0,1,0,
            0,0,1,0],
        85: [1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            1,1,1,1],
        86: [1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            0,1,1,0,
            0,1,1,0],
        87: [1,0,0,1,
            1,0,0,1,
            1,0,0,1,
            1,1,1,1,
            1,1,1,1],
        88: [1,0,0,1,
            0,1,1,0,
            0,1,1,0,
            0,1,1,0,
            1,0,0,1],
        89: [1,0,0,1,
            0,1,1,0,
            0,0,1,0,
            0,0,1,0,
            0,0,1,0],
        90: [1,1,1,1,
            0,0,0,1,
            0,0,1,0,
            0,1,0,0,
            1,1,1,1],


    }

}

window.video = {
    mode: 0,
    vram: bit2D(200,100), //200x100 screen,
    render(){ //very inefficient, but does its job
        if(this.mode == 0){
            for(let y = 0; y < 100; y++){
                for(let x = 0; x < 200; x++){
                    this.vram[y][x] = x % 5 == 0 ? false : window.KASCII.rom[window.KASCII.mem[40*Math.floor(y/5)+Math.floor(x/5) + 2].toInt()][(x % 5 - 1) + (y % 5)*4];
                }
            }
        }
    },
    display(clear = true){
        if (clear) window.cnv.clear()
        for(let y = 0; y < 100; y++){
            for(let x = 0; x < 200; x++){
                this.vram[y][x] ? window.cnv.drawPixel(x,y) : 0;
            }
        }
    }

}



function binToInt(x){
    let out = 0;
    for(let i = x.length - 1; i >= 0; i--){
        out = out + x[i]*(2**(x.length - 1 - i))
    }
    return out
}

function intToBin(x){

    let temp = "";
    let tempVal = x;
    while (tempVal){
        temp = tempVal%2 + temp
        tempVal = parseInt(tempVal/2);
    }
    while (temp.length < 64){
        temp = "0" + temp;
    }
    return temp

}
window.iTB = intToBin

class RAMunit{
    constructor(blk){
        if (typeof blk == "object"){
            let temp = ""
            for(let i = 0; i < _cacheSize; i++){
                temp = temp + blk[i].toBin();
            }
            this._val = binToInt(temp)
        }
        else this._val = (() => {
            let temp = "";
            for(let i = 0; i < _cacheSize; i++){
                temp = temp + "00000000"
            }
            this._val = temp
        })()
    }
    get val(){
        let temp = intToBin(this._val);
        let out = []
        for(let i = 0; i < _cacheSize; i++){
            out.push(new EightBit(temp.slice(0,8)))
            temp = temp.slice(8)
        }
        return out
    }
    get hex(){
        let temp = "";
        let tempVal = this._val;
        while (tempVal){
            temp = tempVal%16 > 9 ? ["A","B","C","D","E","F","G"][tempVal%16 - 10] + temp : tempVal%16 + temp
            tempVal = parseInt(tempVal/16);
        }
        return "0x" + (temp.length ? temp : 0);
    }

}

function createRAMBlock(size){
    let temp = {}
    for(let i = 0; i < size; i++){
        temp[i] = new RAMunit(0);
    }
    return temp
}

window.RAM = {
    ins: createRAMBlock(256),
    val: createRAMBlock(256)
};

window.bTI = binToInt
window.ru = RAMunit
let nothingp = {
    get(){
        return new EightBit(0);
    },
    set(x){
        return 0;
    }
}

window.port = {
    _p0: nothingp,
    _p1: nothingp,
    _p2: nothingp,
    get p0(){
        return this._p0.get();
    },
    set p0(x){
        this._p0.set(x);
    },
    get p1(){
        return this._p1.get();
    },
    set p1(x){
        this._p1.set(x);
    },
    get p2(){
        return this._p2.get();
    },
    set p2(x){
        this._p2.set(x);
    },
}

window.EEPROM = {}

window.dec0der = {
    0: nothing,
    1: nothing,
    2: () => {
        window.ValBlk[window.ValBlk[window.Counter.val].toInt()] = new EightBit(0);
    },
    3: () => {
        window.ValBlk[window.ValBlk[window.Counter.val].toInt()] = window.normal;
    },
    4: () => {
        window.normal = window.ValBlk[window.Counter.val];
    },
    5: () => {
        window.ValBlk[window.ValBlk[window.Counter.val].toInt()] = window.carry;
    },
    6: () => {
        window.normal = window.ValBlk[window.Counter.val];
    },
    7: () => {
        window.Counter.val = window.ValBlk[window.Counter.val].toInt();
    },
    8: () => {
        if (window.normal.toInt() == 1) window.Counter.val = window.ValBlk[window.Counter.val].toInt();
    },
    9: nothing,
    10: () => {
        window.normal = window.ALU.add(window.normal, window.ValBlk[window.Counter.val])
    },
    11: () => {
        window.normal = window.ALU.dif(window.normal, window.ValBlk[window.Counter.val])
    },
    12: () => {
        window.normal = window.ALU.invdif(window.normal, window.ValBlk[window.Counter.val])
    },
    13: () => {
        window.normal = window.ALU.mult(window.normal, window.ValBlk[window.Counter.val])
    },
    14: () => {
        window.normal = window.ALU.div(window.normal, window.ValBlk[window.Counter.val])
    },
    15: nothing,
    16: nothing,
    17: nothing,
    18: () => {
        window.normal = window.ALU.and(window.normal, window.ValBlk[window.Counter.val])
    },
    19: () => {
        window.normal = window.ALU.or(window.normal, window.ValBlk[window.Counter.val])
    },
    20: () => {
        window.normal = window.ALU.xor(window.normal, window.ValBlk[window.Counter.val])
    },
    21: () => {
        window.normal = window.ALU.not(window.normal, window.ValBlk[window.Counter.val])
    },
    22: nothing,
    23: nothing,
    24: () => {
        window.normal = window.ALU.st(window.normal, window.ValBlk[window.Counter.val])
    },
    25: () => {
        window.normal = window.ALU.gt(window.normal, window.ValBlk[window.Counter.val])
    },
    26: nothing,
    27: () => {
        window.InsBlk = window.RAM.ins[window.ValBlk[window.Counter.val]];
        window.ValBlk = window.RAM.val[window.ValBlk[window.Counter.val]];
    },
    28: () => {

        window.RAM.ins[window.ValBlk[window.Counter.val].toInt()] = window.InsBlk
        window.RAM.val[window.ValBlk[window.Counter.val].toInt()] = window.ValBlk
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
    38: () => {
        window.normal = window.EEPROM[window.ValBlk[window.Counter.val].toInt()] || new EightBit(0)
    },
    39: () => {
        window.EEPROM[window.ValBlk[window.Counter.val].toInt()] = window.normal
    },
    40: nothing,
    41: () => {
        window.video.vram = bit2D(200,100);
        window.video.display();
    },
    42: () => {
        window.video.render();
        window.video.display();
    },
    43: nothing,
    44: nothing,
    45: () => {
        window.KASCII.y = window.ValBlk[window.Counter.val].toInt()
    },
    46: () => {
        window.KASCII.x = window.ValBlk[window.Counter.val].toInt()
    },
    47: () => {
        window.KASCII.char = window.ValBlk[window.Counter.val].toInt()
    },
    48: () => {
        window.KASCII.char = window.ValBlk[window.Counter.val].toInt()
        window.KASCII.x = window.KASCII.x + 1
        if (window.KASCII.x == 0) window.KASCII.y = window.KASCII.y + 1
    },
    49: () => {
        window.KASCII.mem = createCacheBlock(1024);
    },
    50: nothing,
    51: nothing,
}
for(let i = 52; i < 256; i++){
    window.dec0der[i] = nothing;
}