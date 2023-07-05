export class FlowerAudio {
  constructor(audioCtx, data, state) {
    this.state = state;
    this.data = data;
    this.audioCtx = audioCtx;
    this.filter = new BiquadFilterNode(this.audioCtx, {
      frequency: 400,
      q: 300,
    });
    this.amount = Math.random() < 0.5 ? 0.5 : 1;
  }
  destroy() {
    this.stopCurrentNote();
  }
  playCurrentNote() {
    const flowerNote = this.data.scale.getNoteAtScaleStep(this.data.stemHeight);
    if (!this.state.isPlaying && Math.random() < this.amount) {
      this.oscillator = new OscillatorNode(this.audioCtx, {
        type: "sawtooth",
        frequency: flowerNote.frequency,
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
