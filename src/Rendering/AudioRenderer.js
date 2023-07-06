export class AudioRenderer {
  constructor(getFlowers) {
    this.count = 0;
    const BPM = 120;
    this.getFlowers = getFlowers;
    //milliseconds per beat
    const MSPB = 60000 / BPM;
    window.setInterval(() => {
      render(flowers);
    }, MSPB / 16); // we want to run the beat loop on 16 notes
    //
  }

  render() {
    this.count++;
    if (this.count == 32) {
      this.count = 0;
    }

    //plays audio based on state
    this.getFlowers().forEach((flower) => {
      flower.beatUpdate();
    });
  }
}
