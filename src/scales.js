class Note {
  /*starting at c4*/
  static frequencyLookup = {
    c: 261.63,
    "c#": 277.18,
    d: 293.66,
    "d#": 311.13,
    e: 329.63,
    f: 349.23,
    "f#": 369.99,
    g: 392,
    "g#": 415.3,
    a: 440,
    "a#": 466.16,
    b: 493.88,
  };
  constructor(note, octave) {
    this.note = note;
    this.octave = octave;
    const baseFrequency = this.frequencyLookup[note];
    if (!this.baseFrequency) {
      throw new Error("that note does not exist, only sharps are accepted");
    }
    this.frequency = baseFrequency * Math.pow(2, octave);
  }
  static NoteFromFequency() {
    Object.values(Note.frequencyLookup).filter();
  }
}
class Scale {
  constructor(steps, startingNote) {
    (this.steps = steps), (this.startingNote = startingNote);
  }
  getNoteAtScaleStep(step) {
    const octave = Math.floor(step / this.steps.length);
    const halfSteps = steps[step % this.steps.length];

    const noteLocation =
      (Object.keys(Note.frequencyLookup).indexOf(this.startingNote.note) +
        halfSteps) %
      12;
    const [note] = Object.entries(Note.frequencyLookup)[noteLocation];
    return new Note(note, octave);
  }
}
export const MajorScale = (startingNote) => {
  return new Scale([0, 2, 4, 5, 7, 9, 11], startingNote);
};
