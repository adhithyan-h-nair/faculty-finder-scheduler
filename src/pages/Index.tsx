
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import FacultyCard from '@/components/faculty/FacultyCard';
import { useToast } from '@/hooks/use-toast';
import { getFacultyStatusCounts, facultyData, removeFaculty } from '@/lib/data';
import { UserPlus } from 'lucide-react';
import FacultyForm from '@/components/faculty/FacultyForm';

const IndexPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(0);
  
  // Get first few faculty members for showcase
  const featuredFaculty = facultyData.slice(0, 3);
  
  // Status counts from data
  const statusCounts = getFacultyStatusCounts();
  
  const handleAddFaculty = () => {
    setIsFormOpen(true);
  };
  
  const handleFormSave = () => {
    setRefreshData(prev => prev + 1);
    toast({
      title: "Faculty Updated",
      description: "Faculty information has been saved successfully.",
    });
  };
  
  const handleDelete = (faculty) => {
    const success = removeFaculty(faculty.id);
    if (success) {
      toast({
        title: "Faculty Removed",
        description: `${faculty.name} has been removed successfully.`,
      });
      setRefreshData(prev => prev + 1);
    } else {
      toast({
        title: "Error",
        description: "Failed to remove faculty member.",
        variant: "destructive",
      });
    }
  };
  
  const handleEdit = () => {
    navigate('/faculty');
  };

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Faculty Substitution System</h1>
          <p className="text-muted-foreground">
            Manage faculty availability and substitute assignments
          </p>
        </div>
        
        <Button onClick={handleAddFaculty} className="mt-4 md:mt-0 bg-primary text-white">
          <UserPlus size={16} className="mr-2" />
          Add Faculty
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-1">Available</h3>
          <p className="text-3xl font-bold text-faculty-available">{statusCounts.available}</p>
          <p className="text-sm text-muted-foreground">Faculty members</p>
        </div>
        
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-1">Absent</h3>
          <p className="text-3xl font-bold text-faculty-absent">{statusCounts.absent}</p>
          <p className="text-sm text-muted-foreground">Faculty members</p>
        </div>
        
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-1">Substituting</h3>
          <p className="text-3xl font-bold text-faculty-substituting">{statusCounts.substituting}</p>
          <p className="text-sm text-muted-foreground">Faculty members</p>
        </div>
        
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-1">Substituted</h3>
          <p className="text-3xl font-bold text-faculty-substituted">{statusCounts.substituted}</p>
          <p className="text-sm text-muted-foreground">Faculty members</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Featured Faculty</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 staggered-animation">
        {featuredFaculty.map(faculty => (
          <FacultyCard
            key={faculty.id}
            faculty={faculty}
            onUpdate={handleFormSave}
            onEdit={handleEdit}
            onDelete={() => handleDelete(faculty)}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => navigate('/faculty')}
          variant="outline" 
          className="bg-white text-primary border-primary/50 hover:bg-primary/10"
        >
          View All Faculty
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 mt-12">Recent Substitutions</h2>
      
      <div className="glass-card mb-8">
        <div className="flex flex-col">
          {facultyData
            .filter(f => f.status === 'substituting' || f.status === 'substituted')
            .slice(0, 3)
            .map(faculty => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                onUpdate={handleFormSave}
                onEdit={handleEdit}
                onDelete={() => handleDelete(faculty)}
                showControls={false}
              />
            ))}
            
          {facultyData.filter(f => f.status === 'substituting' || f.status === 'substituted').length === 0 && (
            <p className="text-center py-4 text-muted-foreground">No recent substitutions</p>
          )}
        </div>
      </div>
      
      <FacultyForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleFormSave}
      />
    </PageContainer>
  );
};

export default IndexPage;
