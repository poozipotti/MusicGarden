export class VisualRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  render(flowers) {
    this.clearCanvas();
    flowers.forEach((flower) => {
      flower.visualizer.draw();
    });
  }
  clearCanvas() {
    var primaryColor = "#dde0cc";
    this.ctx.fillStyle = primaryColor;
    this.ctx.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);
  }
}
