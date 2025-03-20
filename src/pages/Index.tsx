import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import StatusOverview from '@/components/dashboard/StatusOverview';
import FacultyCard from '@/components/faculty/FacultyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getFacultyStatusCounts, facultyData } from '@/lib/data';
import { Users, Calendar, AlertTriangle, PieChart, BarChart } from 'lucide-react';
import { StatusCount } from '@/lib/types';

const Index = () => {
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState<StatusCount>({
    available: 0,
    absent: 0,
    substituting: 0,
    substituted: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  // Get faculty who need attention (absent without substitute)
  const facultyNeedingAttention = facultyData.filter(f => 
    f.status === 'absent' && !f.substitutedBy
  );

  // Get recently substituted faculty
  const recentSubstitutions = facultyData.filter(f => 
    f.status === 'substituted' && f.substitutedBy
  ).slice(0, 2);

  const updateData = () => {
    // In a real app, this would be an API call
    setLoading(true);
    setTimeout(() => {
      const counts = getFacultyStatusCounts();
      setStatusCounts(counts);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of faculty status and scheduling
        </p>
      </div>

      <div className="space-y-6">
        {/* Chart Toggle */}
        <div className="flex justify-end mb-4">
          <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as 'pie' | 'bar')}>
            <ToggleGroupItem value="pie" aria-label="Toggle Pie Chart">
              <PieChart className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Toggle Bar Chart">
              <BarChart className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Status Overview */}
        <StatusOverview counts={statusCounts} chartType={chartType} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty Needing Attention */}
          <Card className="lg:col-span-2 shadow-sm border-gray-200">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle size={18} className="mr-2 text-faculty-absent" />
                Faculty Needing Attention
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => navigate('/faculty')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {facultyNeedingAttention.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-12 h-12 bg-green-50 text-faculty-available rounded-full flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h3 className="font-medium mb-1">All Covered</h3>
                  <p className="text-sm text-muted-foreground">
                    All absent faculty members have been assigned substitutes.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 staggered-animation">
                  {facultyNeedingAttention.map(faculty => (
                    <FacultyCard 
                      key={faculty.id} 
                      faculty={faculty} 
                      onUpdate={updateData}
                      onEdit={() => navigate(`/faculty?edit=${faculty.id}`)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-4 px-4"
                onClick={() => navigate('/faculty')}
              >
                <div className="flex">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-3">
                    <Users size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Manage Faculty</div>
                    <div className="text-xs text-muted-foreground">
                      Add, edit or update faculty status
                    </div>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-4 px-4"
                onClick={() => navigate('/timetable')}
              >
                <div className="flex">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-3">
                    <Calendar size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">View Timetables</div>
                    <div className="text-xs text-muted-foreground">
                      Check and manage faculty schedules
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Substitutions */}
        {recentSubstitutions.length > 0 && (
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Substitutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 staggered-animation">
                {recentSubstitutions.map(faculty => (
                  <FacultyCard 
                    key={faculty.id} 
                    faculty={faculty} 
                    onUpdate={updateData}
                    onEdit={() => navigate(`/faculty?edit=${faculty.id}`)}
                    showControls={false}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default Index;
