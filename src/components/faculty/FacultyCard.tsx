
import { useState } from 'react';
import { Faculty } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/ui/status-badge';
import { getFacultyById, updateFacultyStatus } from '@/lib/data';
import { Mail, Phone, UserCheck, UserX, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FacultyCardProps {
  faculty: Faculty;
  onUpdate: () => void;
  onEdit: (faculty: Faculty) => void;
  showControls?: boolean;
  className?: string;
}

const FacultyCard = ({ 
  faculty, 
  onUpdate, 
  onEdit, 
  showControls = true,
  className 
}: FacultyCardProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: 'available' | 'absent') => {
    setIsLoading(true);
    try {
      // If setting to absent, we need to find an available substitute
      if (newStatus === 'absent') {
        // In a real app, this would be an API call
        setTimeout(() => {
          const result = updateFacultyStatus(faculty.id, newStatus);
          if (result) {
            toast({
              title: "Status Updated",
              description: `${faculty.name} is now marked as ${newStatus}.`,
            });
            onUpdate();
          }
          setIsLoading(false);
        }, 800);
      } else {
        // Setting to available is simpler
        const result = updateFacultyStatus(faculty.id, newStatus);
        if (result) {
          toast({
            title: "Status Updated",
            description: `${faculty.name} is now marked as ${newStatus}.`,
          });
          onUpdate();
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update faculty status.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleAssignSubstitute = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to find an available substitute
      setTimeout(() => {
        // Find first available faculty
        const availableFaculty = getFacultyById("fac-004");
        
        if (availableFaculty) {
          // Update both faculties
          updateFacultyStatus(faculty.id, "substituted", availableFaculty.id);
          updateFacultyStatus(availableFaculty.id, "substituting", faculty.id);
          
          toast({
            title: "Substitute Assigned",
            description: `${availableFaculty.name} has been assigned to substitute for ${faculty.name}.`,
          });
          onUpdate();
        } else {
          toast({
            title: "No Substitutes Available",
            description: "Could not find an available faculty member to substitute.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      }, 800);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign substitute.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getSubstitutionInfo = () => {
    if (faculty.status === 'substituted' && faculty.substitutedBy) {
      const substitute = getFacultyById(faculty.substitutedBy);
      return substitute 
        ? `Substituted by ${substitute.name}` 
        : "Substituted";
    }
    
    if (faculty.status === 'substituting' && faculty.substituting) {
      const original = getFacultyById(faculty.substituting);
      return original 
        ? `Substituting for ${original.name}` 
        : "Substituting";
    }
    
    return null;
  };

  const substitutionInfo = getSubstitutionInfo();

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border-gray-200/70 hover:shadow-md", 
        className
      )}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base sm:text-lg">{faculty.name}</CardTitle>
          <StatusBadge status={faculty.status} />
        </div>
        <CardDescription>{faculty.department}</CardDescription>
        {substitutionInfo && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 italic">
            {substitutionInfo}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pb-2 sm:pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Mail size={14} className="mr-2 shrink-0" />
            <span className="truncate">{faculty.email}</span>
          </div>
          
          {faculty.phone && (
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Phone size={14} className="mr-2 shrink-0" />
              <span>{faculty.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      {showControls && (
        <CardFooter className="pt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary/30 hover:bg-primary/5"
            onClick={() => onEdit(faculty)}
          >
            <Pencil size={14} className="mr-1" />
            <span className="text-xs sm:text-sm">Edit</span>
          </Button>
          
          {faculty.status === 'available' && (
            <Button
              variant="outline"
              size="sm"
              className="text-faculty-absent border-faculty-absent/30 hover:bg-faculty-absent/5"
              onClick={() => handleStatusChange('absent')}
              disabled={isLoading}
            >
              <UserX size={14} className="mr-1" />
              <span className="text-xs sm:text-sm">Mark Absent</span>
            </Button>
          )}
          
          {faculty.status === 'absent' && (
            <Button
              variant="outline"
              size="sm"
              className="text-faculty-substituting border-faculty-substituting/30 hover:bg-faculty-substituting/5"
              onClick={handleAssignSubstitute}
              disabled={isLoading}
            >
              <UserCheck size={14} className="mr-1" />
              <span className="text-xs sm:text-sm">Assign Substitute</span>
            </Button>
          )}
          
          {faculty.status !== 'available' && (
            <Button
              variant="outline"
              size="sm"
              className="text-faculty-available border-faculty-available/30 hover:bg-faculty-available/5"
              onClick={() => handleStatusChange('available')}
              disabled={isLoading}
            >
              <UserCheck size={14} className="mr-1" />
              <span className="text-xs sm:text-sm">Mark Available</span>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default FacultyCard;
