import { useEffect, useRef } from "react"
import { AudioEngine } from "./audio/AudioEngine"
import { Voice } from "./audio/Voice"
import { NOTES } from "./audio/scales"
import { getScaleFrequencies } from "./audio/getScaleFrequencies"

export default function App() {
  const engineRef = useRef<AudioEngine | null>(null)
  const stepRef = useRef(0)
  const key = "E"
  const scale = "phrygian"
  const octave = 4

  useEffect(() => {
    const engine = new AudioEngine()
    engineRef.current = engine

    const voice = new Voice(engine, {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.7,
      release: 0.2,
      volume: 0.3,
      octave: 0,
    })

    const sequence = getScaleFrequencies(
      key,
      scale,
      octave
    )

    engine.startScheduler((time) => {
      const note =
        sequence[stepRef.current % sequence.length]

      voice.playNote(
        note,
        time,
        engine.secondsPerBeat() * 0.9
      )

      stepRef.current++
    })
  }, [])


  return (
    <div style={{ padding: 24 }}>
      <h1>Browser Arpeggiator</h1>

      <button
        onClick={() => engineRef.current?.context.resume()}
      >
        Start Audio
      </button>

      {/* Global controls go here */}
      {/* Voice panels go here */}
      <select
        onChange={(e) => {
          // later: regenerate sequence
          console.log("Key:", e.target.value)
        }}
      >
        {Object.keys(NOTES).map(k => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <select>
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
