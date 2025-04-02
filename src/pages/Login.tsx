
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/types';
import { BookOpen, Lock, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('faculty');
  
  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    if (role === 'student') {
      navigate('/student-timetable');
    } else {
      navigate('/dashboard');
    }
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    
    if (success) {
      // The auth context will handle redirects
    }
  };
  
  // Quick login buttons for demo purposes
  const demoLogins = {
    admin: { username: 'admin', password: 'admin' },
    faculty: { username: 'alan.turing', password: 'password123' },
    student: { username: 'john.doe', password: 'password123' }
  };
  
  const handleQuickLogin = async (role: UserRole) => {
    const credentials = demoLogins[role];
    setUsername(credentials.username);
    setPassword(credentials.password);
    setSelectedRole(role);
    
    // Automatically submit the form
    setLoading(true);
    const success = await login(credentials.username, credentials.password);
    setLoading(false);
    
    if (success) {
      // The auth context will handle redirects
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-indigo-800">Faculty Scheduler</h1>
          <p className="text-purple-600">Manage faculty timetables and assignments effectively</p>
        </div>
        
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-purple-100">
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
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Admin
              </TabsTrigger>
              <TabsTrigger 
                value="faculty"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Faculty
              </TabsTrigger>
              <TabsTrigger 
                value="student"
                className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                Student
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="p-0">
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username" className="flex items-center gap-2">
                      <User size={16} className="text-indigo-600" />
                      Username
                    </Label>
                    <Input 
                      id="admin-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-indigo-600" />
                      Password
                    </Label>
                    <Input 
                      id="admin-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
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
                    className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                  >
                    Login as Admin (admin/admin)
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="faculty" className="p-0">
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-username" className="flex items-center gap-2">
                      <User size={16} className="text-purple-600" />
                      Username
                    </Label>
                    <Input 
                      id="faculty-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-purple-600" />
                      Password
                    </Label>
                    <Input 
                      id="faculty-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
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
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Login as Dr. Turing (alan.turing/password123)
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="student" className="p-0">
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-username" className="flex items-center gap-2">
                      <User size={16} className="text-pink-600" />
                      Username
                    </Label>
                    <Input 
                      id="student-username" 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password" className="flex items-center gap-2">
                      <Lock size={16} className="text-pink-600" />
                      Password
                    </Label>
                    <Input 
                      id="student-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white" 
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
                    className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
                  >
                    Login as John Doe (john.doe/password123)
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
