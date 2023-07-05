export class FlowerAudio {
  constructor(audioCtx, data, state) {
    this.state = state;
    this.data = data;
    this.audioCtx = audioCtx;
    this.filter = new BiquadFilterNode(this.audioCtx, {
      frequency: 800,
      q: 300,
    });
  }
  destroy() {
    this.stopCurrentNote();
  }
  playCurrentNote() {
    if (!this.state.isPlaying) {
      this.oscillator = new OscillatorNode(this.audioCtx, {
        type: "sawtooth",
        frequency:
          this.data.scale.getNoteAtScaleStep(this.data.stemHeight).frequency /
          4,
      });
      this.oscillator.connect(this.filter).connect(this.audioCtx.destination);
      this.oscillator.start();
      this.state.isPlaying = true;
    }
  }
  stopCurrentNote() {
    if (this.state.isPlaying) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
      this.state.isPlaying = false;
    }
  }
}
