
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/types';
import { BookOpen, Lock, User } from 'lucide-react';
import { format } from 'date-fns';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('faculty');
  
  // Handle redirects in useEffect, not during render
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'student') {
        navigate('/student-timetable');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, role, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    
    // No need to navigate here, the useEffect will handle it
  };
  
  // Quick login buttons for demo purposes (no credentials exposed)
  const handleQuickLogin = async (role: UserRole) => {
    setLoading(true);
    
    let loginSuccess = false;
    if (role === 'admin') {
      loginSuccess = await login('admin', 'admin123');
    } else if (role === 'faculty') {
      loginSuccess = await login('faculty', 'faculty123');
    } else if (role === 'student') {
      loginSuccess = await login('student', 'student123');
    }
    
    setLoading(false);
    
    // No need to navigate here, the useEffect will handle it
  };

  // Define colors for each role
  const roleColors = {
    admin: {
      primary: 'from-emerald-600 to-blue-600',
      secondary: 'bg-emerald-600',
      tertiary: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
      accent: 'text-emerald-600',
      input: 'border-emerald-200 focus:border-emerald-500'
    },
    faculty: {
      primary: 'from-violet-600 to-purple-600',
      secondary: 'bg-violet-600',
      tertiary: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100',
      accent: 'text-violet-600',
      input: 'border-violet-200 focus:border-violet-500'
    },
    student: {
      primary: 'from-rose-500 to-pink-600',
      secondary: 'bg-rose-600',
      tertiary: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100',
      accent: 'text-rose-600',
      input: 'border-rose-200 focus:border-rose-500'
    }
  };
  
  const activeColors = roleColors[selectedRole];
  
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
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="flex items-center gap-2">
                      <User size={16} className="text-emerald-600" />
                      Username
                    </Label>
                    <Input 
                      id="admin-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-emerald-600" />
                      Password
                    </Label>
                    <Input 
                      id="admin-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="text-center pt-2">
                  <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuickLogin('admin')}
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Login as Admin
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="faculty" className="p-0">
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-username" className="flex items-center gap-2">
                      <User size={16} className="text-violet-600" />
                      Username
                    </Label>
                    <Input 
                      id="faculty-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-violet-200 focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-violet-600" />
                      Password
                    </Label>
                    <Input 
                      id="faculty-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-violet-200 focus:border-violet-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="text-center pt-2">
                  <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuickLogin('faculty')}
                    className="w-full border-violet-300 text-violet-700 hover:bg-violet-50"
                  >
                    Login as Faculty
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="student" className="p-0">
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-username" className="flex items-center gap-2">
                      <User size={16} className="text-rose-600" />
                      Username
                    </Label>
                    <Input 
                      id="student-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-rose-200 focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-rose-600" />
                      Password
                    </Label>
                    <Input 
                      id="student-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-rose-200 focus:border-rose-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="text-center pt-2">
                  <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuickLogin('student')}
                    className="w-full border-rose-300 text-rose-700 hover:bg-rose-50"
                  >
                    Login as Student
                  </Button>
                </div>
              </CardContent>
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
