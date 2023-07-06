export class AudioRenderer {
  static BPM = 120
  static MSPB = 60000 / AudioRenderer.BPM
  constructor() {
    this.count = 0;
  }

  render(flowers) {
    this.count++;
    if (this.count == 32) {
      this.count = 0;
    }

    //plays audio based on state
    flowers.forEach((flower) => {
      flower.beatUpdate();
    });
  }
}
