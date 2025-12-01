import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Briefcase, Award, Calendar, Search, Filter, Building2 } from 'lucide-react';
import { Card } from './ui/card';
import RippleButton from './RippleButton';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface TeamProps {}

interface TeamMember {
  id: number;
  name: string;
  initials: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  startDate: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'away';
  skills: string[];
}

export default function Team() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Marie Dubois',
      initials: 'MD',
      role: 'UI/UX Designer',
      department: 'Design',
      email: 'marie.dubois@accesswork.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      startDate: '15 Jan 2023',
      avatarColor: 'from-pink-500 to-pink-600',
      status: 'online',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
    },
    {
      id: 2,
      name: 'Pierre Martin',
      initials: 'PM',
      role: 'Full Stack Developer',
      department: 'Development',
      email: 'pierre.martin@accesswork.com',
      phone: '+33 6 23 45 67 89',
      location: 'Lyon, France',
      startDate: '20 Mar 2022',
      avatarColor: 'from-blue-500 to-blue-600',
      status: 'online',
      skills: ['React', 'Node.js', 'TypeScript'],
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      initials: 'SL',
      role: 'Project Manager',
      department: 'Management',
      email: 'sophie.laurent@accesswork.com',
      phone: '+33 6 34 56 78 90',
      location: 'Paris, France',
      startDate: '10 Jun 2021',
      avatarColor: 'from-purple-500 to-purple-600',
      status: 'away',
      skills: ['Agile', 'Scrum', 'Leadership'],
    },
    {
      id: 4,
      name: 'Thomas Petit',
      initials: 'TP',
      role: 'Marketing Manager',
      department: 'Marketing',
      email: 'thomas.petit@accesswork.com',
      phone: '+33 6 45 67 89 01',
      location: 'Marseille, France',
      startDate: '05 Sep 2023',
      avatarColor: 'from-green-500 to-green-600',
      status: 'online',
      skills: ['SEO', 'Content', 'Analytics'],
    },
    {
      id: 5,
      name: 'Claire Dupont',
      initials: 'CD',
      role: 'Frontend Developer',
      department: 'Development',
      email: 'claire.dupont@accesswork.com',
      phone: '+33 6 56 78 90 12',
      location: 'Toulouse, France',
      startDate: '12 Nov 2023',
      avatarColor: 'from-orange-500 to-orange-600',
      status: 'offline',
      skills: ['Vue.js', 'CSS', 'JavaScript'],
    },
    {
      id: 6,
      name: 'Julien Bernard',
      initials: 'JB',
      role: 'Backend Developer',
      department: 'Development',
      email: 'julien.bernard@accesswork.com',
      phone: '+33 6 67 89 01 23',
      location: 'Bordeaux, France',
      startDate: '22 Apr 2022',
      avatarColor: 'from-indigo-500 to-indigo-600',
      status: 'online',
      skills: ['Python', 'Django', 'PostgreSQL'],
    },
    {
      id: 7,
      name: 'Emma Rousseau',
      initials: 'ER',
      role: 'HR Manager',
      department: 'Human Resources',
      email: 'emma.rousseau@accesswork.com',
      phone: '+33 6 78 90 12 34',
      location: 'Paris, France',
      startDate: '08 Feb 2021',
      avatarColor: 'from-teal-500 to-teal-600',
      status: 'online',
      skills: ['Recruitment', 'Training', 'Management'],
    },
    {
      id: 8,
      name: 'Lucas Moreau',
      initials: 'LM',
      role: 'Financial Analyst',
      department: 'Finance',
      email: 'lucas.moreau@accesswork.com',
      phone: '+33 6 89 01 23 45',
      location: 'Nice, France',
      startDate: '30 Jul 2023',
      avatarColor: 'from-yellow-500 to-yellow-600',
      status: 'away',
      skills: ['Excel', 'SAP', 'Budget'],
    },
  ];

  const departments = Array.from(new Set(teamMembers.map(m => m.department)));

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return member.department === activeTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      default:
        return 'Offline';
    }
  };

  const stats = [
    { 
      label: 'Total Members', 
      value: teamMembers.length.toString(), 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
    },
    { 
      label: 'Online', 
      value: teamMembers.filter(m => m.status === 'online').length.toString(), 
      icon: Users, 
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
    },
    { 
      label: 'Departments', 
      value: departments.length.toString(), 
      icon: Building2, 
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
    },
    { 
      label: 'New', 
      value: teamMembers.filter(m => m.startDate.includes('2023') || m.startDate.includes('2024') || m.startDate.includes('2025')).length.toString(), 
      icon: Award, 
      color: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/30',
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
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
                  <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[28px] text-white">My Team</h1>
                  <p className="text-white/90 text-[16px]">Discover your team members</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Search member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm !border-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px] text-white placeholder:text-white/60 hover:bg-white/20 transition-colors duration-250"
              />
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

      {/* Team Members */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-muted/30 rounded-2xl p-1 mb-8 overflow-x-auto flex">
            <TabsTrigger value="all" className="flex-1 min-h-[48px] rounded-xl text-[16px]">
              All
            </TabsTrigger>
            {departments.map(dept => (
              <TabsTrigger key={dept} value={dept} className="flex-1 min-h-[48px] rounded-xl text-[16px] whitespace-nowrap">
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-[16px]">No member found</p>
              </div>
            ) : (
              filteredMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="p-6 elevation-1 hover:elevation-3 card-transition !border-0 rounded-2xl animate-in fade-in slide-in-from-bottom duration-500 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-4">
                    {/* Avatar and Status */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 !border-0 group-hover:scale-110 transition-transform duration-300">
                          <AvatarFallback className={`bg-gradient-to-br ${member.avatarColor} text-white text-[20px]`}>
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getStatusColor(member.status)} !border-0`}></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[18px] mb-1">{member.name}</h3>
                        <Badge className={`!border-0 px-3 py-1 rounded-full text-[12px] ${
                          member.status === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300' :
                          member.status === 'away' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-300'
                        }`}>
                          {getStatusLabel(member.status)}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[14px]">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>{member.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Since {member.startDate}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {member.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-muted/50 text-foreground !border-0 px-2 py-1 rounded-lg text-[12px]">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <RippleButton className="flex-1 min-h-[40px] px-4 bg-muted text-foreground rounded-xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[14px]">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </RippleButton>
                      <RippleButton className="flex-1 min-h-[40px] px-4 bg-muted text-foreground rounded-xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[14px]">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </RippleButton>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
