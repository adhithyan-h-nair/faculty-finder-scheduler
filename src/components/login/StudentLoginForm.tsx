
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

const StudentLoginForm = ({
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
          <Label htmlFor="student-username" className="flex items-center gap-2">
            <User size={16} className="text-rose-600" />
            Username
          </Label>
          <Input 
            id="student-username" 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
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
            onChange={(e) => onPasswordChange(e.target.value)}
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
          onClick={onQuickLogin}
          className="w-full border-rose-300 text-rose-700 hover:bg-rose-50"
        >
          Login as Student
        </Button>
      </div>
    </CardContent>
  );
};

export default StudentLoginForm;
