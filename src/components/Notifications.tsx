import React, { useState } from 'react';
import { Bell, Check, Trash2, Filter, Calendar, MessageCircle, UserPlus, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import RippleButton from './RippleButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface NotificationsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'message';
  category: string;
  time: string;
  read: boolean;
  from: string;
  fromInitials: string;
  avatarColor: string;
}

export default function Notifications({ isDarkMode, onToggleDarkMode }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Nouvelle tâche assignée',
      message: 'Sophie Martin vous a assigné la tâche "Préparer le rapport mensuel"',
      type: 'info',
      category: 'Tâches',
      time: '5 min ago',
      read: false,
      from: 'Sophie Martin',
      fromInitials: 'SM',
      avatarColor: 'from-purple-500 to-purple-600',
    },
    {
      id: 2,
      title: 'Réunion demain',
      message: 'Rappel : Réunion d\'équipe demain à 14h30 en salle de conférence',
      type: 'warning',
      category: 'Calendrier',
      time: '1h ago',
      read: false,
      from: 'Système',
      fromInitials: 'SY',
      avatarColor: 'from-orange-500 to-orange-600',
    },
    {
      id: 3,
      title: 'New message',
      message: 'Marie Dubois: Hello, can you confirm your availability?',
      type: 'message',
      category: 'Messages',
      time: '2h ago',
      read: false,
      from: 'Marie Dubois',
      fromInitials: 'MD',
      avatarColor: 'from-blue-500 to-blue-600',
    },
    {
      id: 4,
      title: 'Absence request approved',
      message: 'Your leave request from October 20 to 25 has been approved',
      type: 'success',
      category: 'Absences',
      time: '3h ago',
      read: true,
      from: 'RH',
      fromInitials: 'RH',
      avatarColor: 'from-green-500 to-green-600',
    },
    {
      id: 5,
      title: 'New shared document',
      message: 'Thomas Petit shared "Budget Q4 2025.xlsx" with you',
      type: 'info',
      category: 'Documents',
      time: 'Yesterday',
      read: true,
      from: 'Thomas Petit',
      fromInitials: 'TP',
      avatarColor: 'from-pink-500 to-pink-600',
    },
    {
      id: 6,
      title: 'Schedule update',
      message: 'Next week\'s schedule has been updated',
      type: 'info',
      category: 'Planning',
      time: 'Yesterday',
      read: true,
      from: 'Système',
      fromInitials: 'SY',
      avatarColor: 'from-gray-500 to-gray-600',
    },
    {
      id: 7,
      title: 'New employee',
      message: 'Claire Dupont joined the Development team',
      type: 'success',
      category: 'Équipe',
      time: '2 days ago',
      read: true,
      from: 'RH',
      fromInitials: 'RH',
      avatarColor: 'from-green-500 to-green-600',
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle2, color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', bgDark: 'dark:bg-green-950/30' };
      case 'warning':
        return { icon: AlertTriangle, color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', bgDark: 'dark:bg-orange-950/30' };
      case 'message':
        return { icon: MessageCircle, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-950/30' };
      default:
        return { icon: Info, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', bgDark: 'dark:bg-purple-950/30' };
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    if (activeTab === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Notification marquée comme lue');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('Toutes les notifications ont été marquées comme lues');
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification supprimée');
  };

  const stats = [
    { 
      label: 'Total', 
      value: notifications.length.toString(), 
      icon: Bell, 
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
    },
    { 
      label: 'Non lues', 
      value: unreadCount.toString(), 
      icon: AlertTriangle, 
      color: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/30',
    },
    { 
      label: 'Messages', 
      value: notifications.filter(n => n.type === 'message').length.toString(), 
      icon: MessageCircle, 
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
    },
    { 
      label: 'Today', 
      value: notifications.filter(n => n.time.includes('min') || n.time.includes('h')).length.toString(), 
      icon: Calendar, 
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
    },
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#6750A4] to-[#7C68B8] p-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2 relative">
                  <Bell className="w-7 h-7 text-white" strokeWidth={2.5} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white text-primary rounded-full flex items-center justify-center text-[13px] elevation-2">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-[28px] text-white">Notifications</h1>
                  <p className="text-white/90 text-[16px]">
                    {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <RippleButton
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="min-h-[56px] px-8 bg-white text-primary rounded-full hover:bg-white/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5 mr-2" />
                Tout marquer comme lu
              </RippleButton>
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
              <p className="text-[24px]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/30 rounded-2xl p-1 mb-8">
            <TabsTrigger value="all" className="h-12 rounded-xl text-[16px]">
              Toutes
            </TabsTrigger>
            <TabsTrigger value="unread" className="h-12 rounded-xl text-[16px]">
              Non lues
            </TabsTrigger>
            <TabsTrigger value="read" className="h-12 rounded-xl text-[16px]">
              Lues
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-[16px]">Aucune notification</p>
              </div>
            ) : (
              filteredNotifications.map((notif, index) => {
                const typeConfig = getNotificationIcon(notif.type);
                const TypeIcon = typeConfig.icon;

                return (
                  <div
                    key={notif.id}
                    className={`p-6 rounded-2xl ${typeConfig.bgLight} ${typeConfig.bgDark} elevation-0 hover:elevation-2 card-transition animate-in fade-in slide-in-from-bottom duration-500 !border-0 ${!notif.read ? 'ring-2 ring-primary/30' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className={`w-14 h-14 !border-0 flex-shrink-0`}>
                        <AvatarFallback className={`bg-gradient-to-br ${notif.avatarColor} text-white text-[18px]`}>
                          {notif.fromInitials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-[18px]">{notif.title}</h3>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                            <p className="text-[15px] text-muted-foreground mb-3">
                              {notif.message}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge className={`${typeConfig.bgLight} ${typeConfig.bgDark} !border-0 px-3 py-1 rounded-full text-[13px]`}>
                                {notif.category}
                              </Badge>
                              <span className="text-[13px] text-muted-foreground">{notif.time}</span>
                              <span className="text-[13px] text-muted-foreground">•</span>
                              <span className="text-[13px] text-muted-foreground">De {notif.from}</span>
                            </div>
                          </div>

                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${typeConfig.color} flex items-center justify-center elevation-2 flex-shrink-0`}>
                            <TypeIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-3">
                          {!notif.read && (
                            <RippleButton
                              onClick={() => handleMarkAsRead(notif.id)}
                              className="min-h-[40px] px-4 bg-muted text-foreground rounded-xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[14px]"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Marquer comme lue
                            </RippleButton>
                          )}
                          <RippleButton
                            onClick={() => handleDelete(notif.id)}
                            className="min-h-[40px] px-4 bg-muted text-foreground rounded-xl hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[14px]"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </RippleButton>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
