
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UserRole } from '@/lib/types';
import { authenticateUser, getFacultyById, getStudentById, getAllUsers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  facultyId: string | null;
  studentId: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  facultyId: null,
  studentId: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  users: [],
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  // Get all users for admin
  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('facultyUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('facultyUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log(`Attempting to login with: ${username} / ${password}`);
      
      const authenticatedUser = authenticateUser(username, password);
      
      if (!authenticatedUser) {
        console.log('Authentication failed - no user found');
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      console.log('User authenticated:', authenticatedUser);
      setUser(authenticatedUser);
      localStorage.setItem('facultyUser', JSON.stringify(authenticatedUser));
      
      // Show welcome toast based on role with improved styling
      if (authenticatedUser.role === 'admin') {
        toast({
          title: "Welcome Admin",
          description: "You are now logged in as administrator.",
          className: "bg-emerald-50 border-emerald-200 text-emerald-800",
        });
      } else if (authenticatedUser.role === 'faculty') {
        const faculty = authenticatedUser.facultyId ? getFacultyById(authenticatedUser.facultyId) : null;
        toast({
          title: `Welcome ${faculty?.name || 'Faculty'}`,
          description: "You are now logged in to the faculty portal.",
          className: "bg-violet-50 border-violet-200 text-violet-800",
        });
      } else if (authenticatedUser.role === 'student') {
        const student = authenticatedUser.studentId ? getStudentById(authenticatedUser.studentId) : null;
        toast({
          title: `Welcome ${student?.name || 'Student'}`,
          description: "You are now logged in to the student portal.",
          className: "bg-rose-50 border-rose-200 text-rose-800",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('facultyUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const value = {
    user,
    role: user?.role || null,
    facultyId: user?.facultyId || null,
    studentId: user?.studentId || null,
    isAuthenticated: !!user,
    login,
    logout,
    users
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-gray-600">Loading authentication...</p>
      </div>
    </div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
