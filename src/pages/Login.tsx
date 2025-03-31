
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/lib/types';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Faculty Scheduler</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="faculty" className="w-full" value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin" className="p-0">
            <CardContent className="space-y-4 pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input 
                    id="admin-username" 
                    type="text" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="text-center pt-2">
                <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('admin')}
                  className="w-full"
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
                  <Label htmlFor="faculty-username">Username</Label>
                  <Input 
                    id="faculty-username" 
                    type="text" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input 
                    id="faculty-password" 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="text-center pt-2">
                <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('faculty')}
                  className="w-full"
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
                  <Label htmlFor="student-username">Username</Label>
                  <Input 
                    id="student-username" 
                    type="text" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input 
                    id="student-password" 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="text-center pt-2">
                <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('student')}
                  className="w-full"
                >
                  Login as John Doe (john.doe/password123)
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground mt-4">
            This is a demo application. Use the quick login buttons for testing.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
