
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import TimetableView from '@/components/timetable/TimetableView';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/ui/status-badge';
import { facultyData, getFacultyTimetable, getTodayDay, getFacultyById, getSubstitutionLog } from '@/lib/data';
import { Faculty, Period, Semester } from '@/lib/types';
import { Calendar, UserCog, BookOpen, Clock, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const TimetablePage = () => {
  const { role, facultyId } = useAuth();
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [timetable, setTimetable] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

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
        setLastUpdated(new Date());
      }, 300);
    }
  }, [selectedFaculty]);

  const handleTimetableUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      if (selectedFaculty) {
        const periods = getFacultyTimetable(selectedFaculty.id);
        setTimetable(periods);
        setLastUpdated(new Date());
        toast({
          title: "Timetable Updated",
          description: "The faculty timetable has been updated successfully.",
          className: "bg-green-50 border-green-200",
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
        setLastUpdated(new Date());
        toast({
          title: "Period Deleted",
          description: "The class period has been deleted successfully.",
          className: "bg-green-50 border-green-200",
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
  const currentDateTime = new Date();
  const formattedDate = format(currentDateTime, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(currentDateTime, 'h:mm a');
  
  // Get substitution info if the faculty is being substituted or is substituting
  const getSubstitutionInfo = () => {
    if (!selectedFaculty) return null;
    
    if (selectedFaculty.status === 'substituted' && selectedFaculty.substitutedBy) {
      const substitute = getFacultyById(selectedFaculty.substitutedBy);
      return substitute 
        ? { type: 'substituted', name: substitute.name, id: substitute.id }
        : null;
    }
    
    if (selectedFaculty.status === 'substituting' && selectedFaculty.substituting) {
      const original = getFacultyById(selectedFaculty.substituting);
      return original 
        ? { type: 'substituting', name: original.name, id: original.id }
        : null;
    }
    
    return null;
  };
  
  const substitutionInfo = getSubstitutionInfo();
  
  // Recent substitutions (for admin view)
  const recentSubstitutions = role === 'admin' ? getSubstitutionLog().slice(0, 3) : [];
  
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
      
      {/* Current Date and Time */}
      <Card className="mb-6 shadow-sm border-gray-200 bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Date</div>
                <div className="font-medium">{formattedDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Time</div>
                <div className="font-medium">{formattedTime}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
                    <div className="flex items-center gap-1">
                      <StatusBadge status={selectedFaculty.status} />
                      
                      {substitutionInfo && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {substitutionInfo.type === 'substituted' 
                            ? `Substituted by ${substitutionInfo.name}`
                            : `Substituting for ${substitutionInfo.name}`
                          }
                        </span>
                      )}
                    </div>
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
      
      {/* Recent Substitutions (Admin Only) */}
      {role === 'admin' && recentSubstitutions.length > 0 && (
        <Card className="mb-6 shadow-sm border-gray-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck size={18} className="text-blue-600" />
              <h3 className="text-lg font-medium">Recent Substitutions</h3>
            </div>
            
            <div className="space-y-3">
              {recentSubstitutions.map(sub => (
                <div 
                  key={sub.id} 
                  className={`p-3 rounded-lg border ${sub.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {sub.success 
                          ? `${sub.substituteName} ⟶ ${sub.absentFacultyName}` 
                          : `Failed: ${sub.absentFacultyName}`}
                      </div>
                      <div className="text-sm text-muted-foreground">{sub.course}</div>
                      <div className="text-sm text-muted-foreground">
                        {sub.day}, {sub.timeSlot}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(sub.date, 'MMM d, h:mm a')}
                    </div>
                  </div>
                  
                  {!sub.success && sub.reason && (
                    <div className="mt-2 text-sm text-red-600">
                      Reason: {sub.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
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
      
      {/* Last Updated */}
      <div className="mb-4 text-sm text-muted-foreground">
        Last updated: {format(lastUpdated, 'MMMM d, yyyy h:mm a')}
      </div>
      
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
