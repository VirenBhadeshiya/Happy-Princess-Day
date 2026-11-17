/**
 * Original Princess Day Music Synthesizer (Web Audio API)
 * Composes a gentle royal harp, celesta, and warm string-pad melody
 * over an Fmaj9 – Em7 – Dm9 – Cmaj9 harmonic progression.
 */

interface ChordStep {
  pad: number[];
  arp: number[];
  melody: number[];
}

// Frequencies in Hz (Warm Concert Pitch)
const PROGRESSION: ChordStep[] = [
  // Fmaj9: F3, C4, E4, G4, A4
  {
    pad: [174.61, 261.63, 329.63, 392.0],
    arp: [349.23, 440.0, 523.25, 659.25, 783.99, 659.25, 523.25, 440.0],
    melody: [659.25, 783.99, 880.0, 783.99],
  },
  // Em7: E3, B3, D4, G4, B4
  {
    pad: [164.81, 246.94, 293.66, 392.0],
    arp: [329.63, 392.0, 493.88, 587.33, 783.99, 587.33, 493.88, 392.0],
    melody: [587.33, 659.25, 783.99, 659.25],
  },
  // Dm9: D3, A3, C4, E4, F4
  {
    pad: [146.83, 220.0, 261.63, 329.63],
    arp: [293.66, 349.23, 440.0, 523.25, 659.25, 523.25, 440.0, 349.23],
    melody: [659.25, 587.33, 523.25, 440.0],
  },
  // Cmaj9: C3, G3, B3, D4, E4
  {
    pad: [130.81, 196.0, 246.94, 293.66],
    arp: [261.63, 329.63, 392.0, 493.88, 587.33, 659.25, 587.33, 493.88],
    melody: [523.25, 587.33, 659.25, 783.99],
  },
];

class RoyalMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private timerId: number | null = null;
  private stepIndex = 0;
  private playing = false;

  public isPlaying(): boolean {
    return this.playing;
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();

      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.0001;

      // Subtle palace-hall echo delay
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.36;

      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.28;

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1900;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);
      delayFilter.connect(compressor);

      this.masterGain.connect(compressor);
      this.masterGain.connect(this.delayNode);
      compressor.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private playWarmPad(freqs: number[], durationSec: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    freqs.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.9);
      gain.gain.setValueAtTime(0.04, now + durationSec - 1.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec + 0.05);
    });
  }

  private playHarpPluck(freq: number, startOffset: number, volume = 0.09): void {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + startOffset;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, t);
    filter.frequency.exponentialRampToValueAtTime(650, t + 1.4);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.value = 0.25;

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    harmonic.start(t);
    osc.stop(t + 1.85);
    harmonic.stop(t + 1.85);
  }

  private playCelestaNote(freq: number, startOffset: number): void {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + startOffset;

    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 3, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.055, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);

    overtoneGain.gain.setValueAtTime(0.0001, t);
    overtoneGain.gain.linearRampToValueAtTime(0.014, t + 0.01);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    overtone.start(t);
    osc.stop(t + 1.55);
    overtone.stop(t + 0.5);
  }

  private scheduleBar(): void {
    if (!this.playing) return;
    const chord = PROGRESSION[this.stepIndex % PROGRESSION.length];
    const barDuration = 3.6; // Gentle 3.6s per chord bar

    this.playWarmPad(chord.pad, barDuration);

    // Gentle royal harp arpeggio across 8 eighth-notes
    chord.arp.forEach((freq, idx) => {
      this.playHarpPluck(freq, idx * 0.42, 0.075);
    });

    // Delicate celesta melody accents
    chord.melody.forEach((freq, idx) => {
      this.playCelestaNote(freq, 0.2 + idx * 0.85);
    });

    this.stepIndex += 1;
  }

  public async start(): Promise<void> {
    const ctx = this.ensureContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    if (this.playing) return;

    this.playing = true;
    const now = ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(
        Math.max(this.masterGain.gain.value, 0.0001),
        now
      );
      this.masterGain.gain.linearRampToValueAtTime(0.85, now + 0.6);
    }

    this.scheduleBar();
    this.timerId = window.setInterval(() => {
      this.scheduleBar();
    }, 3600);
  }

  public stop(): void {
    this.playing = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.45);
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.playing) {
      this.stop();
      return false;
    }
    await this.start();
    return true;
  }
}

export const royalMusic = new RoyalMusicEngine();
