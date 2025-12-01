import React, { useState } from 'react';
import { Calendar, FileText, User, Clock, Building2, Users, UserCircle, CheckCircle, XCircle, AlertCircle, CalendarCheck, CalendarClock, CalendarX2 } from 'lucide-react';
import RippleButton from './RippleButton';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface AbsenceManagementProps {}

interface AbsenceRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export default function AbsenceManagement() {
  const [activeTab, setActiveTab] = useState('absences');
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  // Mock data
  const userInfo = {
    name: 'Yoann EDZANG',
    initials: 'YE',
    contractStart: 'Jul 4, 2025',
    contractEnd: '-',
    contractType: 'Permanent',
    establishment: 'Les Petits Prés',
    team: 'Kitchen',
    manager: '-'
  };

  const absenceRequests: AbsenceRequest[] = [
    {
      id: '1',
      type: 'Paid Leave',
      startDate: 'Oct 15, 2025',
      endDate: 'Oct 20, 2025',
      duration: '5 days',
      status: 'approved',
      reason: 'Family vacation'
    },
    {
      id: '2',
      type: 'Sick Leave',
      startDate: 'Oct 5, 2025',
      endDate: 'Oct 6, 2025',
      duration: '2 days',
      status: 'pending',
      reason: 'Medical consultation'
    }
  ];

