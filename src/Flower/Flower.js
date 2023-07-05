import { FlowerData } from "./FlowerData.js";
import { FlowerVisualizer } from "./FlowerVisualizer";
import { FlowerStateData } from "./FlowerStateData.js";

//how many BEATS are in a flower before it resets?
const FLOWER_BEATS = 16 * 4; //four bars

export class Flower {
  constructor(ctx) {
    this.state = new FlowerStateData({ position: 500 });
    this.data = FlowerData.RandomFlowerData();
    this.visualizer = new FlowerVisualizer(ctx, this.data, this.state);
  }
  beatUpdate() {
    this.state.receivedBeats += 1;
    if (this.state.receivedBeats === FLOWER_BEATS / this.data.petalCount) {
      this.state.receivedBeats = 0;
      this.state.currentStep =
        (this.state.currentStep + 1) % this.data.petalCount;
    }
  }
}
