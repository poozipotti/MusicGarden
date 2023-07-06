const AudioContext = new window.AudioContext();
const masterCompressor = new DynamicsCompressorNode(AudioContext, {})
masterCompressor.connect(AudioContext.destination)
export class AudioRenderer {
  static BPM = 120;
  static MSPB = 60000 / AudioRenderer.BPM;
  static AudioContext = AudioContext;
  static masterCompressor = masterCompressor;
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
