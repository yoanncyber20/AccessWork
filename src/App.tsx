import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import EmployeeDashboard from './components/EmployeeDashboard';
import Tasks from './components/Tasks';
import Communications from './components/Communications';
import ManagerDashboard from './components/ManagerDashboard';
import AccessibilitySettings from './components/AccessibilitySettings';
import AccessibilityControls from './components/AccessibilityControls';
import Planning from './components/Planning';
import AbsenceManagement from './components/AbsenceManagement';
import ProfilePage from './components/ProfilePage';
import Documents from './components/Documents';
import Team from './components/Team';
import FloatingActionButtons from './components/FloatingActionButtons';
import { Toaster } from './components/ui/sonner';
import { useSoundEffects } from './components/useSoundEffects';
import { VoiceReadingProvider } from './components/VoiceReadingProvider';

type UserRole = 'employee' | 'manager' | null;
type Page = 'dashboard' | 'tasks' | 'communications' | 'manager-dashboard' | 'accessibility' | 'planning' | 'absences' | 'profile' | 'documents' | 'team';
type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [previousPage, setPreviousPage] = useState<Page>('dashboard');
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>('none');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  
  // Hook pour les effets sonores globaux
  const { playSound } = useSoundEffects(soundEffectsEnabled);

  // Appliquer les paramètres d'accessibilité au chargement
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    const savedColorBlindMode = localStorage.getItem('colorBlindMode') as ColorBlindMode;
    const savedSoundEffects = localStorage.getItem('soundEffects');
    
    if (savedHighContrast === 'true') {
      setHighContrast(true);
    }
    
    if (savedColorBlindMode) {
      setColorBlindMode(savedColorBlindMode);
    }
    
    // Activer les effets sonores par défaut
    if (savedSoundEffects !== null) {
      setSoundEffectsEnabled(savedSoundEffects === 'true');
    } else {
      // Si pas de préférence sauvegardée, activer par défaut
      setSoundEffectsEnabled(true);
      localStorage.setItem('soundEffects', 'true');
    }
  }, []);

  // Appliquer le contraste élevé et le mode daltonien globalement
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply high contrast class
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply color blind mode
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'monochrome');
    if (colorBlindMode !== 'none') {
      root.classList.add(colorBlindMode);
    }
    
    localStorage.setItem('highContrast', highContrast.toString());
    localStorage.setItem('colorBlindMode', colorBlindMode);
  }, [highContrast, colorBlindMode]);

  const handleToggleHighContrast = () => {
    setHighContrast(!highContrast);
    playSound('toggle');
  };

  const handleColorBlindModeChange = (mode: ColorBlindMode) => {
    setColorBlindMode(mode);
    playSound('toggle');
  };

  const handleVoiceCommand = (command: string) => {
    const [action, target, value] = command.split(':');

    switch (action) {
      case 'navigate':
        if (target === 'tasks' || target === 'communications' || target === 'dashboard' || target === 'accessibility' || target === 'planning' || target === 'absences' || target === 'profile' || target === 'documents' || target === 'team') {
          handleNavigate(target);
        }
        // Support old names for backward compatibility
        if (target === 'messages' || target === 'notifications') {
          handleNavigate('communications');
        }
        break;
      case 'toggle':
        if (target === 'highContrast') {
          if (value === 'on' && !highContrast) handleToggleHighContrast();
          if (value === 'off' && highContrast) handleToggleHighContrast();
        }
        break;
      default:
        break;
    }
  };

  const handleLogin = (role: 'employee' | 'manager') => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    
    // Jouer le son de navigation
    playSound('click');
    
    // Start exit animation
    setIsPageTransitioning(true);
    setPreviousPage(currentPage);
    
    // Wait for exit animation to complete, then switch page
    setTimeout(() => {
      setCurrentPage(page as Page);
      // Small delay before starting enter animation
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 50);
    }, 200);
  };

  const handleNavigatePlanning = () => {
    setCurrentPage('planning');
  };

  const handleNavigateAbsences = () => {
    setCurrentPage('absences');
  };

  const handleNavigateProfile = () => {
    setCurrentPage('profile');
  };

  const renderContent = () => {
    if (!isAuthenticated || !userRole) {
      return null;
    }

    switch (currentPage) {
      case 'dashboard':
        return userRole === 'manager' ? 
          <ManagerDashboard /> : 
          <EmployeeDashboard userName="Yoann" onNavigatePlanning={handleNavigatePlanning} onNavigateAbsences={handleNavigateAbsences} onNavigateProfile={handleNavigateProfile} />;
      case 'planning':
        return <Planning />;
      case 'absences':
        return <AbsenceManagement />;
      case 'profile':
        return <ProfilePage />;
      case 'documents':
        return <Documents />;
      case 'communications':
        return <Communications />;
      case 'team':
        return <Team />;
      case 'tasks':
        return <Tasks />;
      case 'manager-dashboard':
        return userRole === 'manager' ? <ManagerDashboard /> : <EmployeeDashboard userName="Yoann" onNavigatePlanning={handleNavigatePlanning} onNavigateAbsences={handleNavigateAbsences} onNavigateProfile={handleNavigateProfile} />;
      case 'accessibility':
        return <AccessibilitySettings 
          highContrast={highContrast} 
          onToggleHighContrast={handleToggleHighContrast}
          colorBlindMode={colorBlindMode}
          onColorBlindModeChange={handleColorBlindModeChange}
          soundEffectsEnabled={soundEffectsEnabled}
          onToggleSoundEffects={(enabled) => {
            setSoundEffectsEnabled(enabled);
            localStorage.setItem('soundEffects', enabled.toString());
          }}
        />;
      default:
        return <EmployeeDashboard userName="Yoann" onNavigatePlanning={handleNavigatePlanning} onNavigateAbsences={handleNavigateAbsences} onNavigateProfile={handleNavigateProfile} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <VoiceReadingProvider>
        <Login 
          onLogin={handleLogin} 
          highContrast={highContrast} 
          onToggleHighContrast={handleToggleHighContrast} 
        />
        <FloatingActionButtons 
          onVoiceCommand={handleVoiceCommand}
        />
        <Toaster position="bottom-center" richColors />
        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true" id="screen-reader-announcements"></div>
      </VoiceReadingProvider>
    );
  }

  return (
    <VoiceReadingProvider>
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-main focus-ring-md3">
        Skip to main content
      </a>
      
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        userRole={userRole!}
      />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 overflow-hidden" role="main">
        <div 
          key={currentPage}
          className={`
            transition-all duration-300 ease-in-out page-content-wrapper
            ${isPageTransitioning 
              ? 'opacity-0 -translate-x-8 scale-[0.98]' 
              : 'opacity-100 translate-x-0 scale-100'
            }
          `}
        >
          {renderContent()}
        </div>
      </main>
      
      <FloatingActionButtons 
        onVoiceCommand={handleVoiceCommand}
      />
      
      <Toaster position="bottom-center" richColors />
      
      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true" id="screen-reader-announcements"></div>
    </div>
    </VoiceReadingProvider>
  );
}
