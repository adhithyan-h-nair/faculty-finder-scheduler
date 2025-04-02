
import { Faculty, Period, FacultyStatus, Day, Student, User, UserRole, Semester } from "./types";

// Get current date to determine semester (odd/even)
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Determine if we're in odd or even semester based on month
// Odd semesters: July-December (months 6-11)
// Even semesters: January-June (months 0-5)
const isOddSemester = currentMonth >= 6;

// Helper to increment semester based on current system date
const getNextSemester = (currentSem: Semester): Semester => {
  const semesterMap: Record<Semester, Semester> = {
    '1st': '2nd',
    '2nd': '3rd',
    '3rd': '4th',
    '4th': '5th',
    '5th': '6th',
    '6th': '7th',
    '7th': '8th',
    '8th': '1st' // Reset for demonstration purposes
  };
  return semesterMap[currentSem];
};

// Sample faculty data with realistic information (no exposed passwords)
export const facultyData: Faculty[] = [
  {
    id: "fac-001",
    name: "Dr. Ramesh Kumar",
    department: "Computer Science",
    email: "ramesh.kumar@tech.edu",
    phone: "555-101-2023",
    status: "available",
    username: "ramesh.kumar",
    password: "secure-password-1"
  },
  {
    id: "fac-002",
    name: "Dr. Priya Sharma",
    department: "Electrical Engineering",
    email: "priya.sharma@tech.edu",
    phone: "555-102-2023",
    status: "absent",
    substitutedBy: "fac-003",
    username: "priya.sharma",
    password: "secure-password-2"
  },
  {
    id: "fac-003",
    name: "Dr. Suresh Patel",
    department: "Electrical Engineering",
    email: "suresh.patel@tech.edu",
    phone: "555-103-2023",
    status: "substituting",
    substituting: "fac-002",
    username: "suresh.patel",
    password: "secure-password-3"
  },
  {
    id: "fac-004",
    name: "Dr. Ananya Singh",
    department: "Mathematics",
    email: "ananya.singh@tech.edu",
    phone: "555-104-2023",
    status: "available",
    username: "ananya.singh",
    password: "secure-password-4"
  },
  {
    id: "fac-005",
    name: "Dr. Rajesh Gupta",
    department: "Mechanical Engineering",
    email: "rajesh.gupta@tech.edu",
    phone: "555-105-2023",
    status: "absent",
    username: "rajesh.gupta",
    password: "secure-password-5"
  },
  {
    id: "fac-006",
    name: "Dr. Meera Desai",
    department: "Computer Science",
    email: "meera.desai@tech.edu",
    phone: "555-106-2023",
    status: "available",
    username: "meera.desai",
    password: "secure-password-6"
  },
  {
    id: "fac-007",
    name: "Dr. Vikram Mehta",
    department: "Electronics & Communication",
    email: "vikram.mehta@tech.edu",
    phone: "555-107-2023",
    status: "substituted",
    substitutedBy: "fac-008",
    username: "vikram.mehta",
    password: "secure-password-7"
  },
  {
    id: "fac-008",
    name: "Dr. Neha Verma",
    department: "Electronics & Communication",
    email: "neha.verma@tech.edu",
    phone: "555-108-2023",
    status: "substituting",
    substituting: "fac-007",
    username: "neha.verma",
    password: "secure-password-8"
  },
  {
    id: "fac-009",
    name: "Dr. Arun Joshi",
    department: "Civil Engineering",
    email: "arun.joshi@tech.edu",
    phone: "555-109-2023",
    status: "available",
    username: "arun.joshi",
    password: "secure-password-9"
  },
  {
    id: "fac-010",
    name: "Dr. Kavita Reddy",
    department: "Chemical Engineering",
    email: "kavita.reddy@tech.edu",
    phone: "555-110-2023",
    status: "available",
    username: "kavita.reddy",
    password: "secure-password-10"
  }
];

