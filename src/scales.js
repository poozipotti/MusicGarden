export class Note {
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
    const baseFrequency = Note.frequencyLookup[note.toLowerCase()];

    if (!baseFrequency) {
      throw new Error(
        `that note (${note}) does not exist, only sharps are accepted`
      );
    }
    this.frequency = baseFrequency * Math.pow(2, octave);
  }
  static NoteFromFequency() {
    Object.values(Note.frequencyLookup).filter();
  }
}
class Scale {
  constructor(steps, startingNote) {
    this.steps = steps;
    this.startingNote = startingNote;
    if (!startingNote.note || !startingNote.frequency || !startingNote.octave) {
      throw new Error(
        "Make sure to pass a note object to the scale constructor"
      );
    }
  }
  getNoteAtScaleStep(step) {
    const octave =
      Math.floor(step / this.steps.length) + this.startingNote.octave;
    const halfSteps = this.steps[step % this.steps.length];

    const startingIndex = Object.keys(Note.frequencyLookup).indexOf(
      this.startingNote.note
    );
    const noteLocation = (startingIndex + halfSteps) % 12;
    const [note] = Object.entries(Note.frequencyLookup)[noteLocation];
    if (!note) {
      throw new Error(
        `could not get note ${this.startingNote} in ${Object.keys(
          Note.frequencyLookup
        )}`
      );
    }
    return new Note(note, octave);
  }
}
export const MajorScale = (startingNote) => {
  return new Scale([0, 2, 4, 5, 7, 9, 11], startingNote);
};
export const OneNote = (startingNote) => {
  return new Scale([0], startingNote);
};



//C, D, Eb, G, Ab, C.
export const Japanese = (startingNote) => {
  return new Scale([0,2,3,7,8], startingNote);
};

//CDFG
export const Fun = (startingNote) => {
  return new Scale([0,2,5,7], startingNote);
};
export const Triad = (startingNote) => {
  return new Scale([0,4,7], startingNote);
};
