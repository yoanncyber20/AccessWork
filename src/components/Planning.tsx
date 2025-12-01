import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  LayoutGrid,
  Filter,
  Plus,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface PlanningProps {}

interface ScheduleSlot {
  id: string;
  start: string;
  end: string;
  type: "work" | "rest" | "leave" | "weekend";
  label?: string;
  duration?: string;
}

interface EmployeeSchedule {
  id: number;
  name: string;
  slots: {
    [key: string]: ScheduleSlot[];
  };
}

export default function Planning() {
  const [currentWeek, setCurrentWeek] = useState(
    "Oct 6 - Oct 12, 2025",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("employees");

  const weekDays = [
    {
      id: "lun",
      label: "Monday",
      shortLabel: "MON",
      date: "06",
      fullDate: "6 Oct",
    },
    {
      id: "mar",
      label: "Tuesday",
      shortLabel: "TUE",
      date: "07",
      fullDate: "7 Oct",
    },
    {
      id: "mer",
      label: "Wednesday",
      shortLabel: "WED",
      date: "08",
      fullDate: "8 Oct",
    },
    {
      id: "jeu",
      label: "Thursday",
      shortLabel: "THU",
      date: "09",
      fullDate: "9 Oct",
      isToday: true,
    },
    {
      id: "ven",
      label: "Friday",
      shortLabel: "FRI",
      date: "10",
      fullDate: "10 Oct",
    },
    {
      id: "sam",
      label: "Saturday",
      shortLabel: "SAT",
      date: "11",
      fullDate: "11 Oct",
    },
    {
      id: "dim",
      label: "Sunday",
      shortLabel: "SUN",
      date: "12",
      fullDate: "12 Oct",
    },
  ];

  const employees: EmployeeSchedule[] = [
    {
      id: 1,
      name: "Sophie Martin",
      slots: {
        lun: [
          {
            id: "1",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Morning shift",
          },
          {
            id: "2",
            start: "18h30",
            end: "22h00",
            duration: "3h30",
            type: "work",
            label: "Evening shift",
          },
        ],
        mar: [
          {
            id: "3",
            start: "09:00",
            end: "18h00",
            duration: "9h",
            type: "work",
            label: "Full day",
          },
        ],
        jeu: [
          {
            id: "4",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Morning shift",
          },
        ],
        ven: [
          {
            id: "5",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Morning shift",
          },
        ],
        dim: [
          {
            id: "6",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Sunday shift",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Thomas Dubois",
      slots: {
        lun: [
          {
            id: "7",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Morning shift",
          },
        ],
        mar: [
          {
            id: "8",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Full shift",
          },
        ],
        mer: [
          {
            id: "9",
            start: "00:00",
            end: "23:59",
            duration: "1 day",
            type: "rest",
            label: "Weekly rest",
          },
        ],
        ven: [
          {
            id: "10",
            start: "09:00",
            end: "13h00",
            duration: "4h",
            type: "work",
            label: "Morning",
          },
          {
            id: "11",
            start: "18h30",
            end: "22h00",
            duration: "3h30",
            type: "work",
            label: "Evening",
          },
        ],
        sam: [
          {
            id: "12",
            start: "09:00",
            end: "13h00",
            duration: "4h",
            type: "work",
            label: "Morning",
          },
          {
            id: "13",
            start: "18h30",
            end: "22h00",
            duration: "3h30",
            type: "work",
            label: "Evening",
          },
        ],
        dim: [
          {
            id: "14",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Sunday shift",
          },
        ],
      },
    },
    {
      id: 3,
      name: "Julie Bernard",
      slots: {
        mer: [
          {
            id: "15",
            start: "00:00",
            end: "23:59",
            duration: "2 days",
            type: "rest",
            label: "Weekly rest",
          },
        ],
        jeu: [
          {
            id: "16",
            start: "09:45",
            end: "16h43",
            duration: "6h58",
            type: "work",
            label: "Fish department",
          },
          {
            id: "17",
            start: "17h56",
            end: "23h00",
            duration: "5h04",
            type: "work",
            label: "Evening shift",
          },
        ],
        ven: [
          {
            id: "18",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Fish department",
          },
          {
            id: "19",
            start: "19h00",
            end: "23h00",
            duration: "4h",
            type: "work",
            label: "Evening shift",
          },
        ],
      },
    },
    {
      id: 4,
      name: "Lucas Petit",
      slots: {
        lun: [
          {
            id: "20",
            start: "09:25",
            end: "15h16",
            duration: "5h51",
            type: "work",
            label: "Fish department",
          },
        ],
        mar: [
          {
            id: "21",
            start: "09:10",
            end: "18h35",
            duration: "9h25",
            type: "work",
            label: "Full shift",
          },
        ],
        mer: [
          {
            id: "22",
            start: "00:00",
            end: "23:59",
            duration: "2 days",
            type: "rest",
            label: "Weekly rest",
          },
        ],
        jeu: [
          {
            id: "23",
            start: "17h00",
            end: "23h00",
            duration: "6h",
            type: "work",
            label: "Evening shift",
          },
        ],
        ven: [
          {
            id: "24",
            start: "09:30",
            end: "16h30",
            duration: "7h",
            type: "work",
            label: "Fish department",
          },
        ],
        sam: [
          {
            id: "25",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Saturday shift",
          },
        ],
        dim: [
          {
            id: "26",
            start: "09:00",
            end: "18h30",
            duration: "9h30",
            type: "work",
            label: "Sunday shift",
          },
        ],
      },
    },
    {
      id: 5,
      name: "Emma Laurent",
      slots: {
        dim: [
          {
            id: "27",
            start: "00:00",
            end: "23:59",
            duration: "2 days",
            type: "rest",
            label: "Weekly rest",
          },
        ],
      },
    },
  ];

  const getSlotStyle = (type: string) => {
    switch (type) {
      case "work":
        return {
          bg: "bg-gradient-to-br from-[#6750A4] to-[#7C66BC]",
          border: "border-[#6750A4]/30",
          text: "text-white",
          shadow:
            "shadow-lg shadow-[#6750A4]/20 hover:shadow-xl hover:shadow-[#6750A4]/30",
          badge: "bg-white/20 backdrop-blur-sm",
        };
      case "rest":
        return {
          bg: "bg-gradient-to-br from-muted to-muted/80",
          border: "border-border",
          text: "text-muted-foreground",
          shadow: "shadow-md hover:shadow-lg",
          badge: "bg-background/50 backdrop-blur-sm",
        };
      case "leave":
        return {
          bg: "bg-gradient-to-br from-orange-400 to-orange-500",
          border: "border-orange-300/30",
          text: "text-white",
          shadow:
            "shadow-lg shadow-orange-400/20 hover:shadow-xl hover:shadow-orange-400/30",
          badge: "bg-white/20 backdrop-blur-sm",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-primary to-primary/80",
          border: "border-primary/30",
          text: "text-primary-foreground",
          shadow:
            "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
          badge: "bg-white/20 backdrop-blur-sm",
        };
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((p) => p.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-400 to-blue-600",
      "bg-gradient-to-br from-green-400 to-green-600",
      "bg-gradient-to-br from-purple-400 to-purple-600",
      "bg-gradient-to-br from-pink-400 to-pink-600",
      "bg-gradient-to-br from-yellow-400 to-yellow-600",
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Team Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage your employees' schedules and shifts
          </p>
        </div>
        <Button className="h-12 px-6 bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" />
          New Slot
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="p-6 !border-0 rounded-3xl shadow-lg bg-card/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search employee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 border-2 rounded-2xl bg-background/50 backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-2 lg:col-span-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-2 rounded-2xl hover:scale-105 transition-transform"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl min-w-[220px] text-center border-2 border-primary/20">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{currentWeek}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-2 rounded-2xl hover:scale-105 transition-transform"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* View Mode & Filter */}
          <div className="flex gap-2">
            <Select
              value={viewMode}
              onValueChange={setViewMode}
            >
              <SelectTrigger className="flex-1 h-14 border-2 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <SelectValue placeholder="View by employees" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employees">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    View by employees
                  </div>
                </SelectItem>
                <SelectItem value="tasks">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    View by tasks
                  </div>
                </SelectItem>
                <SelectItem value="calendar">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Calendar view
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-2 rounded-2xl hover:scale-105 transition-transform"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Planning Grid */}
      <div className="rounded-3xl !border-0 shadow-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Header Row */}
            <div className="grid grid-cols-[250px_repeat(7,1fr)] bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm sticky top-0 z-20">
              <div className="p-6 !border-0 flex items-center bg-card/50">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Employés</span>
                </div>
              </div>
              {weekDays.map((day) => (
                <div
                  key={day.id}
                  className={`p-4 text-center !border-0 transition-all ${
                    day.isToday
                      ? "bg-gradient-to-b from-primary/20 to-primary/10 border-r-2 border-primary/30"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <div
                    className={`space-y-1 ${day.isToday ? "scale-105" : ""}`}
                  >
                    <div
                      className={`mx-auto inline-flex items-center justify-center px-4 py-2 rounded-2xl transition-all ${
                        day.isToday
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="text-sm">
                        {day.shortLabel}
                      </span>
                    </div>
                    <div
                      className={`text-2xl ${day.isToday ? "text-primary" : "text-foreground"}`}
                    >
                      {day.date}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.fullDate.split(" ")[1]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Employee Rows */}
            {employees.map((employee, index) => (
              <div
                key={employee.id}
                className={`grid grid-cols-[250px_repeat(7,1fr)] !border-0 transition-all hover:bg-accent/5 ${
                  index % 2 === 0 ? "bg-card" : "bg-muted/5"
                }`}
              >
                {/* Employee Info */}
                <div className="p-6 !border-0 flex items-center min-h-[140px] bg-card/50">
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="w-14 h-14 !border-0 shadow-lg">
                      <AvatarFallback
                        className={`${getAvatarColor(employee.id)} text-white shadow-inner`}
                      >
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">
                        {employee.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>35h / semaine</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day Slots */}
                {weekDays.map((day) => (
                  <div
                    key={day.id}
                    className={`p-3 !border-0 min-h-[140px] transition-all ${
                      day.isToday ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="space-y-2">
                      {employee.slots[day.id]?.map((slot) => {
                        const style = getSlotStyle(slot.type);
                        return (
                          <div
                            key={slot.id}
                            className={`group p-3 rounded-2xl border-2 ${style.bg} ${style.border} ${style.text} ${style.shadow} transition-all duration-200 hover:scale-105 cursor-pointer`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="text-xs truncate flex-1">
                                {slot.label}
                              </span>
                              {slot.duration && (
                                <Badge
                                  className={`text-[10px] px-2 py-0.5 h-5 ${style.badge} !border-0 shadow-sm`}
                                >
                                  {slot.duration}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs opacity-90">
                              <Clock className="w-3.5 h-3.5" />
                              <span>
                                {slot.start} - {slot.end}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <Card className="p-6 !border-0 rounded-3xl shadow-lg bg-card/50 backdrop-blur-sm">
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6750A4] to-[#7C66BC] border-2 border-[#6750A4]/30 shadow-lg"></div>
            <span className="text-sm">Travail planifié</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-muted to-muted/80 border-2 border-border shadow-md"></div>
            <span className="text-sm">Repos hebdomadaire</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-orange-300/30 shadow-lg"></div>
            <span className="text-sm">Leave & absences</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30"></div>
            <span className="text-sm">Today</span>
          </div>
        </div>
      </Card>
    </div>
  );
}