  const absenceBalance = {
    acquired: 25,
    taken: 7,
    pending: 2,
    remaining: 16
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-600 text-white hover:bg-green-700 transition-all duration-250 min-h-[32px] px-4 gap-2 elevation-1 hover:elevation-2">
            <CheckCircle className="w-4 h-4" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-orange-600 text-white hover:bg-orange-700 transition-all duration-250 min-h-[32px] px-4 gap-2 elevation-1 hover:elevation-2">
            <AlertCircle className="w-4 h-4" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-600 text-white hover:bg-red-700 transition-all duration-250 min-h-[32px] px-4 gap-2 elevation-1 hover:elevation-2">
            <XCircle className="w-4 h-4" />
            Rejected
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleSubmitAbsence = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Absence request submitted successfully', {
      description: 'Your request will be reviewed by your manager',
      duration: 4000,
    });
    setShowNewRequestForm(false);
  };

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-500">
      {/* User header with contract information */}
      <Card className="mb-6 overflow-hidden elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
        <div className="bg-gradient-to-br from-[#6750A4] via-[#7C68B8] to-[#8576C4] p-8">
          <div className="flex items-center gap-6 mb-8">
            {/* Avatar with hover animation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0 elevation-2 group-hover:elevation-3 card-transition group-hover:scale-105">
                <span className="text-[#6750A4] text-3xl">{userInfo.initials}</span>
              </div>
            </div>
            
            <div className="text-white flex-1">
              <h1 className="text-[28px] mb-2 animate-in slide-in-from-left duration-500">{userInfo.name}</h1>
              <p className="text-white/90 text-[16px] animate-in slide-in-from-left duration-500 delay-100">
                Employee Profile • {userInfo.contractType}
              </p>
            </div>

            {/* Status badge */}
            <div className="hidden md:block">
              <Badge className="bg-white/20 text-white backdrop-blur-sm !border-0 px-6 py-3 text-[16px] hover:bg-white/30 transition-all duration-250 elevation-1 hover:elevation-2 min-h-[48px]">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Active
              </Badge>
            </div>
          </div>

          <Separator className="my-6 bg-white/30 h-[2px]" />

          {/* Contract information with animations */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-white">
            {[
              { label: 'Contract Start', value: userInfo.contractStart },
              { label: 'Contract End', value: userInfo.contractEnd },
              { label: 'Contract Type', value: userInfo.contractType },
              { label: 'Establishment', value: userInfo.establishment },
              { label: 'Team', value: userInfo.team },
              { label: 'Line Manager', value: userInfo.manager }
            ].map((info, index) => (
              <div 
                key={index}
                className="group animate-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-[14px] opacity-80 mb-2 group-hover:opacity-100 transition-opacity duration-250">
                  {info.label}
                </p>
                <p className="text-[18px] group-hover:scale-105 transition-transform duration-250 origin-left">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Navigation tabs with Material Symbols Rounded */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="relative bg-gradient-to-br from-muted/40 via-muted/30 to-transparent backdrop-blur-md rounded-3xl p-4 elevation-2 hover:elevation-3 card-transition border-2 border-border/50 overflow-hidden high-contrast:bg-background high-contrast:border-border">
          {/* Background shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
          
          <TabsList className="relative w-full justify-start overflow-x-auto bg-transparent p-0 gap-3 flex-nowrap scrollbar-hide high-contrast:gap-4">
            {[
              { value: 'overview', label: 'Overview', icon: User, color: 'from-blue-500 to-blue-600' },
              { value: 'contracts', label: 'Contracts', icon: FileText, color: 'from-purple-500 to-purple-600' },
              { value: 'planning', label: 'Time', icon: Clock, color: 'from-green-500 to-green-600' },
              { value: 'modulation', label: 'Modulation', icon: CalendarClock, color: 'from-orange-500 to-orange-600' },
              { value: 'absences', label: 'Absences', icon: CalendarCheck, color: 'from-[#6750A4] to-[#7C68B8]' },
              { value: 'documents', label: 'Documents', icon: FileText, color: 'from-indigo-500 to-indigo-600' },
              { value: 'roles', label: 'Permissions', icon: UserCircle, color: 'from-pink-500 to-pink-600' }
            ].map((tab, index) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="group relative min-h-[60px] px-5 md:px-7 py-3 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground hover:bg-muted/60 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 whitespace-nowrap elevation-0 data-[state=active]:elevation-3 hover:elevation-2 overflow-visible border-2 border-transparent data-[state=active]:border-primary/20 backdrop-blur-sm high-contrast:border-2 high-contrast:border-border high-contrast:bg-background high-contrast:data-[state=active]:bg-primary high-contrast:data-[state=active]:border-primary high-contrast:data-[state=active]:text-primary-foreground"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-out -translate-x-full rounded-2xl pointer-events-none"></div>
                
                {/* Animated active indicator at bottom */}
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-gradient-to-r ${tab.color} rounded-full scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300 origin-center pointer-events-none`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-center gap-3 pointer-events-none">
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tab.color} flex items-center justify-center shrink-0 elevation-2 transition-all duration-300 group-data-[state=active]:bg-white/20 group-data-[state=active]:backdrop-blur-sm p-2`}>
                    <tab.icon className="w-full h-full text-white" strokeWidth={2} />
                  </div>
                  {/* Text label */}
                  <span className="text-[15px] max-w-[140px] lg:max-w-none transition-transform duration-300 group-data-[state=active]:drop-shadow-sm hidden md:inline">
                    {tab.label}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Overview tab content */}
        <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center elevation-2">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Profile Overview</h2>
                <p className="text-muted-foreground text-[16px]">Overview of your activity</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              General information about your profile and activity within the company.
            </p>
          </Card>
        </TabsContent>

        {/* Contracts tab content */}
        <TabsContent value="contracts" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center elevation-2">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Current Contract</h2>
                <p className="text-muted-foreground text-[16px]">Details of your employment contract</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/20 rounded-2xl border-2 border-border hover:bg-muted/30 transition-colors duration-250">
                {[
                  { label: 'Type', value: 'Permanent Contract' },
                  { label: 'Contract Start', value: userInfo.contractStart },
                  { label: 'Salary', value: 'Not specified', muted: true },
                  { label: 'Weekly Working Hours', value: '35 hours' }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <p className="text-[14px] text-muted-foreground mb-2 group-hover:text-foreground transition-colors duration-250">
                      {item.label}
                    </p>
                    <p className={`text-[16px] ${item.muted ? 'text-muted-foreground' : ''} group-hover:scale-105 transition-transform duration-250 origin-left`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Time & Scheduling tab content */}
        <TabsContent value="planning" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center elevation-2">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Time & Scheduling</h2>
                <p className="text-muted-foreground text-[16px]">Manage your schedule</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              Manage your work hours and schedule.
            </p>
          </Card>
        </TabsContent>

        {/* Modulation tab content */}
        <TabsContent value="modulation" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center elevation-2">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Modulation</h2>
                <p className="text-muted-foreground text-[16px]">Time modulation tracking</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              View your working time modulation information.
            </p>
          </Card>
        </TabsContent>

        {/* Leave & Absences tab content */}
        <TabsContent value="absences" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Leave balance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom duration-500">
            {[
              { 
                label: 'Acquired', 
                value: absenceBalance.acquired, 
                gradient: 'from-blue-500 to-blue-600',
                bgLight: 'bg-blue-50',
                bgDark: 'dark:bg-blue-950/30',
                textColor: 'text-blue-600 dark:text-blue-400',
                icon: Calendar
              },
              { 
                label: 'Taken', 
                value: absenceBalance.taken, 
                gradient: 'from-green-500 to-green-600',
                bgLight: 'bg-green-50',
                bgDark: 'dark:bg-green-950/30',
                textColor: 'text-green-600 dark:text-green-400',
                icon: CheckCircle
              },
              { 
                label: 'Pending', 
                value: absenceBalance.pending, 
                gradient: 'from-orange-500 to-orange-600',
                bgLight: 'bg-orange-50',
                bgDark: 'dark:bg-orange-950/30',
                textColor: 'text-orange-600 dark:text-orange-400',
                icon: AlertCircle
              },
              { 
                label: 'Remaining', 
                value: absenceBalance.remaining, 
                gradient: 'from-purple-500 to-purple-600',
                bgLight: 'bg-purple-50',
                bgDark: 'dark:bg-purple-950/30',
                textColor: 'text-purple-600 dark:text-purple-400',
                icon: Calendar
              }
            ].map((item, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden p-6 ${item.bgLight} ${item.bgDark} elevation-1 hover:elevation-3 card-transition group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 rounded-3xl !border-0`}
                tabIndex={0}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center elevation-2 group-hover:elevation-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4`}>
                    <item.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Label */}
                  <p className="text-[14px] text-muted-foreground mb-2 group-hover:text-foreground transition-colors duration-250">
                    {item.label}
                  </p>
                  
                  {/* Value */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[36px] ${item.textColor} group-hover:scale-110 transition-transform duration-300 origin-left inline-block`}>
                      {item.value}
                    </span>
                    <span className={`text-[16px] ${item.textColor} opacity-80`}>
                      days
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* New absence request */}
          {!showNewRequestForm ? (
            <div className="flex justify-end animate-in fade-in slide-in-from-bottom duration-500 delay-200">
              <RippleButton
                onClick={() => setShowNewRequestForm(true)}
                className="min-h-[56px] px-8 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                New Absence Request
              </RippleButton>
            </div>
          ) : (
            <Card className="p-8 elevation-2 rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6750A4] to-[#7C68B8] flex items-center justify-center elevation-2">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-[22px] mb-1">New Absence Request</h2>
                  <p className="text-muted-foreground text-[16px]">Fill out the form below</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmitAbsence} className="space-y-6 mt-8">
                <div>
                  <label className="block mb-3 text-[16px]">Absence Type</label>
                  <select className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0">
                    <option>Paid Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                    <option>Time Off</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-3 text-[16px]">Start Date</label>
                    <input
                      type="date"
                      className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-[16px]">End Date</label>
                    <input
                      type="date"
                      className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-3 text-[16px]">Reason</label>
                  <textarea
                    className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[140px] text-[16px] resize-none hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
                    placeholder="Describe the reason for your absence request..."
                  />
                </div>
                
                <div className="h-4"></div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <RippleButton
                    type="submit"
                    className="min-h-[56px] px-8 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px] flex-1 sm:flex-none"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Request
                  </RippleButton>
                  <RippleButton
                    type="button"
                    onClick={() => setShowNewRequestForm(false)}
                    className="min-h-[56px] px-8 bg-muted text-foreground rounded-full hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px] flex-1 sm:flex-none"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Cancel
                  </RippleButton>
                </div>
              </form>
            </Card>
          )}

          {/* Absence requests list */}
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center elevation-2">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">My Absence Requests</h2>
                <p className="text-muted-foreground text-[16px]">History of your requests</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {absenceRequests.map((request, index) => (
                <div
                  key={request.id}
                  className="p-6 !border-0 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-all duration-250 elevation-0 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 cursor-pointer group"
                  tabIndex={0}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-[18px] group-hover:text-primary transition-colors duration-250">
                          {request.type}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-[14px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-2 group-hover:text-foreground transition-colors duration-250">
                          <Calendar className="w-4 h-4" />
                          From {request.startDate} to {request.endDate}
                        </span>
                        <span className="flex items-center gap-2 group-hover:text-foreground transition-colors duration-250">
                          <Clock className="w-4 h-4" />
                          {request.duration}
                        </span>
                      </div>
                      
                      <p className="text-[16px] text-muted-foreground group-hover:text-foreground transition-colors duration-250">
                        {request.reason}
                      </p>
                    </div>
                    
                    <div className="flex gap-3 lg:flex-col">
                      <RippleButton className="min-h-[48px] min-w-[48px] p-3 bg-muted rounded-xl hover:bg-primary hover:text-primary-foreground elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                        <FileText className="w-5 h-5" />
                      </RippleButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Documents tab content */}
        <TabsContent value="documents" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center elevation-2">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Documents</h2>
                <p className="text-muted-foreground text-[16px]">Your administrative documents</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              Access your administrative documents and contracts.
            </p>
          </Card>
        </TabsContent>

        {/* Permissions tab content */}
        <TabsContent value="roles" className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl border-2 border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center elevation-2">
                <UserCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[22px] mb-1">Permissions</h2>
                <p className="text-muted-foreground text-[16px]">Your access and authorizations</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              View your permissions in the application.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
