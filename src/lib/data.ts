import { Faculty, Period, FacultyStatus, Day, Student, User, UserRole, Semester } from "./types";

// Sample faculty data with usernames and passwords
export const facultyData: Faculty[] = [
  {
    id: "fac-001",
    name: "Dr. Alan Turing",
    department: "Computer Science",
    email: "alan.turing@faculty.edu",
    phone: "555-123-4567",
    status: "available",
    username: "alan.turing",
    password: "password123"
  },
  {
    id: "fac-002",
    name: "Dr. Marie Curie",
    department: "Physics",
    email: "marie.curie@faculty.edu",
    phone: "555-234-5678",
    status: "absent",
    substitutedBy: "fac-003",
    username: "marie.curie",
    password: "password123"
  },
  {
    id: "fac-003",
    name: "Dr. Albert Einstein",
    department: "Physics",
    email: "albert.einstein@faculty.edu",
    phone: "555-345-6789",
    status: "substituting",
    substituting: "fac-002",
    username: "albert.einstein",
    password: "password123"
  },
  {
    id: "fac-004",
    name: "Dr. Ada Lovelace",
    department: "Mathematics",
    email: "ada.lovelace@faculty.edu",
    phone: "555-456-7890",
    status: "available",
    username: "ada.lovelace",
    password: "password123"
  },
  {
    id: "fac-005",
    name: "Dr. Nikola Tesla",
    department: "Electrical Engineering",
    email: "nikola.tesla@faculty.edu",
    phone: "555-567-8901",
    status: "absent",
    username: "nikola.tesla",
    password: "password123"
  },
  {
    id: "fac-006",
    name: "Dr. Grace Hopper",
    department: "Computer Science",
    email: "grace.hopper@faculty.edu",
    phone: "555-678-9012",
    status: "available",
    username: "grace.hopper",
    password: "password123"
  },
  {
    id: "fac-007",
    name: "Dr. Isaac Newton",
    department: "Physics",
    email: "isaac.newton@faculty.edu",
    phone: "555-789-0123",
    status: "substituted",
    substitutedBy: "fac-006",
    username: "isaac.newton",
    password: "password123"
  },
];

// Sample student data
export const studentData: Student[] = [
  {
    id: "std-001",
    name: "John Doe",
    rollNumber: "CS-001",
    semester: "1st",
    department: "Computer Science",
    email: "john.doe@student.edu",
    username: "john.doe",
    password: "password123"
  },
  {
    id: "std-002",
    name: "Jane Smith",
    rollNumber: "CS-002",
    semester: "1st",
    department: "Computer Science",
    email: "jane.smith@student.edu",
    username: "jane.smith",
    password: "password123"
  },
  {
    id: "std-003",
    name: "Michael Brown",
    rollNumber: "PH-001",
    semester: "2nd",
    department: "Physics",
    email: "michael.brown@student.edu",
    username: "michael.brown",
    password: "password123"
  },
  {
    id: "std-004",
    name: "Sarah Johnson",
    rollNumber: "PH-002",
    semester: "2nd",
    department: "Physics",
    email: "sarah.johnson@student.edu",
    username: "sarah.johnson",
    password: "password123"
  },
  {
    id: "std-005",
    name: "David Wilson",
    rollNumber: "MA-001",
    semester: "3rd",
    department: "Mathematics",
    email: "david.wilson@student.edu",
    username: "david.wilson",
    password: "password123"
  },
  {
    id: "std-006",
    name: "Emily Davis",
    rollNumber: "EE-001",
    semester: "4th",
    department: "Electrical Engineering",
    email: "emily.davis@student.edu",
    username: "emily.davis",
    password: "password123"
  }
];

// Admin user
export const adminUser: User = {
  id: "admin-001",
  username: "admin",
  password: "admin",
  role: "admin"
};

// Generate users from faculty and students
export const generateUsers = (): User[] => {
  const users: User[] = [adminUser];
  
  facultyData.forEach(faculty => {
    users.push({
      id: `user-${faculty.id}`,
      username: faculty.username,
      password: faculty.password,
      role: "faculty",
      facultyId: faculty.id
    });
  });
  
  studentData.forEach(student => {
    users.push({
      id: `user-${student.id}`,
      username: student.username,
      password: student.password,
      role: "student",
      studentId: student.id
    });
  });
  
  return users;
};

