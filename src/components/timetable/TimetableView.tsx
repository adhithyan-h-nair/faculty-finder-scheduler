
import { useState, useEffect } from 'react';
import { Period, Day } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PeriodCard from './PeriodCard';
import { cn } from '@/lib/utils';

interface TimetableViewProps {
  periods: Period[];
  className?: string;
}

const TimetableView = ({ periods, className }: TimetableViewProps) => {
  const [selectedDay, setSelectedDay] = useState<Day>('Monday');
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Group periods by day
  const periodsByDay = days.reduce<Record<Day, Period[]>>((acc, day) => {
    acc[day] = periods.filter(period => period.day === day)
      .sort((a, b) => a.periodNumber - b.periodNumber);
    return acc;
  }, {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });
  
  // Effect to select first day with periods if current selection is empty
  useEffect(() => {
    if (periodsByDay[selectedDay].length === 0) {
      // Find first day with periods
      const dayWithPeriods = days.find(day => periodsByDay[day].length > 0);
      if (dayWithPeriods) {
        setSelectedDay(dayWithPeriods);
      }
    }
  }, [periods, selectedDay, periodsByDay]);
  
  return (
    <div className={cn("w-full", className)}>
      <Tabs value={selectedDay} onValueChange={(value) => setSelectedDay(value as Day)}>
        <TabsList className="mb-4 w-full">
          {days.map(day => (
            <TabsTrigger
              key={day}
              value={day}
              disabled={periodsByDay[day].length === 0}
              className={cn(
                "relative transition-all duration-300",
                periodsByDay[day].length === 0 ? "opacity-40" : ""
              )}
            >
              {day}
              {periodsByDay[day].length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {periodsByDay[day].length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {days.map(day => (
          <TabsContent 
            key={day} 
            value={day}
            className="animate-fade-in"
          >
            <div className="space-y-3">
              {periodsByDay[day].length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No periods scheduled for {day}
                </div>
              ) : (
                <div className="staggered-animation">
                  {periodsByDay[day].map((period, index) => (
                    <PeriodCard 
                      key={period.id} 
                      period={period} 
                      className="mb-3"
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TimetableView;
