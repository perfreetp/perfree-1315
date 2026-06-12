type AmbientType = 'harbor' | 'rain' | 'quiet';

class AmbientAudioManager {
  private audioContext: AudioContext | null = null;
  private activeNodes: AudioNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentType: AmbientType | null = null;
  private intervals: number[] = [];

  init(): void {
    if (this.audioContext) return;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.15;
    this.gainNode.connect(this.audioContext.destination);
  }

  play(type: AmbientType): void {
    this.stop();
    this.init();

    if (!this.audioContext || !this.gainNode) return;

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.currentType = type;
    this.isPlaying = true;

    switch (type) {
      case 'harbor':
        this.playHarbor();
        break;
      case 'rain':
        this.playRain();
        break;
      case 'quiet':
        this.playQuiet();
        break;
    }
  }

  private playHarbor(): void {
    const ctx = this.audioContext!;
    const gain = this.gainNode!;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 60;
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.1;
    osc.connect(oscGain);
    oscGain.connect(gain);
    osc.start();
    this.activeNodes.push(osc);

    const brownNoise = this.createBrownNoise();
    const brownGain = ctx.createGain();
    brownGain.gain.value = 0.2;
    brownNoise.connect(brownGain);
    brownGain.connect(gain);
    brownNoise.start();
    this.activeNodes.push(brownNoise);

    const seagullInterval = window.setInterval(() => {
      if (!this.isPlaying || this.currentType !== 'harbor') return;
      this.playSeagullPing();
    }, 4000 + Math.random() * 8000);
    this.intervals.push(seagullInterval);
  }

  private playSeagullPing(): void {
    const ctx = this.audioContext!;
    const gain = this.gainNode!;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1200 + Math.random() * 400;
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0;
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(oscGain);
    oscGain.connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }

  private playRain(): void {
    const ctx = this.audioContext!;
    const gain = this.gainNode!;

    const whiteNoise = this.createWhiteNoise();
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;
    bandpass.Q.value = 0.5;
    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.2;
    whiteNoise.connect(bandpass);
    bandpass.connect(rainGain);
    rainGain.connect(gain);
    whiteNoise.start();
    this.activeNodes.push(whiteNoise);

    const crackleInterval = window.setInterval(() => {
      if (!this.isPlaying || this.currentType !== 'rain') return;
      this.playCrackle();
    }, 2000 + Math.random() * 5000);
    this.intervals.push(crackleInterval);
  }

  private playCrackle(): void {
    const ctx = this.audioContext!;
    const gain = this.gainNode!;

    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.15;
    source.connect(crackleGain);
    crackleGain.connect(gain);
    source.start(ctx.currentTime);
  }

  private playQuiet(): void {
    const ctx = this.audioContext!;
    const gain = this.gainNode!;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 40;
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.08;
    osc.connect(oscGain);
    oscGain.connect(gain);
    osc.start();
    this.activeNodes.push(osc);

    const windNoise = this.createBrownNoise();
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 200;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.1;
    windNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(gain);
    windNoise.start();
    this.activeNodes.push(windNoise);
  }

  private createWhiteNoise(): AudioBufferSourceNode {
    const ctx = this.audioContext!;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  private createBrownNoise(): AudioBufferSourceNode {
    const ctx = this.audioContext!;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  stop(): void {
    this.intervals.forEach((id) => window.clearInterval(id));
    this.intervals = [];

    this.activeNodes.forEach((node) => {
      try {
        if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
          node.stop();
        }
        node.disconnect();
      } catch {
        // node may already be stopped
      }
    });
    this.activeNodes = [];

    this.isPlaying = false;
    this.currentType = null;
  }

  setVolume(vol: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  toggle(): void {
    if (this.isPlaying) {
      this.stop();
    } else if (this.currentType) {
      this.play(this.currentType);
    }
  }

  destroy(): void {
    this.stop();
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getCurrentType(): AmbientType | null {
    return this.currentType;
  }
}

export const ambientAudio = new AmbientAudioManager();
export type { AmbientType };
