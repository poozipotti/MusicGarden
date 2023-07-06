export class VisualRenderer {
  constructor(ctx, getFlowers) {
    this.ctx = ctx;
    this.getFlowers = getFlowers;
    window.setInterval(() => {
      render();
    }, 16);
    render();
  }
  render() {
    this.clearCanvas();
    this.getFlowers().forEach((flower) => {
      flower.visualizer.draw();
    });
  }
  clearCanvas() {
    var primaryColor = "#dde0cc";
    this.ctx.fillStyle = primaryColor;
    this.ctx.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);
  }
}
