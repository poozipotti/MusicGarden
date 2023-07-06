import { Flower } from "./Flower/index.js";
export class FlowerRenderer {
  constructor() {
    this.flowers = {};
    this.AudioRenderer = new this.AudioRenderer(this.getFlowers());
    this.VisualRenderer = new this.VisualRenderer();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    const flowerCanvas = document.getElementById("flowerCanvas");
    this.canvasContext = flowerCanvas.getContext("2d");
  }
  addFlower(canOverwrite = true) {
    const tempFlower = new Flower(canvasCtx, audioContext);
    const MAX_SIMILIAR_FLOWERS_LOWS = 1;
    const MAX_SIMILIAR_FLOWERS_HIGHS = 3;
    const BUCKETS = 4;
    const flowerBucket = tempFlower.data.stemHeight % BUCKETS;
    if (!flowers[flowerBucket]) {
      flowers[flowerBucket] = [tempFlower];
      return;
    }
    if (
      flowers[flowerBucket].length >=
      (flowerBucket < BUCKETS / 2
        ? MAX_SIMILIAR_FLOWERS_LOWS
        : MAX_SIMILIAR_FLOWERS_HIGHS)
    ) {
      if (canOverwrite) {
        flowers[flowerBucket].splice(0, 1);
      } else {
        console.warn("flower not added too many similiar notes");
        return;
      }
    }
    flowers[flowerBucket].push(tempFlower);
  }
  getFlowers() {
    return Object.values(flowers).reduce(
      (allFLowers, flowerBucket) => [...allFLowers, ...flowerBucket],
      []
    );
  }

  resetFlowers() {
    getFlowers().forEach((flower) => {
      flower.destroy();
    });
    flowers = {};
  }
}
