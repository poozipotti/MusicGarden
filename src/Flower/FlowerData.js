import * as Scales from "../scales.js";
const WIDTH_CLAMP = [20, 120];
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
      stemHeight: Math.floor(Math.random() * 30),
      petalCurve: Math.random() * 1,
      petalWidth: clamp(Math.random() * 200, WIDTH_CLAMP),
      petalHeight: Math.random() * 200 + 100,
      petalColor: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      petalCount: [2, 4, 8, 16][Math.floor(Math.random() * 4)],
      headScalePattern: [0],
      scale: Scales.Fun(new Scales.Note("f", -3)),
    });
  }
}