// Sample student data with realistic information
export const studentData: Student[] = [
  {
    id: "std-001",
    name: "Aarav Patel",
    rollNumber: "CSE-2020-001",
    semester: isOddSemester ? '1st' : '2nd',
    department: "Computer Science",
    email: "aarav.patel@student.tech.edu",
    username: "aarav.patel",
    password: "student-password-1"
  },
  {
    id: "std-002",
    name: "Diya Sharma",
    rollNumber: "CSE-2020-002",
    semester: isOddSemester ? '1st' : '2nd',
    department: "Computer Science",
    email: "diya.sharma@student.tech.edu",
    username: "diya.sharma",
    password: "student-password-2"
  },
  {
    id: "std-003",
    name: "Arjun Singh",
    rollNumber: "EEE-2020-001",
    semester: isOddSemester ? '3rd' : '4th',
    department: "Electrical Engineering",
    email: "arjun.singh@student.tech.edu",
    username: "arjun.singh",
    password: "student-password-3"
  },
  {
    id: "std-004",
    name: "Ishaan Kumar",
    rollNumber: "EEE-2020-002",
    semester: isOddSemester ? '3rd' : '4th',
    department: "Electrical Engineering",
    email: "ishaan.kumar@student.tech.edu",
    username: "ishaan.kumar",
    password: "student-password-4"
  },
  {
    id: "std-005",
    name: "Advait Reddy",
    rollNumber: "ME-2019-001",
    semester: isOddSemester ? '5th' : '6th',
    department: "Mechanical Engineering",
    email: "advait.reddy@student.tech.edu",
    username: "advait.reddy",
    password: "student-password-5"
  },
  {
    id: "std-006",
    name: "Anvi Desai",
    rollNumber: "ME-2019-002",
    semester: isOddSemester ? '5th' : '6th',
    department: "Mechanical Engineering",
    email: "anvi.desai@student.tech.edu",
    username: "anvi.desai",
    password: "student-password-6"
  },
  {
    id: "std-007",
    name: "Vihaan Mehta",
    rollNumber: "ECE-2019-001",
    semester: isOddSemester ? '5th' : '6th',
    department: "Electronics & Communication",
    email: "vihaan.mehta@student.tech.edu",
    username: "vihaan.mehta",
    password: "student-password-7"
  },
  {
    id: "std-008",
    name: "Aanya Joshi",
    rollNumber: "ECE-2019-002",
    semester: isOddSemester ? '5th' : '6th',
    department: "Electronics & Communication",
    email: "aanya.joshi@student.tech.edu",
    username: "aanya.joshi",
    password: "student-password-8"
  },
  {
    id: "std-009",
    name: "Reyansh Gupta",
    rollNumber: "CE-2018-001",
    semester: isOddSemester ? '7th' : '8th',
    department: "Civil Engineering",
    email: "reyansh.gupta@student.tech.edu",
    username: "reyansh.gupta",
    password: "student-password-9"
  },
  {
    id: "std-010",
    name: "Avni Sharma",
    rollNumber: "CE-2018-002",
    semester: isOddSemester ? '7th' : '8th',
    department: "Civil Engineering",
    email: "avni.sharma@student.tech.edu",
    username: "avni.sharma",
    password: "student-password-10"
  },
  {
    id: "std-011",
    name: "Dhruv Verma",
    rollNumber: "CHE-2018-001",
    semester: isOddSemester ? '7th' : '8th',
    department: "Chemical Engineering",
    email: "dhruv.verma@student.tech.edu",
    username: "dhruv.verma",
    password: "student-password-11"
  },
  {
    id: "std-012",
    name: "Saanvi Mishra",
    rollNumber: "CHE-2018-002",
    semester: isOddSemester ? '7th' : '8th',
    department: "Chemical Engineering",
    email: "saanvi.mishra@student.tech.edu",
    username: "saanvi.mishra",
    password: "student-password-12"
  }
];

// Admin user
export const adminUser: User = {
  id: "admin-001",
  username: "admin",
  password: "admin123",
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
  { number: 1, start: "09:00", end: "09:50" },
  { number: 2, start: "10:00", end: "10:50" },
  { number: 3, start: "11:00", end: "11:50" },
  { number: 4, start: "12:00", end: "12:50" },
  { number: 5, start: "13:00", end: "13:50" }, // Lunch break would follow
  { number: 6, start: "14:00", end: "14:50" },
  { number: 7, start: "15:00", end: "15:50" },
  { number: 8, start: "16:00", end: "16:50" },
];

