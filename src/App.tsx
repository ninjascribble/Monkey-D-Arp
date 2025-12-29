import { useRef } from "react"
import { AudioEngine } from "./audio/AudioEngine"
import { Voice } from "./audio/Voice"
import { NOTES } from "./audio/scales"
import { getScaleFrequencies } from "./audio/getScaleFrequencies"

export default function App() {
  const engineRef = useRef<AudioEngine | null>(null)
  const stepRef = useRef(0)
  const key = "D"
  const scale = "dorian"
  const octave = 4
  const engine = new AudioEngine()

  engineRef.current = engine

  const voice = new Voice(engine, {
    attack: 0.02,
    decay: 0.8,
    sustain: 0.6,
    release: 0.12,
    volume: 0.25,
    octave: 0,
  })

  const sequence = getScaleFrequencies(
    key,
    scale,
    octave
  )


  return (
    <div style={{ padding: 24 }}>
      <h1>Monkey D. Arp</h1>

      <button
        onClick={() => {
          const engine = engineRef.current
          if (!engine) return

          stepRef.current = 0
          engine.context.resume()
          engine.start((time) => {
            const note =
              sequence[stepRef.current % sequence.length]

            voice.playNote(
              note,
              time,
              engine.secondsPerBeat() * 0.75
            )

            stepRef.current++
          })
        }}
      >
        Start
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
