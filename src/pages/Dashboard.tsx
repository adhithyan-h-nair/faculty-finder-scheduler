
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFacultyById, getStudentById, getTodayDay } from '@/lib/data';
import { Calendar, Users, BookOpen, LogOut, Clock } from 'lucide-react';

const Dashboard = () => {
  const { role, logout, facultyId, studentId } = useAuth();
  const navigate = useNavigate();
  
  const faculty = facultyId ? getFacultyById(facultyId) : null;
  const student = studentId ? getStudentById(studentId) : null;
  const today = getTodayDay();
  
  // Redirect based on role if trying to access generic dashboard
  useEffect(() => {
    if (role === 'student') {
      navigate('/student-timetable');
    }
  }, [role, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Faculty Scheduler system
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
      
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">
                {role === 'admin' ? 'Administrator Dashboard' : 
                  role === 'faculty' ? `Welcome, ${faculty?.name}` : 
                  `Welcome, ${student?.name}`}
              </h2>
              <p className="text-muted-foreground">
                {role === 'admin' ? 'Manage faculty, students, and timetables' : 
                  role === 'faculty' ? `Department: ${faculty?.department}` : 
                  `${student?.department}, Semester: ${student?.semester}`}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md">
              <Clock size={18} className="text-blue-600" />
              <div className="text-sm">
                <span className="text-muted-foreground">Today is </span>
                <span className="font-semibold text-blue-600">{today}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {role === 'admin' && (
          <>
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2" 
              onClick={() => navigate('/faculty')}
            >
              <Users size={32} />
              <div className="text-lg font-semibold">Manage Faculty</div>
              <div className="text-sm opacity-90">View and manage faculty members</div>
            </Button>
            
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700" 
              onClick={() => navigate('/student-management')}
            >
              <Users size={32} />
              <div className="text-lg font-semibold">Manage Students</div>
              <div className="text-sm opacity-90">View and manage student data</div>
            </Button>
            
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700" 
              onClick={() => navigate('/timetable')}
            >
              <Calendar size={32} />
              <div className="text-lg font-semibold">Manage Timetables</div>
              <div className="text-sm opacity-90">Configure class schedules</div>
            </Button>
          </>
        )}
        
        {role === 'faculty' && (
          <>
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2" 
              onClick={() => navigate('/timetable')}
            >
              <Calendar size={32} />
              <div className="text-lg font-semibold">My Timetable</div>
              <div className="text-sm opacity-90">View your teaching schedule</div>
            </Button>
            
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700" 
              onClick={() => navigate('/faculty')}
            >
              <Users size={32} />
              <div className="text-lg font-semibold">Faculty Management</div>
              <div className="text-sm opacity-90">View faculty details and status</div>
            </Button>
          </>
        )}
        
        {role === 'student' && (
          <>
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2" 
              onClick={() => navigate('/student-timetable')}
            >
              <Calendar size={32} />
              <div className="text-lg font-semibold">My Timetable</div>
              <div className="text-sm opacity-90">View your class schedule</div>
            </Button>
            
            <Button 
              variant="default" 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/student-timetable')}
            >
              <BookOpen size={32} />
              <div className="text-lg font-semibold">Today's Classes</div>
              <div className="text-sm opacity-90">View today's schedule</div>
            </Button>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
