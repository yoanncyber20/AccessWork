import React, { useState, useEffect } from 'react';
import { Type, Contrast, Moon, Mic, Volume2, Keyboard, Eye, RotateCcw, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import RippleButton from './RippleButton';
import { toast } from 'sonner@2.0.3';
import { useSoundEffects } from './useSoundEffects';
import { useVoiceReading } from './VoiceReadingProvider';

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';

interface AccessibilitySettingsProps {
  highContrast: boolean;
  onToggleHighContrast: () => void;
  colorBlindMode: ColorBlindMode;
  onColorBlindModeChange: (mode: ColorBlindMode) => void;
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: (enabled: boolean) => void;
}

export default function AccessibilitySettings({ 
  highContrast, 
  onToggleHighContrast, 
  colorBlindMode, 
  onColorBlindModeChange,
  soundEffectsEnabled,
  onToggleSoundEffects
}: AccessibilitySettingsProps) {
  const [fontSize, setFontSize] = useState([18]);
  const [voiceControl, setVoiceControl] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(true);
  
  // Hook pour les effets sonores - utilise le state global
  const { playSound } = useSoundEffects(soundEffectsEnabled);
  
  // Hook pour la lecture vocale
  const { isEnabled: voiceReadingEnabled, toggleVoiceReading, announceAction } = useVoiceReading();

  // Synchroniser avec localStorage au chargement
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedVoiceControl = localStorage.getItem('voiceControl');
    const savedScreenReader = localStorage.getItem('screenReader');
    const savedKeyboardNav = localStorage.getItem('keyboardNav');

    if (savedFontSize) setFontSize([parseInt(savedFontSize)]);
    if (savedVoiceControl) setVoiceControl(savedVoiceControl === 'true');
    if (savedScreenReader) setScreenReader(savedScreenReader === 'true');
    if (savedKeyboardNav) setKeyboardNav(savedKeyboardNav === 'true');
  }, []);

  // Appliquer la taille de police en temps réel
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-size', `${fontSize[0]}px`);
    localStorage.setItem('fontSize', fontSize[0].toString());
  }, [fontSize]);

  // Handle other toggles with toasts
  useEffect(() => {
    if (localStorage.getItem('voiceControl')) {
      toast.success(voiceControl ? 'Voice control enabled 🎙️' : 'Voice control disabled');
      playSound('toggle');
    }
    localStorage.setItem('voiceControl', voiceControl.toString());
  }, [voiceControl, playSound]);

  useEffect(() => {
    if (localStorage.getItem('screenReader')) {
      toast.success(screenReader ? 'Screen reader enabled 📢' : 'Screen reader disabled');
      playSound('toggle');
    }
    localStorage.setItem('screenReader', screenReader.toString());
  }, [screenReader, playSound]);

  useEffect(() => {
    if (localStorage.getItem('keyboardNav')) {
      toast.success(keyboardNav ? 'Keyboard navigation enabled ⌨️' : 'Keyboard navigation disabled');
      playSound('toggle');
    }
    localStorage.setItem('keyboardNav', keyboardNav.toString());
  }, [keyboardNav, playSound]);

  // Handle sound effects toggle
  const handleSoundEffectsToggle = (enabled: boolean) => {
    onToggleSoundEffects(enabled);
    
    // Show toast
    if (enabled) {
      toast.success('Sound effects enabled 🔊');
      // Play confirmation sound when enabling
      setTimeout(() => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 523.25;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }, 100);
    } else {
      toast.success('Sound effects disabled 🔇');
    }
  };

  const handleResetSettings = () => {
    setFontSize([18]);
    if (highContrast) {
      onToggleHighContrast(); // Disable high contrast if enabled
    }
    setVoiceControl(false);
    setScreenReader(false);
    setKeyboardNav(true);
    onToggleSoundEffects(true);
    
    // Reset localStorage
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('voiceControl');
    localStorage.removeItem('screenReader');
    localStorage.removeItem('keyboardNav');

    
    // Reset font size (high contrast is handled by App.tsx)
    const root = document.documentElement;
    root.style.setProperty('--font-size', '18px');
    
    playSound('success');
    toast.success('Settings reset to default values ✨');
  };
  
  // Play sound when font size changes
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    playSound('click');
  };

  // Handle high contrast toggle with sound
  const handleHighContrastToggle = () => {
    onToggleHighContrast();
    const message = !highContrast 
      ? 'High contrast enabled 🔆 - Colors optimized for better readability' 
      : 'High contrast disabled - Back to standard colors';
    toast.success(message, { duration: 4000 });
    announceAction(!highContrast ? 'highContrast:on' : 'highContrast:off');
  };


  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="elevation-2 card-transition hover:elevation-3 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent !border-0 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Eye className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl">Accessibility Settings</h1>
            <p className="text-muted-foreground text-lg">Customize your AccessWork experience</p>
          </div>
        </div>
      </div>

      {/* Visual Settings */}
      <Card className="elevation-1 card-transition hover:elevation-2 !border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            Visual Settings
          </h2>
          <div className="space-y-6">
            {/* Font Size */}
            <div className="space-y-4 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="text-lg flex items-center gap-2">
                  <Type className="w-6 h-6 text-primary" />
                  Text Size
                </Label>
                <span className="text-lg font-medium bg-primary/10 px-4 py-2 rounded-full">{fontSize[0]}px</span>
              </div>
              <Slider
                id="font-size"
                value={fontSize}
                onValueChange={handleFontSizeChange}
                min={14}
                max={28}
                step={2}
                className="w-full h-3"
                aria-label="Adjust text size"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Small (14px)</span>
                <span>Medium (18px)</span>
                <span>Large (28px)</span>
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <Contrast className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="high-contrast" className="text-lg cursor-pointer">High Contrast (WCAG AAA)</Label>
                  <p className="text-sm text-muted-foreground">Thick borders, optimized colors, 10:1 ratio</p>
                </div>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={handleHighContrastToggle}
                className="scale-125 focus-ring-md3"
                aria-label="Enable high contrast for better readability"
              />
            </div>

            {/* Color Blind Mode Selection */}
            <div className="p-6 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg">Adapt Colors to My Vision</h3>
                  <p className="text-sm text-muted-foreground">Optimized palettes for color blindness (WCAG AA)</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'none', label: 'Standard Colors', icon: '🎨', description: 'Default color palette' },
                  { value: 'protanopia', label: 'Protanopia', icon: '🔴', description: 'Red-blind (1% of males)' },
                  { value: 'deuteranopia', label: 'Deuteranopia', icon: '🟢', description: 'Green-blind (1% of males)' },
                  { value: 'tritanopia', label: 'Tritanopia', icon: '🔵', description: 'Blue-blind (rare)' },
                  { value: 'monochrome', label: 'Monochrome', icon: '⚫', description: 'Total color blindness' }
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => {
                      onColorBlindModeChange(mode.value as ColorBlindMode);
                      toast.success(`Color mode: ${mode.label} ${mode.icon}`);
                      // Announce to screen readers
                      const announcement = document.getElementById('screen-reader-announcements');
                      if (announcement) {
                        announcement.textContent = `Color mode changed to ${mode.label}. ${mode.description}`;
                      }
                    }}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-250 focus-ring-md3 ${
                      colorBlindMode === mode.value
                        ? 'bg-primary/10 !border-0 elevation-1'
                        : 'bg-background !border-0 hover:bg-muted/30'
                    }`}
                    aria-pressed={colorBlindMode === mode.value}
                    aria-label={`${mode.label}: ${mode.description}. ${colorBlindMode === mode.value ? 'Currently selected' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">{mode.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{mode.label}</span>
                          {colorBlindMode === mode.value && (
                            <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{mode.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Color Preview */}
              <div className="mt-6 p-4 bg-muted/30 rounded-xl !border-0">
                <p className="text-sm mb-3 font-medium">Color Preview (with symbols):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-12 rounded-lg bg-primary !border-0 elevation-1 flex items-center justify-center text-primary-foreground">
                      <span className="text-xl" aria-label="Star symbol">★</span>
                    </div>
                    <span className="text-xs text-center">Primary ★</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-12 rounded-lg bg-destructive !border-0 elevation-1 flex items-center justify-center text-destructive-foreground">
                      <span className="text-xl" aria-label="Cross symbol">✕</span>
                    </div>
                    <span className="text-xs text-center">Alert ✕</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-12 rounded-lg bg-green-600 !border-0 elevation-1 flex items-center justify-center text-white">
                      <span className="text-xl" aria-label="Check symbol">✓</span>
                    </div>
                    <span className="text-xs text-center">Success ✓</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-12 rounded-lg bg-orange-600 !border-0 elevation-1 flex items-center justify-center text-white">
                      <span className="text-xl" aria-label="Warning symbol">⚠</span>
                    </div>
                    <span className="text-xs text-center">Warning ⚠</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interaction Settings */}
      <Card className="elevation-1 card-transition hover:elevation-2 !border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Keyboard className="w-6 h-6 text-primary-foreground" />
            </div>
            Interaction Settings
          </h2>
          <div className="space-y-4">
            {/* Voice Control */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="voice-control" className="text-lg cursor-pointer">Voice Control</Label>
                  <p className="text-sm text-muted-foreground">Navigation by voice commands</p>
                </div>
              </div>
              <Switch
                id="voice-control"
                checked={voiceControl}
                onCheckedChange={setVoiceControl}
                className="scale-125 focus-ring-md3"
                aria-label="Enable voice control"
              />
            </div>

            {/* Screen Reader */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="screen-reader" className="text-lg cursor-pointer">Screen Reader</Label>
                  <p className="text-sm text-muted-foreground">Support for screen readers</p>
                </div>
              </div>
              <Switch
                id="screen-reader"
                checked={screenReader}
                onCheckedChange={setScreenReader}
                className="scale-125 focus-ring-md3"
                aria-label="Enable screen reader support"
              />
            </div>

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Keyboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="keyboard-nav" className="text-lg cursor-pointer">Keyboard Navigation</Label>
                  <p className="text-sm text-muted-foreground">Use Tab and arrow keys</p>
                </div>
              </div>
              <Switch
                id="keyboard-nav"
                checked={keyboardNav}
                onCheckedChange={setKeyboardNav}
                className="scale-125 focus-ring-md3"
                aria-label="Enable keyboard navigation"
              />
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="sound-effects" className="text-lg cursor-pointer">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Audio feedback for actions</p>
                </div>
              </div>
              <Switch
                id="sound-effects"
                checked={soundEffectsEnabled}
                onCheckedChange={handleSoundEffectsToggle}
                className="scale-125 focus-ring-md3"
                aria-label="Enable sound effects"
              />
            </div>

            {/* Voice Reading */}
            <div className="flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Label htmlFor="voice-reading" className="text-lg cursor-pointer">Voice Reading</Label>
                  <p className="text-sm text-muted-foreground">Read actions aloud</p>
                </div>
              </div>
              <Switch
                id="voice-reading"
                checked={voiceReadingEnabled}
                onCheckedChange={toggleVoiceReading}
                className="scale-125 focus-ring-md3"
                aria-label="Enable voice reading"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Voice Commands Guide */}
      <Card className="elevation-1 card-transition hover:elevation-2 !border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl">Voice Commands Guide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <p className="font-medium mb-2">"Go to dashboard"</p>
              <p className="text-sm text-muted-foreground">Navigate to dashboard</p>
            </div>
            <div className="p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <p className="font-medium mb-2">"Show tasks"</p>
              <p className="text-sm text-muted-foreground">Opens the tasks page</p>
            </div>
            <div className="p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <p className="font-medium mb-2">"Create new task"</p>
              <p className="text-sm text-muted-foreground">Opens the creation form</p>
            </div>
            <div className="p-5 bg-card/50 backdrop-blur-sm !border-0 rounded-2xl card-transition hover:elevation-1 focus-ring-md3" tabIndex={0}>
              <p className="font-medium mb-2">"Read messages"</p>
              <p className="text-sm text-muted-foreground">Access messaging</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <RippleButton
          size="lg"
          variant="outline"
          onClick={handleResetSettings}
          className="h-14 px-8 !border-0 rounded-2xl elevation-1 hover:elevation-2 focus-ring-md3 hover:bg-accent min-w-[300px]"
          aria-label="Reset to default values"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset Settings
        </RippleButton>
      </div>
    </div>
  );
}
