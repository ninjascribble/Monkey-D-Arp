import {
  NOTE_OFFSETS,
  MODES,
  type MusicalMode,
  noteIndexToFrequency,
} from "./theory"

export function getScaleFrequencies(
  key: keyof typeof NOTE_OFFSETS,
  mode: MusicalMode,
  octave: number
): number[] {
  const rootNoteIndex =
    NOTE_OFFSETS[key] + octave * 12

  return MODES[mode].map(interval =>
    noteIndexToFrequency(rootNoteIndex + interval)
  )
}
