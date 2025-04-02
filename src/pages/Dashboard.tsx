
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFacultyById, getStudentById, getTodayDay, getFacultyStatusCounts, facultyData, studentData } from '@/lib/data';
import { Calendar, Users, BookOpen, LogOut, Clock, PieChart, School, BookCopy, CalendarClock, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from 'recharts';
import { format } from 'date-fns';
import SubstitutionLog from '@/components/admin/SubstitutionLog';

const Dashboard = () => {
  const { role, logout, facultyId, studentId } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const faculty = facultyId ? getFacultyById(facultyId) : null;
  const student = studentId ? getStudentById(studentId) : null;
  const today = getTodayDay();
  const currentDate = new Date();
  
  // Prepare data for admin dashboard
  const statusCounts = getFacultyStatusCounts();
  const facultyStatusData = [
    { name: 'Available', value: statusCounts.available, color: '#10b981' },
    { name: 'Absent', value: statusCounts.absent, color: '#ef4444' },
    { name: 'Substituting', value: statusCounts.substituting, color: '#6366f1' },
    { name: 'Substituted', value: statusCounts.substituted, color: '#f59e0b' }
  ];
  
  // Department distribution data
  const departmentCounts = facultyData.reduce((acc, faculty) => {
    acc[faculty.department] = (acc[faculty.department] || 0) + 1;
    return acc;
  }, {});
  
  const departmentData = Object.keys(departmentCounts).map(dept => ({
    name: dept,
    count: departmentCounts[dept]
  }));
  
  // Student semester distribution
  const semesterCounts = studentData.reduce((acc, student) => {
    acc[student.semester] = (acc[student.semester] || 0) + 1;
    return acc;
  }, {});
  
  const semesterData = Object.keys(semesterCounts).map(sem => ({
    name: sem,
    count: semesterCounts[sem]
  }));
  
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
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
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
              
              {role === 'admin' && (
                <div className="mt-3 text-sm font-medium">
                  <span className="text-blue-600">Admin Login: </span>
                  <span className="text-gray-600">username: admin, password: admin</span>
                </div>
              )}
              
              {role === 'faculty' && faculty && (
                <div className="mt-3 text-sm font-medium">
                  <div>
                    <span className="text-blue-600">Username: </span>
                    <span className="text-gray-600">{faculty.username}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Password: </span>
                    <span className="text-gray-600">{faculty.password}</span>
                  </div>
                </div>
              )}
              
              {role === 'student' && student && (
                <div className="mt-3 text-sm font-medium">
                  <div>
                    <span className="text-blue-600">Username: </span>
                    <span className="text-gray-600">{student.username}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Password: </span>
                    <span className="text-gray-600">{student.password}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md">
                <Clock size={18} className="text-blue-600" />
                <div className="text-sm">
                  <span className="text-gray-600">Today is </span>
                  <span className="font-semibold text-blue-600">{today}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-md">
                <Calendar size={18} className="text-indigo-600" />
                <div className="text-sm">
                  <span className="font-semibold text-indigo-600">
                    {format(currentDate, 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {role === 'admin' && (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faculty">Faculty Statistics</TabsTrigger>
            <TabsTrigger value="students">Student Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                      <h3 className="text-3xl font-bold mt-1">{facultyData.length}</h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users size={24} className="text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                      <h3 className="text-3xl font-bold mt-1">{studentData.length}</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <School size={24} className="text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Departments</p>
                      <h3 className="text-3xl font-bold mt-1">{departmentData.length}</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <BookCopy size={24} className="text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Substitutions Today</p>
                      <h3 className="text-3xl font-bold mt-1">{statusCounts.substituting}</h3>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <CalendarClock size={24} className="text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Faculty Status</CardTitle>
                  <CardDescription>Current distribution of faculty status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={facultyStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {facultyStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <SubstitutionLog />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            </div>
          </TabsContent>
          
          <TabsContent value="faculty" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Faculty Status</CardTitle>
                  <CardDescription>Detailed breakdown of faculty availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {facultyStatusData.map((status, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: status.color }}></div>
                        <div>
                          <div className="text-sm font-medium">{status.name}</div>
                          <div className="text-xl font-bold">{status.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={facultyStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {facultyStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Department Analysis</CardTitle>
                  <CardDescription>Faculty distribution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={departmentData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 100,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Faculty Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              onClick={() => navigate('/faculty')}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Users className="mr-2" size={18} />
              View Detailed Faculty Management
            </Button>
          </TabsContent>
          
          <TabsContent value="students" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Student Semester Distribution</CardTitle>
                  <CardDescription>Number of students in each semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={semesterData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366f1" name="Student Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Department Breakdown</CardTitle>
                  <CardDescription>Students by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={Object.keys(departmentCounts).map(dept => ({
                            name: dept,
                            value: studentData.filter(s => s.department === dept).length
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {Object.keys(departmentCounts).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              onClick={() => navigate('/student-management')}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <School className="mr-2" size={18} />
              View Student Management
            </Button>
          </TabsContent>
        </Tabs>
      )}
      
      {role === 'faculty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            <div className="text-lg font-semibold">Faculty Directory</div>
            <div className="text-sm opacity-90">View faculty details and status</div>
          </Button>
        </div>
      )}
      
      {role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
        </div>
      )}
    </PageContainer>
  );
};

export default Dashboard;
