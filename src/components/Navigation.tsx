import React from 'react';
import { LayoutDashboard, CheckSquare, MessageSquare, Users, Settings, LogOut, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userRole: 'employee' | 'manager';
}

export default function Navigation({ currentPage, onNavigate, onLogout, userRole }: NavigationProps) {
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      roles: ['employee', 'manager']
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: CheckSquare,
      roles: ['employee', 'manager']
    },
    { 
      id: 'communications', 
      label: 'Communications', 
      icon: MessageSquare,
      roles: ['employee', 'manager']
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: FileText,
      roles: ['employee', 'manager']
    },
    { 
      id: 'team', 
      label: 'Team', 
      icon: Users,
      roles: ['employee', 'manager']
    },
    { 
      id: 'manager-dashboard', 
      label: 'Management', 
      icon: Users,
      roles: ['manager']
    },
    { 
      id: 'accessibility', 
      label: 'Accessibility', 
      icon: Settings,
      roles: ['employee', 'manager']
    },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="bg-card !border-0 sticky top-0 z-50 shadow-sm elevation-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl text-primary-foreground">A</span>
            </div>
            <div>
              <h1 className="text-xl">AccessWork</h1>
              <p className="text-xs text-muted-foreground">
                {userRole === 'manager' ? 'Manager' : 'Employee'}
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  className={`h-12 px-4 rounded-xl ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Logout Button */}
          <Button
            onClick={onLogout}
            variant="destructive"
            size="lg"
            className="h-12 px-6 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`h-10 px-4 rounded-xl shrink-0 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'border-2'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