// Users data
export const userData = generateUsers();

// Time periods
const periods = [
  { number: 1, start: "08:00", end: "08:50" },
  { number: 2, start: "09:00", end: "09:50" },
  { number: 3, start: "10:00", end: "10:50" },
  { number: 4, start: "11:00", end: "11:50" },
  { number: 5, start: "12:00", end: "12:50" },
  { number: 6, start: "14:00", end: "14:50" },
  { number: 7, start: "15:00", end: "15:50" },
  { number: 8, start: "16:00", end: "16:50" },
];

// Course codes
const courses = [
  { code: "CS101", title: "Introduction to Computer Science", semester: "1st", department: "Computer Science" },
  { code: "CS201", title: "Data Structures", semester: "2nd", department: "Computer Science" },
  { code: "CS301", title: "Algorithms", semester: "3rd", department: "Computer Science" },
  { code: "CS401", title: "Artificial Intelligence", semester: "4th", department: "Computer Science" },
  { code: "PH101", title: "Introduction to Physics", semester: "1st", department: "Physics" },
  { code: "PH201", title: "Mechanics", semester: "2nd", department: "Physics" },
  { code: "PH301", title: "Electromagnetism", semester: "3rd", department: "Physics" },
  { code: "PH401", title: "Quantum Mechanics", semester: "4th", department: "Physics" },
  { code: "MA101", title: "Calculus I", semester: "1st", department: "Mathematics" },
  { code: "MA201", title: "Linear Algebra", semester: "2nd", department: "Mathematics" },
  { code: "MA301", title: "Differential Equations", semester: "3rd", department: "Mathematics" },
  { code: "EE101", title: "Circuit Theory", semester: "1st", department: "Electrical Engineering" },
  { code: "EE201", title: "Digital Electronics", semester: "2nd", department: "Electrical Engineering" },
];

// Generate sample timetable data
const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Storage for all generated timetables to maintain consistency
let allTimetables: Record<string, Period[]> = {};

// Function to get today's day name
export const getTodayDay = (): Day => {
  const dayIndex = new Date().getDay() - 1; // 0 is Sunday in JS
  if (dayIndex < 0 || dayIndex >= days.length) {
    return "Monday"; // Default to Monday if weekend
  }
  return days[dayIndex];
};

// Generate timetable for a faculty
export const generateTimetable = (facultyId: string): Period[] => {
  // If we've already generated this timetable, return it
  if (allTimetables[facultyId]) {
    return allTimetables[facultyId];
  }
  
  const timetable: Period[] = [];
  const faculty = facultyData.find(f => f.id === facultyId);
  
  if (!faculty) return [];
  
  // Generate 3-4 periods per day
  days.forEach(day => {
    const periodsPerDay = Math.floor(Math.random() * 2) + 3; // 3 or 4 periods
    const dayPeriods = new Set<number>();
    
    // Select random periods for this day
    while (dayPeriods.size < periodsPerDay) {
      const periodIndex = Math.floor(Math.random() * periods.length);
      dayPeriods.add(periodIndex);
    }
    
    // Convert to actual period objects
    dayPeriods.forEach(periodIndex => {
      const period = periods[periodIndex];
      
      // Find courses in this faculty's department
      const departmentCourses = courses.filter(c => c.department === faculty.department);
      const courseIndex = Math.floor(Math.random() * departmentCourses.length);
      const course = departmentCourses[courseIndex];
      
      let periodData: Period = {
        id: `${facultyId}-${day}-${period.number}`,
        day: day,
        periodNumber: period.number,
        startTime: period.start,
        endTime: period.end,
        courseCode: course.code,
        courseTitle: course.title,
        facultyId: facultyId,
        semester: course.semester as Semester,
        department: course.department
      };
      
      // If faculty is substituted, add original faculty
      if (faculty.status === 'substituted' && faculty.substitutedBy) {
        periodData.originalFacultyId = facultyId;
        periodData.facultyId = faculty.substitutedBy;
      }
      
      // If faculty is substituting, check if this period belongs to them
      if (faculty.status === 'substituting' && faculty.substituting) {
        // 50% chance this is their regular period, 50% chance it's a substitution
        if (Math.random() > 0.5) {
          periodData.originalFacultyId = faculty.substituting;
        }
      }
      
      timetable.push(periodData);
    });
  });
  
  // Store this timetable
  allTimetables[facultyId] = timetable;
  
  return timetable;
};

