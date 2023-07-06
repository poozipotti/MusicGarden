import { FlowerData } from "./data/FlowerData.js";
import { FlowerVisualizer } from "./FlowerVisualizer";
import { FlowerStateData } from "./data/FlowerStateData.js";
import { FlowerAudio } from "./FlowerAudio.js";
import { FLOWER_BEATS } from "./data/constants.js";


export class Flower {
  constructor(ctx, audioCtx) {
    this.state = new FlowerStateData();
    this.data = FlowerData.RandomFlowerData();
    this.visualizer = new FlowerVisualizer(ctx, this.data, this.state);
    this.audio = new FlowerAudio(audioCtx, this.data, this.state);
  }
  beatUpdate() {
    const BEATS_PER_PETAL = Math.floor(FLOWER_BEATS / this.data.petalCount);
    if (this.state.receivedBeats === this.data.petalOffset) {
      this.audio.playCurrentNote();
    }
    if (
      this.state.receivedBeats ===
      BEATS_PER_PETAL + this.data.petalOffset - 2
    ) {
      this.audio.stopCurrentNote();
    }
    this.state.receivedBeats += 1;
    if (this.state.receivedBeats === BEATS_PER_PETAL + this.data.petalOffset) {
      this.state.receivedBeats = 0;
      this.state.currentStep =
        (this.state.currentStep + 1) % this.data.petalCount;
    }
  }
  destroy() {
    this.audio.destroy();
  }
}
