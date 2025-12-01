import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { useSoundEffects } from './useSoundEffects';

interface VoiceReadingContextType {
  readText: (text: string) => void;
  stopReading: () => void;
  isSpeaking: boolean;
  isEnabled: boolean;
  toggleVoiceReading: () => void;
  announceAction: (action: string) => void;
}

const VoiceReadingContext = createContext<VoiceReadingContextType | undefined>(undefined);

export function VoiceReadingProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();
  const { playSound } = useSoundEffects(true);

  // Charger la préférence depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('voiceReadingEnabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const readText = (text: string) => {
    if (isEnabled && isSupported) {
      speak(text, { rate: 1.1, pitch: 1.0 });
    }
  };

  const stopReading = () => {
    stop();
  };

  const toggleVoiceReading = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('voiceReadingEnabled', newValue.toString());
    
    if (newValue) {
      playSound('success');
      speak('Lecture vocale activée', { rate: 1.2 });
    } else {
      playSound('toggle');
      stop();
    }
  };

  // Annonce d'actions avec feedback audio
  const announceAction = (action: string) => {
    if (!isEnabled || !isSupported) return;

    const actionMessages: { [key: string]: string } = {
      'highContrast:on': 'Mode contraste élevé activé',
      'highContrast:off': 'Mode contraste élevé désactivé',
      'darkMode:on': 'Mode sombre activé',
      'darkMode:off': 'Mode clair activé',
      'task:completed': 'Tâche marquée comme terminée',
      'task:created': 'Nouvelle tâche créée',
      'message:sent': 'Message envoyé',
      'logout': 'Déconnexion réussie',
      'login': 'Connexion réussie',
      'save': 'Modifications enregistrées',
      'delete': 'Élément supprimé',
      'error': 'Une erreur est survenue',
      'success': 'Opération réussie',
    };

    const message = actionMessages[action] || action;
    speak(message, { rate: 1.2, pitch: 1.0 });
  };

  return (
    <VoiceReadingContext.Provider
      value={{
        readText,
        stopReading,
        isSpeaking,
        isEnabled,
        toggleVoiceReading,
        announceAction,
      }}
    >
      {children}
    </VoiceReadingContext.Provider>
  );
}

export function useVoiceReading() {
  const context = useContext(VoiceReadingContext);
  if (context === undefined) {
    throw new Error('useVoiceReading must be used within a VoiceReadingProvider');
  }
  return context;
}
