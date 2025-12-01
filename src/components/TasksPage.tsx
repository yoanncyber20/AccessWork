import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle2, Circle, Clock, Search, Plus, Filter } from 'lucide-react';

export function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = [
    { id: 1, title: 'Monthly sales report', description: 'Prepare the sales report for October', status: 'in-progress', priority: 'high', dueDate: '12 Oct 2025', assignedTo: 'You' },
    { id: 2, title: 'Documentation update', description: 'Update the technical documentation for Project Alpha', status: 'in-progress', priority: 'medium', dueDate: '15 Oct 2025', assignedTo: 'You' },
    { id: 3, title: 'Security training', description: 'Complete the online security training module', status: 'todo', priority: 'high', dueDate: '10 Oct 2025', assignedTo: 'You' },
    { id: 4, title: 'Code review', description: 'Review code for the new feature', status: 'todo', priority: 'medium', dueDate: '13 Oct 2025', assignedTo: 'You' },
    { id: 5, title: 'Client presentation', description: 'Prepare presentation for XYZ client', status: 'completed', priority: 'high', dueDate: '08 Oct 2025', assignedTo: 'You' },
    { id: 6, title: 'Test new version', description: 'Test version 2.1 before deployment', status: 'completed', priority: 'medium', dueDate: '07 Oct 2025', assignedTo: 'You' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Haute';
      case 'medium':
        return 'Moyenne';
      default:
        return 'Basse';
    }
  };

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="!border-0 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl mb-2">{task.title}</h3>
            <p className="text-muted-foreground mb-4">{task.description}</p>
          </div>
          <Badge variant="outline" className={`${getPriorityColor(task.priority)} !border-0 px-3 py-1 text-base ml-4`}>
            {getPriorityLabel(task.priority)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {task.dueDate}
            </span>
          </div>
          <Button
            size="lg"
            variant={task.status === 'completed' ? 'default' : 'outline'}
            className="min-h-[48px] px-6"
            aria-label={task.status === 'completed' ? 'Task completed' : 'Mark as completed'}
          >
            {task.status === 'completed' ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-5 h-5 mr-2" aria-hidden="true" />
                Mark Completed
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl mb-2">My Tasks</h1>
          <p className="text-xl text-muted-foreground">Manage your tasks and track your progress</p>
        </div>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 min-h-[56px] px-8 text-lg"
          aria-label="Create a new task"
        >
          <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
          New Task
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="!border-0">
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 !border-0 text-lg"
                aria-label="Search tasks"
              />
            </div>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[56px] px-8 !border-0"
              aria-label="Filter tasks"
            >
              <Filter className="w-5 h-5 mr-2" aria-hidden="true" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-2 gap-2 bg-muted">
          <TabsTrigger value="all" className="min-h-[56px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="todo" className="min-h-[56px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            To Do ({getTasksByStatus('todo').length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="min-h-[56px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            In Progress ({getTasksByStatus('in-progress').length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="min-h-[56px] text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Completed ({getTasksByStatus('completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {tasks.map(renderTaskCard)}
        </TabsContent>

        <TabsContent value="todo" className="space-y-4 mt-6">
          {getTasksByStatus('todo').map(renderTaskCard)}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4 mt-6">
          {getTasksByStatus('in-progress').map(renderTaskCard)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {getTasksByStatus('completed').map(renderTaskCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
