
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getFacultyById, getStudentById } from '@/lib/data';

const UserCredentials = () => {
  const { users } = useAuth();

  // Function to get user display info
  const getUserInfo = (userId: string, role: string, facultyId?: string, studentId?: string) => {
    if (role === 'faculty' && facultyId) {
      const faculty = getFacultyById(facultyId);
      return faculty ? faculty.name : 'Unknown Faculty';
    } else if (role === 'student' && studentId) {
      const student = getStudentById(studentId);
      return student ? student.name : 'Unknown Student';
    } else if (role === 'admin') {
      return 'System Administrator';
    }
    return 'Unknown User';
  };

  // Function to get role badge color
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'faculty':
        return 'bg-violet-100 text-violet-800 hover:bg-violet-200';
      case 'student':
        return 'bg-rose-100 text-rose-800 hover:bg-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Credentials</CardTitle>
        <CardDescription>View all user credentials for administrators</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {getUserInfo(user.id, user.role, user.facultyId, user.studentId)}
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeClass(user.role)} variant="outline">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserCredentials;
