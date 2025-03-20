
import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TimetableView from '@/components/timetable/TimetableView';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/ui/status-badge';
import { facultyData, getFacultyTimetable } from '@/lib/data';
import { Faculty, Period } from '@/lib/types';
import { Calendar } from 'lucide-react';

const TimetablePage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [timetable, setTimetable] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Set default faculty to first in list
  useEffect(() => {
    if (facultyData.length > 0 && !selectedFaculty) {
      setSelectedFaculty(facultyData[0]);
    }
  }, [facultyData, selectedFaculty]);
  
  // Load timetable when faculty changes
  useEffect(() => {
    if (selectedFaculty) {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        const periods = getFacultyTimetable(selectedFaculty.id);
        setTimetable(periods);
        setLoading(false);
      }, 300);
    }
  }, [selectedFaculty]);
  
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Faculty Timetable</h1>
        <p className="text-muted-foreground">
          View and manage faculty schedules and periods
        </p>
      </div>
      
      {/* Faculty Selector */}
      <Card className="mb-6 shadow-sm border-gray-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-64">
              <Select 
                value={selectedFaculty?.id || ''} 
                onValueChange={(value) => {
                  const faculty = facultyData.find(f => f.id === value);
                  if (faculty) setSelectedFaculty(faculty);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {facultyData.map(faculty => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedFaculty && (
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  {selectedFaculty.department}
                </div>
                <StatusBadge status={selectedFaculty.status} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Timetable View */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-muted-foreground animate-pulse">Loading timetable...</div>
        </div>
      ) : timetable.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Calendar size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No Timetable Available</h3>
          <p className="text-muted-foreground">
            {selectedFaculty?.name} doesn't have any scheduled periods.
          </p>
        </div>
      ) : (
        <TimetableView periods={timetable} />
      )}
    </PageContainer>
  );
};

export default TimetablePage;
