
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, Search, Edit, Lock } from 'lucide-react';
import { Faculty, FacultyStatus } from '@/lib/types';
import { getFacultyByRole, markFacultyAbsent } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import FacultyCard from '@/components/faculty/FacultyCard';
import FacultyForm from '@/components/faculty/FacultyForm';
import FacultyCredentialsForm from '@/components/faculty/FacultyCredentialsForm';

const FacultyPage = () => {
  const { role } = useAuth();
  const [facultyData, setFacultyData] = useState<Faculty[]>(getFacultyByRole('faculty'));
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<FacultyStatus | 'all'>('all');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [openCredentialsDialog, setOpenCredentialsDialog] = useState(false);

  // Handler for marking faculty as absent/available
  const handleMarkAbsent = (id: string, isAbsent: boolean) => {
    markFacultyAbsent(id, isAbsent);
    // Refresh the data
    setFacultyData(getFacultyByRole('faculty'));
  };

  // Handler for successful faculty addition
  const handleFacultyAdded = () => {
    setOpenAddDialog(false);
    setFacultyData(getFacultyByRole('faculty'));
  };
  
  // Handler for editing credentials
  const handleEditCredentials = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setOpenCredentialsDialog(true);
  };
  
  // Handler for successful credentials update
  const handleCredentialsUpdated = () => {
    setFacultyData(getFacultyByRole('faculty'));
  };

  // Filter faculty based on search term and status
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || faculty.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Faculty Management</h1>
        {role === 'admin' && (
          <Button onClick={() => setOpenAddDialog(true)}>Add New Faculty</Button>
        )}
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search faculty by name, department, or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tabs 
                value={statusFilter} 
                onValueChange={(v) => setStatusFilter(v as FacultyStatus | 'all')}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="absent">Absent</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredFaculty.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-lg text-muted-foreground">No faculty members found matching your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredFaculty.map(faculty => (
            <FacultyCard 
              key={faculty.id} 
              faculty={faculty} 
              viewMode={viewMode} 
              onMarkAbsent={handleMarkAbsent}
              isAdmin={role === 'admin'}
              actionButtons={role === 'admin' ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleEditCredentials(faculty)}
                >
                  <Lock className="w-3.5 h-3.5 mr-1" />
                  Edit Credentials
                </Button>
              ) : undefined}
            />
          ))}
        </div>
      )}
      
      {openAddDialog && (
        <FacultyForm
          open={openAddDialog}
          onOpenChange={setOpenAddDialog}
          onSuccess={handleFacultyAdded}
        />
      )}
      
      {selectedFaculty && openCredentialsDialog && (
        <FacultyCredentialsForm
          facultyId={selectedFaculty.id}
          facultyName={selectedFaculty.name}
          username={selectedFaculty.username}
          open={openCredentialsDialog}
          onOpenChange={setOpenCredentialsDialog}
          onSuccess={handleCredentialsUpdated}
        />
      )}
    </PageContainer>
  );
};

export default FacultyPage;
