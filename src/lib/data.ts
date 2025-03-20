
import { Faculty, Period, FacultyStatus, Day } from "./types";

// Sample faculty data
export const facultyData: Faculty[] = [
  {
    id: "fac-001",
    name: "Dr. Alan Turing",
    department: "Computer Science",
    email: "alan.turing@faculty.edu",
    phone: "555-123-4567",
    status: "available"
  },
  {
    id: "fac-002",
    name: "Dr. Marie Curie",
    department: "Physics",
    email: "marie.curie@faculty.edu",
    phone: "555-234-5678",
    status: "absent",
    substitutedBy: "fac-003"
  },
  {
    id: "fac-003",
    name: "Dr. Albert Einstein",
    department: "Physics",
    email: "albert.einstein@faculty.edu",
    phone: "555-345-6789",
    status: "substituting",
    substituting: "fac-002"
  },
  {
    id: "fac-004",
    name: "Dr. Ada Lovelace",
    department: "Mathematics",
    email: "ada.lovelace@faculty.edu",
    phone: "555-456-7890",
    status: "available"
  },
  {
    id: "fac-005",
    name: "Dr. Nikola Tesla",
    department: "Electrical Engineering",
    email: "nikola.tesla@faculty.edu",
    phone: "555-567-8901",
    status: "absent"
  },
  {
    id: "fac-006",
    name: "Dr. Grace Hopper",
    department: "Computer Science",
    email: "grace.hopper@faculty.edu",
    phone: "555-678-9012",
    status: "available"
  },
  {
    id: "fac-007",
    name: "Dr. Isaac Newton",
    department: "Physics",
    email: "isaac.newton@faculty.edu",
    phone: "555-789-0123",
    status: "substituted",
    substitutedBy: "fac-006"
  },
];

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
  { code: "CS101", title: "Introduction to Computer Science" },
  { code: "CS201", title: "Data Structures" },
  { code: "CS301", title: "Algorithms" },
  { code: "CS401", title: "Artificial Intelligence" },
  { code: "PH101", title: "Introduction to Physics" },
  { code: "PH201", title: "Mechanics" },
  { code: "PH301", title: "Electromagnetism" },
  { code: "PH401", title: "Quantum Mechanics" },
  { code: "MA101", title: "Calculus I" },
  { code: "MA201", title: "Linear Algebra" },
  { code: "MA301", title: "Differential Equations" },
  { code: "EE101", title: "Circuit Theory" },
  { code: "EE201", title: "Digital Electronics" },
];

// Generate sample timetable data
const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const generateTimetable = (facultyId: string): Period[] => {
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
      const courseIndex = Math.floor(Math.random() * courses.length);
      const course = courses[courseIndex];
      
      let periodData: Period = {
        id: `${facultyId}-${day}-${period.number}`,
        day: day,
        periodNumber: period.number,
        startTime: period.start,
        endTime: period.end,
        courseCode: course.code,
        courseTitle: course.title,
        facultyId: facultyId
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
  
  return timetable;
};

// Get all timetables
export const getAllTimetables = () => {
  return facultyData.map(faculty => ({
    facultyId: faculty.id,
    periods: generateTimetable(faculty.id)
  }));
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

// Function to get a faculty's timetable
export const getFacultyTimetable = (id: string) => {
  return generateTimetable(id);
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
    return facultyData[facultyIndex];
  }
  
  return null;
};

// Add a new faculty member
export const addFaculty = (faculty: Omit<Faculty, 'id'>) => {
  const newId = `fac-${String(facultyData.length + 1).padStart(3, '0')}`;
  const newFaculty = { ...faculty, id: newId };
  facultyData.push(newFaculty);
  return newFaculty;
};

// Remove a faculty member
export const removeFaculty = (id: string) => {
  const index = facultyData.findIndex(f => f.id === id);
  if (index >= 0) {
    facultyData.splice(index, 1);
    return true;
  }
  return false;
};
