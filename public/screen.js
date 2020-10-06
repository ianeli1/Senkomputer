window.cnv = document.getElementById("screen");
let cnv = window.cnv
cnv.height = 400
cnv.width = 800
cnv.ctx = cnv.getContext("2d");
cnv.drawPixelRaw = (x,y) => { 
    cnv.ctx.fillStyle = 'white';
    cnv.ctx.fillRect(x,y,1,1);
}
cnv.drawLetter = (x,y,t) => { //40x20 characters, 20px x 20px
    if(x > 39 || y > 19 || t.length > 1) return false;
    cnv.ctx.fillStyle = "white";
    cnv.ctx.font = "20px Arial";
    cnv.ctx.fillText(t, x*20+1, (y+1)*20);
    return true;
}
cnv.drawPixel = (x,y) => {
    cnv.ctx.fillStyle = 'white';
    cnv.ctx.fillRect(x*5,y*5,5,5);
}

cnv.clear = () => {
    cnv.ctx.clearRect(0, 0, cnv.width, cnv.height);
}

