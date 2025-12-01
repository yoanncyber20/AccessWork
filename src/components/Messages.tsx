import React, { useState } from "react";
import {
  MessageCircle,
  Search,
  Plus,
  Archive,
  RefreshCw,
  Send,
  Paperclip,
  MoreVertical,
  ArrowLeft,
  Phone,
  Video,
  Info,
} from "lucide-react";
import RippleButton from "./RippleButton";
import { Card } from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from 'sonner@2.0.3';

interface MessagesProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface Message {
  id: string;
  sender: string;
  senderInitials: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  archived: boolean;
  avatarColor: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
}

export default function Messages({
  isDarkMode,
  onToggleDarkMode,
}: MessagesProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] =
    useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const conversations: Message[] = [
    {
      id: "1",
      sender: "Marie Dupont",
      senderInitials: "MD",
      preview:
        "Hello, can you confirm your availability for tomorrow?",
      timestamp: "14:30",
      unread: true,
      archived: false,
      avatarColor: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      sender: "Jean Martin",
      senderInitials: "JM",
      preview: "Thanks for your help on the project!",
      timestamp: "Yesterday",
      unread: false,
      archived: false,
      avatarColor: "from-green-500 to-green-600",
    },
    {
      id: "3",
      sender: "Sophie Bernard",
      senderInitials: "SB",
      preview: "The meeting is postponed to 3 PM",
      timestamp: "10 Oct",
      unread: true,
      archived: false,
      avatarColor: "from-purple-500 to-purple-600",
    },
    {
      id: "4",
      sender: "Thomas Petit",
      senderInitials: "TP",
      preview: "Documents are ready for validation",
      timestamp: "9 Oct",
      unread: false,
      archived: false,
      avatarColor: "from-orange-500 to-orange-600",
    },
    {
      id: "5",
      sender: "Claire Dubois",
      senderInitials: "CD",
      preview: "Excellent work on the last sprint!",
      timestamp: "8 Oct",
      unread: false,
      archived: false,
      avatarColor: "from-pink-500 to-pink-600",
    },
  ];

  const chatMessages: Record<string, ChatMessage[]> = {
    "1": [
      {
        id: "msg1",
        content: "Hello, can you confirm your availability for tomorrow?",
        sender: "other",
        timestamp: "14:30",
      },
      {
        id: "msg2",
        content: "Yes, I'm available tomorrow afternoon.",
        sender: "me",
        timestamp: "14:32",
      },
      {
        id: "msg3",
        content: "Perfect! The meeting will be at 2:30 PM in the conference room.",
        sender: "other",
        timestamp: "14:35",
      },
      {
        id: "msg4",
        content: "Understood, I'll be there. Thank you!",
        sender: "me",
        timestamp: "14:36",
      },
    ],
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.preview.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "unread") return conv.unread && matchesSearch;
    if (activeTab === "archived") return conv.archived && matchesSearch;
    return !conv.archived && matchesSearch;
  });

  const hasConversations = filteredConversations.length > 0;
  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const messages = selectedConversation ? (chatMessages[selectedConversation] || []) : [];

  const unreadCount = conversations.filter(c => c.unread && !c.archived).length;

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      toast.success('Message sent!', {
        description: 'Your message has been sent successfully.',
      });
      setMessageInput("");
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header Stats */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#6750A4] to-[#7C68B8] p-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
                <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-[28px] text-white">Messages</h1>
                <p className="text-white/90 text-[16px]">
                  {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white !border-0 px-4 py-2 rounded-full backdrop-blur-sm text-[15px]">
              {conversations.filter(c => !c.archived).length} conversations
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Side panel - Conversations list */}
        <Card
          className={`${selectedConversation ? "hidden lg:block" : "block"} lg:col-span-4 elevation-2 rounded-3xl !border-0 overflow-hidden flex flex-col h-[calc(100vh-400px)] animate-in fade-in slide-in-from-left duration-500`}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent !border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px]">Discussions</h2>
              <div className="flex gap-2">
                <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                  <RefreshCw className="w-5 h-5" />
                </RippleButton>
                <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                  <Plus className="w-5 h-5" />
                </RippleButton>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px] hover:bg-muted/30 transition-colors duration-250 elevation-0 hover:elevation-1"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="px-4">
              <TabsList className="w-full bg-muted/30 rounded-2xl p-1 gap-1 !border-0">
                <TabsTrigger
                  value="all"
                  className="flex-1 min-h-[44px] rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-250 text-[15px]"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="flex-1 min-h-[44px] rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-250 text-[15px]"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="flex-1 min-h-[44px] rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-250 text-[15px]"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conversations list */}
            <TabsContent
              value={activeTab}
              className="flex-1 mt-0 p-4"
            >
              {hasConversations ? (
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {filteredConversations.map(
                      (conversation, index) => (
                        <div
                          key={conversation.id}
                          onClick={() =>
                            setSelectedConversation(
                              conversation.id,
                            )
                          }
                          className={`p-4 rounded-2xl cursor-pointer transition-all duration-250 elevation-0 hover:elevation-2 !border-0 ${
                            selectedConversation ===
                            conversation.id
                              ? "bg-primary/10"
                              : "bg-card hover:bg-muted/30"
                          } group animate-in fade-in slide-in-from-bottom duration-500`}
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                          tabIndex={0}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className={`w-12 h-12 !border-0 group-hover:scale-110 transition-transform duration-250`}>
                              <AvatarFallback className={`bg-gradient-to-br ${conversation.avatarColor} text-white text-[16px]`}>
                                {conversation.senderInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3
                                  className={`text-[16px] truncate`}
                                >
                                  {conversation.sender}
                                </h3>
                                <span className="text-[13px] text-muted-foreground shrink-0 ml-2">
                                  {conversation.timestamp}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-[14px] text-muted-foreground truncate ${conversation.unread ? "" : ""}`}
                                >
                                  {conversation.preview}
                                </p>
                                {conversation.unread && (
                                  <Badge className="bg-primary text-primary-foreground shrink-0 h-6 w-6 rounded-full p-0 flex items-center justify-center text-[12px] !border-0">
                                    1
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle
                        className="w-10 h-10 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-[16px] text-muted-foreground">
                      No messages at the moment.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Main panel - Selected conversation */}
        <Card
          className={`${selectedConversation ? "block" : "hidden lg:block"} lg:col-span-8 elevation-2 rounded-3xl !border-0 overflow-hidden flex flex-col h-[calc(100vh-400px)] animate-in fade-in slide-in-from-right duration-500`}
        >
          {selectedConversation && selectedConv ? (
            <>
              {/* Conversation header */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent !border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <RippleButton
                      onClick={() =>
                        setSelectedConversation(null)
                      }
                      className="lg:hidden min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </RippleButton>
                    <Avatar className={`w-14 h-14 !border-0`}>
                      <AvatarFallback className={`bg-gradient-to-br ${selectedConv.avatarColor} text-white text-[18px]`}>
                        {selectedConv.senderInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-[20px] mb-1">
                        {selectedConv.sender}
                      </h2>
                      <p className="text-[14px] text-muted-foreground">
                        En ligne
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                      <Phone className="w-5 h-5" />
                    </RippleButton>
                    <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                      <Video className="w-5 h-5" />
                    </RippleButton>
                    <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                      <Info className="w-5 h-5" />
                    </RippleButton>
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    msg.sender === "other" ? (
                      <div key={msg.id} className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                        <Avatar className="w-10 h-10 !border-0">
                          <AvatarFallback className={`bg-gradient-to-br ${selectedConv.avatarColor} text-white text-[14px]`}>
                            {selectedConv.senderInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                            <p className="text-[15px]">
                              {msg.content}
                            </p>
                          </div>
                          <p className="text-[13px] text-muted-foreground mt-2 ml-1">
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div key={msg.id} className="flex items-start gap-3 justify-end animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                            <p className="text-[15px]">
                              {msg.content}
                            </p>
                          </div>
                          <p className="text-[13px] text-muted-foreground mt-2 mr-1">
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="p-6 !border-0 bg-muted/20">
                <div className="flex items-end gap-3">
                  <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-2xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition shrink-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                    <Paperclip className="w-5 h-5" />
                  </RippleButton>
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Write your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={1}
                      className="w-full p-4 pr-14 rounded-2xl bg-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px] resize-none hover:bg-muted/30 transition-colors duration-250 elevation-0 hover:elevation-1"
                    />
                  </div>
                  <RippleButton 
                    onClick={handleSendMessage}
                    className="min-h-[56px] min-w-[56px] p-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition shrink-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                    <Send className="w-6 h-6" />
                  </RippleButton>
                </div>
              </div>
            </>
          ) : (
            // Empty state - No conversation selected
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom duration-500">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 elevation-1">
                  <MessageCircle
                    className="w-12 h-12 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="text-[22px] mb-3">
                  Select a conversation
                </h2>
                <p className="text-[16px] text-muted-foreground mb-6">
                  Choose an existing conversation from the
                  list or create a new one to start
                  chatting.
                </p>
                <RippleButton className="min-h-[56px] px-8 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px]">
                  <Plus className="w-5 h-5 mr-2" />
                  New conversation
                </RippleButton>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
