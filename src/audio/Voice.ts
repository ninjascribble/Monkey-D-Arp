import { AudioEngine } from "./AudioEngine";

export interface VoiceParams {
  attack: number
  decay: number
  sustain: number
  release: number
  volume: number
  octave: number
}

export class Voice {
  private engine: AudioEngine
  private params: VoiceParams

  constructor(engine: AudioEngine, params: VoiceParams) {
    this.engine = engine
    this.params = params
  }

  playNote(freq: number, time: number, duration: number) {
    const ctx = this.engine.context

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const epsilon = 0.0001
    const filter = ctx.createBiquadFilter()

    osc.type = "triangle"
    osc.frequency.value = freq * Math.pow(2, this.params.octave)

    gain.gain.setValueAtTime(epsilon, time)
    gain.gain.exponentialRampToValueAtTime(
      this.params.volume,
      time + this.params.attack
    )
    gain.gain.exponentialRampToValueAtTime(
      this.params.volume * this.params.sustain,
      time + this.params.attack + this.params.decay
    )
    gain.gain.exponentialRampToValueAtTime(
      epsilon,
      time + duration + this.params.release
    )

    filter.type = "lowpass"
    filter.frequency.value = 1800
    filter.Q.value = 0.7

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.engine.masterGain)

    osc.start(time)
    osc.stop(time + duration + this.params.release)
  }
}
