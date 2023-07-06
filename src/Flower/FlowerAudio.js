export class FlowerAudio {
  constructor(audioCtx, data, state) {
    this.state = state;
    this.data = data;
    this.audioCtx = audioCtx;
    this.amount = Math.random() < 0.5 ? 0.5 : 1;
  }
  destroy() {
    this.stopCurrentNote();
  }
  playCurrentNote() {
    const flowerNote = this.data.scale.getNoteAtScaleStep(this.data.stemHeight);
    if (!this.state.isPlaying && Math.random() < this.amount) {
      this.oscillator = new OscillatorNode(this.audioCtx, {
        type: this.data.waveType,
        frequency: flowerNote.frequency,
      });
      this.filter = new BiquadFilterNode(this.audioCtx, {
        frequency: 200,
        Q: 1,
      });
      this.panning = new StereoPannerNode(this.audioCtx, {
        pan: this.data.panning
      })
      const speed =
        this.data.petalCount < 16
          ? Math.floor(this.data.petalWidth / 10)
          : Math.floor(Math.random() * 4);
      this.filter.frequency.setTargetAtTime(
        1000,
        this.audioCtx.currentTime,
        speed
      );
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
