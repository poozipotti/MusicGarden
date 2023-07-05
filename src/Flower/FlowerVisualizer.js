export class FlowerVisualizer {
  constructor(ctx, data, state) {
    this.state = state;
    this.data = data;
    this.ctx = ctx;
  }
  draw() {
    const pixelHeight = this.data.stemHeight * 15 + 200;
    this.ctx.translate(this.state.position, pixelHeight);
    this.drawStem(20,pixelHeight);
    this.drawPetals();
    this.drawHead();
    this.ctx.translate(-1 * this.state.position, -1 * pixelHeight);
    console.log("drew");
    console.log({ data: this.data });
  }
  drawStem(stemWidth, flowerHeight) {
    this.ctx.fillStyle = "#73ba8d";
    this.ctx.fillRect(
      -0.5 * stemWidth,
      0,
      0.5 * stemWidth,
      flowerCanvas.height - flowerHeight
    );
  }
  drawPetals() {
    var TO_RADIANS = Math.PI / 180;
    for (var j = 0; j < this.data.petalCount; j++) {
      const color = this.data.petalColor;
      const formattedColor = `#${color[0].toString(16)}${color[1].toString(
        16
      )}${color[2].toString(16)}AA`;
      this.ctx.fillStyle = formattedColor;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.quadraticCurveTo(
        this.data.petalCurve * this.data.petalWidth,
        this.data.petalHeight,
        this.data.petalWidth,
        0
      );
      this.ctx.moveTo(0, 0);
      this.ctx.quadraticCurveTo(
        this.data.petalCurve * this.data.petalWidth,
        -1 * this.data.petalHeight,
        this.data.petalWidth,
        0
      );
      this.ctx.fill();
      this.ctx.rotate(TO_RADIANS * (360 / this.data.petalCount));
    }
    this.ctx.rotate(TO_RADIANS * (360 - (360 / this.data.petalCount) * j));
  }
  drawHead() {
    this.ctx.fillStyle = "#fced7e";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}
