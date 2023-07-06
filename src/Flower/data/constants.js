import * as Scales from "./scales";
/* clamps flower values and is used in random generation */
export const FLOWER_BEATS = 32; //four bars
export const STEM_MINMAX = [0, 24];
export const PETAL_CURVE_MINMAX = [0, 1];
export const PETAL_WIDTH_MINMAX = [10, 90];
export const PETAL_HEIGHT_MINMAX = [100, 300];
export const PETAL_COUNTS = [ 2, 4, 4, 4, 4, 4, 8, 8, 8, 16, 16];
export const PETAL_COUNT_MINMAX = [2, 32];
export const SCALES = [Scales.Lydian(new Scales.Note("a", -2))];

export const PETAL_OFFSET_MINMAX = [0, 32];
export const PETAL_OFFSETS = [0, 0, 0,0,0,0,4,8];

export const WAVE_TYPES = ["square", "sawtooth"];
export const PANNING_MINMAX = [-1, 1];

//how many BEATS are in a flower before it resets?
