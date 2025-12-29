export const NOTES = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.0,
  A: 440.0,
  B: 493.88,
}

export const MODES = {
  up: (notes: number[]) => notes,
  down: (notes: number[]) => [...notes].reverse(),
  random: (notes: number[]) =>
    notes[Math.floor(Math.random() * notes.length)],
}
