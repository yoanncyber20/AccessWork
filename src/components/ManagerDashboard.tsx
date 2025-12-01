import React, { useState } from 'react';
import { Users, TrendingUp, CheckCircle2, AlertCircle, UserPlus, FileText, Calendar, Target, Award, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import RippleButton from './RippleButton';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ManagerDashboardProps {}

export default function ManagerDashboard() {
  const stats = [
    { 
      label: 'Total employees', 
      value: '24', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600', 
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
      trend: '+2 this month',
      trendPositive: true,
    },
    { 
      label: 'Active tasks', 
      value: '47', 
      icon: CheckCircle2, 
      color: 'from-green-500 to-green-600', 
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
      trend: '12 completed',
      trendPositive: true,
    },
    { 
      label: 'Team performance', 
      value: '87%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-purple-600', 
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
      trend: '+5% vs last month',
      trendPositive: true,
    },
    { 
      label: 'Alerts', 
      value: '3', 
      icon: AlertCircle, 
      color: 'from-orange-500 to-orange-600', 
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/30',
      trend: 'Attention required',
      trendPositive: false,
    },
  ];

  const teamMembers = [
    { 
      id: 1, 
      name: 'Marie Dubois', 
      role: 'Designer', 
      tasks: 8, 
      completed: 6, 
      avatar: 'MD', 
      performance: 75,
      avatarColor: 'from-pink-500 to-pink-600',
      status: 'online',
    },
    { 
      id: 2, 
      name: 'Pierre Martin', 
      role: 'Developer', 
      tasks: 12, 
      completed: 10, 
      avatar: 'PM', 
      performance: 83,
      avatarColor: 'from-blue-500 to-blue-600',
      status: 'online',
    },
    { 
      id: 3, 
      name: 'Sophie Laurent', 
      role: 'Project Manager', 
      tasks: 10, 
      completed: 9, 
      avatar: 'SL', 
      performance: 90,
      avatarColor: 'from-purple-500 to-purple-600',
      status: 'offline',
    },
    { 
      id: 4, 
      name: 'Thomas Petit', 
      role: 'Marketing', 
      tasks: 7, 
      completed: 5, 
      avatar: 'TP', 
      performance: 71,
      avatarColor: 'from-green-500 to-green-600',
      status: 'online',
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      user: 'Marie Dubois', 
      action: 'completed', 
      item: 'System design', 
      time: '5 min ago',
      avatar: 'MD',
      avatarColor: 'from-pink-500 to-pink-600',
      type: 'success',
    },
    { 
      id: 2, 
      user: 'Pierre Martin', 
      action: 'created', 
      item: 'New dev branch', 
      time: '15 min ago',
      avatar: 'PM',
      avatarColor: 'from-blue-500 to-blue-600',
      type: 'info',
    },
    { 
      id: 3, 
      user: 'Sophie Laurent', 
      action: 'updated', 
      item: 'Sprint 12 planning', 
      time: '1h ago',
      avatar: 'SL',
      avatarColor: 'from-purple-500 to-purple-600',
      type: 'info',
    },
    { 
      id: 4, 
      user: 'Thomas Petit', 
      action: 'shared', 
      item: 'Q3 Marketing report', 
      time: '2h ago',
      avatar: 'TP',
      avatarColor: 'from-green-500 to-green-600',
      type: 'success',
    },
  ];

  const quickActions = [
    {
      title: 'Schedule meeting',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
    },
    {
      title: 'Assign tasks',
      icon: Target,
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
    },
    {
      title: 'View reports',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
    },
  ];

  const handleAddEmployee = () => {
    toast.success('New employee', {
      description: 'Feature under development',
    });
  };

  const handleGenerateReport = () => {
    toast.success('Report generated', {
      description: 'The report has been successfully generated',
    });
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#6750A4] to-[#7C68B8] p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
                  <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[28px] text-white">Tableau de bord Manager</h1>
                  <p className="text-white/90 text-[16px]">Vue d'ensemble de votre équipe</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RippleButton
                  onClick={handleGenerateReport}
                  className="min-h-[56px] px-6 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px]"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Report
                </RippleButton>
                <RippleButton
                  onClick={handleAddEmployee}
                  className="min-h-[56px] px-6 bg-white text-primary rounded-full hover:bg-white/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px]"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Nouvel employé
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden p-6 ${stat.bgLight} ${stat.bgDark} elevation-1 hover:elevation-3 card-transition group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 rounded-3xl !border-0`}
            tabIndex={0}
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center elevation-2 group-hover:elevation-3 group-hover:scale-110 transition-all duration-300 mb-4`}>
                <stat.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-[14px] text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-[24px] mb-2">{stat.value}</p>
              <p className={`text-[13px] ${stat.trendPositive ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                {stat.trend}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance */}
        <Card className="lg:col-span-2 p-8 elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl animate-in fade-in slide-in-from-bottom duration-500 delay-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center elevation-2">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Performance de l'équipe</h2>
                <p className="text-muted-foreground text-[16px]">Suivi des membres et de leurs tâches</p>
              </div>
            </div>
            <RippleButton
              className="min-h-[48px] px-6 bg-muted text-foreground rounded-2xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[15px]"
            >
              View all
            </RippleButton>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="p-6 bg-muted/30 rounded-2xl hover:bg-muted/40 transition-all duration-250 elevation-0 hover:elevation-2 card-transition !border-0 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Avatar className={`w-14 h-14 !border-0`}>
                      <AvatarFallback className={`bg-gradient-to-br ${member.avatarColor} text-white text-[18px]`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full !border-0 ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[18px]">{member.name}</h3>
                      <Badge className={`${member.status === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-300'} !border-0 px-2 py-0.5 rounded-full text-[11px]`}>
                        {member.status === 'online' ? 'En ligne' : 'Hors ligne'}
                      </Badge>
                    </div>
                    <p className="text-[14px] text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] text-muted-foreground">Tâches</p>
                    <p className="text-[18px]">{member.completed}/{member.tasks}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[14px] text-muted-foreground">Performance</span>
                    <span className="text-[14px]">{member.performance}%</span>
                  </div>
                  <Progress 
                    value={member.performance} 
                    className="h-3" 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1 p-8 elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center elevation-2">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-[22px] mb-1">Activité récente</h2>
              <p className="text-muted-foreground text-[14px]">Dernières actions</p>
            </div>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 pb-6 !border-0 last:pb-0 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="w-10 h-10 !border-0 flex-shrink-0">
                  <AvatarFallback className={`bg-gradient-to-br ${activity.avatarColor} text-white text-[14px]`}>
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] mb-1">
                    <span className="">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-[14px] mb-2">{activity.item}</p>
                  <p className="text-[13px] text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl animate-in fade-in slide-in-from-bottom duration-500 delay-400">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center elevation-2">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-[22px] mb-1">Actions rapides</h2>
            <p className="text-muted-foreground text-[16px]">Gagnez du temps avec ces raccourcis</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={`${action.bgLight} ${action.bgDark} p-6 rounded-2xl elevation-0 hover:elevation-2 card-transition cursor-pointer group !border-0 animate-in fade-in slide-in-from-bottom duration-500`}
              style={{ animationDelay: `${index * 50}ms` }}
              tabIndex={0}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center elevation-2 group-hover:elevation-3 group-hover:scale-110 transition-all duration-300 mb-4`}>
                <action.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-[18px]">{action.title}</h3>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
