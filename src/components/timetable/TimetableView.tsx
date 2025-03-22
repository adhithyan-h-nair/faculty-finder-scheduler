
import { useState, useEffect } from 'react';
import { Period, Day } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PeriodCard from './PeriodCard';
import { cn } from '@/lib/utils';
import TimetableEditDialog from './TimetableEditDialog';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    }
  };
  
  return (
    <div className={cn("w-full bg-white p-4 rounded-lg shadow-sm", className)}>
      <Tabs value={selectedDay} onValueChange={(value) => setSelectedDay(value as Day)}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <TabsList className="w-full sm:w-auto bg-slate-100">
            {days.map(day => (
              <TabsTrigger
                key={day}
                value={day}
                disabled={periodsByDay[day].length === 0}
                className={cn(
                  "relative transition-all duration-300",
                  periodsByDay[day].length === 0 ? "opacity-40" : "",
                  "data-[state=active]:bg-primary data-[state=active]:text-white"
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

          <Button 
            size="sm" 
            onClick={handleAddPeriod}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Period
          </Button>
        </div>
        
        {days.map(day => (
          <TabsContent 
            key={day} 
            value={day}
            className="animate-fade-in"
          >
            <div className="space-y-3">
              {periodsByDay[day].length === 0 ? (
                <div className="py-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-slate-200">
                  <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                  <div className="font-medium">No periods scheduled for {day}</div>
                  <div className="text-sm mt-1">Click "Add Period" to schedule a class</div>
                </div>
              ) : (
                <div className="staggered-animation">
                  {periodsByDay[day].map((period, index) => (
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
                        className="flex-shrink-0 bg-white text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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
