import React, { useState, useRef, useEffect } from 'react';
import { Bell, Send, Search, Mic, Check, Trash2, Filter, MessageCircle, AlertTriangle, Info, CheckCircle2, MoreVertical, Archive, Star, StarOff, Phone, Video, Paperclip, Image as ImageIcon, Smile, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import RippleButton from './RippleButton';
import { toast } from 'sonner@2.0.3';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

interface CommunicationsProps {}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'message' | 'error' | 'update';
  category: string;
  time: string;
  read: boolean;
  from: string;
  fromInitials: string;
  avatarColor: string;
  priority: 'low' | 'medium' | 'high';
  starred?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  initials: string;
  isOnline?: boolean;
  isGroup?: boolean;
  avatarColor: string;
  starred?: boolean;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  initials: string;
  status?: 'sent' | 'delivered' | 'read';
}

export default function Communications() {
  const [mainTab, setMainTab] = useState('messages');
  const [notificationTab, setNotificationTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationFilter, setNotificationFilter] = useState<string>('all');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset search when changing tabs
  useEffect(() => {
    setSearchQuery('');
  }, [mainTab]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  // Notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New task assigned',
      message: 'Sophie Martin assigned you the task "Prepare monthly report" with a deadline on January 15.',
      type: 'info',
      category: 'Tasks',
      time: '5 min ago',
      read: false,
      from: 'Sophie Martin',
      fromInitials: 'SM',
      avatarColor: 'from-purple-500 to-purple-600',
      priority: 'high',
      starred: true,
    },
    {
      id: 2,
      title: 'Meeting tomorrow',
      message: 'Reminder: Team meeting tomorrow at 2:30 PM in conference room A.',
      type: 'warning',
      category: 'Calendar',
      time: '1h ago',
      read: false,
      from: 'System',
      fromInitials: 'SY',
      avatarColor: 'from-orange-500 to-orange-600',
      priority: 'high',
      starred: false,
    },
    {
      id: 3,
      title: 'Leave approved',
      message: 'Your leave request from January 15 to 20 has been approved.',
      type: 'success',
      category: 'HR',
      time: '2h ago',
      read: false,
      from: 'Julie Rousseau',
      fromInitials: 'JR',
      avatarColor: 'from-green-500 to-green-600',
      priority: 'medium',
      starred: false,
    },
    {
      id: 4,
      title: 'New message',
      message: 'Marc Durand: "Can you check the technical specifications document?"',
      type: 'message',
      category: 'Messages',
      time: '3h ago',
      read: true,
      from: 'Marc Durand',
      fromInitials: 'MD',
      avatarColor: 'from-blue-500 to-blue-600',
      priority: 'medium',
      starred: false,
    },
  ]);

  // Conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    { 
      id: 1, 
      name: 'Marie Dubois', 
      role: 'Manager', 
      lastMessage: 'Hello, have you finished the report?', 
      time: '10:30', 
      unread: 2, 
      initials: 'MD',
      isOnline: true,
      avatarColor: 'from-pink-500 to-pink-600',
      starred: true,
    },
    { 
      id: 2, 
      name: 'Jean Martin', 
      role: 'Colleague', 
      lastMessage: 'The meeting is postponed to tomorrow', 
      time: '09:15', 
      unread: 0, 
      initials: 'JM',
      isOnline: true,
      avatarColor: 'from-blue-500 to-blue-600',
      starred: false,
    },
    { 
      id: 3, 
      name: 'Sophie Leroux', 
      role: 'HR', 
      lastMessage: 'Your leave request has been approved', 
      time: 'Yesterday', 
      unread: 1, 
      initials: 'SL',
      isOnline: false,
      avatarColor: 'from-purple-500 to-purple-600',
      starred: false,
    },
  ]);

  // Messages by conversation
  const messagesByConversation: { [key: number]: Message[] } = {
    1: [
      { id: 1, sender: 'Marie Dubois', text: 'Hello! How are you today?', time: '09:00', isOwn: false, initials: 'MD', status: 'read' },
      { id: 2, sender: 'You', text: 'Hello Marie! I\'m fine, thank you.', time: '09:05', isOwn: true, initials: 'Y', status: 'read' },
      { id: 3, sender: 'Marie Dubois', text: 'Did you have time to look at the monthly report?', time: '09:10', isOwn: false, initials: 'MD', status: 'read' },
      { id: 4, sender: 'Marie Dubois', text: 'Hello, have you finished the report?', time: '10:30', isOwn: false, initials: 'MD', status: 'delivered' },
    ],
    2: [
      { id: 1, sender: 'Jean Martin', text: 'Hi! This morning\'s meeting is postponed.', time: '08:00', isOwn: false, initials: 'JM', status: 'read' },
      { id: 2, sender: 'You', text: 'Okay, for what date?', time: '08:15', isOwn: true, initials: 'Y', status: 'read' },
      { id: 3, sender: 'Jean Martin', text: 'The meeting is postponed to tomorrow', time: '09:15', isOwn: false, initials: 'JM', status: 'delivered' },
    ],
    3: [
      { id: 1, sender: 'Sophie Leroux', text: 'Hello, I reviewed your leave request.', time: 'Yesterday', isOwn: false, initials: 'SL', status: 'read' },
      { id: 2, sender: 'You', text: 'Thanks! Any news?', time: 'Yesterday', isOwn: true, initials: 'Y', status: 'read' },
      { id: 3, sender: 'Sophie Leroux', text: 'Your leave request has been approved', time: 'Yesterday', isOwn: false, initials: 'SL', status: 'delivered' },
    ],
  };

  const messages = messagesByConversation[selectedConversation] || [];
  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = conversations.reduce((acc, conv) => acc + conv.unread, 0);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-6 h-6" aria-hidden="true" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" aria-hidden="true" />;
      case 'message': return <MessageCircle className="w-6 h-6" aria-hidden="true" />;
      case 'error': return <X className="w-6 h-6" aria-hidden="true" />;
      default: return <Info className="w-6 h-6" aria-hidden="true" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const toggleStarNotification = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, starred: !n.starred } : n
    ));
  };

  const toggleStarConversation = (id: number) => {
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, starred: !c.starred } : c
    ));
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast.success('Message sent');
      setMessageText('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }
  };

  // Filtering
  const filteredNotifications = notifications.filter(n => {
    const readFilter = notificationTab === 'all' || !n.read;
    const categoryFilter = notificationFilter === 'all' || n.category === notificationFilter;
    const searchFilter = !searchQuery || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return readFilter && categoryFilter && searchFilter;
  });

  const filteredConversations = conversations.filter(c => {
    if (!searchQuery) return true;
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories = Array.from(new Set(notifications.map(n => n.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl">Communications</h1>
        <p className="text-xl text-muted-foreground">
          Centralized messages and notifications • {unreadMessagesCount + unreadCount} unread
        </p>
      </div>

      <Card className="elevation-3">
        <CardContent className="p-6 lg:p-8">
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 relative z-10">
              <TabsTrigger value="messages" className="gap-3 text-lg relative cursor-pointer">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Messages</span>
                {unreadMessagesCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-6 min-w-6 px-2 text-sm">
                    {unreadMessagesCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-3 text-lg relative cursor-pointer">
                <Bell className="w-5 h-5" aria-hidden="true" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-6 min-w-6 px-2 text-sm">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Messages Tab */}
            <TabsContent value="messages" className="mt-0 relative z-0">
              <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
                {/* Conversations list */}
                <div className="lg:col-span-1 flex flex-col gap-5 h-full overflow-hidden">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground pointer-events-none" />
                    <Input
                      placeholder="Search..."
                      className="h-14 pl-14 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--primary) transparent' }}>
                    {filteredConversations.map((conv) => (
                      <Card
                        key={conv.id}
                        className={`cursor-pointer ${
                          selectedConversation === conv.id 
                            ? 'elevation-4 bg-primary/10' 
                            : 'elevation-2 hover:elevation-3'
                        }`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="w-14 h-14">
                                <AvatarFallback className={`bg-gradient-to-br ${conv.avatarColor} text-white text-lg`}>
                                  {conv.initials}
                                </AvatarFallback>
                              </Avatar>
                              {conv.isOnline && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-4 border-card" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg truncate">{conv.name}</h3>
                                <span className="text-sm text-muted-foreground">{conv.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{conv.role}</p>
                              <p className="text-base text-muted-foreground truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                              <Badge variant="destructive" className="h-7 min-w-7 px-2">
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Messages area */}
                <Card className="lg:col-span-2 flex flex-col elevation-3 overflow-hidden h-full">
                  {selectedConv && (
                    <>
                      <CardHeader className="border-b p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14">
                              <AvatarFallback className={`bg-gradient-to-br ${selectedConv.avatarColor} text-white text-lg`}>
                                {selectedConv.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-xl">{selectedConv.name}</CardTitle>
                              <p className="text-base text-muted-foreground">{selectedConv.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-12 w-12">
                              <Phone className="w-6 h-6" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-12 w-12">
                              <Video className="w-6 h-6" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 overflow-y-auto p-6 space-y-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--primary) transparent' }}>
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-4 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                          >
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className={msg.isOwn ? 'bg-secondary text-secondary-foreground' : `bg-gradient-to-br ${selectedConv.avatarColor} text-white`}>
                                {msg.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`flex flex-col max-w-[70%] ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                              <Card className={msg.isOwn ? 'bg-primary/15' : 'bg-muted/50'}>
                                <CardContent className="p-4">
                                  <p className="text-base">{msg.text}</p>
                                </CardContent>
                              </Card>
                              <span className="text-sm text-muted-foreground mt-2">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </CardContent>

                      <div className="border-t p-6">
                        <div className="flex items-end gap-4">
                          <Textarea
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            className="flex-1 min-h-14 text-base resize-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                            className="h-14 w-14"
                          >
                            <Send className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-0 relative z-0">
              <div className="space-y-6">
                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <Tabs value={notificationTab} onValueChange={setNotificationTab}>
                    <TabsList className="h-12">
                      <TabsTrigger value="all" className="text-base px-5">
                        All ({notifications.length})
                      </TabsTrigger>
                      <TabsTrigger value="unread" className="text-base px-5">
                        Unread ({unreadCount})
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <RippleButton
                    variant="outline"
                    size="lg"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="h-12 text-base"
                  >
                    <Check className="w-5 h-5 mr-3" />
                    Mark all as read
                  </RippleButton>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search in notifications..."
                    className="h-14 pl-14 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Notifications list */}
                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <Card className="elevation-2">
                      <CardContent className="p-16 text-center">
                        <Bell className="w-20 h-20 mx-auto mb-6 text-muted-foreground opacity-50" />
                        <h3 className="text-2xl mb-3">No notifications</h3>
                        <p className="text-lg text-muted-foreground">
                          {notificationTab === 'unread' 
                            ? 'All your notifications have been read'
                            : 'You have no notifications at the moment'}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredNotifications.map((notif) => (
                      <Card
                        key={notif.id}
                        className={`elevation-3 ${!notif.read ? 'bg-primary/10 border-l-8 border-l-primary' : ''}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-5">
                            <Avatar className="w-14 h-14">
                              <AvatarFallback className={`bg-gradient-to-br ${notif.avatarColor} text-white text-lg`}>
                                {notif.fromInitials}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-lg">{notif.title}</h3>
                                  <Badge variant="secondary" className="h-6 px-2 text-sm">
                                    {notif.category}
                                  </Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">{notif.time}</span>
                              </div>
                              <p className="text-base text-muted-foreground mb-4">{notif.message}</p>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">From: {notif.from}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {!notif.read && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => markAsRead(notif.id)}
                                  className="h-11 w-11"
                                >
                                  <Check className="w-6 h-6" />
                                </Button>
                              )}
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteNotification(notif.id)}
                                className="h-11 w-11 text-destructive"
                              >
                                <Trash2 className="w-6 h-6" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
