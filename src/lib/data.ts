import { Day, Faculty, FacultyStatus, Period, Semester, StatusCount, Student, User, UserRole, SubstitutionLogEntry } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for faculty
export const facultyData: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. John Smith',
    department: 'Computer Science',
    email: 'john.smith@university.edu',
    phone: '555-123-4567',
    status: 'available',
    username: 'jsmith',
    password: 'password123'
  },
  {
    id: 'f2',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    email: 'sarah.johnson@university.edu',
    phone: '555-234-5678',
    status: 'available',
    username: 'sjohnson',
    password: 'password123'
  },
  {
    id: 'f3',
    name: 'Prof. Michael Brown',
    department: 'Electrical Engineering',
    email: 'michael.brown@university.edu',
    phone: '555-345-6789',
    status: 'available',
    username: 'mbrown',
    password: 'password123'
  },
  {
    id: 'f4',
    name: 'Dr. Emily Davis',
    department: 'Computer Science',
    email: 'emily.davis@university.edu',
    phone: '555-456-7890',
    status: 'available',
    username: 'edavis',
    password: 'password123'
  },
  {
    id: 'f5',
    name: 'Prof. Robert Wilson',
    department: 'Electrical Engineering',
    email: 'robert.wilson@university.edu',
    phone: '555-567-8901',
    status: 'available',
    username: 'rwilson',
    password: 'password123'
  },
  {
    id: 'f6',
    name: 'Dr. Jennifer Lee',
    department: 'Computer Science',
    email: 'jennifer.lee@university.edu',
    phone: '555-678-9012',
    status: 'available',
    username: 'jlee',
    password: 'password123'
  },
  {
    id: 'f7',
    name: 'Prof. David Martinez',
    department: 'Mechanical Engineering',
    email: 'david.martinez@university.edu',
    phone: '555-789-0123',
    status: 'available',
    username: 'dmartinez',
    password: 'password123'
  },
  {
    id: 'f8',
    name: 'Dr. Lisa Anderson',
    department: 'Electrical Engineering',
    email: 'lisa.anderson@university.edu',
    phone: '555-890-1234',
    status: 'available',
    username: 'landerson',
    password: 'password123'
  }
];

// Mock data for students
export const studentData: Student[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    rollNumber: 'CS2021001',
    semester: '5th',
    department: 'Computer Science',
    email: 'alex.johnson@university.edu',
    username: 'ajohnson',
    password: 'password123'
  },
  {
    id: 's2',
    name: 'Emma Williams',
    rollNumber: 'CS2021002',
    semester: '5th',
    department: 'Computer Science',
    email: 'emma.williams@university.edu',
    username: 'ewilliams',
    password: 'password123'
  },
  {
    id: 's3',
    name: 'Ryan Davis',
    rollNumber: 'EE2021001',
    semester: '5th',
    department: 'Electrical Engineering',
    email: 'ryan.davis@university.edu',
    username: 'rdavis',
    password: 'password123'
  },
  {
    id: 's4',
    name: 'Sophia Miller',
    rollNumber: 'CS2021003',
    semester: '5th',
    department: 'Computer Science',
    email: 'sophia.miller@university.edu',
    username: 'smiller',
    password: 'password123'
  },
  {
    id: 's5',
    name: 'Ethan Brown',
    rollNumber: 'ME2021001',
    semester: '5th',
    department: 'Mechanical Engineering',
    email: 'ethan.brown@university.edu',
    username: 'ebrown',
    password: 'password123'
  }
];

// Mock data for users
export const userData: User[] = [
  {
    id: 'u1',
    role: 'admin',
    username: 'admin',
    password: 'admin123'
  },
  {
    id: 'u2',
    role: 'faculty',
    username: 'jsmith',
    password: 'password123',
    facultyId: 'f1'
  },
  {
    id: 'u3',
    role: 'faculty',
    username: 'sjohnson',
    password: 'password123',
    facultyId: 'f2'
  },
  {
    id: 'u4',
    role: 'student',
    username: 'ajohnson',
    password: 'password123',
    studentId: 's1'
  }
];

