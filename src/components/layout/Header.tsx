
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Users, Calendar, Menu, X, LogOut, GraduationCap, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Generate nav items based on user role
  const getNavItems = () => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    ];
    
    if (role === 'admin') {
      return [
        ...commonItems,
        { path: '/faculty', label: 'Faculty', icon: <Users size={18} /> },
        { path: '/student-management', label: 'Students', icon: <GraduationCap size={18} /> },
        { path: '/timetable', label: 'Timetable', icon: <Calendar size={18} /> },
      ];
    } else if (role === 'faculty') {
      return [
        ...commonItems,
        { path: '/faculty', label: 'Faculty', icon: <Users size={18} /> },
        { path: '/timetable', label: 'Timetable', icon: <Calendar size={18} /> },
      ];
    } else if (role === 'student') {
      return [
        ...commonItems,
        { path: '/student-timetable', label: 'Timetable', icon: <Calendar size={18} /> },
      ];
    }
    
    // Default for logged out users
    return [
      { path: '/', label: 'Home', icon: <Home size={18} /> },
      { path: '/login', label: 'Login', icon: <BookOpen size={18} /> },
    ];
  };
  
  const navItems = getNavItems();

  // Helper function to check if a path matches the current location
  const isPathActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path === '/faculty' && location.pathname.includes('/faculty')) return true;
    if (path === '/timetable' && location.pathname.includes('/timetable')) return true;
    if (path === '/student-timetable' && location.pathname.includes('/student-timetable')) return true;
    if (path === '/student-management' && location.pathname.includes('/student-management')) return true;
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/login' && location.pathname === '/login') return true;
    return false;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 sm:px-6',
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to={isAuthenticated ? "/dashboard" : "/"} 
          className="font-semibold text-lg sm:text-xl tracking-tight text-primary transition-all duration-300"
        >
          Faculty Scheduler
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isPathActive(item.path) ? "default" : "ghost"}
                className={cn(
                  "transition-all duration-300",
                  isPathActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          ))}
          
          {isAuthenticated && (
            <Button 
              variant="outline" 
              className="ml-2 border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-[57px] left-0 right-0 bottom-0 bg-white z-40 md:hidden animate-fade-in overflow-y-auto">
            <div className="py-2 max-h-[calc(100vh-57px)] overflow-y-auto">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "flex items-center py-4 px-6 mb-2",
                    isPathActive(item.path) 
                      ? "bg-primary/5 text-primary border-l-2 border-primary" 
                      : "text-foreground hover:bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3 text-base">{item.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <button 
                  className="w-full flex items-center py-4 px-6 text-red-600 hover:bg-red-50 mt-auto"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={18} />
                  <span className="ml-3 text-base">Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
