import { Flower } from "../Flower";
import { AudioRenderer } from "./AudioRenderer";
import { VisualRenderer } from "./VisualRenderer";
const FLOWER_EVENT_BEATS_NEEDED = 64;
export class FlowerRenderer {
  constructor() {
    this.flowers = {};
    const flowerCanvas = document.getElementById("flowerCanvas");
    this.canvasContext = flowerCanvas.getContext("2d");
    this.audioRenderer = new AudioRenderer();
    this.visualRenderer = new VisualRenderer(this.canvasContext);
    this.count = 0;
    window.setInterval(() => {
      this.flowerEvent();
      this.audioRenderer.render(this.getFlowers());
    }, AudioRenderer.MSPB / 16); // we want to run the beat loop on 16 notes
    window.setInterval(() => {
      this.visualRenderer.render(this.getFlowers());
    }, 16);
    this.visualRenderer.render(this.getFlowers());
  }
  flowerEvent() {
    if (this.count === FLOWER_EVENT_BEATS_NEEDED) {
      this.count = 0;
      for (let i = 4; i--; i == 0) {
        if (Math.random() < 0.5 && this.getFlowers().length > 1) {
          const [bucket, index] = this.getRandomFlowerIndex();
          this.removeFlowerAt(bucket, index);
        }
        if (Math.random() < 0.2) {
          this.addFlower();
        }
      }
    }
    this.count++;
  }
  getRandomFlowerIndex() {
    const flowerBuckets = Object.entries(this.flowers).filter(
      ([, flowers]) => flowers?.length > 0
    );
    if (flowerBuckets.length === 0) return -1;
    const bucketIndex = Math.floor(Math.random() * flowerBuckets.length);
    const flowerIndex = Math.floor(
      Math.random() * flowerBuckets[bucketIndex].length
    );
    return [bucketIndex, flowerIndex];
  }
  addFlower(canOverwrite = true) {
    const tempFlower = new Flower(
      this.canvasContext,
      AudioRenderer.AudioContext
    );
    const MAX_SIMILIAR_FLOWERS_LOWS = 2;
    const MAX_SIMILIAR_FLOWERS_HIGHS = 3;
    const BUCKETS = 8;
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
  removeFlowerAt(bucket, index) {
    if (!this.flowers[bucket] || this.flowers[bucket].length < index) {
      console.warn(
        `no flowers in bucket ${bucket} at index ${index} found bucket ${this.flowers[bucket]}`
      );
      return;
    } else {
      this.flowers[bucket][index].destroy();
      this.flowers[bucket].splice(index, 1);
    }
  }

  resetFlowers() {
    this.getFlowers().forEach((flower) => {
      flower.destroy();
    });
    this.flowers = {};
  }
}
