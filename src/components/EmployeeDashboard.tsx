import React, { useEffect } from 'react';
import { Clock, Palmtree, Users, TrendingUp, Calendar, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import RippleButton from './RippleButton';
import { useVoiceReading } from './VoiceReadingProvider';

interface EmployeeDashboardProps {
  userName: string;
  onNavigatePlanning?: () => void;
  onNavigateAbsences?: () => void;
  onNavigateProfile?: () => void;
}

export default function EmployeeDashboard({ userName, onNavigatePlanning, onNavigateAbsences, onNavigateProfile }: EmployeeDashboardProps) {
  const { readText, isEnabled: voiceReadingEnabled } = useVoiceReading();

  // Read welcome message on load if voice reading is enabled
  useEffect(() => {
    if (voiceReadingEnabled) {
      const welcomeMessage = `Hello ${userName}, you are present today. Your next break is at 2:30 PM.`;
      readText(welcomeMessage);
    }
  }, [voiceReadingEnabled, userName, readText]);

  const mainCards = [
    {
      title: 'View Your Schedule',
      subtitle: 'Check your work schedule and hours',
      icon: Clock,
      buttonText: 'View Schedule',
      gradient: 'from-blue-500/10 to-blue-600/5',
      iconBg: 'from-blue-500 to-blue-600',
      iconColor: 'text-white',
      onClick: onNavigatePlanning,
    },
    {
      title: 'Submit and View Absence Requests',
      subtitle: 'Easily submit or track your absence requests',
      icon: Palmtree,
      buttonText: 'Request Absence',
      gradient: 'from-orange-500/10 to-orange-600/5',
      iconBg: 'from-orange-500 to-orange-600',
      iconColor: 'text-white',
      onClick: onNavigateAbsences,
    },
    {
      title: 'View Your Personal Information',
      subtitle: 'Access your personal information and preferences',
      icon: Users,
      buttonText: 'View My Profile',
      gradient: 'from-purple-500/10 to-purple-600/5',
      iconBg: 'from-purple-500 to-purple-600',
      iconColor: 'text-white',
      onClick: onNavigateProfile,
    },
  ];

  const weeklyProgress = [
    { 
      label: 'Hours Worked', 
      current: 32, 
      total: 40, 
      percentage: 80,
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      trend: '+5%',
    },
    { 
      label: 'Tasks Completed', 
      current: 12, 
      total: 15, 
      percentage: 80,
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      trend: '+12%',
    },
    { 
      label: 'Goals Achieved', 
      current: 4, 
      total: 5, 
      percentage: 80,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      trend: '+3%',
    },
  ];

  const quickStats = [
    { label: 'Present', value: 'Today', icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Next Break', value: '2:30 PM', icon: Clock, color: 'from-blue-500 to-blue-600' },
    { label: 'Days Off Remaining', value: '12 days', icon: Palmtree, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Header with Quick Stats */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl">Hello {userName} 👋</h1>
              </div>
              <p className="text-muted-foreground">
                Track your schedule and absences
              </p>
            </div>
            <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full">
              Thursday Oct. 9
            </Badge>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm !border-0 rounded-2xl p-4 card-transition hover:elevation-2 focus-ring-md3"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className="w-6 h-6 text-white" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-medium">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainCards.map((card, index) => (
          <Card
            key={index}
            className="elevation-1 hover:elevation-2 card-transition !border-0 rounded-3xl overflow-hidden group"
          >
            <div className={`bg-gradient-to-br ${card.gradient} p-8 h-full flex flex-col`}>
              {/* Icon Container */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.iconBg} shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <card.icon className={`w-10 h-10 ${card.iconColor}`} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 flex-grow text-center mb-6">
                <h3 className="text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              {/* Button with Ripple */}
              <RippleButton
                onClick={card.onClick}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl elevation-1 hover:elevation-2 focus-ring-md3 group-hover:scale-[1.02] transition-transform duration-200"
                aria-label={card.buttonText}
              >
                <span className="flex items-center justify-center gap-2">
                  {card.buttonText}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </RippleButton>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Progress Section */}
      <Card className="elevation-2 !border-0 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl">Weekly Progress</h2>
                <p className="text-sm text-muted-foreground">Week 41 • 2025</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-4 py-2 rounded-full">
              In Progress
            </Badge>
          </div>

          <div className="space-y-6">
            {weeklyProgress.map((progress, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm !border-0 rounded-2xl p-5 card-transition hover:elevation-1 focus-ring-md3"
                tabIndex={0}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${progress.color} flex items-center justify-center`}>
                      <progress.icon className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{progress.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {progress.current} sur {progress.total}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="px-3 py-1 rounded-full !border-0">
                    <TrendingUp className="w-3 h-3 mr-1 inline" />
                    {progress.trend}
                  </Badge>
                </div>
                <Progress
                  value={progress.percentage}
                  className="h-3 rounded-full"
                  aria-label={`${progress.percentage}% - ${progress.label}: ${progress.current} sur ${progress.total}`}
                />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Performance</p>
                <p className="text-2xl font-medium text-primary">80%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">+6.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
