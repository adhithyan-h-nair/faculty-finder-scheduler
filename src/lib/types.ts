
export type FacultyStatus = 'available' | 'absent' | 'substituting' | 'substituted';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type UserRole = 'admin' | 'faculty' | 'student';

export type Semester = '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th';

export interface Faculty {
  id: string;
  name: string;
  department: string;
  email: string;
  phone?: string;
  status: FacultyStatus;
  substitutedBy?: string; // faculty ID
  substituting?: string; // faculty ID
  username: string;
  password: string;
}

export interface Period {
  id: string;
  day: Day;
  periodNumber: number;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseTitle: string;
  facultyId: string;
  originalFacultyId?: string; // Only set if being substituted
  semester: Semester;
  department: string;
}

export interface Timetable {
  facultyId: string;
  periods: Period[];
}

export interface StatusCount {
  available: number;
  absent: number;
  substituting: number;
  substituted: number;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  semester: Semester;
  department: string;
  email: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  role: UserRole;
  username: string;
  password: string;
  facultyId?: string;
  studentId?: string;
}

export interface SubstitutionLogEntry {
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
  teachingOwnSubject?: boolean;
}
