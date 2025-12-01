import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import RippleButton from './RippleButton';
import VoiceAssistant from './VoiceAssistant';
import { toast } from 'sonner@2.0.3';
import { announceToScreenReader } from './utils/announceToScreenReader';

interface FloatingActionButtonsProps {
  onVoiceCommand?: (command: string) => void;
}

export default function FloatingActionButtons({ onVoiceCommand }: FloatingActionButtonsProps) {
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);

  const handleVoiceAssistant = () => {
    setVoiceAssistantOpen(!voiceAssistantOpen);
    const message = !voiceAssistantOpen ? 'Voice assistant opened' : 'Voice assistant closed';
    announceToScreenReader(message, 'polite');
    toast.success(
      !voiceAssistantOpen ? '🎙️ Voice assistant opened' : 'Voice assistant closed',
      { duration: 2000 }
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40" role="group" aria-label="Floating action buttons">
        {/* Voice Assistant FAB */}
        <RippleButton
          onClick={handleVoiceAssistant}
          size="icon"
          className="w-14 h-14 rounded-full elevation-3 hover:elevation-5 fab-transition fab-glow focus-ring-md3 bg-primary text-primary-foreground hover:bg-primary/90 touch-target"
          aria-label="Open voice assistant"
          aria-expanded={voiceAssistantOpen}
        >
          <Mic className="w-6 h-6" />
        </RippleButton>
      </div>

      {/* Voice Assistant Dialog */}
      <VoiceAssistant 
        isOpen={voiceAssistantOpen} 
        onClose={() => setVoiceAssistantOpen(false)}
        onCommand={onVoiceCommand}
      />
    </>
  );
}
