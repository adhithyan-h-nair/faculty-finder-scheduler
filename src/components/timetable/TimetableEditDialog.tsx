
import { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from '@/components/ui/dialog';
import { Period, Day } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { facultyData, getFacultyById } from '@/lib/data';

interface TimetableEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  period: Period | null;
  isNewPeriod: boolean;
  facultyId: string;
  selectedDay: Day;
  onSave: () => void;
}

const TimetableEditDialog = ({
  open,
  onOpenChange,
  period,
  isNewPeriod,
  facultyId,
  selectedDay,
  onSave
}: TimetableEditDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    day: selectedDay,
    periodNumber: 1,
    startTime: '08:00',
    endTime: '08:50',
    location: '',
    facultyId: facultyId,
    substituteFacultyId: ''
  });

  const [isSubstitute, setIsSubstitute] = useState(false);

  useEffect(() => {
    if (period) {
      setFormData({
        courseCode: period.courseCode,
        courseTitle: period.courseTitle,
        day: period.day,
        periodNumber: period.periodNumber,
        startTime: period.startTime,
        endTime: period.endTime,
        location: period.location || '',
        facultyId: period.facultyId,
        substituteFacultyId: period.originalFacultyId || ''
      });
      setIsSubstitute(!!period.originalFacultyId);
    } else {
      // Default for new period
      setFormData({
        courseCode: '',
        courseTitle: '',
        day: selectedDay,
        periodNumber: 1,
        startTime: '08:00',
        endTime: '08:50',
        location: '',
        facultyId: facultyId,
        substituteFacultyId: ''
      });
      setIsSubstitute(false);
    }
  }, [period, selectedDay, facultyId]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    try {
      const faculty = getFacultyById(facultyId);
      
      // In a real app, this would be an API call to update or create a period
      toast({
        title: isNewPeriod ? "Period Added" : "Period Updated",
        description: `${faculty?.name}'s timetable has been updated successfully.`,
      });
      
      onSave();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save period information.",
        variant: "destructive",
      });
    }
  };

  const periodOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{isNewPeriod ? 'Add New Period' : 'Edit Period'}</DialogTitle>
          <DialogDescription>
            {isNewPeriod 
              ? 'Add a new period to the faculty timetable' 
              : 'Make changes to the existing period'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                value={formData.courseCode}
                onChange={(e) => handleChange('courseCode', e.target.value)}
                placeholder="e.g. CS101"
                className="bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={formData.courseTitle}
                onChange={(e) => handleChange('courseTitle', e.target.value)}
                placeholder="e.g. Introduction to Programming"
                className="bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select 
                value={formData.day} 
                onValueChange={(value) => handleChange('day', value)}
              >
                <SelectTrigger id="day" className="bg-white">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {days.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="periodNumber">Period Number</Label>
              <Select 
                value={formData.periodNumber.toString()} 
                onValueChange={(value) => handleChange('periodNumber', parseInt(value))}
              >
                <SelectTrigger id="periodNumber" className="bg-white">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {periodOptions.map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      Period {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Room 101, Building A"
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="substitute"
                checked={isSubstitute}
                onChange={(e) => setIsSubstitute(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="substitute">This is a substitute period</Label>
            </div>
            
            {isSubstitute && (
              <div className="mt-2">
                <Label htmlFor="substituteFaculty">Original Faculty</Label>
                <Select 
                  value={formData.substituteFacultyId} 
                  onValueChange={(value) => handleChange('substituteFacultyId', value)}
                >
                  <SelectTrigger id="substituteFaculty" className="bg-white">
                    <SelectValue placeholder="Select original faculty" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {facultyData
                      .filter(f => f.id !== facultyId)
                      .map(faculty => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-white">
            {isNewPeriod ? 'Add Period' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimetableEditDialog;
