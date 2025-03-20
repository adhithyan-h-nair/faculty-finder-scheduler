
import { Period } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { getFacultyById } from '@/lib/data';
import { cn } from '@/lib/utils';

interface PeriodCardProps {
  period: Period;
  className?: string;
}

const PeriodCard = ({ period, className }: PeriodCardProps) => {
  const faculty = getFacultyById(period.facultyId);
  const originalFaculty = period.originalFacultyId 
    ? getFacultyById(period.originalFacultyId) 
    : null;
  
  const isSubstituted = !!originalFaculty;
  
  return (
    <Card 
      className={cn(
        "border transition-all duration-300 hover:shadow-sm",
        isSubstituted ? "border-faculty-substituted/30" : "border-gray-200",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium text-sm">{period.courseCode}</div>
          <div className="text-xs text-muted-foreground">
            {period.startTime} - {period.endTime}
          </div>
        </div>
        
        <div className="text-sm mb-1">{period.courseTitle}</div>
        
        <div className="text-xs text-muted-foreground mt-2">
          {isSubstituted ? (
            <div className="flex flex-col">
              <div className="line-through">{originalFaculty?.name}</div>
              <div className="text-faculty-substituted font-medium">
                {faculty?.name} (Substitute)
              </div>
            </div>
          ) : (
            <div>{faculty?.name}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodCard;
