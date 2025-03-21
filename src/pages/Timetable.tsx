
import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TimetableView from '@/components/timetable/TimetableView';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/ui/status-badge';
import { facultyData, getFacultyTimetable } from '@/lib/data';
import { Faculty, Period } from '@/lib/types';
import { Calendar, UserCog, School, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimetablePage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [timetable, setTimetable] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
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

  const handleTimetableUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      if (selectedFaculty) {
        const periods = getFacultyTimetable(selectedFaculty.id);
        setTimetable(periods);
        toast({
          title: "Timetable Updated",
          description: "The faculty timetable has been updated successfully.",
        });
      }
      setLoading(false);
    }, 300);
  };

  const periodCount = timetable.length;
  const courseCount = new Set(timetable.map(p => p.courseCode)).size;
  
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Faculty Timetable</h1>
        <p className="text-muted-foreground">
          View and manage faculty schedules and periods
        </p>
      </div>
      
      {/* Faculty Selector */}
      <Card className="mb-6 shadow-sm border-gray-200 bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">Select Faculty</label>
              <Select 
                value={selectedFaculty?.id || ''} 
                onValueChange={(value) => {
                  const faculty = facultyData.find(f => f.id === value);
                  if (faculty) setSelectedFaculty(faculty);
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {facultyData.map(faculty => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedFaculty && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCog size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{selectedFaculty.department}</div>
                    <StatusBadge status={selectedFaculty.status} />
                  </div>
                </div>
                
                {!loading && timetable.length > 0 && (
                  <div className="flex flex-row gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar size={16} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Periods</div>
                        <div className="font-medium">{periodCount}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <BookOpen size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Courses</div>
                        <div className="font-medium">{courseCount}</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
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
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">No Timetable Available</h3>
          <p className="text-muted-foreground">
            {selectedFaculty?.name} doesn't have any scheduled periods.
          </p>
        </div>
      ) : (
        <TimetableView 
          periods={timetable} 
          facultyId={selectedFaculty?.id || ''}
          onUpdateTimetable={handleTimetableUpdate}
        />
      )}
    </PageContainer>
  );
};

export default TimetablePage;
