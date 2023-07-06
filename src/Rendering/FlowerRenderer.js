import { Flower } from "../Flower";
import { AudioRenderer } from "./AudioRenderer";
import { VisualRenderer } from "./VisualRenderer";
export class FlowerRenderer {
  constructor() {
    this.flowers = {};
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    const flowerCanvas = document.getElementById("flowerCanvas");
    this.canvasContext = flowerCanvas.getContext("2d");
    this.audioRenderer = new AudioRenderer();
    this.visualRenderer = new VisualRenderer(this.canvasContext);
    window.setInterval(() => {
      this.audioRenderer.render(this.getFlowers());
    }, AudioRenderer.MSPB / 16); // we want to run the beat loop on 16 notes
    window.setInterval(() => {
      this.visualRenderer.render(this.getFlowers());
    }, 16);
    this.visualRenderer.render(this.getFlowers());
  }
  addFlower(canOverwrite = true) {
    const tempFlower = new Flower(this.canvasContext, this.audioContext);
    const MAX_SIMILIAR_FLOWERS_LOWS = 1;
    const MAX_SIMILIAR_FLOWERS_HIGHS = 3;
    const BUCKETS = 4;
    const flowerBucket = tempFlower.data.stemHeight % BUCKETS;
    if (!this.flowers[flowerBucket]) {
      this.flowers[flowerBucket] = [tempFlower];
      return;
    }
    if (
      this.flowers[flowerBucket].length >=
      (flowerBucket < BUCKETS / 2
        ? MAX_SIMILIAR_FLOWERS_LOWS
        : MAX_SIMILIAR_FLOWERS_HIGHS)
    ) {
      if (canOverwrite) {
        this.flowers[flowerBucket].splice(0, 1);
      } else {
        console.warn("flower not added too many similiar notes");
        return;
      }
    }
    this.flowers[flowerBucket].push(tempFlower);
  }
  getFlowers() {
    return Object.values(this.flowers).reduce(
      (allFLowers, flowerBucket) => [...allFLowers, ...flowerBucket],
      []
    );
  }

  resetFlowers() {
    this.getFlowers().forEach((flower) => {
      flower.destroy();
    });
    this.flowers = {};
  }
}
