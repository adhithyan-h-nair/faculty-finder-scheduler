
import { useState, useEffect } from 'react';
import { Period, Day, Semester, Faculty } from '@/lib/types';
import PeriodCard from './PeriodCard';
import { cn } from '@/lib/utils';
import TimetableEditDialog from './TimetableEditDialog';
import { Plus, Calendar, Trash2, Clock, Filter, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTodayDay, findPotentialSubstitutes, assignSubstitute, logSubstitutionFailure } from '@/lib/data';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TimetableViewProps {
  periods: Period[];
  className?: string;
  facultyId: string;
  onUpdateTimetable: () => void;
  onDeletePeriod?: (periodId: string) => void;
  showSubstituteControls?: boolean;
}

const TimetableView = ({ 
  periods, 
  className, 
  facultyId, 
  onUpdateTimetable,
  onDeletePeriod,
  showSubstituteControls = true
}: TimetableViewProps) => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<Day>(getTodayDay());
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [editPeriod, setEditPeriod] = useState<Period | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [showTodayOnly, setShowTodayOnly] = useState(true);
  const [isSubstituteDialogOpen, setIsSubstituteDialogOpen] = useState(false);
  const [periodToSubstitute, setPeriodToSubstitute] = useState<Period | null>(null);
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [potentialSubstitutes, setPotentialSubstitutes] = useState<Faculty[]>([]);
  const [selectedSubstitute, setSelectedSubstitute] = useState<string>('');
  const [substitutionError, setSubstitutionError] = useState<string | null>(null);
  const [substitutionReason, setSubstitutionReason] = useState<string | null>(null);
  
  const semesters: Semester[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  const todayDay = getTodayDay();
  
  const filteredPeriods = semesterFilter === 'all' 
    ? periods 
    : periods.filter(period => period.semester === semesterFilter);
  
  const periodsByDay = days.reduce<Record<Day, Period[]>>((acc, day) => {
    acc[day] = filteredPeriods.filter(period => period.day === day)
      .sort((a, b) => a.periodNumber - b.periodNumber);
    return acc;
  }, {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });
  
  const visiblePeriods = showTodayOnly 
    ? periodsByDay[todayDay] 
    : periodsByDay[selectedDay];
  
  useEffect(() => {
    if (periodsByDay[selectedDay].length === 0) {
      const dayWithPeriods = days.find(day => periodsByDay[day].length > 0);
      if (dayWithPeriods) {
        setSelectedDay(dayWithPeriods);
      }
    }
  }, [filteredPeriods, selectedDay, periodsByDay]);

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
      toast({
        title: "Period Deleted",
        description: "The class period has been deleted successfully.",
      });
      
      setTimeout(() => {
        onUpdateTimetable();
      }, 300);
    }
  };
  
  const handleRequestSubstitute = (period: Period) => {
    setPeriodToSubstitute(period);
    setSubstitutionError(null);
    setSubstitutionReason(null);
    
    // Get potential substitutes using our enhanced algorithm
    const result = assignSubstitute(period.id, facultyId);
    
    if (result.success && result.substitutes && result.substitutes.length > 0) {
      setPotentialSubstitutes(result.substitutes);
      setSelectedSubstitute(result.substitutes[0].id);
      setSubstitutionReason(result.reason || null);
    } else {
      setPotentialSubstitutes([]);
      setSubstitutionError(result.message || "No suitable substitutes found");
      
      // Log the failed substitution attempt
      if (!result.success) {
        logSubstitutionFailure(facultyId, period.id, result.message);
      }
      
      // Show a toast for immediate feedback
      toast({
        title: "Substitution Not Available",
        description: result.message || "No suitable substitutes found",
        variant: "destructive",
      });
    }
    
    setIsSubstituteDialogOpen(true);
  };
  
  const handleAssignSubstitute = () => {
    if (!periodToSubstitute || !selectedSubstitute) {
      toast({
        title: "Selection Required",
        description: "Please select a substitute faculty.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to assign the selected substitute
    toast({
      title: "Substitution Assigned",
      description: `The selected substitute has been assigned to this class based on department, semester teaching experience, and time availability.`,
      className: "bg-green-50 border-green-200",
    });
    
    onUpdateTimetable();
    setIsSubstituteDialogOpen(false);
    setPeriodToSubstitute(null);
    setPotentialSubstitutes([]);
  };

  const getDayLabel = (day: Day) => {
    switch(day) {
      case 'Monday': return { short: 'Mon', full: 'Monday' };
      case 'Tuesday': return { short: 'Tue', full: 'Tuesday' };
      case 'Wednesday': return { short: 'Wed', full: 'Wednesday' };
      case 'Thursday': return { short: 'Thu', full: 'Thursday' };
      case 'Friday': return { short: 'Fri', full: 'Friday' };
      default: 
        const dayAsString = day as string;
        return { short: dayAsString.substring(0, 3), full: dayAsString };
    }
  };
  
  return (
    <div className={cn("w-full bg-white p-4 rounded-lg shadow-sm", className)}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Today is</div>
              <div className="font-medium">{todayDay}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={showTodayOnly ? "default" : "outline"}
              onClick={() => setShowTodayOnly(true)}
              className={showTodayOnly ? "bg-blue-600 text-white" : ""}
            >
              Today's Classes
            </Button>
            <Button 
              size="sm" 
              variant={!showTodayOnly ? "default" : "outline"}
              onClick={() => setShowTodayOnly(false)}
              className={!showTodayOnly ? "bg-blue-600 text-white" : ""}
            >
              Full Schedule
            </Button>
            <Button 
              size="sm" 
              onClick={handleAddPeriod}
              className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm"
            >
              <Plus size={16} className="mr-1" />
              Add Period
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-600" />
            <div className="text-sm font-medium">Filter by semester:</div>
            <Select 
              value={semesterFilter} 
              onValueChange={setSemesterFilter}
            >
              <SelectTrigger className="w-[180px] h-8 text-sm">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem}>{sem} Semester</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {!showTodayOnly && (
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
          )}
        </div>
        
        <div className="mt-2">
          {visiblePeriods.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-slate-200">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <div className="font-medium">
                {showTodayOnly ? 'No periods scheduled for today' : `No periods scheduled for ${selectedDay}`}
              </div>
              <div className="text-sm mt-1">Click "Add Period" to schedule a class</div>
            </div>
          ) : (
            <div className="staggered-animation space-y-3">
              {visiblePeriods.map((period) => (
                <div key={period.id} className="flex items-start gap-2 mb-3">
                  <PeriodCard 
                    period={period} 
                    className="flex-1"
                    onEdit={() => handleEditPeriod(period)}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeletePeriod(period.id)}
                      className="flex-shrink-0 bg-white text-red-500 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                    
                    {showSubstituteControls && !period.originalFacultyId && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRequestSubstitute(period)}
                        className="flex-shrink-0 bg-white text-orange-500 border-orange-300 hover:bg-orange-50"
                      >
                        <UserCheck size={18} />
                      </Button>
                    )}
                  </div>
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
      
      <AlertDialog open={isSubstituteDialogOpen} onOpenChange={setIsSubstituteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Request Substitute Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              {periodToSubstitute && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md text-sm">
                  <div><strong>Course:</strong> {periodToSubstitute.courseCode} - {periodToSubstitute.courseTitle}</div>
                  <div><strong>Day:</strong> {periodToSubstitute.day}</div>
                  <div><strong>Time:</strong> {periodToSubstitute.startTime} - {periodToSubstitute.endTime}</div>
                  <div><strong>Semester:</strong> {periodToSubstitute.semester}</div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {substitutionError ? (
            <Alert variant="destructive" className="my-4 bg-red-50 border-red-200 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Substitution Not Available</AlertTitle>
              <AlertDescription>
                {substitutionError}
              </AlertDescription>
            </Alert>
          ) : potentialSubstitutes.length > 0 ? (
            <>
              {substitutionReason && (
                <Alert className="my-4 bg-green-50 border-green-200 text-green-800">
                  <AlertTitle>Substitution Criteria</AlertTitle>
                  <AlertDescription>
                    {substitutionReason}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="py-4">
                <RadioGroup value={selectedSubstitute} onValueChange={setSelectedSubstitute} className="space-y-2">
                  {potentialSubstitutes.map(faculty => (
                    <div key={faculty.id} className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-slate-50">
                      <RadioGroupItem value={faculty.id} id={faculty.id} />
                      <Label htmlFor={faculty.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{faculty.name}</div>
                        <div className="text-sm text-muted-foreground">{faculty.department}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          ) : (
            <Alert variant="destructive" className="my-4 bg-red-50 border-red-200 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>No Eligible Substitutes</AlertTitle>
              <AlertDescription>
                No eligible substitutes found. Need faculty from the same department who are available during this time slot and teach similar subjects.
              </AlertDescription>
            </Alert>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {potentialSubstitutes.length > 0 && (
              <AlertDialogAction 
                onClick={handleAssignSubstitute}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Assign Substitute
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TimetableView;
