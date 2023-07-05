export class FlowerVisualizer {
  constructor(ctx, data, state) {
    this.state = state;
    this.data = data;
    this.ctx = ctx;
  }
  draw() {
    const pixelHeight = window.innerHeight - (this.data.stemHeight * 30 + 100);
    this.ctx.translate(this.state.position, pixelHeight);
    this.drawStem(10,pixelHeight);
    this.drawHead();
    this.drawPetals();
    this.ctx.translate(-1 * this.state.position, -1 * pixelHeight);
  }
  drawStem(stemWidth, flowerHeight) {
    this.ctx.fillStyle = "#73ba8d";
    this.ctx.fillRect(
      -0.5 * stemWidth,
      0,
       stemWidth,
      flowerCanvas.height - flowerHeight
    );
  }
  drawPetals() {
    var TO_RADIANS = Math.PI / 180;
    for (var j = 0; j < this.data.petalCount; j++) {
      const isSelected =  j == this.state.currentStep && this.state.isPlaying;
      const color = this.data.petalColor;
      const formattedColor = `#${color[0].toString(16)}${color[1].toString(
        16
      )}${color[2].toString(16)}`;
      const petalColor = isSelected ? formattedColor : formattedColor+'88'
      this.ctx.fillStyle = petalColor;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.quadraticCurveTo(
        this.data.petalCurve * this.data.petalHeight,
        this.data.petalWidth,
        this.data.petalHeight,
        0
      );
      this.ctx.moveTo(0, 0);
      this.ctx.quadraticCurveTo(
        this.data.petalCurve * this.data.petalHeight,
        -1 * this.data.petalWidth,
        this.data.petalHeight,
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
