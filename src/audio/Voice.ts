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

    osc.type = "sawtooth"
    osc.frequency.value = freq * Math.pow(2, this.params.octave)

    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(
      this.params.volume,
      time + this.params.attack
    )
    gain.gain.linearRampToValueAtTime(
      this.params.volume * this.params.sustain,
      time + this.params.attack + this.params.decay
    )
    gain.gain.linearRampToValueAtTime(
      0,
      time + duration + this.params.release
    )

    osc.connect(gain)
    gain.connect(this.engine.masterGain)

    osc.start(time)
    osc.stop(time + duration + this.params.release)
  }
}
