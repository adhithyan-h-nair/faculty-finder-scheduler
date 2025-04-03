
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';

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
  return (
    <CardContent className="space-y-4 pt-6">
      <form onSubmit={onSubmit} className="space-y-4">
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
            onChange={(e) => onUsernameChange(e.target.value)}
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
            onChange={(e) => onPasswordChange(e.target.value)}
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
          onClick={onQuickLogin}
          className="w-full border-violet-300 text-violet-700 hover:bg-violet-50"
        >
          Login as Faculty
        </Button>
      </div>
    </CardContent>
  );
};

export default FacultyLoginForm;
