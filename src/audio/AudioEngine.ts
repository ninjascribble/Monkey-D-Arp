export class AudioEngine {
  context: AudioContext
  masterGain: GainNode

  tempo = 120
  timeSignature: [number, number] = [4, 4]

  private nextNoteTime = 0
  private lookahead = 0.1 // seconds

  constructor() {
    this.context = new AudioContext()
    this.masterGain = this.context.createGain()
    this.masterGain.gain.value = 0.8
    this.masterGain.connect(this.context.destination)
  }

  setMasterVolume(v: number) {
    this.masterGain.gain.value = v
  }

  secondsPerBeat() {
    return 60 / this.tempo
  }

  schedule(callback: (time: number) => void) {
    const now = this.context.currentTime

    while (this.nextNoteTime < now + this.lookahead) {
      callback(this.nextNoteTime)
      this.nextNoteTime += this.secondsPerBeat()
    }
  }

  startScheduler(callback: (time: number) => void) {
    this.nextNoteTime = this.context.currentTime
    setInterval(() => this.schedule(callback), 25)
  }
}