// Get all timetables
export const getAllTimetables = () => {
  return facultyData.map(faculty => ({
    facultyId: faculty.id,
    periods: generateTimetable(faculty.id)
  }));
};

// Get timetable for a specific semester and department
export const getTimetableBySemesterAndDepartment = (semester: Semester, department: string): Period[] => {
  let allPeriods: Period[] = [];
  
  // Get all faculty timetables
  facultyData.forEach(faculty => {
    const facultyTimetable = generateTimetable(faculty.id);
    
    // Filter periods by semester and department
    const filteredPeriods = facultyTimetable.filter(
      period => period.semester === semester && period.department === department
    );
    
    allPeriods = [...allPeriods, ...filteredPeriods];
  });
  
  return allPeriods;
};

// Get faculty status counts
export const getFacultyStatusCounts = () => {
  return facultyData.reduce(
    (counts, faculty) => {
      counts[faculty.status]++;
      return counts;
    },
    { available: 0, absent: 0, substituting: 0, substituted: 0 }
  );
};

// Function to get a faculty by ID
export const getFacultyById = (id: string) => {
  return facultyData.find(faculty => faculty.id === id);
};

// Function to get a student by ID
export const getStudentById = (id: string) => {
  return studentData.find(student => student.id === id);
};

// Function to get a faculty's timetable
export const getFacultyTimetable = (id: string) => {
  return generateTimetable(id);
};

// Function to get a faculty's timetable for today
export const getFacultyTimetableForToday = (id: string) => {
  const todayDay = getTodayDay();
  return generateTimetable(id).filter(period => period.day === todayDay);
};

// Function to authenticate a user
export const authenticateUser = (username: string, password: string): User | null => {
  const user = userData.find(u => u.username === username && u.password === password);
  return user || null;
};

// Update a faculty's status
export const updateFacultyStatus = (
  id: string, 
  status: FacultyStatus, 
  substitutedBy?: string,
  substituting?: string
) => {
  const facultyIndex = facultyData.findIndex(f => f.id === id);
  
  if (facultyIndex >= 0) {
    facultyData[facultyIndex] = {
      ...facultyData[facultyIndex],
      status,
      substitutedBy,
      substituting
    };
    
    // Clear the cached timetable to regenerate with new status
    if (allTimetables[id]) {
      delete allTimetables[id];
    }
    
    return facultyData[facultyIndex];
  }
  
  return null;
};

// Find faculty members who can substitute based on enhanced criteria
export const findPotentialSubstitutes = (period: Period, absentFacultyId: string): Faculty[] => {
  const absentFaculty = getFacultyById(absentFacultyId);
  if (!absentFaculty) return [];
  
  // First, find all faculty in the same department
  const sameDeptFaculty = facultyData.filter(f => 
    f.id !== absentFacultyId && 
    f.department === absentFaculty.department && 
    f.status === 'available'
  );
  
  // Check which faculty members are free during this period
  const availableFaculty = sameDeptFaculty.filter(faculty => {
    const facultyTimetable = getFacultyTimetable(faculty.id);
    // Check if faculty has no class at this time on this day
    const conflictingPeriod = facultyTimetable.find(p => 
      p.day === period.day && 
      p.periodNumber === period.periodNumber
    );
    
    return !conflictingPeriod;
  });
  
  // Enhanced criteria: Prioritize faculty who teach the same semester
  return availableFaculty.sort((a, b) => {
    const facultyATimetable = getFacultyTimetable(a.id);
    const facultyBTimetable = getFacultyTimetable(b.id);
    
    // Check if either faculty teaches the same semester as the period
    const aTeachesSameSemester = facultyATimetable.some(p => p.semester === period.semester);
    const bTeachesSameSemester = facultyBTimetable.some(p => p.semester === period.semester);
    
    if (aTeachesSameSemester && !bTeachesSameSemester) return -1;
    if (!aTeachesSameSemester && bTeachesSameSemester) return 1;
    
    // If both or neither teach the same semester, prioritize by teaching load
    return facultyATimetable.length - facultyBTimetable.length;
  });
};

