
import { StatusCount } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';
import { PieChart, Cell, Pie, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatusOverviewProps {
  counts: StatusCount;
  className?: string;
  chartType?: 'pie' | 'bar';
}

const StatusOverview = ({ counts, className, chartType = 'pie' }: StatusOverviewProps) => {
  const isMobile = useIsMobile();
  
  const statusItems = [
    {
      label: 'Available',
      count: counts.available,
      icon: <CheckCircle size={18} className="text-faculty-available" />,
      className: 'text-faculty-available',
      bgClass: 'bg-faculty-available/5 border-faculty-available/20',
      color: '#10b981' // green-500
    },
    {
      label: 'Absent',
      count: counts.absent,
      icon: <XCircle size={18} className="text-faculty-absent" />,
      className: 'text-faculty-absent',
      bgClass: 'bg-faculty-absent/5 border-faculty-absent/20',
      color: '#ef4444' // red-500
    },
    {
      label: 'Substituting',
      count: counts.substituting,
      icon: <UserCheck size={18} className="text-faculty-substituting" />,
      className: 'text-faculty-substituting',
      bgClass: 'bg-faculty-substituting/5 border-faculty-substituting/20',
      color: '#3b82f6' // blue-500
    },
    {
      label: 'Substituted',
      count: counts.substituted,
      icon: <Clock size={18} className="text-faculty-substituted" />,
      className: 'text-faculty-substituted',
      bgClass: 'bg-faculty-substituted/5 border-faculty-substituted/20',
      color: '#f59e0b' // amber-500
    },
  ];

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  // Prepare data for charts - ensure it's not empty
  const chartData = statusItems
    .filter(item => item.count > 0) // Only include non-zero values
    .map(item => ({
      name: item.label,
      value: item.count,
      color: item.color
    }));

  // If all values are 0, create placeholder data
  const displayData = chartData.length > 0 ? chartData : statusItems.map(item => ({
    name: item.label,
    value: 0,
    color: item.color
  }));

  return (
    <Card className={cn("shadow-sm border-gray-200/80 hover:shadow-md transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Faculty Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-3">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg border transition-all hover:shadow-sm",
                  item.bgClass
                )}
              >
                <div className="flex items-center justify-center mb-1">
                  {item.icon}
                </div>
                <div className={cn("text-xl sm:text-2xl font-bold", item.className)}>
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

          {/* Chart Display */}
          <div className="h-[180px] sm:h-[200px] flex items-center justify-center">
            {total === 0 ? (
              <div className="text-center text-muted-foreground">
                No data available
              </div>
            ) : chartType === 'pie' ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={displayData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 60 : 80}
                    dataKey="value"
                    label={({ name, percent }) => 
                      percent && !isMobile ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                    }
                    labelLine={false}
                  >
                    {displayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} faculty`, 'Count']}
                    isAnimationActive={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <XAxis dataKey="name" fontSize={isMobile ? 10 : 12} />
                  <YAxis width={25} />
                  <Tooltip 
                    formatter={(value) => [`${value} faculty`, 'Count']}
                    isAnimationActive={false}
                  />
                  <Bar dataKey="value" isAnimationActive={false}>
                    {displayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverview;
