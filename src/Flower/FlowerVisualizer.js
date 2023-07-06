import { PETAL_OFFSET_MINMAX, WAVE_TYPES } from "./data/constants";
export class FlowerVisualizer {
  constructor(ctx, data, state) {
    this.state = state;
    this.data = data;
    this.ctx = ctx;
  }
  draw() {
    const pixelHeight = window.innerHeight - (this.data.stemHeight * 40 + 100);
    const pixelOffset =
      window.innerWidth / 2 + (this.data.panning * window.innerWidth) / 2;
    this.ctx.translate(pixelOffset, pixelHeight);
    this.drawStem(10, pixelHeight);
    this.drawHead();
    this.drawPetals();
    this.ctx.translate(-1 * pixelOffset, -1 * pixelHeight);
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
    const offset =
      TO_RADIANS * ((360 / PETAL_OFFSET_MINMAX[1]) * this.data.petalOffset);
    this.ctx.rotate(offset);

    for (var j = 0; j < this.data.petalCount; j++) {
      const isSelected = j == this.state.currentStep && this.state.isPlaying;
      const color = this.data.petalColor;
      const formattedColor = `#${color[0].toString(16)}${color[1].toString(
        16
      )}${color[2].toString(16)}`;
      const petalColor = isSelected ? formattedColor : formattedColor + "88";
      this.ctx.fillStyle = petalColor;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      if (WAVE_TYPES[1] == this.data.waveType) {
        this.ctx.bezierCurveTo(
          this.data.petalCurve * this.data.petalHeight,
          this.data.petalWidth,
          this.data.petalCurve * this.data.petalHeight,
          this.data.petalWidth,
          this.data.petalHeight,
          0
        );
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(
          this.data.petalCurve * this.data.petalHeight,
          -1 * this.data.petalWidth,
          this.data.petalCurve * this.data.petalHeight,
          this.data.petalWidth,
          this.data.petalHeight,
          0
        );
      } else {
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
      }
      this.ctx.fill();
      this.ctx.rotate(TO_RADIANS * (360 / this.data.petalCount));
    }
    this.ctx.rotate(TO_RADIANS * (360 - (360 / this.data.petalCount) * j));
    this.ctx.rotate(-1 * offset);
  }
  drawHead() {
    this.ctx.fillStyle = "#fced7e";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}
