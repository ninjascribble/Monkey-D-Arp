export class AudioEngine {
  context: AudioContext
  masterGain: GainNode

  tempo = 120
  private nextNoteTime = 0
  private lookahead = 0.1
  private intervalId: number | null = null

  constructor() {
    this.context = new AudioContext()
    this.masterGain = this.context.createGain()
    this.masterGain.gain.value = 0.8
    this.masterGain.connect(this.context.destination)
  }

  secondsPerBeat() {
    return 60 / this.tempo
  }

  private schedule(callback: (time: number) => void) {
    const now = this.context.currentTime

    while (this.nextNoteTime < now + this.lookahead) {
      callback(this.nextNoteTime)
      this.nextNoteTime += this.secondsPerBeat()
    }
  }

  start(callback: (time: number) => void) {
    if (this.intervalId !== null) return

    this.nextNoteTime =
      this.context.currentTime + this.secondsPerBeat()

    this.intervalId = window.setInterval(
      () => this.schedule(callback),
      25
    )
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
