import { useEffect, useRef } from "react"
import { AudioEngine } from "./audio/AudioEngine"
import { Voice } from "./audio/Voice"
import { NOTES } from "./audio/scales"

export default function App() {
  const engineRef = useRef<AudioEngine | null>(null)
  const stepRef = useRef(0)

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

    const sequence = Object.values(NOTES)

    engine.startScheduler((time) => {
      const note = sequence[stepRef.current % sequence.length]
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
    </div>
  )
}
