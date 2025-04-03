
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { getRoleColors } from './loginStyles';

interface LoginFormProps {
  username: string;
  password: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuickLogin: () => void;
}

const FacultyLoginForm = ({
  username,
  password,
  loading,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onQuickLogin
}: LoginFormProps) => {
  const colors = getRoleColors('faculty');
  
  return (
    <CardContent className="space-y-4 pt-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="faculty-username" className="flex items-center gap-2">
            <User size={16} className={colors.accent} />
            Username
          </Label>
          <Input 
            id="faculty-username" 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            required
            className={colors.input}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="faculty-password" className="flex items-center gap-2">
            <Lock size={16} className={colors.accent} />
            Password
          </Label>
          <Input 
            id="faculty-password" 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            className={colors.input}
          />
        </div>
        <Button 
          type="submit" 
          className={`w-full bg-gradient-to-r ${colors.primary} hover:from-violet-700 hover:to-purple-700 text-white`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="text-center pt-2">
        <div className="text-sm text-muted-foreground mb-2">Quick login for demo</div>
        <div className="text-xs text-gray-500 mb-2">Faculty credentials: jsmith / password123</div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onQuickLogin}
          className={`w-full ${colors.tertiary}`}
        >
          Login as Faculty
        </Button>
      </div>
    </CardContent>
  );
};

export default FacultyLoginForm;