// Attempt to assign substitute for a period with multiple options
export const assignSubstitute = (periodId: string, absentFacultyId: string): { 
  success: boolean; 
  message: string; 
  newFacultyId?: string;
  substitutes?: Faculty[];
} => {
  // Find the period
  let foundPeriod: Period | undefined;
  let foundFacultyTimetable: Period[] = [];
  
  // Search through all timetables (inefficient but works for demo)
  facultyData.forEach(faculty => {
    const timetable = generateTimetable(faculty.id);
    const period = timetable.find(p => p.id === periodId);
    if (period) {
      foundPeriod = period;
      foundFacultyTimetable = timetable;
    }
  });
  
  if (!foundPeriod) {
    return { success: false, message: "Period not found" };
  }
  
  // Find potential substitutes
  const potentialSubstitutes = findPotentialSubstitutes(foundPeriod, absentFacultyId);
  
  if (potentialSubstitutes.length === 0) {
    return { 
      success: false, 
      message: "No eligible substitutes found. Need faculty from same department who are available during this time slot." 
    };
  }
  
  // Return all potential substitutes but select the first one as default
  const substitute = potentialSubstitutes[0];
  
  // Update faculty status for the default substitute
  updateFacultyStatus(absentFacultyId, 'absent', substitute.id);
  updateFacultyStatus(substitute.id, 'substituting', absentFacultyId);
  
  // Clear cached timetables to regenerate
  delete allTimetables[absentFacultyId];
  delete allTimetables[substitute.id];
  
  return { 
    success: true, 
    message: `${potentialSubstitutes.length} potential substitute(s) found. ${substitute.name} has been assigned as default.`,
    newFacultyId: substitute.id,
    substitutes: potentialSubstitutes
  };
};

// Add a new faculty member
export const addFaculty = (faculty: Omit<Faculty, 'id'>) => {
  const newId = `fac-${String(facultyData.length + 1).padStart(3, '0')}`;
  const newFaculty = { ...faculty, id: newId };
  facultyData.push(newFaculty);
  
  // Add corresponding user
  userData.push({
    id: `user-${newId}`,
    username: faculty.username,
    password: faculty.password,
    role: "faculty",
    facultyId: newId
  });
  
  return newFaculty;
};

// Add a new student
export const addStudent = (student: Omit<Student, 'id'>) => {
  const newId = `std-${String(studentData.length + 1).padStart(3, '0')}`;
  const newStudent = { ...student, id: newId };
  studentData.push(newStudent);
  
  // Add corresponding user
  userData.push({
    id: `user-${newId}`,
    username: student.username,
    password: student.password,
    role: "student",
    studentId: newId
  });
  
  return newStudent;
};

// Remove a faculty member
export const removeFaculty = (id: string) => {
  const index = facultyData.findIndex(f => f.id === id);
  if (index >= 0) {
    facultyData.splice(index, 1);
    
    // Remove from cached timetables
    if (allTimetables[id]) {
      delete allTimetables[id];
    }
    
    // Remove corresponding user
    const userIndex = userData.findIndex(u => u.facultyId === id);
    if (userIndex >= 0) {
      userData.splice(userIndex, 1);
    }
    
    return true;
  }
  return false;
};

// Remove a student
export const removeStudent = (id: string) => {
  const index = studentData.findIndex(s => s.id === id);
  if (index >= 0) {
    studentData.splice(index, 1);
    
    // Remove corresponding user
    const userIndex = userData.findIndex(u => u.studentId === id);
    if (userIndex >= 0) {
      userData.splice(userIndex, 1);
    }
    
    return true;
  }
  return false;
};

// Update a student
export const updateStudent = (id: string, data: Partial<Student>) => {
  const studentIndex = studentData.findIndex(s => s.id === id);
  
  if (studentIndex >= 0) {
    studentData[studentIndex] = {
      ...studentData[studentIndex],
      ...data
    };
    
    // Update user if username/password changed
    if (data.username || data.password) {
      const userIndex = userData.findIndex(u => u.studentId === id);
      if (userIndex >= 0) {
        userData[userIndex] = {
          ...userData[userIndex],
          username: data.username || userData[userIndex].username,
          password: data.password || userData[userIndex].password
        };
      }
    }
    
    return studentData[studentIndex];
  }
  
  return null;
};