// Mock data for timetables
const timetableData: Period[] = [
  // Dr. John Smith's periods
  {
    id: 'p1',
    day: 'Monday',
    periodNumber: 1,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS301',
    courseTitle: 'Data Structures',
    facultyId: 'f1',
    semester: '5th',
    department: 'Computer Science'
  },
  {
    id: 'p2',
    day: 'Monday',
    periodNumber: 3,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    courseCode: 'CS302',
    courseTitle: 'Algorithms',
    facultyId: 'f1',
    semester: '5th',
    department: 'Computer Science'
  },
  {
    id: 'p3',
    day: 'Tuesday',
    periodNumber: 2,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    courseCode: 'CS301',
    courseTitle: 'Data Structures',
    facultyId: 'f1',
    semester: '5th',
    department: 'Computer Science'
  },
  {
    id: 'p4',
    day: 'Wednesday',
    periodNumber: 4,
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    courseCode: 'CS302',
    courseTitle: 'Algorithms',
    facultyId: 'f1',
    semester: '5th',
    department: 'Computer Science'
  },
  {
    id: 'p5',
    day: 'Thursday',
    periodNumber: 1,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS301',
    courseTitle: 'Data Structures',
    facultyId: 'f1',
    semester: '5th',
    department: 'Computer Science'
  },
  
  // Dr. Sarah Johnson's periods
  {
    id: 'p6',
    day: 'Monday',
    periodNumber: 2,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    courseCode: 'CS401',
    courseTitle: 'Database Systems',
    facultyId: 'f2',
    semester: '7th',
    department: 'Computer Science'
  },
  {
    id: 'p7',
    day: 'Tuesday',
    periodNumber: 3,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    courseCode: 'CS402',
    courseTitle: 'Web Development',
    facultyId: 'f2',
    semester: '7th',
    department: 'Computer Science'
  },
  {
    id: 'p8',
    day: 'Wednesday',
    periodNumber: 2,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    courseCode: 'CS401',
    courseTitle: 'Database Systems',
    facultyId: 'f2',
    semester: '7th',
    department: 'Computer Science'
  },
  {
    id: 'p9',
    day: 'Thursday',
    periodNumber: 3,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    courseCode: 'CS402',
    courseTitle: 'Web Development',
    facultyId: 'f2',
    semester: '7th',
    department: 'Computer Science'
  },
  {
    id: 'p10',
    day: 'Friday',
    periodNumber: 1,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS401',
    courseTitle: 'Database Systems',
    facultyId: 'f2',
    semester: '7th',
    department: 'Computer Science'
  },
  
  // Prof. Michael Brown's periods
  {
    id: 'p11',
    day: 'Monday',
    periodNumber: 4,
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    courseCode: 'EE301',
    courseTitle: 'Circuit Theory',
    facultyId: 'f3',
    semester: '5th',
    department: 'Electrical Engineering'
  },
  {
    id: 'p12',
    day: 'Tuesday',
    periodNumber: 4,
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    courseCode: 'EE302',
    courseTitle: 'Digital Electronics',
    facultyId: 'f3',
    semester: '5th',
    department: 'Electrical Engineering'
  },
  {
    id: 'p13',
    day: 'Wednesday',
    periodNumber: 1,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseCode: 'EE301',
    courseTitle: 'Circuit Theory',
    facultyId: 'f3',
    semester: '5th',
    department: 'Electrical Engineering'
  },
  
  // Dr. Emily Davis's periods
  {
    id: 'p14',
    day: 'Monday',
    periodNumber: 5,
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseCode: 'CS201',
    courseTitle: 'Programming Fundamentals',
    facultyId: 'f4',
    semester: '3rd',
    department: 'Computer Science'
  },
  {
    id: 'p15',
    day: 'Wednesday',
    periodNumber: 5,
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseCode: 'CS201',
    courseTitle: 'Programming Fundamentals',
    facultyId: 'f4',
    semester: '3rd',
    department: 'Computer Science'
  },
  {
    id: 'p16',
    day: 'Friday',
    periodNumber: 5,
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseCode: 'CS201',
    courseTitle: 'Programming Fundamentals',
    facultyId: 'f4',
    semester: '3rd',
    department: 'Computer Science'
  }
];

// Substitution log
const substitutionLog: SubstitutionLogEntry[] = [
  {
    id: 'sl1',
    absentFacultyId: 'f1',
    absentFacultyName: 'Dr. John Smith',
    substituteId: 'f2',
    substituteName: 'Dr. Sarah Johnson',
    periodId: 'p1',
    course: 'CS301 - Data Structures',
    day: 'Monday',
    timeSlot: '09:00 AM - 10:00 AM',
    date: new Date(Date.now() - 86400000), // Yesterday
    success: true
  },
  {
    id: 'sl2',
    absentFacultyId: 'f3',
    absentFacultyName: 'Prof. Michael Brown',
    substituteId: 'f5',
    substituteName: 'Prof. Robert Wilson',
    periodId: 'p11',
    course: 'EE301 - Circuit Theory',
    day: 'Monday',
    timeSlot: '12:00 PM - 01:00 PM',
    date: new Date(Date.now() - 172800000), // 2 days ago
    success: true
  },
  {
    id: 'sl3',
    absentFacultyId: 'f4',
    absentFacultyName: 'Dr. Emily Davis',
    periodId: 'p14',
    course: 'CS201 - Programming Fundamentals',
    day: 'Monday',
    timeSlot: '02:00 PM - 03:00 PM',
    date: new Date(Date.now() - 259200000), // 3 days ago
    success: false,
    reason: 'No eligible substitute found with matching expertise'
  }
];

// Keep track of absent faculty with dates
let absentFaculty: Record<string, Date> = {};

// Keep track of substitutions
let periodSubstitutions: Record<string, {
  originalFacultyId: string;
  substituteId: string;
  substituteSubject?: string;
}> = {};

// Authentication function for login
export const authenticateUser = (username: string, password: string): User | null => {
  const user = userData.find(
    (user) => user.username === username && user.password === password
  );
  return user || null;
};

// Get all users function for admin
export const getAllUsers = (): User[] => {
  return [...userData];
};

// Function to update a user
export const updateUser = (userId: string, updatedData: Partial<User>): User | null => {
  const userIndex = userData.findIndex(u => u.id === userId);
  if (userIndex === -1) return null;
  
  userData[userIndex] = {
    ...userData[userIndex],
    ...updatedData
  };
  
  return userData[userIndex];
};

// Function to update faculty credentials
export const updateFacultyCredentials = (facultyId: string, username: string, password: string): boolean => {
  // First update the faculty record
  const faculty = facultyData.find(f => f.id === facultyId);
  if (!faculty) return false;
  
  faculty.username = username;
  faculty.password = password;
  
  // Then update the user record
  const user = userData.find(u => u.facultyId === facultyId);
  if (user) {
    user.username = username;
    user.password = password;
  }
  
  return true;
};

// ... keep existing code (all other functions)
