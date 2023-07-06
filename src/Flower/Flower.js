import { FlowerData } from "./FlowerData.js";
import { FlowerVisualizer } from "./FlowerVisualizer";
import { FlowerStateData } from "./FlowerStateData.js";
import { FlowerAudio } from "./FlowerAudio.js";

//how many BEATS are in a flower before it resets?
const FLOWER_BEATS = 16 * 8; //four bars

export class Flower {
  constructor(ctx, audioCtx) {
    this.state = new FlowerStateData();
    this.data = FlowerData.RandomFlowerData();
    this.visualizer = new FlowerVisualizer(ctx, this.data, this.state);
    this.audio = new FlowerAudio(audioCtx, this.data, this.state);
  }
  beatUpdate() {
    const MAX_BEATS = Math.floor(FLOWER_BEATS / this.data.petalCount);
    if (this.state.receivedBeats === 0) {
      this.audio.playCurrentNote();
    }
    if (
      this.state.receivedBeats ===
      Math.floor(FLOWER_BEATS / this.data.petalCount) - 2
    ) {
      this.audio.stopCurrentNote();
    }
    this.state.receivedBeats += 1;
    if (this.state.receivedBeats === MAX_BEATS) {
      this.state.receivedBeats = 0;
      this.state.currentStep =
        (this.state.currentStep + 1) % this.data.petalCount;
    }
  }
  destroy() {
    this.audio.destroy();
  }
}
