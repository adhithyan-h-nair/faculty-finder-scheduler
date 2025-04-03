
import { UserRole } from '@/lib/types';

interface RoleColor {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  input: string;
}

export const getRoleColors = (role: UserRole): RoleColor => {
  const roleColors: Record<UserRole, RoleColor> = {
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
  
  return roleColors[role];
};
