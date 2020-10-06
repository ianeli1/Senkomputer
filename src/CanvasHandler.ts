export class CanvasHandler {
  private cnv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.cnv = canvas;
    const context = canvas.getContext("2d");
    if (context) {
      this.ctx = context;
    } else {
      throw new Error("Failed to get 2D context");
    }
  }

  drawLetter(x: number, y: number, t: string) {
    //TODO: limit string size to 1 character
    if (x > 39 || y > 19 || t.length > 1) return false;
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(t, x * 20 + 1, (y + 1) * 20);
    return true;
  }

  drawPixel(x: number, y: number) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x * 5, y * 5, 5, 5);
  }

  drawPixelRaw(x: number, y: number) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x, y, 1, 1);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
  }
}
