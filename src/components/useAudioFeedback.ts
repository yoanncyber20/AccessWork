import { useCallback, useRef } from 'react';

type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'click' | 'toggle';

/**
 * Audio Feedback Hook for Accessibility
 * Provides audio cues for user actions to enhance accessibility
 */
export function useAudioFeedback(enabled: boolean = true) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!enabled) return;

    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Envelope for smoother sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio feedback error:', error);
    }
  }, [enabled, getAudioContext]);

  const playFeedback = useCallback((type: FeedbackType) => {
    if (!enabled) return;

    switch (type) {
      case 'success':
        // Pleasant ascending tones
        playTone(523.25, 0.1); // C5
        setTimeout(() => playTone(659.25, 0.1), 80); // E5
        setTimeout(() => playTone(783.99, 0.15), 160); // G5
        break;

      case 'error':
        // Descending dissonant tones
        playTone(392, 0.15, 'square'); // G4
        setTimeout(() => playTone(349.23, 0.2, 'square'), 100); // F4
        break;

      case 'warning':
        // Two-tone alert
        playTone(587.33, 0.1, 'triangle'); // D5
        setTimeout(() => playTone(523.25, 0.1, 'triangle'), 120); // C5
        break;

      case 'info':
        // Single pleasant tone
        playTone(659.25, 0.15); // E5
        break;

      case 'click':
        // Short click sound
        playTone(800, 0.05, 'square');
        break;

      case 'toggle':
        // Toggle switch sound
        playTone(440, 0.08); // A4
        setTimeout(() => playTone(554.37, 0.08), 60); // C#5
        break;

      default:
        break;
    }
  }, [enabled, playTone]);

  return { playFeedback };
}
