// Mock data generator for dashboard components

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];

// Simple deterministic hash function for consistent pseudo-random values
export const hash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Event types and templates
export const eventTypes = [
  { 
    type: 'appointment', 
    titles: [
      'Consultation with Dr. Smith', 
      'Follow-up Appointment', 
      'Check-up Visit', 
      'Specialist Consultation',
      'Cardiology Consultation',
      'Oncology Review',
      'Neurology Assessment',
      'Physical Therapy Session',
      'Dermatology Visit',
      'Orthopedic Consultation',
      'Endocrinology Check-up',
      'Gastroenterology Appointment'
    ], 
    specialties: ['Cardiology', 'Oncology', 'General Practice', 'Neurology', 'Dermatology', 'Orthopedics', 'Endocrinology', 'Gastroenterology'] 
  },
  { 
    type: 'test', 
    titles: ['MRI Test', 'CT Scan', 'Blood Test', 'X-Ray', 'Ultrasound'], 
    specialties: ['Imaging Center', 'Lab', 'Radiology'] 
  },
];

// Patient list
export const patients = ['John Doe', 'Jane Smith', 'Mary Johnson'];

// Event interface
export interface CalendarEvent {
  id: string;
  date: number;
  month: string;
  type: 'appointment' | 'test';
  title: string;
  patient: string;
  time: string;
  specialty: string;
}

// Generate events starting from November 1st with 2-3 appointments per week
// Generates from November 2025 to February 2026 (4 months)
export function generateAppointmentsFromNovember(
  startYear: number = 2025,
  endMonth: number = 1, // February (0-indexed: 0=Jan, 1=Feb)
  endYear: number = 2026
): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const startDate = new Date(startYear, 10, 1); // November 1st, 2025
  const endDate = new Date(endYear, endMonth + 1, 0); // Last day of February 2026
  
  // Track appointments per week (using ISO week format)
  const weeklyAppointments: { [key: string]: number } = {};
  
  // Generate for each month from November 2025 to February 2026
  for (let monthOffset = 0; monthOffset < 4; monthOffset++) {
    const month = (10 + monthOffset) % 12; // November (10) + offset, wrapping for Jan/Feb
    const year = monthOffset < 2 ? 2025 : 2026; // Nov, Dec = 2025; Jan, Feb = 2026
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate appointments for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      
      // Skip if before November 1st, 2025
      if (date < startDate) continue;
      
      // Skip if after end date
      if (date > endDate) break;
      
      const dayOfWeek = date.getDay();
      
      // Skip weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      // Calculate week key (Monday as start of week)
      // Find the Monday of the week containing this date
      const weekStart = new Date(date);
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      weekStart.setDate(date.getDate() - daysFromMonday);
      const weekKey = `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
      
      // Initialize week counter if needed
      if (!weeklyAppointments[weekKey]) {
        weeklyAppointments[weekKey] = 0;
      }
      
      // Generate 2-3 appointments per week
      const appointmentsThisWeek = weeklyAppointments[weekKey];
      if (appointmentsThisWeek >= 3) continue; // Already have 3 appointments this week
      
      // Determine if we should add an appointment (2-3 per week)
      const seed = `${year}-${month}-${day}-${weekKey}`;
      const seedHash = hash(seed);
      const random = (seedHash % 100) / 100;
      
      // Add appointment if we have less than 2, or randomly add third (30% chance)
      const shouldAdd = appointmentsThisWeek < 2 || (appointmentsThisWeek === 2 && random < 0.3);
      
      if (shouldAdd) {
        const eventType = eventTypes[0]; // appointment
        const random1 = ((seedHash * 7) % 100) / 100;
        const random2 = ((seedHash * 13) % 100) / 100;
        const random3 = ((seedHash * 17) % 100) / 100;
        
        const titleIndex = Math.floor(random1 * eventType.titles.length);
        const specialtyIndex = Math.floor(random2 * eventType.specialties.length);
        const patientIndex = Math.floor(random3 * patients.length);
        const hour = 9 + Math.floor(random2 * 8); // 9 AM to 5 PM
        const minute = random3 < 0.5 ? 0 : 30;
        
        events.push({
          id: `${year}-${month}-${day}-${appointmentsThisWeek}`,
          date: day,
          month: monthNames[month].substring(0, 3),
          type: 'appointment',
          title: eventType.titles[titleIndex],
          patient: patients[patientIndex],
          time: `${hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
          specialty: eventType.specialties[specialtyIndex],
        });
        
        weeklyAppointments[weekKey]++;
      }
    }
  }
  
  return events.sort((a, b) => {
    // Sort by year, month, then date
    const aMonthIndex = monthNames.findIndex(m => m.startsWith(a.month));
    const bMonthIndex = monthNames.findIndex(m => m.startsWith(b.month));
    // Determine year based on month
    const aYear = aMonthIndex >= 10 ? startYear : (aMonthIndex <= 1 ? endYear : startYear);
    const bYear = bMonthIndex >= 10 ? startYear : (bMonthIndex <= 1 ? endYear : startYear);
    const aDate = new Date(aYear, aMonthIndex, a.date);
    const bDate = new Date(bYear, bMonthIndex, b.date);
    return aDate.getTime() - bDate.getTime();
  });
}


