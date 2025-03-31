
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import PeriodCard from '@/components/timetable/PeriodCard';
import { Card, CardContent } from '@/components/ui/card';
import { getTimetableBySemesterAndDepartment, getStudentById, getTodayDay } from '@/lib/data';
import { Period, Student } from '@/lib/types';
import { Calendar, Clock, BookOpen, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from '@/lib/utils';

const StudentTimetable = () => {
  const { studentId } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>(getTodayDay());
  const [showOnlyToday, setShowOnlyToday] = useState(true);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const todayDay = getTodayDay();
  
  useEffect(() => {
    if (studentId) {
      const studentData = getStudentById(studentId);
      setStudent(studentData || null);
      
      if (studentData) {
        // Get timetable for student's semester and department
        const timetableData = getTimetableBySemesterAndDepartment(
          studentData.semester,
          studentData.department
        );
        setPeriods(timetableData);
      }
      
      setLoading(false);
    }
  }, [studentId]);
  
  // Group periods by day
  const periodsByDay = days.reduce<Record<string, Period[]>>((acc, day) => {
    acc[day] = periods.filter(period => period.day === day)
      .sort((a, b) => a.periodNumber - b.periodNumber);
    return acc;
  }, {
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': []
  });
  
  // Only show periods for today or all days based on filter
  const visiblePeriods = showOnlyToday 
    ? periods.filter(period => period.day === todayDay)
    : periods.filter(period => period.day === selectedDay);
  
  const getDayLabel = (day: string) => {
    switch(day) {
      case 'Monday': return { short: 'Mon', full: 'Monday' };
      case 'Tuesday': return { short: 'Tue', full: 'Tuesday' };
      case 'Wednesday': return { short: 'Wed', full: 'Wednesday' };
      case 'Thursday': return { short: 'Thu', full: 'Thursday' };
      case 'Friday': return { short: 'Fri', full: 'Friday' };
      default: return { short: day.substring(0, 3), full: day };
    }
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-12">Loading timetable...</div>
      </PageContainer>
    );
  }
  
  if (!student) {
    return (
      <PageContainer>
        <div className="text-center py-12">Student data not found. Please log in again.</div>
      </PageContainer>
    );
  }
  
  const todayPeriods = periodsByDay[todayDay] || [];
  
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Student Timetable</h1>
        <p className="text-muted-foreground">
          View your class schedule
        </p>
      </div>
      
      <Card className="mb-6 shadow-sm border-slate-200">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <School size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-lg">{student.name}</div>
                <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="font-medium">{student.department}</div>
            </div>
            
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground">Semester</div>
              <div className="font-medium">{student.semester} Semester</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Clock size={20} className="text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Today is</div>
            <div className="font-semibold">{todayDay}, {new Date().toLocaleDateString()}</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={showOnlyToday ? "default" : "outline"}
            size="sm"
            onClick={() => setShowOnlyToday(true)}
          >
            Today's Classes
          </Button>
          <Button
            variant={!showOnlyToday ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowOnlyToday(false);
              setSelectedDay(todayDay);
            }}
          >
            Full Schedule
          </Button>
        </div>
      </div>
      
      {!showOnlyToday && (
        <div className="mb-6 overflow-x-auto pb-2">
          <ToggleGroup 
            type="single" 
            value={selectedDay} 
            onValueChange={(value) => value && setSelectedDay(value)}
            className="inline-flex border border-slate-200 rounded-lg p-1 bg-slate-50 shadow-sm"
          >
            {days.map(day => {
              const dayLabel = getDayLabel(day);
              const hasPeriods = periodsByDay[day].length > 0;
              return (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  disabled={!hasPeriods}
                  className={cn(
                    "px-3 py-2 rounded-md font-medium text-sm transition-all relative",
                    "data-[state=on]:bg-blue-600 data-[state=on]:text-white",
                    "data-[state=on]:shadow-sm data-[state=on]:font-medium",
                    !hasPeriods ? "opacity-40" : 
                    "hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                  )}
                >
                  <span className="hidden sm:inline">{dayLabel.full}</span>
                  <span className="sm:hidden">{dayLabel.short}</span>
                  {hasPeriods && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {periodsByDay[day].length}
                    </span>
                  )}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">
          {showOnlyToday ? 'Today\'s Classes' : `Classes on ${selectedDay}`}
        </h2>
        
        {visiblePeriods.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-slate-200">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-400" />
            <div className="font-medium">No classes scheduled</div>
            <div className="text-sm mt-1">
              {showOnlyToday ? 'You have no classes today' : `No classes scheduled for ${selectedDay}`}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {visiblePeriods
              .sort((a, b) => a.periodNumber - b.periodNumber)
              .map(period => (
                <PeriodCard 
                  key={period.id} 
                  period={period} 
                  className="w-full"
                />
              ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default StudentTimetable;
