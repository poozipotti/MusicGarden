const AudioContext = new window.AudioContext();
const masterCompressor = new DynamicsCompressorNode(AudioContext, {});
masterCompressor.connect(AudioContext.destination);
export class AudioRenderer {
  static BPM = 60;
  static MSPB = 60000 / AudioRenderer.BPM;
  static AudioContext = AudioContext;
  static masterCompressor = masterCompressor;
  constructor() {}

  render(flowers) {
    //plays audio based on state
    flowers.forEach((flower) => {
      flower.beatUpdate();
    });
  }
}
