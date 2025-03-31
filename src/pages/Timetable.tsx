
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import TimetableView from '@/components/timetable/TimetableView';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/ui/status-badge';
import { facultyData, getFacultyTimetable, getTodayDay } from '@/lib/data';
import { Faculty, Period, Semester } from '@/lib/types';
import { Calendar, UserCog, BookOpen, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimetablePage = () => {
  const { role, facultyId } = useAuth();
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [timetable, setTimetable] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Set default faculty based on logged in user or first in list
  useEffect(() => {
    if (role === 'faculty' && facultyId) {
      const faculty = facultyData.find(f => f.id === facultyId);
      if (faculty) {
        setSelectedFaculty(faculty);
      }
    } else if (facultyData.length > 0 && !selectedFaculty) {
      setSelectedFaculty(facultyData[0]);
    }
  }, [facultyData, selectedFaculty, role, facultyId]);
  
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

  const handleDeletePeriod = (periodId: string) => {
    // In a real app, this would be an API call to delete the period
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // Here we're just refreshing the timetable
      if (selectedFaculty) {
        const periods = getFacultyTimetable(selectedFaculty.id);
        setTimetable(periods);
        toast({
          title: "Period Deleted",
          description: "The class period has been deleted successfully.",
        });
      }
      setLoading(false);
    }, 300);
  };

  const periodCount = timetable.length;
  const courseCount = new Set(timetable.map(p => p.courseCode)).size;
  const semesterCount = new Set(timetable.map(p => p.semester)).size;
  const todayDay = getTodayDay();
  const todayCount = timetable.filter(p => p.day === todayDay).length;
  
  // Group by semester for analysis
  const semesterCounts = timetable.reduce<Record<Semester, number>>((acc, period) => {
    acc[period.semester] = (acc[period.semester] || 0) + 1;
    return acc;
  }, {} as Record<Semester, number>);
  
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
                disabled={role === 'faculty'} // Disable selection for faculty users
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
                  <div className="flex flex-row flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar size={16} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Total Periods</div>
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
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Today</div>
                        <div className="font-medium">{todayCount} periods</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Semester Overview */}
      {!loading && Object.keys(semesterCounts).length > 0 && (
        <Card className="mb-6 shadow-sm border-gray-200 bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3">Semester Distribution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(semesterCounts).map(([semester, count]) => (
                <div key={semester} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-sm text-muted-foreground">{semester} Semester</div>
                  <div className="text-xl font-bold">{count}</div>
                  <div className="text-xs text-muted-foreground">periods</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
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
          onDeletePeriod={handleDeletePeriod}
          showSubstituteControls={selectedFaculty?.id === facultyId || role === 'admin'}
        />
      )}
    </PageContainer>
  );
};

export default TimetablePage;
