
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import FacultyCard from '@/components/faculty/FacultyCard';
import FacultyForm from '@/components/faculty/FacultyForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Faculty, FacultyStatus } from '@/lib/types';
import { facultyData, getFacultyById, removeFaculty } from '@/lib/data';
import { UserPlus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const FacultyPage = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [filteredList, setFilteredList] = useState<Faculty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FacultyStatus | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editFaculty, setEditFaculty] = useState<Faculty | undefined>(undefined);
  
  // Handle query param for editing
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      const faculty = getFacultyById(editId);
      if (faculty) {
        setEditFaculty(faculty);
        setIsFormOpen(true);
        // Clear the parameter after handling
        setSearchParams({});
      }
    }
  }, [searchParams, setSearchParams]);
  
  // Load faculty data
  useEffect(() => {
    // Directly use the facultyData import
    setFacultyList([...facultyData]);
    setFilteredList([...facultyData]);
  }, []);
  
  // Handle filtering
  useEffect(() => {
    let filtered = facultyList;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faculty => 
          faculty.name.toLowerCase().includes(term) || 
          faculty.department.toLowerCase().includes(term) ||
          faculty.email.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(faculty => faculty.status === statusFilter);
    }
    
    setFilteredList(filtered);
  }, [facultyList, searchTerm, statusFilter]);
  
  const handleAddNew = () => {
    setEditFaculty(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (faculty: Faculty) => {
    setEditFaculty(faculty);
    setIsFormOpen(true);
  };
  
  const handleDelete = (faculty: Faculty) => {
    const success = removeFaculty(faculty.id);
    if (success) {
      toast({
        title: "Faculty Removed",
        description: `${faculty.name} has been removed successfully.`,
      });
      // Update the lists
      setFacultyList([...facultyData]);
      setFilteredList([...facultyData]);
    } else {
      toast({
        title: "Error",
        description: "Failed to remove faculty member.",
        variant: "destructive",
      });
    }
  };
  
  const handleFormSave = () => {
    // Refresh data - in real app, this would be an API call
    setFacultyList([...facultyData]);
    setFilteredList([...facultyData]);
  };
  
  const statusOptions: { value: FacultyStatus | 'all', label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'absent', label: 'Absent' },
    { value: 'substituting', label: 'Substituting' },
    { value: 'substituted', label: 'Substituted' },
  ];
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Faculty Management</h1>
          <p className="text-muted-foreground">
            Manage faculty members and their status
          </p>
        </div>
        
        <Button onClick={handleAddNew} className="bg-primary text-white">
          <UserPlus size={16} className="mr-2" />
          Add Faculty
        </Button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as FacultyStatus | 'all')}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Faculty List */}
      <div 
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 staggered-animation",
          filteredList.length === 0 && "grid-cols-1"
        )}
      >
        {filteredList.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No faculty found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredList.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              onUpdate={handleFormSave}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showControls={true}
            />
          ))
        )}
      </div>
      
      {/* Add/Edit Form */}
      <FacultyForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleFormSave}
        editFaculty={editFaculty}
      />
    </PageContainer>
  );
};

export default FacultyPage;
