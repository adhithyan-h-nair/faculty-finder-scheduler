import { Day, Faculty, FacultyStatus, Period, Semester, StatusCount, Student, User, UserRole } from './types';
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
const substitutionLog: {
  id: string;
  absentFacultyId: string;
  absentFacultyName: string;
  substituteId?: string;
  substituteName?: string;
  periodId: string;
  course: string;
  day: Day;
  timeSlot: string;
  date: Date;
  success: boolean;
  reason?: string;
}[] = [
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

// Function to add a new faculty member
export const addFaculty = (faculty: Omit<Faculty, 'id'>): Faculty => {
  const newFaculty: Faculty = {
    ...faculty,
    id: `f${facultyData.length + 1}`
  };
  facultyData.push(newFaculty);
  return newFaculty;
};

// Function to remove a faculty member
export const removeFaculty = (id: string): boolean => {
  const index = facultyData.findIndex(f => f.id === id);
  if (index === -1) return false;
  facultyData.splice(index, 1);
  return true;
};

// Function to update faculty status
export const updateFacultyStatus = (
  facultyId: string, 
  status: FacultyStatus, 
  relatedFacultyId?: string
): boolean => {
  const faculty = getFacultyById(facultyId);
  if (!faculty) return false;
  
  faculty.status = status;
  
  if (status === 'substituting' && relatedFacultyId) {
    faculty.substituting = relatedFacultyId;
  } else if (status === 'substituted' && relatedFacultyId) {
    faculty.substitutedBy = relatedFacultyId;
  } else {
    // Clear any substitution relationships
    faculty.substituting = undefined;
    faculty.substitutedBy = undefined;
  }
  
  return true;
};

// Functions for student management
export const addStudent = (student: Omit<Student, 'id'>): Student => {
  const newStudent: Student = {
    ...student,
    id: `s${studentData.length + 1}`
  };
  studentData.push(newStudent);
  return newStudent;
};

export const removeStudent = (id: string): boolean => {
  const index = studentData.findIndex(s => s.id === id);
  if (index === -1) return false;
  studentData.splice(index, 1);
  return true;
};

export const updateStudent = (id: string, updatedData: Partial<Student>): Student | null => {
  const student = studentData.find(s => s.id === id);
  if (!student) return null;
  
  Object.assign(student, updatedData);
  return student;
};

// Get timetable by semester and department
export const getTimetableBySemesterAndDepartment = (semester: Semester, department: string): Period[] => {
  return timetableData.filter(p => p.semester === semester && p.department === department);
};

// Function to mark faculty as absent or available
export const markFacultyAbsent = (facultyId: string, isAbsent: boolean) => {
  if (isAbsent) {
    absentFaculty[facultyId] = new Date();
    
    // Update faculty status in the facultyData array
    const faculty = facultyData.find(f => f.id === facultyId);
    if (faculty) {
      faculty.status = 'absent';
    }
  } else {
    delete absentFaculty[facultyId];
    
    // Update faculty status in the facultyData array
    const faculty = facultyData.find(f => f.id === facultyId);
    if (faculty) {
      faculty.status = 'available';
      faculty.substitutedBy = undefined;
    }
  }
  
  // Reset any substitution assignments
  resetSubstitutions(facultyId);
};

// Function to check if faculty is marked as absent
export const isFacultyAbsent = (facultyId: string): boolean => {
  // Check if faculty is in the absentFaculty object
  if (facultyId in absentFaculty) {
    const absentDate = absentFaculty[facultyId];
    const currentDate = new Date();
    
    // Reset absence status if it's a different day
    if (absentDate.getDate() !== currentDate.getDate() ||
        absentDate.getMonth() !== currentDate.getMonth() ||
        absentDate.getFullYear() !== currentDate.getFullYear()) {
      // Reset the absent status
      delete absentFaculty[facultyId];
      
      // Update faculty status in the facultyData array
      const faculty = facultyData.find(f => f.id === facultyId);
      if (faculty) {
        faculty.status = 'available';
        faculty.substitutedBy = undefined;
      }
      
      // Reset any substitution assignments
      resetSubstitutions(facultyId);
      
      return false;
    }
    
    return true;
  }
  
  return false;
};

// Reset substitutions for a faculty
const resetSubstitutions = (facultyId: string) => {
  // Reset substitutions where this faculty was being substituted
  facultyData.forEach(faculty => {
    if (faculty.substituting === facultyId) {
      faculty.status = 'available';
      faculty.substituting = undefined;
    }
  });
  
  // Reset any periods where this faculty was being substituted
  // In a real app, this would update the database
};

// Function to find potential substitutes based on various criteria
export const findPotentialSubstitutes = (period: Period, facultyId: string) => {
  const faculty = getFacultyById(facultyId);
  if (!faculty) return [];
  
  // Check if the entire department is absent
  const departmentFaculty = facultyData.filter(f => f.department === faculty.department);
  const availableDepartmentFaculty = departmentFaculty.filter(f => 
    f.status === 'available' && f.id !== facultyId
  );
  
  // If all department faculty are absent, try faculty from other departments too
  const isEntireDepartmentAbsent = availableDepartmentFaculty.length === 0;
  
  // Filter faculty members who meet our criteria
  return facultyData.filter(f => {
    // Skip the current faculty
    if (f.id === facultyId) return false;
    
    // Must be available (not absent or already substituting)
    if (f.status === 'absent' || f.status === 'substituting') return false;
    
    // Must not have their own class at this time
    const hasConflict = hasPeriodConflict(f.id, period);
    if (hasConflict) return false;
    
    // If entire department is absent, accept faculty from other departments
    if (isEntireDepartmentAbsent) {
      return true;
    }
    
    // Otherwise, prefer faculty from the same department
    return f.department === faculty.department;
  });
};

// Enhanced assignSubstitute function with more detailed response types
export const assignSubstitute = (periodId: string, facultyId: string) => {
  const period = getAllPeriods().find(p => p.id === periodId);
  if (!period) {
    return { 
      success: false, 
      message: "Period not found" 
    };
  }
  
  // Check if this is today's class
  const todayDay = getTodayDay();
  if (period.day !== todayDay) {
    return { 
      success: false, 
      message: "Substitution is only available for today's classes" 
    };
  }
  
  // Find faculty by ID
  const faculty = getFacultyById(facultyId);
  if (!faculty) {
    return { 
      success: false, 
      message: "Faculty not found" 
    };
  }
  
  // Find potential substitutes
  const potentialSubstitutes = findPotentialSubstitutes(period, facultyId);
  
  if (potentialSubstitutes.length === 0) {
    // Check if the entire department is absent
    const departmentFaculty = facultyData.filter(f => f.department === faculty.department);
    const allDepartmentAbsent = departmentFaculty.every(f => 
      f.id === facultyId || f.status === 'absent' || hasPeriodConflict(f.id, period)
    );
    
    if (allDepartmentAbsent) {
      return { 
        success: false, 
        message: "Unable to find substitutes - all faculty in the department are absent or unavailable at this time.",
        entireDepartmentAbsent: true
      };
    }
    
    return { 
      success: false, 
      message: "No eligible substitutes available who match department and availability criteria",
      noSubstitutesAvailable: true
    };
  }
  
  // Score each substitute based on various factors
  const scoredSubstitutes = potentialSubstitutes.map(sub => {
    let score = 0;
    let canTeachOwnSubject = false;
    let ownSubject = "";
    
    // Base score - same department gets higher points
    if (sub.department === faculty.department) {
      score += 10;
    }
    
    // Check if substitute teaches same semester
    const subPeriods = getFacultyTimetable(sub.id);
    const teachesSameSemester = subPeriods.some(p => p.semester === period.semester);
    if (teachesSameSemester) score += 5;
    
    // Check if substitute teaches same or similar subject
    const teachesRelatedSubject = subPeriods.some(p => 
      p.courseCode === period.courseCode || 
      p.courseCode.substring(0, 3) === period.courseCode.substring(0, 3)
    );
    if (teachesRelatedSubject) score += 8;
    
    // Check if substitute can teach their own subject to this semester
    const ownSubjectForSemester = subPeriods.find(p => 
      p.semester === period.semester && 
      p.day !== period.day
    );
    
    if (ownSubjectForSemester) {
      canTeachOwnSubject = true;
      ownSubject = `${ownSubjectForSemester.courseCode} - ${ownSubjectForSemester.courseTitle}`;
      score += 3; // Small bonus for having own subject
    }
    
    return { 
      faculty: sub, 
      score,
      canTeachOwnSubject,
      ownSubject
    };
  });
  
  // Sort by score, highest first
  scoredSubstitutes.sort((a, b) => b.score - a.score);
  
  // Get top substitutes (up to 3)
  const bestSubstitutes = scoredSubstitutes.slice(0, 3);
  
  if (bestSubstitutes.length > 0) {
    // Generate reason based on criteria
    let reason = "Substitutes selected based on:";
    
    if (bestSubstitutes[0].faculty.department === faculty.department) {
      reason += "\n• Same department";
    } else {
      reason += "\n• Available faculty (all department faculty unavailable)";
    }
    
    reason += "\n• Available during this time slot";
    
    // Check if any teach the same semester
    const anySameSemester = bestSubstitutes.some(sub => {
      const subPeriods = getFacultyTimetable(sub.faculty.id);
      return subPeriods.some(p => p.semester === period.semester);
    });
    
    if (anySameSemester) {
      reason += "\n• Experience teaching the same semester";
    }
    
    // Check if any teach related subjects
    const anyRelatedSubjects = bestSubstitutes.some(sub => {
      const subPeriods = getFacultyTimetable(sub.faculty.id);
      return subPeriods.some(p => 
        p.courseCode === period.courseCode || 
        p.courseCode.substring(0, 3) === period.courseCode.substring(0, 3)
      );
    });
    
    if (anyRelatedSubjects) {
      reason += "\n• Experience with the same or related subjects";
    }
    
    // Check if any can teach their own subject
    const anyOwnSubject = bestSubstitutes.some(sub => sub.canTeachOwnSubject);
    if (anyOwnSubject) {
      reason += "\n• Some substitutes can teach their own subjects";
    }
    
    return { 
      success: true, 
      substitutes: bestSubstitutes.map(s => ({
        ...s.faculty,
        canTeachOwnSubject: s.canTeachOwnSubject,
        ownSubject: s.ownSubject
      })),
      reason
    };
  }
  
  return { 
    success: false, 
    message: "No suitable substitutes found who meet all criteria"
  };
};

// Function to check if a faculty has a period conflict
const hasPeriodConflict = (facultyId: string, period: Period): boolean => {
  const facultyPeriods = getFacultyTimetable(facultyId);
  
  // Only check for conflicts on the same day
  return facultyPeriods.some(p => 
    p.day === period.day && 
    ((p.startTime <= period.startTime && p.endTime > period.startTime) || 
     (p.startTime < period.endTime && p.endTime >= period.endTime) ||
     (p.startTime >= period.startTime && p.endTime <= period.endTime))
  );
};

// Helper function to get faculty by ID
export const getFacultyById = (id: string): Faculty | undefined => {
  return facultyData.find(faculty => faculty.id === id);
};

// Helper function to get student by ID
export const getStudentById = (id: string): Student | undefined => {
  return studentData.find(student => student.id === id);
};

// Helper function to get user by username and password
export const getUserByCredentials = (username: string, password: string): User | undefined => {
  return userData.find(user => user.username === username && user.password === password);
};

// Helper function to get faculty timetable
export const getFacultyTimetable = (facultyId: string): Period[] => {
  return timetableData.filter(period => period.facultyId === facultyId);
};

// Helper function to get student timetable based on semester and department
export const getStudentTimetable = (semester: Semester, department: string): Period[] => {
  return timetableData.filter(period => 
    period.semester === semester && 
    period.department === department
  );
};

// Helper function to get all periods
export const getAllPeriods = (): Period[] => {
  return [...timetableData];
};

// Helper function to get today's day
export const getTodayDay = (): Day => {
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const today = new Date().getDay();
  // Convert from 0-6 (Sunday-Saturday) to our Day type
  // If it's weekend, return Monday
  return today === 0 || today === 6 ? 'Monday' : days[today - 1];
};

// Helper function to get faculty status counts
export const getFacultyStatusCounts = (): StatusCount => {
  return facultyData.reduce((counts, faculty) => {
    counts[faculty.status]++;
    return counts;
  }, {
    available: 0,
    absent: 0,
    substituting: 0,
    substituted: 0
  } as StatusCount);
};

// Helper function to add a new period
export const addPeriod = (period: Omit<Period, 'id'>): Period => {
  const newPeriod = {
    ...period,
    id: uuidv4()
  };
  
  timetableData.push(newPeriod);
  return newPeriod;
};

// Helper function to update a period
export const updatePeriod = (periodId: string, updatedPeriod: Partial<Period>): Period | null => {
  const index = timetableData.findIndex(p => p.id === periodId);
  if (index === -1) return null;
  
  timetableData[index] = {
    ...timetableData[index],
    ...updatedPeriod
  };
  
  return timetableData[index];
};

// Helper function to delete a period
export const deletePeriod = (periodId: string): boolean => {
  const index = timetableData.findIndex(p => p.id === periodId);
  if (index === -1) return false;
  
  timetableData.splice(index, 1);
  return true;
};

// Helper function to log a substitution failure
export const logSubstitutionFailure = (facultyId: string, periodId: string, reason: string): void => {
  const faculty = getFacultyById(facultyId);
  const period = getAllPeriods().find(p => p.id === periodId);
  
  if (!faculty || !period) return;
  
  substitutionLog.push({
    id: uuidv4(),
    absentFacultyId: facultyId,
    absentFacultyName: faculty.name,
    periodId,
    course: `${period.courseCode} - ${period.courseTitle}`,
    day: period.day,
    timeSlot: `${period.startTime} - ${period.endTime}`,
    date: new Date(),
    success: false,
    reason
  });
};

// Helper function to get substitution log
export const getSubstitutionLog = () => {
  return [...substitutionLog].sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Helper function to get faculty by role
export const getFacultyByRole = (role: UserRole): Faculty[] => {
  if (role !== 'faculty') return [];
  return [...facultyData];
};

// Updated version of this function to record the actual substitution
export const recordSubstitution = (
  periodId: string, 
  absentFacultyId: string, 
  substituteId: string,
  useOwnSubject: boolean = false,
  ownSubject?: string
): boolean => {
  const period = getAllPeriods().find(p => p.id === periodId);
  const absentFaculty = getFacultyById(absentFacultyId);
  const substitute = getFacultyById(substituteId);
  
  if (!period || !absentFaculty || !substitute) return false;
  
  // Update faculty statuses
  updateFacultyStatus(absentFacultyId, 'substituted', substituteId);
  updateFacultyStatus(substituteId, 'substituting', absentFacultyId);
  
  // Record this substitution in our tracking object
  periodSubstitutions[periodId] = {
    originalFacultyId: absentFacultyId,
    substituteId: substituteId,
    substituteSubject: useOwnSubject ? ownSubject : undefined
  };
  
  // Add to the substitution log
  substitutionLog.push({
    id: uuidv4(),
    absentFacultyId,
    absentFacultyName: absentFaculty.name,
    substituteId,
    substituteName: substitute.name,
    periodId,
    course: useOwnSubject && ownSubject 
      ? ownSubject 
      : `${period.courseCode} - ${period.courseTitle}`,
    day: period.day,
    timeSlot: `${period.startTime} - ${period.endTime}`,
    date: new Date(),
    success: true,
    teachingOwnSubject: useOwnSubject
  });
  
  return true;
};
