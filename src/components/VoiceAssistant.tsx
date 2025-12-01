import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, HelpCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { announceToScreenReader } from './utils/announceToScreenReader';
import MicrophonePermissionGuide from './MicrophonePermissionGuide';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand?: (command: string) => void;
}

type VoiceCommand = {
  keywords: string[];
  action: string;
  description: string;
};

const voiceCommands: VoiceCommand[] = [
  { keywords: ['show tasks', 'view tasks', 'my tasks'], action: 'navigate:tasks', description: 'Navigate to tasks page' },
  { keywords: ['show messages', 'view messages', 'my messages'], action: 'navigate:messages', description: 'Navigate to messages page' },
  { keywords: ['show dashboard', 'go home', 'dashboard'], action: 'navigate:dashboard', description: 'Navigate to dashboard' },
  { keywords: ['show settings', 'accessibility settings', 'settings'], action: 'navigate:accessibility', description: 'Navigate to accessibility settings' },
  { keywords: ['enable high contrast', 'high contrast on'], action: 'toggle:highContrast:on', description: 'Enable high contrast mode' },
  { keywords: ['disable high contrast', 'high contrast off'], action: 'toggle:highContrast:off', description: 'Disable high contrast mode' },
  { keywords: ['enable dark mode', 'dark mode on', 'dark theme'], action: 'toggle:darkMode:on', description: 'Enable dark mode' },
  { keywords: ['disable dark mode', 'light mode', 'light theme'], action: 'toggle:darkMode:off', description: 'Enable light mode' },
  { keywords: ['help', 'what can you do', 'commands'], action: 'showHelp', description: 'Show available voice commands' },
];

