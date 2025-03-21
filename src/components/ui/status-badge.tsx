
import { cn } from '@/lib/utils';
import { FacultyStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: FacultyStatus;
  className?: string;
  pulse?: boolean;
}

const statusConfig = {
  available: {
    bg: 'bg-faculty-available/10',
    text: 'text-faculty-available',
    border: 'border-faculty-available/30',
  },
  absent: {
    bg: 'bg-faculty-absent/10',
    text: 'text-faculty-absent',
    border: 'border-faculty-absent/30',
  },
  substituting: {
    bg: 'bg-faculty-substituting/10',
    text: 'text-faculty-substituting',
    border: 'border-faculty-substituting/30',
  },
  substituted: {
    bg: 'bg-faculty-substituted/10',
    text: 'text-faculty-substituted',
    border: 'border-faculty-substituted/30',
  },
};

const statusLabels = {
  available: 'Available',
  absent: 'Absent',
  substituting: 'Substituting',
  substituted: 'Substituted',
};

const StatusBadge = ({ status, className, pulse = false }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        'border transition-all',
        config.bg,
        config.text,
        config.border,
        pulse && 'animate-pulse-subtle',
        className
      )}
    >
      <span className={cn(
        'w-1.5 h-1.5 rounded-full mr-1',
        `bg-faculty-${status}`,
      )}/>
      {statusLabels[status]}
    </div>
  );
};

export default StatusBadge;
