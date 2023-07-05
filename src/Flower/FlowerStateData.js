export class FlowerStateData {
  constructor({ currentStep, position }) {
    this.currentStep = currentStep || 0;
    this.receivedBeats = 0;
    this.position = position || 0;
    this.isPlaying = false;
  }
  reset() {
    this.currentStep = 0;
    this.receivedBeats = 0;
     
  }
}
