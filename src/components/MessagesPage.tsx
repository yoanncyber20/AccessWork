import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Send, Search, Mic, UserCircle } from 'lucide-react';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    { id: 1, name: 'Marie Dubois', role: 'Manager', lastMessage: 'Hello, have you finished the report?', time: '10:30', unread: 2, initials: 'MD' },
    { id: 2, name: 'Jean Martin', role: 'Colleague', lastMessage: 'The meeting is postponed to tomorrow', time: '09:15', unread: 0, initials: 'JM' },
    { id: 3, name: 'Sophie Leroux', role: 'HR', lastMessage: 'Your leave request has been approved', time: 'Yesterday', unread: 1, initials: 'SL' },
    { id: 4, name: 'Project Team Alpha', role: 'Group', lastMessage: 'New updates available', time: 'Yesterday', unread: 0, initials: 'PA' },
  ];

  const messages = [
    { id: 1, sender: 'Marie Dubois', text: 'Hello! How are you today?', time: '09:00', isOwn: false, initials: 'MD' },
    { id: 2, sender: 'You', text: 'Hello Marie! I\'m fine, thank you. And you?', time: '09:05', isOwn: true, initials: 'Y' },
    { id: 3, sender: 'Marie Dubois', text: 'Very well! Did you have time to look at the monthly report?', time: '09:10', isOwn: false, initials: 'MD' },
    { id: 4, sender: 'You', text: 'Yes, I\'m finalizing it. I\'ll send it this afternoon.', time: '09:15', isOwn: true, initials: 'Y' },
    { id: 5, sender: 'Marie Dubois', text: 'Perfect! Take your time. No rush.', time: '09:20', isOwn: false, initials: 'MD' },
    { id: 6, sender: 'Marie Dubois', text: 'Hello, have you finished the report?', time: '10:30', isOwn: false, initials: 'MD' },
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">Messages</h1>
        <p className="text-xl text-muted-foreground">Communicate with your team</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
        {/* Conversations List */}
        <Card className="!border-0 lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="!border-0">
            <CardTitle>Conversations</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search..."
                className="h-12 pl-10 !border-0"
                aria-label="Search conversations"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y-0">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                    selectedConversation === conv.id ? 'bg-accent' : ''
                  }`}
                  aria-label={`Conversation with ${conv.name}`}
                  aria-current={selectedConversation === conv.id ? 'true' : undefined}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 !border-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {conv.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="truncate">{conv.name}</p>
                        <span className="text-sm text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.role}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground min-w-[24px] h-6 flex items-center justify-center">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="!border-0 lg:col-span-2 flex flex-col overflow-hidden">
          {selectedConv && (
            <>
              <CardHeader className="!border-0">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 !border-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
                      {selectedConv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedConv.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedConv.role}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <Avatar className="w-10 h-10 !border-0 flex-shrink-0">
                      <AvatarFallback className={message.isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                        {message.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent text-accent-foreground border-2'
                        }`}
                      >
                        <p className="text-lg leading-relaxed">{message.text}</p>
                      </div>
                      <span className="text-sm text-muted-foreground mt-1">{message.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="!border-0 p-4">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Type your message... (or use voice command)"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[80px] !border-0 resize-none text-lg"
                    aria-label="Write a message"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      size="lg"
                      className="h-full min-h-[56px] px-6"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-full min-h-[56px] px-6 !border-0"
                      aria-label="Saisie vocale"
                      title="Utiliser la commande vocale"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
