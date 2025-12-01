import React, { useState, useEffect } from 'react';
import { Moon, Sun, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';

interface AccessibilityControlsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function AccessibilityControls({ isDarkMode, onToggleDarkMode }: AccessibilityControlsProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleVoiceAssistant = () => {
    if (!synthesis) {
      alert('L\'assistance vocale n\'est pas disponible sur ce navigateur');
      return;
    }

    if (isVoiceActive) {
      // Arrêter la lecture
      synthesis.cancel();
      setIsVoiceActive(false);
    } else {
      // Commencer la lecture
      const pageTitle = document.querySelector('h1')?.textContent || '';
      const pageDescription = document.querySelector('p')?.textContent || '';
      
      const text = `${pageTitle}. ${pageDescription}. Utilisez les boutons et liens de la page pour naviguer.`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsVoiceActive(false);
      };
      
      utterance.onerror = () => {
        setIsVoiceActive(false);
        alert('Erreur lors de la lecture vocale');
      };
      
      synthesis.speak(utterance);
      setIsVoiceActive(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Bouton Assistance Vocale */}
      <Button
        onClick={handleVoiceAssistant}
        className={`h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
          isVoiceActive 
            ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse' 
            : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
        }`}
        aria-label={isVoiceActive ? 'Arrêter l\'assistance vocale' : 'Activer l\'assistance vocale'}
        title={isVoiceActive ? 'Arrêter la lecture' : 'Assistance vocale'}
      >
        {isVoiceActive ? (
          <MicOff className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Mic className="w-6 h-6" aria-hidden="true" />
        )}
      </Button>

      {/* Bouton Contraste */}
      <Button
        onClick={onToggleDarkMode}
        className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
        title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Moon className="w-6 h-6" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
