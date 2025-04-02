
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Faculty, FacultyStatus } from '@/lib/types';
import { facultyData, getFacultyById } from '@/lib/data';
import { format } from 'date-fns';
import { Clock, Calendar, UserCheck, UserX } from 'lucide-react';

type SubstitutionEvent = {
  id: string;
  date: Date;
  absentFacultyId: string;
  substituteFacultyId: string;
  status: 'active' | 'completed';
};

// Mock data for substitution log
// In a real app, this would come from a database
const mockSubstitutionEvents: SubstitutionEvent[] = [
  {
    id: 'sub-001',
    date: new Date(2023, 5, 15, 9, 0),
    absentFacultyId: 'fac-001',
    substituteFacultyId: 'fac-004',
    status: 'completed',
  },
  {
    id: 'sub-002',
    date: new Date(2023, 6, 20, 14, 30),
    absentFacultyId: 'fac-002',
    substituteFacultyId: 'fac-003',
    status: 'completed',
  },
  {
    id: 'sub-003',
    date: new Date(),
    absentFacultyId: 'fac-005',
    substituteFacultyId: 'fac-004',
    status: 'active',
  },
];

const SubstitutionLog = () => {
  const [substitutions, setSubstitutions] = useState<SubstitutionEvent[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setSubstitutions(mockSubstitutionEvents);
  }, []);

  const getSubstitutionDetails = (event: SubstitutionEvent) => {
    const absentFaculty = getFacultyById(event.absentFacultyId);
    const substituteFaculty = getFacultyById(event.substituteFacultyId);
    
    return {
      absentName: absentFaculty?.name || 'Unknown Faculty',
      substituteName: substituteFaculty?.name || 'Unknown Faculty',
      absentDepartment: absentFaculty?.department || 'Unknown Department',
      date: format(event.date, 'PPP'),
      time: format(event.date, 'p'),
    };
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-purple-500" />
          Substitution Log
        </CardTitle>
        <CardDescription>
          History of faculty substitutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {substitutions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No substitution records found.
            </div>
          ) : (
            substitutions.map((event) => {
              const details = getSubstitutionDetails(event);
              return (
                <div 
                  key={event.id} 
                  className={`p-3 rounded-lg border ${
                    event.status === 'active' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">
                      {details.substituteName} → {details.absentName}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      event.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status === 'active' ? 'Active' : 'Completed'}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Department: {details.absentDepartment}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {details.date}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3 w-3" />
                      {details.time}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubstitutionLog;
