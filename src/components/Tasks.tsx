import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Circle, TrendingUp, Plus, Filter, Calendar, User, Tag, Search } from 'lucide-react';
import { Card } from './ui/card';
import RippleButton from './RippleButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface TasksProps {}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'urgent';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  category: string;
  progress: number;
}

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const tasks: Task[] = [
    { 
      id: 1, 
      title: 'Prepare monthly report', 
      description: 'Compile data and create financial report',
      status: 'in-progress', 
      deadline: '12 Oct 2025',
      priority: 'high',
      assignee: 'Yoann Dupont',
      category: 'Finance',
      progress: 60
    },
    { 
      id: 2, 
      title: 'Update documentation', 
      description: 'Technical documentation for the new module',
      status: 'todo', 
      deadline: '15 Oct 2025',
      priority: 'medium',
      assignee: 'Yoann Dupont',
      category: 'Development',
      progress: 0
    },
    { 
      id: 3, 
      title: 'Weekly team meeting', 
      description: 'Weekly check-in with the entire team',
      status: 'completed', 
      deadline: '8 Oct 2025',
      priority: 'medium',
      assignee: 'Sophie Martin',
      category: 'Meeting',
      progress: 100
    },
    { 
      id: 4, 
      title: 'New employee training', 
      description: 'Training session on internal tools',
      status: 'urgent', 
      deadline: '14 Oct 2025',
      priority: 'high',
      assignee: 'Yoann Dupont',
      category: 'Training',
      progress: 25
    },
    { 
      id: 5, 
      title: 'Code review', 
      description: 'Review code for the new feature',
      status: 'in-progress', 
      deadline: '13 Oct 2025',
      priority: 'high',
      assignee: 'Yoann Dupont',
      category: 'Development',
      progress: 40
    },
    { 
      id: 6, 
      title: 'Sprint planning', 
      description: 'Plan the next sprint',
      status: 'completed', 
      deadline: '7 Oct 2025',
      priority: 'medium',
      assignee: 'Sophie Martin',
      category: 'Planning',
      progress: 100
    },
    { 
      id: 7, 
      title: 'Client presentation', 
      description: 'Demo of the prototype to the client',
      status: 'urgent', 
      deadline: '11 Oct 2025',
      priority: 'high',
      assignee: 'Yoann Dupont',
      category: 'Presentation',
      progress: 70
    },
    { 
      id: 8, 
      title: 'Performance analysis', 
      description: 'Analyze performance metrics',
      status: 'todo', 
      deadline: '16 Oct 2025',
      priority: 'low',
      assignee: 'Marie Dubois',
      category: 'Analysis',
      progress: 0
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          color: 'from-green-500 to-green-600',
          bgLight: 'bg-green-50',
          bgDark: 'dark:bg-green-950/30',
          textColor: 'text-green-700 dark:text-green-300',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Clock,
          color: 'from-blue-500 to-blue-600',
          bgLight: 'bg-blue-50',
          bgDark: 'dark:bg-blue-950/30',
          textColor: 'text-blue-700 dark:text-blue-300',
        };
      case 'urgent':
        return {
          label: 'Urgent',
          icon: AlertTriangle,
          color: 'from-orange-500 to-orange-600',
          bgLight: 'bg-orange-50',
          bgDark: 'dark:bg-orange-950/30',
          textColor: 'text-orange-700 dark:text-orange-300',
        };
      default:
        return {
          label: 'To Do',
          icon: Circle,
          color: 'from-gray-500 to-gray-600',
          bgLight: 'bg-gray-50',
          bgDark: 'dark:bg-gray-950/30',
          textColor: 'text-gray-700 dark:text-gray-300',
        };
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return task.status === 'completed';
    if (activeTab === 'in-progress') return task.status === 'in-progress';
    if (activeTab === 'urgent') return task.status === 'urgent';
    return true;
  });

  const stats = [
    { label: 'Total Tasks', value: tasks.length.toString(), icon: Circle, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', bgDark: 'dark:bg-purple-950/30' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length.toString(), icon: CheckCircle2, color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', bgDark: 'dark:bg-green-950/30' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length.toString(), icon: Clock, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-950/30' },
    { label: 'Urgent', value: tasks.filter(t => t.status === 'urgent').length.toString(), icon: AlertTriangle, color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', bgDark: 'dark:bg-orange-950/30' },
  ];

  const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);

  const handleCompleteTask = (taskId: number) => {
    toast.success('Task completed!', {
      description: 'The task has been marked as completed.',
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
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
                  <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[28px] text-white">My Tasks</h1>
                  <p className="text-white/90 text-[16px]">Manage your daily missions</p>
                </div>
              </div>
              <RippleButton
                onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                className="min-h-[56px] px-8 bg-white text-primary rounded-full hover:bg-white/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px]"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Task
              </RippleButton>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-[16px]">Completion Rate</span>
                <span className="text-white text-[20px]">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-3 bg-white/20" />
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

      {/* Filter Tabs & Tasks List */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-muted/30 rounded-2xl p-1 mb-8">
            <TabsTrigger value="all" className="h-12 rounded-xl text-[16px]">
              All
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="h-12 rounded-xl text-[16px]">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed" className="h-12 rounded-xl text-[16px]">
              Completed
            </TabsTrigger>
            <TabsTrigger value="urgent" className="h-12 rounded-xl text-[16px]">
              Urgent
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Circle className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-[16px]">No tasks found</p>
              </div>
            ) : (
              filteredTasks.map((task, index) => {
                const statusConfig = getStatusConfig(task.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={task.id}
                    className={`p-6 rounded-2xl ${statusConfig.bgLight} ${statusConfig.bgDark} elevation-0 hover:elevation-2 card-transition animate-in fade-in slide-in-from-bottom duration-500 !border-0`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left section with icon and info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusConfig.color} flex items-center justify-center elevation-2 flex-shrink-0`}>
                          <StatusIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-[18px] mb-2">{task.title}</h3>
                            <p className="text-[14px] text-muted-foreground">{task.description}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className={`${statusConfig.bgLight} ${statusConfig.bgDark} ${statusConfig.textColor} !border-0 px-3 py-1 rounded-full text-[13px]`}>
                              {statusConfig.label}
                            </Badge>
                            <span className="flex items-center gap-2 text-[14px] text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {task.deadline}
                            </span>
                            <span className="flex items-center gap-2 text-[14px] text-muted-foreground">
                              <User className="w-4 h-4" />
                              {task.assignee}
                            </span>
                            <span className="flex items-center gap-2 text-[14px] text-muted-foreground">
                              <Tag className="w-4 h-4" />
                              {task.category}
                            </span>
                          </div>

                          {task.status !== 'completed' && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <RippleButton
                          className="min-h-[48px] px-6 bg-muted text-foreground rounded-2xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[15px]"
                        >
                          Details
                        </RippleButton>
                        {task.status !== 'completed' && (
                          <RippleButton
                            onClick={() => handleCompleteTask(task.id)}
                            className="min-h-[48px] px-6 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[15px]"
                          >
                            Complete
                          </RippleButton>
                        )}
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
