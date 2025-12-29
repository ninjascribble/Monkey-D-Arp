import { useRef, useState } from "react"
import { AudioEngine } from "./audio/AudioEngine"
import { Voice } from "./audio/Voice"
import { NOTES } from "./audio/scales"
import { getScaleFrequencies } from "./audio/getScaleFrequencies"
import type { MusicalMode } from "./audio/theory"

export default function App() {
  const engineRef = useRef<AudioEngine | null>(null)
  const voiceRef = useRef<Voice | null>(null)
  const stepRef = useRef(0)
  const sequenceRef = useRef<number[]>([])

  const [key, setKey] = useState<keyof typeof NOTES>("C")
  const [scale, setScale] = useState<MusicalMode>("ionian")
  const octave = 4

  // Initialize engine and voice only once
  if (!engineRef.current) {
    const engine = new AudioEngine()
    const voice = new Voice(engine, {
      attack: 0.02,
      decay: 0.8,
      sustain: 0.12,
      release: 0.6,
      volume: 0.25,
      octave: 0,
    })

    engineRef.current = engine
    voiceRef.current = voice
  }

  // Update the scale whenever key or mode changes
  sequenceRef.current = getScaleFrequencies(key, scale, octave)

  const startEngine = () => {
    const engine = engineRef.current
    const voice = voiceRef.current
    if (!engine || !voice) return

    stepRef.current = 0
    engine.context.resume()

    // Stop any previous scheduler
    engine.stop()

    // Start a single scheduler that will always read the current sequence
    engine.start((time) => {
      const sequence = sequenceRef.current
      const note = sequence[stepRef.current % sequence.length]

      voice.playNote(note, time, engine.secondsPerBeat() * 0.75)
      stepRef.current++
    })
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Monkey D. Arp</h1>

      <button onClick={startEngine}>Start</button>

      <select
        value={key}
        onChange={(e) => setKey(e.target.value as keyof typeof NOTES)}
      >
        {Object.keys(NOTES).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      <select
        value={scale}
        onChange={(e) => setScale(e.target.value as MusicalMode)}
      >
        {(
          ["ionian","dorian","phrygian","lydian",
          "mixolydian","aeolian","locrian"] as const
        ).map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  )
}

