import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Home, CheckSquare, MessageSquare, BarChart3, Settings, LogOut, Mic, User } from 'lucide-react';
import RippleButton from './RippleButton';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: 'employee' | 'manager';
  onLogout: () => void;
}

export function Layout({ children, currentPage, onNavigate, userRole, onLogout }: LayoutProps) {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['employee', 'manager'] },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, roles: ['employee', 'manager'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, roles: ['employee', 'manager'] },
    { id: 'manager', label: 'Management', icon: BarChart3, roles: ['manager'] },
    { id: 'settings', label: 'Accessibility', icon: Settings, roles: ['employee', 'manager'] },
  ];

  const filteredNav = navigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl" role="heading" aria-level={1}>AccessWork</h1>
                <p className="opacity-90 text-sm">Accessible employee management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton
                onClick={onLogout}
                className="min-h-[48px] px-5 bg-red-600 text-white rounded-full hover:bg-red-700 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 !border-0 flex items-center gap-2"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </RippleButton>
              <div className="relative" aria-label="User profile">
                {/* Sound waves */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-2 bg-white/40 rounded-full"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-2 bg-white/40 rounded-full"></div>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center" style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}>
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card !border-0 shadow-sm" role="navigation" aria-label="Navigation principale">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  variant={isActive ? 'default' : 'ghost'}
                  size="lg"
                  className={`min-h-[56px] px-6 whitespace-nowrap ${
                    isActive 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'text-foreground hover:bg-accent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 mr-2" aria-hidden="true" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card !border-0 shadow-sm py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 AccessWork - Application accessible pour tous</p>
        </div>
      </footer>
    </div>
  );
}