// Generate events for a specific month
export function generateMonthEvents(
  month: number,
  year: number,
  monthNameArray: string[] = monthNames
): CalendarEvent[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events: CalendarEvent[] = [];
  
  // Check if we should use November-based generation (Nov 2025 to Feb 2026)
  const november2025 = new Date(2025, 10, 1); // November 1st, 2025
  const february2026 = new Date(2026, 1, 28); // February 28, 2026
  const currentDate = new Date(year, month, 1);
  
  // If the requested month is between November 2025 and February 2026, use the November-based generation
  if (currentDate >= november2025 && currentDate <= february2026) {
    const allEvents = generateAppointmentsFromNovember(2025, 1, 2026); // Nov 2025 to Feb 2026
    // Filter events for the specific month and year
    return allEvents.filter(event => {
      const eventMonthIndex = monthNameArray.findIndex(m => m.substring(0, 3) === event.month);
      // Determine year based on month index (Nov/Dec = 2025, Jan/Feb = 2026)
      const eventYear = (eventMonthIndex >= 10) ? 2025 : (eventMonthIndex <= 1 ? 2026 : 2025);
      return eventMonthIndex === month && eventYear === year;
    });
  }
  
  // Generate events per patient per week (max 2 appointments per week per patient)
  const patientAppointments: { [key: string]: number[] } = {};
  patients.forEach(patient => {
    patientAppointments[patient] = [];
  });
  
  // Generate events for the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(year, month, day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend) continue; // Skip weekends
    
    const weekNumber = Math.floor((day - 1) / 7);
    const seed = `${year}-${month}-${day}`;
    const seedHash = hash(seed);
    const random1 = (seedHash % 100) / 100;
    const random2 = ((seedHash * 7) % 100) / 100;
    const random3 = ((seedHash * 13) % 100) / 100;
    
    // For each patient, check if they can have an appointment this week (max 2 per week)
    patients.forEach((patient, patientIndex) => {
      const patientWeekKey = `${patient}-week-${weekNumber}`;
      const patientWeekHash = hash(patientWeekKey);
      const patientWeekRandom = (patientWeekHash % 100) / 100;
      
      // Each patient can have 0-2 appointments per week
      const appointmentsThisWeek = patientAppointments[patient].filter(d => {
        const dWeekNumber = Math.floor((d - 1) / 7);
        return dWeekNumber === weekNumber;
      }).length;
      
      // Determine if this patient should have an appointment on this day
      const shouldHaveAppointment = appointmentsThisWeek < 2 && patientWeekRandom < 0.4;
      
      if (shouldHaveAppointment) {
        const eventType = eventTypes[0]; // appointment
        const titleIndex = Math.floor(random2 * eventType.titles.length);
        const specialtyIndex = Math.floor(random3 * eventType.specialties.length);
        const hour = 9 + Math.floor(random2 * 8); // 9 AM to 5 PM
        const minute = random3 < 0.5 ? 0 : 30;
        
        events.push({
          id: `${day}-${patientIndex}-appointment`,
          date: day,
          month: monthNameArray[month].substring(0, 3),
          type: 'appointment',
          title: eventType.titles[titleIndex],
          patient: patient,
          time: `${hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
          specialty: eventType.specialties[specialtyIndex],
        });
        
        patientAppointments[patient].push(day);
      }
    });
    
    // Generate 0-1 tests per weekday (not patient-specific)
    if (random3 < 0.3) {
      const eventType = eventTypes[1]; // test
      const titleIndex = Math.floor(random1 * eventType.titles.length);
      const specialtyIndex = Math.floor(random2 * eventType.specialties.length);
      const patientIndex = Math.floor(random3 * patients.length);
      const hour = 8 + Math.floor(random1 * 4); // 8 AM to 12 PM
      
      events.push({
        id: `${day}-test`,
        date: day,
        month: monthNameArray[month].substring(0, 3),
        type: 'test',
        title: eventType.titles[titleIndex],
        patient: patients[patientIndex],
        time: `${hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
        specialty: eventType.specialties[specialtyIndex],
      });
    }
  }
  
  // Sort by date
  return events.sort((a, b) => a.date - b.date);
}

// Get current month events
// For November 2025 to February 2026, use the November-based generation
export function getCurrentMonthEvents(): CalendarEvent[] {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  // Check if we're in the November 2025 to February 2026 range
  const november2025 = new Date(2025, 10, 1);
  const february2026 = new Date(2026, 1, 28);
  const currentDate = new Date(year, month, 1);
  
  if (currentDate >= november2025 && currentDate <= february2026) {
    const allEvents = generateAppointmentsFromNovember(2025, 1, 2026);
    return allEvents.filter(event => {
      const eventMonthIndex = monthNames.findIndex(m => m.substring(0, 3) === event.month);
      const eventYear = eventMonthIndex >= 10 ? 2025 : (eventMonthIndex <= 1 ? 2026 : 2025);
      return eventMonthIndex === month && eventYear === year;
    });
  }
  
  return generateMonthEvents(month, year);
}

// Get next appointment from events (for upcoming appointments widget)
export function getNextAppointment(events: CalendarEvent[]): CalendarEvent | null {
  const today = new Date();
  const currentDay = today.getDate();
  const nextWeekEnd = currentDay + 7; // Next 7 days
  
  const nextAppointment = events
    .filter(event => {
      // Only show appointments (not tests)
      if (event.type !== 'appointment') return false;
      // Show events from today to next week (7 days)
      return event.date >= currentDay && event.date <= nextWeekEnd;
    })
    .sort((a, b) => {
      // Sort by date first, then by time
      if (a.date !== b.date) return a.date - b.date;
      // Extract hour from time string for comparison
      const aHour = parseInt(a.time.split(':')[0]);
      const bHour = parseInt(b.time.split(':')[0]);
      return aHour - bHour;
    })[0]; // Get only the first (next) appointment
  
  return nextAppointment || null;
}

// Get all upcoming appointments from events (for upcoming appointments list)
// Shows appointments for this week and next week (14 days total)
export function getUpcomingAppointments(events: CalendarEvent[]): CalendarEvent[] {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const twoWeeksEnd = currentDay + 14; // This week + next week (14 days)
  
  return events
    .filter(event => {
      // Only show appointments (not tests)
      if (event.type !== 'appointment') return false;
      
      // Check if event is in the current month and within the next 14 days
      const eventDate = new Date(currentYear, currentMonth, event.date);
      const todayDate = new Date(currentYear, currentMonth, currentDay);
      const twoWeeksDate = new Date(currentYear, currentMonth, twoWeeksEnd);
      
      return eventDate >= todayDate && eventDate <= twoWeeksDate;
    })
    .sort((a, b) => {
      // Sort by date first, then by time
      if (a.date !== b.date) return a.date - b.date;
      // Extract hour from time string for comparison
      const aHour = parseInt(a.time.split(':')[0]);
      const bHour = parseInt(b.time.split(':')[0]);
      return aHour - bHour;
    });
}

// Stats data
export const statsData = {
  activePatients: {
    value: 3,
    label: 'Active Patients',
    trend: '+1 this month',
    trendType: 'positive' as const,
    chartData: [3, 4, 3, 4, 5, 4, 3],
  },
  medicalDocuments: {
    value: 156,
    label: 'Medical Documents',
    trend: '+8 this week',
    trendType: 'positive' as const,
    chartData: [4, 5, 4, 6, 5, 7, 6],
  },
  overdueTests: {
    value: 2,
    label: 'Overdue Tests',
    trend: 'Action needed',
    trendType: 'negative' as const,
    chartData: [1, 2, 1, 2, 1, 2, 2],
  },
  activeMedications: {
    value: 8,
    label: 'Active Medications',
    trend: 'All on schedule',
    trendType: 'neutral' as const,
    chartData: [5, 6, 7, 6, 7, 8, 8],
  },
  carePlans: {
    value: 5,
    label: 'Care Plans',
    trend: '2 updated',
    trendType: 'positive' as const,
    chartData: [3, 4, 4, 5, 4, 5, 5],
  },
};

// Document folders data
export const documentFolders = [
  {
    icon: '🔬',
    name: 'MRI Scans',
    count: 24,
    trend: '+3',
    trendType: 'positive' as const,
  },
  {
    icon: '🏥',
    name: 'CT Scans',
    count: 18,
    trend: 'No change',
    trendType: 'neutral' as const,
  },
  {
    icon: '💉',
    name: 'Blood Tests',
    count: 42,
    trend: '+5',
    trendType: 'positive' as const,
  },
  {
    icon: '📄',
    name: 'Doctor Letters',
    count: 31,
    trend: '+2',
    trendType: 'positive' as const,
  },
  {
    icon: '📋',
    name: 'Prescriptions',
    count: 28,
    trend: 'No change',
    trendType: 'neutral' as const,
  },
  {
    icon: '🏥',
    name: 'Hospital Discharge',
    count: 13,
    trend: 'No change',
    trendType: 'neutral' as const,
  },
];

// Patient profiles data
export const patientProfiles = [
  {
    initials: 'JD',
    name: 'John Doe',
    meta: '3 appointments • 5 care plans',
  },
  {
    initials: 'JS',
    name: 'Jane Smith',
    meta: '2 appointments • 3 care plans',
  },
  {
    initials: 'MJ',
    name: 'Mary Johnson',
    meta: '1 appointment • 2 care plans',
  },
];

// Care plans data
export const carePlansData = {
  summary: {
    active: 5,
    change: '+2 this month',
    completion: 75,
  },
  plans: [
    {
      title: 'Post-Surgery Recovery',
      patient: 'John Doe',
      progress: 80,
      completed: 8,
      total: 10,
    },
    {
      title: 'Diabetes Management',
      patient: 'Jane Smith',
      progress: 60,
      completed: 6,
      total: 10,
    },
    {
      title: 'Physical Therapy',
      patient: 'Mary Johnson',
      progress: 90,
      completed: 9,
      total: 10,
    },
  ],
};

// Second opinion data
export const secondOpinionData = {
  pending: 2,
  completed: 8,
  requests: [
    {
      title: 'Cardiology Review',
      patient: 'John Doe',
      status: 'In Progress',
      statusType: 'pending' as const,
      description: 'Awaiting specialist',
    },
    {
      title: 'Oncology Consultation',
      patient: 'Jane Smith',
      status: 'In Progress',
      statusType: 'pending' as const,
      description: 'Scheduled for review',
    },
  ],
};

// Medications data
export const medicationsData = {
  summary: {
    active: 8,
    status: 'All on schedule',
    statusType: 'healthy' as const,
  },
  medications: [
    {
      name: 'Metformin',
      patient: 'Jane Smith',
      dosage: '500mg twice daily',
      nextDose: 'Today 8:00 AM',
    },
    {
      name: 'Aspirin',
      patient: 'John Doe',
      dosage: '81mg daily',
      nextDose: 'Today 7:00 AM',
    },
    {
      name: 'Lisinopril',
      patient: 'Mary Johnson',
      dosage: '10mg daily',
      nextDose: 'Today 9:00 AM',
    },
  ],
};

