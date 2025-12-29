export const NOTE_OFFSETS: Record<string, number> = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
}

export type MusicalMode =
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian"

export const MODES: Record<MusicalMode, number[]> = {
  ionian:     [0, 2, 4, 5, 7, 9, 11, 12],
  dorian:     [0, 2, 3, 5, 7, 9, 10, 12],
  phrygian:   [0, 1, 3, 5, 7, 8, 10, 12],
  lydian:     [0, 2, 4, 6, 7, 9, 11, 12],
  mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
  aeolian:    [0, 2, 3, 5, 7, 8, 10, 12],
  locrian:    [0, 1, 3, 5, 6, 8, 10, 12],
}

const A4 = 440
const A4_NOTE_INDEX = NOTE_OFFSETS["A"] + 4 * 12

export function noteIndexToFrequency(index: number): number {
  return A4 * Math.pow(2, (index - A4_NOTE_INDEX) / 12)
}
