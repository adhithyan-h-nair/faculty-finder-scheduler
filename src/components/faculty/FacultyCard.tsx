
import { useState } from 'react';
import { Faculty } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/ui/status-badge';
import { getFacultyById, updateFacultyStatus } from '@/lib/data';
import { Mail, Phone, UserCheck, UserX, Pencil, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface FacultyCardProps {
  faculty: Faculty;
  onUpdate: () => void;
  onEdit: (faculty: Faculty) => void;
  onDelete: (faculty: Faculty) => void;
  showControls?: boolean;
  className?: string;
}

const FacultyCard = ({ 
  faculty, 
  onUpdate, 
  onEdit, 
  onDelete,
  showControls = true,
  className 
}: FacultyCardProps) => {
  const { toast } = useToast();
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = role === 'admin';

  const handleStatusChange = async (newStatus: 'available' | 'absent') => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can change faculty status.",
        variant: "destructive",
      });
      return;
    }

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
              className: "bg-blue-50 border-blue-200",
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
            className: "bg-green-50 border-green-200",
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
        className: "bg-red-50 border-red-200",
      });
      setIsLoading(false);
    }
  };

  const handleAssignSubstitute = async () => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can assign substitutes.",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
      });
      return;
    }

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
            className: "bg-purple-50 border-purple-200",
          });
          onUpdate();
        } else {
          toast({
            title: "No Substitutes Available",
            description: "Could not find an available faculty member to substitute.",
            variant: "destructive",
            className: "bg-yellow-50 border-yellow-200 text-yellow-800",
          });
        }
        setIsLoading(false);
      }, 800);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign substitute.",
        variant: "destructive",
        className: "bg-red-50 border-red-200",
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
        "overflow-hidden transition-all duration-300 border-gray-200 hover:shadow-md", 
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
          
          {isAdmin && (
            <div className="mt-1 p-2 bg-blue-50 rounded-md">
              <div className="text-xs text-blue-800 font-medium">Login Details:</div>
              <div className="text-xs text-blue-600">Username: {faculty.username}</div>
              <div className="text-xs text-blue-600">Password: {faculty.password}</div>
            </div>
          )}
        </div>
      </CardContent>
      
      {showControls && (
        <CardFooter className="pt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100"
            onClick={() => onEdit(faculty)}
          >
            <Pencil size={14} className="mr-1" />
            <span className="text-xs sm:text-sm">Edit</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-red-50 text-red-600 border-red-300 hover:bg-red-100"
            onClick={() => onDelete(faculty)}
          >
            <Trash2 size={14} className="mr-1" />
            <span className="text-xs sm:text-sm">Delete</span>
          </Button>
          
          {faculty.status === 'available' && (
            <Button
              variant="outline"
              size="sm"
              className="bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100"
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
              className="bg-purple-50 text-purple-600 border-purple-300 hover:bg-purple-100"
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
              className="bg-green-50 text-green-600 border-green-300 hover:bg-green-100"
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
