export class FlowerStateData {
  constructor({currentStep}={}) {
    this.currentStep = currentStep || 0;
    this.receivedBeats = 0;
    this.isPlaying = false;
  }
  reset() {
    this.currentStep = 0;
    this.receivedBeats = 0;
     
  }
}
