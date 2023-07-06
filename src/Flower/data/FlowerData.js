import * as constants from "./constants";
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
    this.stemHeight = clamp(stemHeight, constants.STEM_MINMAX);
    this.petalCurve = clamp(petalCurve, constants.PETAL_CURVE_MINMAX);
    this.petalWidth = clamp(petalWidth, constants.PETAL_WIDTH_MINMAX);
    this.petalHeight = clamp(petalHeight, constants.PETAL_HEIGHT_MINMAX);
    this.petalColor = petalColor;
    this.petalCount = clamp(petalCount, constants.PETAL_COUNT_MINMAX);
    this.petalOffset = clamp(petalOffset, constants.PETAL_OFFSET_MINMAX);
    this.waveType = waveType;
    this.panning = clamp(panning, constants.PANNING_MINMAX);

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
      stemHeight: Math.floor(Math.random() * constants.STEM_MINMAX[1]),
      petalCurve: Math.random() * constants.PETAL_CURVE_MINMAX[1],
      petalWidth: Math.random() * constants.PETAL_WIDTH_MINMAX[1] + 20,
      petalHeight: Math.random() * constants.PETAL_HEIGHT_MINMAX[1] + 100,
      petalColor: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      petalCount:
        constants.PETAL_COUNTS[
          Math.floor(Math.random() * constants.PETAL_COUNTS.length)
        ],
      headScalePattern: [0] /*unusued for now*/,
      scale: constants.SCALES[0],
      petalOffset:
        constants.PETAL_OFFSETS[
          Math.floor(Math.random() * constants.PETAL_OFFSETS.length)
        ],
      waveType:
        constants.WAVE_TYPES[
          Math.floor(constants.WAVE_TYPES.length * Math.random())
        ],
      panning: clamp(Math.random() * 2 - 1, constants.PANNING_MINMAX),
    });
  }
}
