import { useEffect, useRef } from 'react';

type SoundType = 'click' | 'toggle' | 'success' | 'error' | 'notification';

export function useSoundEffects(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Créer un contexte audio uniquement si les effets sonores sont activés
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [enabled]);

  const playSound = (type: SoundType) => {
    if (!enabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuration des sons selon le type
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;

      case 'toggle':
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;

      case 'success':
        // Son de confirmation avec deux notes ascendantes
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.frequency.value = 523.25; // Do5
        osc1.type = 'sine';
        gain1.gain.setValueAtTime(0.1, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.1);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.value = 659.25; // Mi5
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc2.start(ctx.currentTime + 0.1);
        osc2.stop(ctx.currentTime + 0.2);
        return;

      case 'error':
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
        break;

      case 'notification':
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      default:
        oscillator.frequency.value = 440;
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }
  };

  return { playSound };
}
