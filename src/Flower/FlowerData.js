import * as Scales from "../scales.js";
export const WIDTH_CLAMP = [10, 90];
export const PETAL_OFFSET_CLAMP = [0, 16];
export const STEM_CLAMP = [0, 12];
export const WAVE_TYPES = ["square", "sawtooth"];
export const PANNING_CLAMP = [-1, 1];
export const PETAL_COUNTS = [2, 2, 2, 4, 4, 4, 4, 4, 8, 8, 8, 16, 16, 32];
const clamp = (num, [min, max]) => {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};
export class FlowerData {
  constructor({
    stemHeight,
    petalCurve,
    petalWidth,
    petalHeight,
    petalColor,
    petalCount,
    headScalePattern,
    scale,
    petalOffset,
    waveType,
    panning,
  }) {
    /*
     * given in step of scale ie. in a chromatic scale 0 would be <note>4
     * 12 would be <note>5
     *  in a major scale it would be 0 and then 8 for an octave up
     */
    this.stemHeight = stemHeight;
    this.petalCurve = petalCurve;
    this.petalWidth = petalWidth;
    this.petalHeight = petalHeight;
    this.petalColor = petalColor;
    this.petalCount = petalCount;
    this.petalOffset = petalOffset;
    this.waveType = waveType;
    this.panning = panning;

    /*
     * array sequence ie [[0,+3,+4],[0],[0]] for a chord and two notes
     * (these are represented in steps in the scale)
     * */
    this.headScalePattern = headScalePattern;
    /*
     * Scale, used in conjunction with headScalePattern to generate
     * sequence.
     */
    this.scale = scale;
  }
  static getSerialization() {}
  static MergeFlowerData(flowerDataOne, flowerDataTwo) {}
  static RandomFlowerData() {
    return new FlowerData({
      stemHeight: clamp(Math.floor(Math.random() * STEM_CLAMP[1]), STEM_CLAMP),
      petalCurve: Math.random() * 1,
      petalWidth: clamp(Math.random() * WIDTH_CLAMP[1] + 20, WIDTH_CLAMP),
      petalHeight: Math.random() * 200 + 100,
      petalColor: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      petalCount: PETAL_COUNTS[Math.floor(Math.random() * PETAL_COUNTS.length)],
      headScalePattern: [0],
      scale: Scales.Lydian(new Scales.Note("a", -1)),
      petalOffset: clamp(Math.random() * 17, PETAL_OFFSET_CLAMP),
      waveType: WAVE_TYPES[Math.floor(WAVE_TYPES.length * Math.random())],
      panning: clamp(Math.random() * 2 - 1, PANNING_CLAMP),
    });
  }
}
