import { useEffect, useRef, useState } from 'react';

export function useTextToSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      setIsSupported(true);
    }

    return () => {
      // Arrêter la lecture au démontage du composant
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number; lang?: string }) => {
    if (!speechSynthRef.current || !isSupported) {
      console.warn('Speech Synthesis not supported');
      return;
    }

    // Annuler toute lecture en cours
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configuration de la voix
    utterance.lang = options?.lang || 'fr-FR';
    utterance.rate = options?.rate || 1.0; // Vitesse normale
    utterance.pitch = options?.pitch || 1.0; // Tonalité normale
    utterance.volume = options?.volume || 1.0; // Volume max

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    speechSynthRef.current.speak(utterance);
  };

  const stop = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const pause = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.pause();
    }
  };

  const resume = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.resume();
    }
  };

  return {
    speak,
    stop,
    pause,
    resume,
    isSupported,
    isSpeaking
  };
}