export default function VoiceAssistant({ isOpen, onClose, onCommand }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [supportsSpeech, setSupportsSpeech] = useState(false);
  const [showPermissionGuide, setShowPermissionGuide] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupportsSpeech(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        announceToScreenReader('Voice assistant is now listening', 'polite');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        const confidenceScore = event.results[current][0].confidence;
        
        setTranscript(transcriptText);
        setConfidence(confidenceScore);

        if (event.results[current].isFinal) {
          processCommand(transcriptText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          toast.error('No speech detected', {
            description: 'Please speak clearly and try again.',
            duration: 4000,
          });
        } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setShowPermissionGuide(true);
          toast.error('🎙️ Microphone Access Denied', {
            description: 'Click "How to Enable" to see instructions for granting microphone permission.',
            duration: 8000,
          });
          announceToScreenReader('Microphone access was denied. A guide on how to enable microphone permissions is now displayed.', 'assertive');
        } else if (event.error === 'network') {
          toast.error('Network Error', {
            description: 'Please check your internet connection and try again.',
            duration: 4000,
          });
        } else if (event.error === 'aborted') {
          // User cancelled, no need to show error
          return;
        } else {
          toast.error('Voice Recognition Error', {
            description: `${event.error}. Please try again.`,
            duration: 4000,
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      announceToScreenReader(text, 'polite');
    }
  };

  const startListening = async () => {
    if (recognitionRef.current && !isListening) {
      try {
        // Request microphone permission first
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Permission granted, stop the stream and start recognition
            stream.getTracks().forEach(track => track.stop());
            
            setTranscript('');
            setConfidence(0);
            recognitionRef.current.start();
            toast.info('🎙️ Listening...', {
              description: 'Speak your command clearly',
              duration: 2000,
            });
            announceToScreenReader('Voice assistant is listening. Speak your command now.', 'polite');
          } catch (permissionError: any) {
            setShowPermissionGuide(true);
            toast.error('🎙️ Microphone Permission Required', {
              description: 'See the guide below for instructions on enabling microphone access.',
              duration: 8000,
            });
            announceToScreenReader('Microphone permission denied. A guide on how to enable microphone permissions is now displayed.', 'assertive');
          }
        } else {
          // Fallback for older browsers
          setTranscript('');
          setConfidence(0);
          recognitionRef.current.start();
          toast.info('🎙️ Listening...', {
            description: 'Speak your command clearly',
            duration: 2000,
          });
        }
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        toast.error('Failed to start voice recognition', {
          description: 'Please try again or use manual controls.',
        });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Find matching command
    const matchedCommand = voiceCommands.find(cmd => 
      cmd.keywords.some(keyword => lowerCommand.includes(keyword))
    );

    if (matchedCommand) {
      speak(`Executing: ${matchedCommand.description}`);
      toast.success(`✅ ${matchedCommand.description}`);
      
      // Execute command
      if (onCommand) {
        onCommand(matchedCommand.action);
      }
    } else {
      speak(`Sorry, I didn't understand "${command}". Say "help" to hear available commands.`);
      toast.warning('Command not recognized. Try "help" for available commands.');
    }
  };

  const showHelp = () => {
    const helpText = 'Available commands: ' + voiceCommands.slice(0, 5).map(cmd => cmd.keywords[0]).join(', ');
    speak(helpText);
    toast.info('Voice Commands', {
      description: 'Check the assistant panel for all available commands',
    });
  };

  const readPageContent = () => {
    const pageTitle = document.querySelector('h1, h2')?.textContent || 'Current page';
    const text = `You are on the ${pageTitle} page`;
    speak(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card border-2 border-border rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto elevation-5 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="headline-2">Voice Assistant</h2>
              <p className="caption-text text-muted-foreground">
                {supportsSpeech ? 'Ready to help' : 'Not supported in this browser'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors focus-ring-md3"
            aria-label="Close voice assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {supportsSpeech ? (
          <>
            {/* Microphone Permission Info */}
            <div className="mb-4 p-4 bg-primary/10 border-2 border-primary/20 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mic className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="subheading mb-1 text-primary">Microphone Access Required</h4>
                  <p className="caption-text text-muted-foreground">
                    Click the microphone button below and allow microphone access when prompted by your browser. 
                    Look for the permission prompt in your address bar.
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Control */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 focus-ring-md3 touch-target ${
                    isListening
                      ? 'bg-destructive text-destructive-foreground animate-pulse elevation-3'
                      : 'bg-primary text-primary-foreground hover:elevation-2'
                  }`}
                  aria-label={isListening ? 'Stop listening' : 'Start listening and grant microphone permission'}
                  aria-pressed={isListening}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="bg-muted/30 rounded-xl p-4 mb-4 border-2 border-border">
                  <p className="caption-text text-muted-foreground mb-1">Transcript:</p>
                  <p className="body-text">{transcript}</p>
                  {confidence > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Confidence:</span>
                        <span>{Math.round(confidence * 100)}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${confidence * 100}%` }}
                          role="progressbar"
                          aria-valuenow={Math.round(confidence * 100)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={showHelp}
                  className="px-4 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors focus-ring-md3 caption-text touch-target"
                  aria-label="Show help and available commands"
                >
                  📖 Show Help
                </button>
                <button
                  onClick={readPageContent}
                  className="px-4 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors focus-ring-md3 caption-text touch-target"
                  aria-label="Read current page content"
                >
                  📄 Read Page
                </button>
              </div>

              {/* Permission Guide Toggle */}
              {!showPermissionGuide ? (
                <button
                  onClick={() => setShowPermissionGuide(true)}
                  className="w-full px-4 py-3 bg-warning/10 text-warning rounded-xl hover:bg-warning/20 transition-colors focus-ring-md3 caption-text mb-4 flex items-center justify-center gap-2 touch-target"
                  aria-label="Show microphone permission guide"
                  aria-expanded={false}
                >
                  <HelpCircle className="w-4 h-4" />
                  How to Enable Microphone
                </button>
              ) : (
                <div className="mb-4">
                  {/* Close Guide Button */}
                  <button
                    onClick={() => setShowPermissionGuide(false)}
                    className="w-full px-4 py-3 mb-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors focus-ring-md3 caption-text flex items-center justify-center gap-2 touch-target"
                    aria-label="Hide permission guide"
                  >
                    <X className="w-4 h-4" />
                    Hide Guide
                  </button>
                  
                  {/* Permission Guide */}
                  <div className="animate-in slide-in-from-top duration-300">
                    <MicrophonePermissionGuide />
                  </div>
                </div>
              )}

              {/* Speaking Indicator */}
              {isSpeaking && (
                <div className="flex items-center gap-2 text-primary mb-4 animate-pulse">
                  <Volume2 className="w-5 h-5" />
                  <span className="caption-text">Speaking...</span>
                </div>
              )}
            </div>

            {/* Available Commands */}
            <div className="bg-muted/20 rounded-xl p-4 border border-border">
              <h3 className="subheading mb-3">Available Commands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {voiceCommands.map((cmd, index) => (
                  <div key={index} className="bg-card/50 rounded-lg p-2 border border-border/50">
                    <p className="caption-text text-primary">"{cmd.keywords[0]}"</p>
                    <p className="text-xs text-muted-foreground">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <VolumeX className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="subheading mb-2">Voice Recognition Not Supported</h3>
            <p className="body-text text-muted-foreground mb-4">
              Your browser doesn't support the Web Speech API
            </p>
            <div className="bg-muted/20 rounded-xl p-4 border border-border">
              <p className="caption-text text-muted-foreground mb-2">
                <strong>Supported Browsers:</strong>
              </p>
              <ul className="caption-text text-muted-foreground text-left space-y-1">
                <li>• Google Chrome (recommended)</li>
                <li>• Microsoft Edge</li>
                <li>• Safari (macOS/iOS)</li>
              </ul>
            </div>
            <p className="caption-text text-muted-foreground mt-4">
              You can still use keyboard navigation and manual controls
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
