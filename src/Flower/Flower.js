import { FlowerData } from "./FlowerData.js";
import { FlowerVisualizer } from "./FlowerVisualizer";
import { FlowerStateData } from "./FlowerStateData.js";

export class Flower {
  constructor(ctx) {
    this.state = new FlowerStateData({position:500});
    this.data = FlowerData.RandomFlowerData();
    this.visualizer = new FlowerVisualizer(ctx, this.data, this.state);
  }
}
