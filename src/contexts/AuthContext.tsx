
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UserRole } from '@/lib/types';
import { authenticateUser, getFacultyById, getStudentById } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  facultyId: string | null;
  studentId: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  facultyId: null,
  studentId: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
    const authenticatedUser = authenticateUser(username, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('facultyUser', JSON.stringify(authenticatedUser));
      
      // Show welcome toast based on role
      if (authenticatedUser.role === 'admin') {
        toast({
          title: "Welcome Admin",
          description: "You are now logged in as administrator.",
        });
      } else if (authenticatedUser.role === 'faculty') {
        const faculty = authenticatedUser.facultyId ? getFacultyById(authenticatedUser.facultyId) : null;
        toast({
          title: `Welcome ${faculty?.name || 'Faculty'}`,
          description: "You are now logged in to the faculty portal.",
        });
      } else if (authenticatedUser.role === 'student') {
        const student = authenticatedUser.studentId ? getStudentById(authenticatedUser.studentId) : null;
        toast({
          title: `Welcome ${student?.name || 'Student'}`,
          description: "You are now logged in to the student portal.",
        });
      }
      
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password. Please try again.",
      variant: "destructive",
    });
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('facultyUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
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
  };

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
