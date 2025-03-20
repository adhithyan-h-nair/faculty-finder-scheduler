
import { StatusCount } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';

interface StatusOverviewProps {
  counts: StatusCount;
  className?: string;
}

const StatusOverview = ({ counts, className }: StatusOverviewProps) => {
  const statusItems = [
    {
      label: 'Available',
      count: counts.available,
      icon: <CheckCircle size={20} className="text-faculty-available" />,
      className: 'text-faculty-available',
      bgClass: 'bg-faculty-available/5 border-faculty-available/20',
    },
    {
      label: 'Absent',
      count: counts.absent,
      icon: <XCircle size={20} className="text-faculty-absent" />,
      className: 'text-faculty-absent',
      bgClass: 'bg-faculty-absent/5 border-faculty-absent/20',
    },
    {
      label: 'Substituting',
      count: counts.substituting,
      icon: <UserCheck size={20} className="text-faculty-substituting" />,
      className: 'text-faculty-substituting',
      bgClass: 'bg-faculty-substituting/5 border-faculty-substituting/20',
    },
    {
      label: 'Substituted',
      count: counts.substituted,
      icon: <Clock size={20} className="text-faculty-substituted" />,
      className: 'text-faculty-substituted',
      bgClass: 'bg-faculty-substituted/5 border-faculty-substituted/20',
    },
  ];

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <Card className={cn("shadow-sm border-gray-200", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Faculty Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border",
                "transition-all duration-300 animate-fade-in",
                item.bgClass
              )}
            >
              <div className="flex items-center justify-center mb-1">
                {item.icon}
              </div>
              <div className={cn("text-2xl font-bold", item.className)}>
                {item.count}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {item.label}
              </div>
              {total > 0 && (
                <div className="text-[10px] text-muted-foreground mt-1">
                  {Math.round((item.count / total) * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverview;
