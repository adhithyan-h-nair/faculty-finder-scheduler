
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Faculty, FacultyStatus } from '@/lib/types';
import { addFaculty } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  department: z.string().min(2, { message: "Department is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  status: z.enum(['available', 'absent', 'substituting', 'substituted']),
});

type FormValues = z.infer<typeof formSchema>;

interface FacultyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  editFaculty?: Faculty;
}

const FacultyForm = ({ open, onOpenChange, onSave, editFaculty }: FacultyFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues: FormValues = editFaculty 
    ? {
        name: editFaculty.name,
        department: editFaculty.department,
        email: editFaculty.email,
        phone: editFaculty.phone || '',
        status: editFaculty.status,
      }
    : {
        name: '',
        department: '',
        email: '',
        phone: '',
        status: 'available',
      };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Handle create or update
      if (editFaculty) {
        // In a real app, this would call an API
        console.log("Updating faculty:", { ...editFaculty, ...data });
        toast({
          title: "Faculty Updated",
          description: `${data.name} has been updated.`,
        });
      } else {
        // Create new faculty with all required fields
        // Ensure all required fields are present and explicitly type the object
        const newFacultyData: Omit<Faculty, 'id'> = {
          name: data.name,
          department: data.department,
          email: data.email,
          status: data.status,
          phone: data.phone
        };
        
        const newFaculty = addFaculty(newFacultyData);
        console.log("New faculty created:", newFaculty);
        toast({
          title: "Faculty Added",
          description: `${data.name} has been added to the faculty.`,
        });
      }
      
      onSave();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save faculty information.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-900 border border-gray-200 shadow-lg max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">
            {editFaculty ? 'Edit Faculty' : 'Add New Faculty'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. John Doe" {...field} className="bg-white text-gray-900 border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} className="bg-white text-gray-900 border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="faculty@university.edu" {...field} className="bg-white text-gray-900 border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="555-123-4567" {...field} className="bg-white text-gray-900 border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="substituting">Substituting</SelectItem>
                      <SelectItem value="substituted">Substituted</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)} className="font-medium bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="font-medium bg-primary text-white hover:bg-blue-600">
                {isSubmitting ? 'Saving...' : (editFaculty ? 'Update' : 'Add Faculty')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyForm;
