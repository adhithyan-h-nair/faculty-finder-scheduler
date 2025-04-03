
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/types';
import { BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { getRoleColors } from '@/components/login/loginStyles';
import AdminLoginForm from '@/components/login/AdminLoginForm';
import FacultyLoginForm from '@/components/login/FacultyLoginForm';
import StudentLoginForm from '@/components/login/StudentLoginForm';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('faculty');
  
  // Handle redirects
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'student') {
        navigate('/student-timetable');
      } else if (role === 'faculty') {
        navigate('/timetable');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, role, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };
  
  const handleQuickLogin = async (role: UserRole) => {
    setLoading(true);
    
    let credentials = { username: '', password: '' };
    
    if (role === 'admin') {
      credentials = { username: 'admin', password: 'admin123' };
    } else if (role === 'faculty') {
      credentials = { username: 'faculty', password: 'faculty123' };
    } else if (role === 'student') {
      credentials = { username: 'student', password: 'student123' };
    }
    
    setUsername(credentials.username);
    setPassword(credentials.password);
    
    const loginSuccess = await login(credentials.username, credentials.password);
    
    setLoading(false);
    
    if (!loginSuccess) {
      toast({
        title: "Login Failed",
        description: `Quick login as ${role} failed. Please try manual login.`,
        variant: "destructive"
      });
    }
  };

  const activeColors = getRoleColors(selectedRole);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-indigo-800">Faculty Scheduler</h1>
          <p className="text-purple-600">Manage faculty timetables and assignments effectively</p>
          <div className="mt-2 text-sm text-gray-600">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>
        </div>
        
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className={`space-y-1 text-center bg-gradient-to-r ${activeColors.primary} text-white`}>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-white/80">
              Access your account to continue
            </CardDescription>
          </CardHeader>
          
          <Tabs 
            defaultValue="faculty" 
            className="w-full" 
            value={selectedRole} 
            onValueChange={(value) => setSelectedRole(value as UserRole)}
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger 
                value="admin" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Admin
              </TabsTrigger>
              <TabsTrigger 
                value="faculty"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
              >
                Faculty
              </TabsTrigger>
              <TabsTrigger 
                value="student"
                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
              >
                Student
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="p-0">
              <AdminLoginForm 
                username={username}
                password={password}
                loading={loading}
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
                onQuickLogin={() => handleQuickLogin('admin')}
              />
            </TabsContent>
            
            <TabsContent value="faculty" className="p-0">
              <FacultyLoginForm 
                username={username}
                password={password}
                loading={loading}
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
                onQuickLogin={() => handleQuickLogin('faculty')}
              />
            </TabsContent>
            
            <TabsContent value="student" className="p-0">
              <StudentLoginForm 
                username={username}
                password={password}
                loading={loading}
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
                onQuickLogin={() => handleQuickLogin('student')}
              />
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-center text-indigo-700">
              <BookOpen size={16} />
              This is a demo application. Use the quick login buttons for testing.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
