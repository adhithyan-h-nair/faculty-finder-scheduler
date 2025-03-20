
export type FacultyStatus = 'available' | 'absent' | 'substituting' | 'substituted';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface Faculty {
  id: string;
  name: string;
  department: string;
  email: string;
  phone?: string;
  status: FacultyStatus;
  substitutedBy?: string; // faculty ID
  substituting?: string; // faculty ID
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
