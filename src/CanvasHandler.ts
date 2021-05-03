export class CanvasHandler {
  private cnv?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  constructor(canvas?: HTMLCanvasElement) {
    this.cnv = canvas;
    this.ctx = canvas?.getContext("2d") ?? undefined;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.cnv = canvas;
    this.ctx = canvas?.getContext("2d") ?? undefined;
  }

  drawLetter(x: number, y: number, t: string) {
    //TODO: limit string size to 1 character
    if (x > 39 || y > 19 || t.length > 1 || !this.ctx) return false;
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(t, x * 20 + 1, (y + 1) * 20);
    return true;
  }

  drawPixel(x: number, y: number) {
    if (this.ctx) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x * 5, y * 5, 5, 5);
    }
  }

  drawPixelRaw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  clear() {
    this.cnv &&
      this.ctx &&
      this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
  }
}