// Course codes with realistic engineering subjects
const courses = [
  // Computer Science courses
  { code: "CS101", title: "Introduction to Programming", semester: "1st", department: "Computer Science" },
  { code: "CS201", title: "Data Structures & Algorithms", semester: "3rd", department: "Computer Science" },
  { code: "CS301", title: "Database Management Systems", semester: "5th", department: "Computer Science" },
  { code: "CS401", title: "Machine Learning", semester: "7th", department: "Computer Science" },
  { code: "CS102", title: "Computer Architecture", semester: "2nd", department: "Computer Science" },
  { code: "CS202", title: "Operating Systems", semester: "4th", department: "Computer Science" },
  { code: "CS302", title: "Software Engineering", semester: "6th", department: "Computer Science" },
  { code: "CS402", title: "Artificial Intelligence", semester: "8th", department: "Computer Science" },
  
  // Electrical Engineering courses
  { code: "EE101", title: "Basic Electrical Engineering", semester: "1st", department: "Electrical Engineering" },
  { code: "EE201", title: "Circuit Theory", semester: "3rd", department: "Electrical Engineering" },
  { code: "EE301", title: "Power Systems", semester: "5th", department: "Electrical Engineering" },
  { code: "EE401", title: "Power Electronics", semester: "7th", department: "Electrical Engineering" },
  { code: "EE102", title: "Electrical Measurements", semester: "2nd", department: "Electrical Engineering" },
  { code: "EE202", title: "Analog Electronics", semester: "4th", department: "Electrical Engineering" },
  { code: "EE302", title: "Control Systems", semester: "6th", department: "Electrical Engineering" },
  { code: "EE402", title: "Electric Drives", semester: "8th", department: "Electrical Engineering" },
  
  // Mechanical Engineering courses
  { code: "ME101", title: "Engineering Mechanics", semester: "1st", department: "Mechanical Engineering" },
  { code: "ME201", title: "Thermodynamics", semester: "3rd", department: "Mechanical Engineering" },
  { code: "ME301", title: "Fluid Mechanics", semester: "5th", department: "Mechanical Engineering" },
  { code: "ME401", title: "Automobile Engineering", semester: "7th", department: "Mechanical Engineering" },
  { code: "ME102", title: "Material Science", semester: "2nd", department: "Mechanical Engineering" },
  { code: "ME202", title: "Manufacturing Processes", semester: "4th", department: "Mechanical Engineering" },
  { code: "ME302", title: "Heat Transfer", semester: "6th", department: "Mechanical Engineering" },
  { code: "ME402", title: "Robotics", semester: "8th", department: "Mechanical Engineering" },
  
  // Electronics & Communication courses
  { code: "EC101", title: "Electronic Devices", semester: "1st", department: "Electronics & Communication" },
  { code: "EC201", title: "Digital Electronics", semester: "3rd", department: "Electronics & Communication" },
  { code: "EC301", title: "Communication Systems", semester: "5th", department: "Electronics & Communication" },
  { code: "EC401", title: "VLSI Design", semester: "7th", department: "Electronics & Communication" },
  { code: "EC102", title: "Network Theory", semester: "2nd", department: "Electronics & Communication" },
  { code: "EC202", title: "Signals & Systems", semester: "4th", department: "Electronics & Communication" },
  { code: "EC302", title: "Microprocessors", semester: "6th", department: "Electronics & Communication" },
  { code: "EC402", title: "Wireless Communication", semester: "8th", department: "Electronics & Communication" },
  
  // Civil Engineering courses
  { code: "CE101", title: "Engineering Drawing", semester: "1st", department: "Civil Engineering" },
  { code: "CE201", title: "Structural Analysis", semester: "3rd", department: "Civil Engineering" },
  { code: "CE301", title: "Concrete Structures", semester: "5th", department: "Civil Engineering" },
  { code: "CE401", title: "Transportation Engineering", semester: "7th", department: "Civil Engineering" },
  { code: "CE102", title: "Surveying", semester: "2nd", department: "Civil Engineering" },
  { code: "CE202", title: "Soil Mechanics", semester: "4th", department: "Civil Engineering" },
  { code: "CE302", title: "Hydraulic Structures", semester: "6th", department: "Civil Engineering" },
  { code: "CE402", title: "Construction Management", semester: "8th", department: "Civil Engineering" },
  
  // Chemical Engineering courses
  { code: "CH101", title: "Chemical Process Calculations", semester: "1st", department: "Chemical Engineering" },
  { code: "CH201", title: "Chemical Thermodynamics", semester: "3rd", department: "Chemical Engineering" },
  { code: "CH301", title: "Mass Transfer Operations", semester: "5th", department: "Chemical Engineering" },
  { code: "CH401", title: "Process Control", semester: "7th", department: "Chemical Engineering" },
  { code: "CH102", title: "Fluid Flow Operations", semester: "2nd", department: "Chemical Engineering" },
  { code: "CH202", title: "Heat Transfer Operations", semester: "4th", department: "Chemical Engineering" },
  { code: "CH302", title: "Chemical Reaction Engineering", semester: "6th", department: "Chemical Engineering" },
  { code: "CH402", title: "Plant Design", semester: "8th", department: "Chemical Engineering" },
  
  // Mathematics courses (common to all departments)
  { code: "MA101", title: "Engineering Mathematics I", semester: "1st", department: "Mathematics" },
  { code: "MA102", title: "Engineering Mathematics II", semester: "2nd", department: "Mathematics" },
  { code: "MA201", title: "Engineering Mathematics III", semester: "3rd", department: "Mathematics" },
  { code: "MA202", title: "Engineering Mathematics IV", semester: "4th", department: "Mathematics" },
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
      
      // Filter courses based on odd/even semesters if needed
      const filteredCourses = departmentCourses.filter(course => {
        const semNumber = parseInt(course.semester.charAt(0));
        return isOddSemester ? semNumber % 2 !== 0 : semNumber % 2 === 0;
      });
      
      const courseIndex = Math.floor(Math.random() * filteredCourses.length);
      const course = filteredCourses[courseIndex] || departmentCourses[0]; // Fallback if no matching courses
      
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
  // For demo purposes only
  // For admin, faculty demo logins
  if (username === 'admin' && password === 'admin123') {
    return adminUser;
  }
  
  if (username === 'faculty' && password === 'faculty123') {
    return {
      id: "user-demo-faculty",
      username: "faculty",
      password: "faculty123",
      role: "faculty",
      facultyId: "fac-001" // Dr. Ramesh Kumar
    };
  }
  
  if (username === 'student' && password === 'student123') {
    return {
      id: "user-demo-student",
      username: "student",
      password: "student123",
      role: "student",
      studentId: "std-001" // Aarav Patel
    };
  }
  
  // For regular accounts
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

// Function to simulate semester progression (to be called every 6 months)
export const updateStudentSemesters = () => {
  studentData.forEach((student, index) => {
    studentData[index].semester = getNextSemester(student.semester);
  });
  
  return studentData;
};

// Function to log substitution events
const substitutionLog: {
  date: Date;
  absentFacultyId: string;
  substituteId: string;
  periodId: string;
  course: string;
}[] = [];

// Record a substitution in the log
export const logSubstitution = (absentFacultyId: string, substituteId: string, periodId: string, course: string) => {
  substitutionLog.push({
    date: new Date(),
    absentFacultyId,
    substituteId,
    periodId,
    course
  });
};

// Get the substitution log
export const getSubstitutionLog = () => {
  return substitutionLog.map(entry => {
    const absentFaculty = getFacultyById(entry.absentFacultyId);
    const substitute = getFacultyById(entry.substituteId);
    
    return {
      ...entry,
      absentFacultyName: absentFaculty?.name || 'Unknown',
      substituteName: substitute?.name || 'Unknown'
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by most recent
};
