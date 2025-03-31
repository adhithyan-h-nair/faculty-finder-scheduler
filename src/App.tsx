
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Faculty from "./pages/Faculty";
import Timetable from "./pages/Timetable";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentTimetable from "./pages/StudentTimetable";
import StudentManagement from "./pages/StudentManagement";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AuthenticatedApp = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/faculty" element={
        <ProtectedRoute allowedRoles={['admin', 'faculty']}>
          <Faculty />
        </ProtectedRoute>
      } />
      <Route path="/timetable" element={
        <ProtectedRoute allowedRoles={['admin', 'faculty']}>
          <Timetable />
        </ProtectedRoute>
      } />
      <Route path="/student-timetable" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentTimetable />
        </ProtectedRoute>
      } />
      <Route path="/student-management" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <StudentManagement />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<AuthenticatedApp />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
