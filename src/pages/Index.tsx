
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import StatusOverview from '@/components/dashboard/StatusOverview';
import FacultyCard from '@/components/faculty/FacultyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getFacultyStatusCounts, facultyData, removeFaculty } from '@/lib/data';
import { Users, Calendar, AlertTriangle, PieChart, BarChart } from 'lucide-react';
import { StatusCount, Faculty } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
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
    try {
      const counts = getFacultyStatusCounts();
      setStatusCounts(counts);
    } catch (error) {
      console.error("Error loading faculty data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensure data is loaded on mount
    updateData();
  }, []);

  // Handler for delete action
  const handleDelete = (faculty: Faculty) => {
    const success = removeFaculty(faculty.id);
    if (success) {
      toast({
        title: "Faculty Removed",
        description: `${faculty.name} has been removed successfully.`,
      });
      updateData();
    } else {
      toast({
        title: "Error",
        description: "Failed to remove faculty member.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageContainer>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Faculty Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Overview of faculty status and scheduling
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {/* Chart Toggle */}
        <div className="flex justify-end mb-2 sm:mb-4">
          <ToggleGroup 
            type="single" 
            value={chartType} 
            onValueChange={(value: string) => {
              if (value === 'pie' || value === 'bar') {
                setChartType(value);
              }
            }}
          >
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Faculty Needing Attention */}
          <Card className="lg:col-span-2 shadow-sm border-gray-200/80 hover:shadow-md transition-all">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg flex items-center">
                <AlertTriangle size={16} className="mr-2 text-faculty-absent" />
                Faculty Needing Attention
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate('/faculty')}
                className="text-xs sm:text-sm h-8"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {facultyNeedingAttention.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 text-faculty-available rounded-full flex items-center justify-center mb-3">
                    <Users size={isMobile ? 18 : 20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium mb-1">All Covered</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    All absent faculty members have been assigned substitutes.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {facultyNeedingAttention.map(faculty => (
                    <FacultyCard 
                      key={faculty.id} 
                      faculty={faculty} 
                      onUpdate={updateData}
                      onEdit={() => navigate(`/faculty?edit=${faculty.id}`)}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="shadow-sm border-gray-200/80 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-3 px-3 sm:px-4 hover:bg-secondary/50 transition-all"
                onClick={() => navigate('/faculty')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-3">
                    <Users size={isMobile ? 16 : 20} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base">Manage Faculty</div>
                    <div className="text-xs text-muted-foreground">
                      Add, edit or update faculty status
                    </div>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-3 px-3 sm:px-4 hover:bg-secondary/50 transition-all"
                onClick={() => navigate('/timetable')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-3">
                    <Calendar size={isMobile ? 16 : 20} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base">View Timetables</div>
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
          <Card className="shadow-sm border-gray-200/80 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-base sm:text-lg">Recent Substitutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {recentSubstitutions.map(faculty => (
                  <FacultyCard 
                    key={faculty.id} 
                    faculty={faculty} 
                    onUpdate={updateData}
                    onEdit={() => navigate(`/faculty?edit=${faculty.id}`)}
                    onDelete={handleDelete}
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
