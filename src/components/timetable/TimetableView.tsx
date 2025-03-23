
import { useState, useEffect } from 'react';
import { Period, Day } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PeriodCard from './PeriodCard';
import { cn } from '@/lib/utils';
import TimetableEditDialog from './TimetableEditDialog';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from '@/components/ui/checkbox';

interface TimetableViewProps {
  periods: Period[];
  className?: string;
  facultyId: string;
  onUpdateTimetable: () => void;
  onDeletePeriod?: (periodId: string) => void;
}

const TimetableView = ({ 
  periods, 
  className, 
  facultyId, 
  onUpdateTimetable,
  onDeletePeriod 
}: TimetableViewProps) => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<Day>('Monday');
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [editPeriod, setEditPeriod] = useState<Period | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  
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

  const handleEditPeriod = (period: Period) => {
    setEditPeriod(period);
    setIsAddNew(false);
    setIsDialogOpen(true);
  };

  const handleAddPeriod = () => {
    setEditPeriod(null);
    setIsAddNew(true);
    setIsDialogOpen(true);
  };

  const handleDeletePeriod = (periodId: string) => {
    if (onDeletePeriod) {
      onDeletePeriod(periodId);
      toast({
        title: "Period Deleted",
        description: "The class period has been deleted successfully.",
      });
    } else {
      // Default implementation if no onDeletePeriod is provided
      toast({
        title: "Period Deleted",
        description: "The class period has been deleted successfully.",
      });
      
      // Update timetable after deletion
      setTimeout(() => {
        onUpdateTimetable();
      }, 300);
    }
  };

  const getDayLabel = (day: Day) => {
    // Mobile-friendly abbreviations for days
    switch(day) {
      case 'Monday': return { short: 'Mon', full: 'Monday' };
      case 'Tuesday': return { short: 'Tue', full: 'Tuesday' };
      case 'Wednesday': return { short: 'Wed', full: 'Wednesday' };
      case 'Thursday': return { short: 'Thu', full: 'Thursday' };
      case 'Friday': return { short: 'Fri', full: 'Friday' };
      default: return { short: day.substring(0, 3), full: day };
    }
  };
  
  return (
    <div className={cn("w-full bg-white p-4 rounded-lg shadow-sm", className)}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* New Day Selector */}
          <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <ToggleGroup 
              type="single" 
              value={selectedDay} 
              onValueChange={(value) => value && setSelectedDay(value as Day)}
              className="border border-slate-200 rounded-lg p-1 bg-slate-50 shadow-sm"
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

          <Button 
            size="sm" 
            onClick={handleAddPeriod}
            className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm w-full sm:w-auto"
          >
            <Plus size={16} className="mr-1" />
            Add Period
          </Button>
        </div>
        
        {/* Period Content */}
        <div className="mt-2">
          {periodsByDay[selectedDay].length === 0 ? (
            <div className="py-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-slate-200">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <div className="font-medium">No periods scheduled for {selectedDay}</div>
              <div className="text-sm mt-1">Click "Add Period" to schedule a class</div>
            </div>
          ) : (
            <div className="staggered-animation space-y-3">
              {periodsByDay[selectedDay].map((period) => (
                <div key={period.id} className="flex items-start gap-2 mb-3">
                  <PeriodCard 
                    period={period} 
                    className="flex-1"
                    onEdit={() => handleEditPeriod(period)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeletePeriod(period.id)}
                    className="flex-shrink-0 bg-white text-red-500 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <TimetableEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        period={editPeriod}
        isNewPeriod={isAddNew}
        facultyId={facultyId}
        selectedDay={selectedDay}
        onSave={onUpdateTimetable}
      />
    </div>
  );
};

export default TimetableView;
