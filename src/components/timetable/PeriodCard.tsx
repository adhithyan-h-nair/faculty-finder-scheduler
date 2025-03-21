
import { Period } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { getFacultyById } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Clock, BookOpen, User, Pencil, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PeriodCardProps {
  period: Period;
  className?: string;
  onEdit?: () => void;
}

const PeriodCard = ({ period, className, onEdit }: PeriodCardProps) => {
  const faculty = getFacultyById(period.facultyId);
  const originalFaculty = period.originalFacultyId 
    ? getFacultyById(period.originalFacultyId) 
    : null;
  
  const isSubstituted = !!originalFaculty;
  
  return (
    <Card 
      className={cn(
        "border transition-all duration-300 hover:shadow-md bg-white",
        isSubstituted ? "border-orange-400" : "border-gray-200",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={16} className="text-primary shrink-0" />
              <div className="font-medium">{period.courseCode} - {period.courseTitle}</div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock size={14} className="shrink-0" />
              <div>{period.startTime} - {period.endTime}</div>
              <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Period {period.periodNumber}</div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={14} className="shrink-0" />
              {isSubstituted ? (
                <div className="flex flex-col">
                  <div className="line-through text-xs">{originalFaculty?.name}</div>
                  <div className="text-orange-600 font-medium">
                    {faculty?.name} (Substitute)
                  </div>
                </div>
              ) : (
                <div>{faculty?.name}</div>
              )}
            </div>

            {period.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <MapPin size={14} className="shrink-0" />
                <div>{period.location}</div>
              </div>
            )}
          </div>
          
          {onEdit && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onEdit}
              className="h-8 w-8 p-0 hover:bg-blue-50"
            >
              <Pencil size={14} className="text-blue-600" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodCard;
