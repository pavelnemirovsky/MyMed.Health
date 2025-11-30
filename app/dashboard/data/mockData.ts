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

// Patient interface
export interface Patient {
  id: string;
  name: string;
  initials: string;
  dateOfBirth?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  email?: string;
  phone?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalConditions?: string[];
  allergies?: string[];
  primaryCarePhysician?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  familyId?: string; // Family identifier
  familyRole?: string; // Role in family (e.g., 'Father', 'Mother', 'Grandmother')
  relationshipToAccountOwner?: string; // Relationship to the account owner (e.g., 'Father', 'Mother', 'Uncle', 'Self')
}

// Patient data - All patients from the Feldman family
export const patientsData: Patient[] = [
  {
    id: 'patient-1',
    name: 'John Feldman',
    initials: 'JF',
    dateOfBirth: '1965-03-15',
    age: 59,
    gender: 'Male',
    email: 'john.feldman@me.com',
    phone: '+972-50-123-4567',
    emergencyContact: {
      name: 'Juli Feldman',
      relationship: 'Spouse',
      phone: '+972-52-123-4568',
    },
    medicalConditions: ['Left Kidney Cancer'],
    allergies: ['Penicillin'],
    primaryCarePhysician: 'Dr. Sarah Johnson',
    insuranceProvider: 'BlueCross BlueShield',
    insuranceNumber: 'BC123456789',
    familyId: 'feldman-family',
    familyRole: 'Father',
    relationshipToAccountOwner: 'Father',
  },
  {
    id: 'patient-2',
    name: 'Juli Feldman',
    initials: 'JF',
    dateOfBirth: '1972-07-22',
    age: 52,
    gender: 'Female',
    email: 'juli.feldman@me.com',
    phone: '+972-52-123-4568',
    emergencyContact: {
      name: 'John Feldman',
      relationship: 'Spouse',
      phone: '+972-50-123-4567',
    },
    medicalConditions: ['Type 2 Diabetes'],
    allergies: [],
    primaryCarePhysician: 'Dr. Sarah Johnson',
    insuranceProvider: 'BlueCross BlueShield',
    insuranceNumber: 'BC123456790',
    familyId: 'feldman-family',
    familyRole: 'Mother',
    relationshipToAccountOwner: 'Mother',
  },
  {
    id: 'patient-3',
    name: 'Robert Feldman',
    initials: 'RF',
    dateOfBirth: '1940-11-08',
    age: 84,
    gender: 'Male',
    email: 'robert.feldman@me.com',
    phone: '+972-54-123-4569',
    emergencyContact: {
      name: 'John Feldman',
      relationship: 'Son',
      phone: '+972-50-123-4567',
    },
    medicalConditions: ['Hypertension', 'High Cholesterol'],
    allergies: ['Sulfa drugs'],
    primaryCarePhysician: 'Dr. Robert Martinez',
    insuranceProvider: 'Medicare',
    insuranceNumber: 'MC987654321',
    familyId: 'feldman-family',
    familyRole: 'Grandfather',
    relationshipToAccountOwner: 'Grandfather',
  },
];

// Export patients array with alias
export const patients = patientsData;

// Get patient by ID
export function getPatientById(id: string): Patient | undefined {
  return patientsData.find(patient => patient.id === id);
}

// Get available relationships for patient forms
export function getAvailableRelationships(): string[] {
  return [
    'Self',
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Grandparent',
    'Grandchild',
    'Uncle',
    'Aunt',
    'Nephew',
    'Niece',
    'Cousin',
    'Other',
  ];
}

// Calendar event interface
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string; // Time in HH:MM format
  type: 'appointment' | 'test' | 'medication' | 'reminder' | 'other';
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  facility?: string;
  description?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

// Generate events for a specific month
export function generateMonthEvents(month: number, year: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Generate 1-3 events per week
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      const eventCount = hash(`${dateStr}-events`) % 3 + 1;
      
      for (let i = 0; i < eventCount; i++) {
        const eventHash = hash(`${dateStr}-${i}`);
        const eventType = eventTypes[eventHash % eventTypes.length];
        const patient = patientsData[eventHash % patientsData.length];
        const titleIndex = eventHash % eventType.titles.length;
        const title = eventType.titles[titleIndex];
        const specialtyIndex = eventHash % eventType.specialties.length;
        const specialty = eventType.specialties[specialtyIndex];
        
        const hour = 9 + (eventHash % 8); // Between 9 AM and 5 PM
        const minute = (eventHash % 4) * 15; // 0, 15, 30, or 45
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        
        events.push({
          id: `event-${dateStr}-${i}`,
          title,
          date: dateStr,
          time,
          type: eventType.type as 'appointment' | 'test',
          patientId: patient.id,
          patientName: patient.name,
          facility: specialty,
          status: 'scheduled',
        });
      }
    }
  }
  
  return events.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return (a.time || '').localeCompare(b.time || '');
  });
}

// Get events for current month
export function getCurrentMonthEvents(): CalendarEvent[] {
  const now = new Date();
  return generateMonthEvents(now.getMonth(), now.getFullYear());
}

// Get upcoming appointments (next 7 days)
export function getUpcomingAppointments(): CalendarEvent[] {
  const events = getCurrentMonthEvents();
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= nextWeek && event.type === 'appointment';
  });
}

// Stats data
export const statsData = {
  activePatients: patientsData.length,
  upcomingAppointments: 5,
  recentRecords: 12,
  activeMedications: 8,
};

// Document folders
export const documentFolders = [
  { id: 'folder-1', name: 'Lab Results', count: 24, color: '#3b82f6', icon: '🧪', trend: '+3', trendType: 'positive' },
  { id: 'folder-2', name: 'Imaging', count: 18, color: '#8b5cf6', icon: '📷', trend: '+2', trendType: 'positive' },
  { id: 'folder-3', name: 'Prescriptions', count: 12, color: '#10b981', icon: '💊', trend: '+1', trendType: 'positive' },
  { id: 'folder-4', name: 'Insurance', count: 8, color: '#f59e0b', icon: '📄', trend: '0', trendType: '' },
  { id: 'folder-5', name: 'Doctors Notes', count: 15, color: '#ef4444', icon: '📝', trend: '+2', trendType: 'positive' },
];

// Patient profiles
export const patientProfiles = patientsData.map(patient => {
  const metaParts: string[] = [];
  if (patient.age) {
    metaParts.push(`Age ${patient.age}`);
  }
  if (patient.medicalConditions && patient.medicalConditions.length > 0) {
    metaParts.push(patient.medicalConditions.slice(0, 2).join(', '));
  }
  return {
    id: patient.id,
    name: patient.name,
    initials: patient.initials,
    age: patient.age,
    conditions: patient.medicalConditions || [],
    nextAppointment: '2025-02-15',
    meta: metaParts.join(' • ') || '',
  };
});

// Notification interface
export interface Notification {
  id: string;
  type: 'reminder' | 'document' | 'secondOpinion' | 'appointment' | 'test' | 'medication' | 'carePlan';
  title: string;
  message: string;
  timestamp: string; // ISO date string
  read: boolean;
  link?: string; // Optional link to related page
  patientId?: string;
  patientName?: string;
}

// Notification data
export const notificationsData: Notification[] = [
  {
    id: 'notif-1',
    type: 'reminder',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Emily Carter tomorrow at 10:00 AM',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    link: '/dashboard/calendar',
  },
  {
    id: 'notif-2',
    type: 'document',
    title: 'New Medical Record Added',
    message: 'CT scan results for John Feldman have been uploaded',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    read: false,
    link: '/dashboard/records',
    patientId: 'patient-1',
    patientName: 'John Feldman',
  },
  {
    id: 'notif-3',
    type: 'secondOpinion',
    title: 'Second Opinion Obtained',
    message: 'Dr. Emily Carter has completed the second opinion consultation for Keytruda treatment',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: false,
    link: '/dashboard/care-plans',
    patientId: 'patient-1',
    patientName: 'John Feldman',
  },
  {
    id: 'notif-4',
    type: 'test',
    title: 'Test Results Available',
    message: 'Blood test results for Juli Feldman are now available',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    link: '/dashboard/records',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
  },
  {
    id: 'notif-5',
    type: 'medication',
    title: 'Medication Reminder',
    message: 'Time to take Metformin for Juli Feldman',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    read: false,
    link: '/dashboard/medications',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
  },
  {
    id: 'notif-6',
    type: 'carePlan',
    title: 'Care Plan Milestone Due',
    message: 'HbA1c Target milestone is due in 2 days for Diabetes Management Plan',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: false,
    link: '/dashboard/care-plans',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
  },
];

export function getUnreadNotificationCount(): number {
  return notificationsData.filter(n => !n.read).length;
}

// Second Opinion interface
export interface SecondOpinion {
  id: string;
  title: string;
  patient: string;
  condition: string;
  currentDoctor: string;
  doctor: string; // Doctor providing the second opinion
  doctorId?: string; // Reference to doctor ID
  status: 'Waiting' | 'Completed';
  statusType: 'waiting' | 'completed';
  startDate: string; // ISO date string
  endDate?: string; // ISO date string (optional, only for completed)
  recommendation?: string; // Doctor's recommendation
  requestedDate: string; // ISO date string
  description?: string;
  carePlanId?: string; // Reference to care plan ID
  milestoneId?: string; // Reference to milestone ID
}

// Second opinion data
export const secondOpinionData = {
  pending: 1, // Count of waiting requests
  completed: 1,
  requests: [
    {
      id: 'so-1',
      title: 'Second Opinion - Kidney Cancer Treatment',
      patient: 'John Feldman',
      condition: 'Left Kidney Cancer',
      currentDoctor: 'Dr. Sarah Johnson',
      doctor: 'Dr. Emily Carter',
      doctorId: 'doctor-3',
      status: 'Waiting' as const,
      statusType: 'waiting' as const,
      startDate: '2026-02-05',
      requestedDate: '2026-01-28',
      description: 'Second opinion review of CT scan results and treatment plan after metastases in kidneys were identified',
      carePlanId: 'plan-1', // Link to Keytruda care plan
      milestoneId: 'm8a', // Link to milestone
    },
    {
      id: 'so-2',
      title: 'Second Opinion - Diabetes Management',
      patient: 'Juli Feldman',
      condition: 'Type 2 Diabetes',
      currentDoctor: 'Dr. Sarah Johnson',
      doctor: 'Dr. Lisa Wang',
      doctorId: 'doctor-5',
      status: 'Completed' as const,
      statusType: 'completed' as const,
      startDate: '2024-12-15',
      endDate: '2025-01-05',
      requestedDate: '2024-12-15',
      recommendation: 'Continue current Metformin regimen. Recommend adding regular exercise program and dietary consultation. Monitor HbA1c levels every 3 months. Consider adding GLP-1 receptor agonist if HbA1c remains above 7% after 6 months.',
      description: 'Second opinion on diabetes management plan',
      carePlanId: 'plan-2', // Link to Diabetes Management Plan
      milestoneId: 'm3', // Link to milestone
    },
  ] as SecondOpinion[],
};

// Care Plan interface
export interface CarePlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description?: string;
  condition: string;
  treatment: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  doctorId?: string;
  doctorName?: string;
  facility?: string;
  milestones: CarePlanMilestone[];
  medications?: string[];
  notes?: string;
}

// Care Plan Milestone interface
export interface CarePlanMilestone {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  dueDate: string; // ISO date string
  completedDate?: string; // ISO date string
  type?: 'treatment' | 'test' | 'appointment' | 'checkup' | 'other';
  secondOpinionId?: string; // Reference to second opinion ID
}

// Care plans data
export const carePlansData: CarePlan[] = [
  {
    id: 'plan-1',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    title: 'Keytruda Immunotherapy Treatment',
    description: 'Biological treatment with Keytruda (pembrolizumab) for kidney cancer',
    condition: 'Left Kidney Cancer',
    treatment: 'Keytruda (pembrolizumab) - Immunotherapy',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2026-12-31',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    medications: ['Keytruda (pembrolizumab)'],
    milestones: [
      {
        id: 'm1',
        title: 'Initial Treatment Cycle',
        description: 'First infusion of Keytruda',
        status: 'completed',
        dueDate: '2025-11-05',
        completedDate: '2025-11-05',
        type: 'treatment',
      },
      {
        id: 'm2',
        title: 'Second Treatment Cycle',
        description: 'Second infusion (3 weeks after first)',
        status: 'completed',
        dueDate: '2025-11-26',
        completedDate: '2025-11-26',
        type: 'treatment',
      },
      {
        id: 'm3',
        title: 'Baseline CT Scan',
        description: 'CT scan to establish baseline before treatment',
        status: 'completed',
        dueDate: '2025-11-01',
        completedDate: '2025-10-28',
        type: 'test',
      },
      {
        id: 'm4',
        title: 'First Follow-up CT Scan',
        description: 'CT scan after 3 cycles to assess response',
        status: 'completed',
        dueDate: '2025-12-17',
        completedDate: '2025-12-17',
        type: 'test',
      },
      {
        id: 'm5',
        title: 'Oncology Consultation',
        description: 'Review treatment progress and side effects',
        status: 'completed',
        dueDate: '2025-12-20',
        completedDate: '2025-12-20',
        type: 'appointment',
      },
      {
        id: 'm6',
        title: 'Third Treatment Cycle',
        description: 'Third infusion',
        status: 'completed',
        dueDate: '2025-12-17',
        completedDate: '2025-12-17',
        type: 'treatment',
      },
      {
        id: 'm7',
        title: 'Fourth Treatment Cycle',
        description: 'Fourth infusion',
        status: 'completed',
        dueDate: '2026-01-07',
        completedDate: '2026-01-07',
        type: 'treatment',
      },
      {
        id: 'm8',
        title: 'Second Follow-up CT Scan',
        description: 'CT scan after 6 cycles',
        status: 'completed',
        dueDate: '2026-01-28',
        completedDate: '2026-01-28',
        type: 'test',
      },
      {
        id: 'm8a',
        title: 'Second Opinion Consultation',
        description: 'Second opinion review of CT scan results and treatment plan after metastases in kidneys were identified',
        status: 'completed',
        dueDate: '2026-02-05',
        completedDate: '2026-02-05',
        type: 'appointment',
        secondOpinionId: 'so-1', // Link to second opinion
      },
      {
        id: 'm9',
        title: 'Mid-Treatment Assessment',
        description: 'Comprehensive assessment at treatment midpoint',
        status: 'pending',
        dueDate: '2026-05-15',
        type: 'checkup',
      },
      {
        id: 'm10',
        title: 'Final Treatment Cycle',
        description: 'Last scheduled infusion',
        status: 'pending',
        dueDate: '2026-12-10',
        type: 'treatment',
      },
      {
        id: 'm11',
        title: 'Post-Treatment CT Scan',
        description: 'Final CT scan to assess treatment outcome',
        status: 'pending',
        dueDate: '2026-12-24',
        type: 'test',
      },
      {
        id: 'm12',
        title: 'Final Oncology Consultation',
        description: 'Review final results and plan follow-up care',
        status: 'pending',
        dueDate: '2026-12-31',
        type: 'appointment',
      },
    ],
    notes: 'Keytruda is administered via IV infusion every 3 weeks. Treatment duration is approximately 13 months. Regular monitoring for immune-related side effects is required.',
  },
  {
    id: 'plan-2',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    title: 'Diabetes Management Plan',
    description: 'Comprehensive diabetes care and monitoring plan',
    condition: 'Type 2 Diabetes',
    treatment: 'Metformin, Lifestyle Management',
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2025-05-01',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    facility: 'Manhattan Medical Center',
    medications: ['Metformin'],
    milestones: [
      { id: 'm1', title: 'HbA1c Target', description: 'Achieve HbA1c below 7%', status: 'in-progress', dueDate: '2025-02-01', type: 'checkup' },
      { id: 'm2', title: 'Weight Management', description: 'Lose 10 pounds', status: 'in-progress', dueDate: '2025-03-01', type: 'checkup' },
      {
        id: 'm3',
        title: 'Second Opinion Consultation',
        description: 'Second opinion on diabetes management plan and treatment approach',
        status: 'completed',
        dueDate: '2025-01-05',
        completedDate: '2025-01-05',
        type: 'appointment',
        secondOpinionId: 'so-2', // Link to second opinion
      },
    ],
  },
];

// Helper functions for care plans
export function getCarePlansByPatientId(patientId: string): CarePlan[] {
  return carePlansData.filter(plan => plan.patientId === patientId);
}

export function getActiveCarePlansByPatientId(patientId: string): CarePlan[] {
  return carePlansData.filter(plan => plan.patientId === patientId && plan.status === 'active');
}

export function getCarePlanById(id: string): CarePlan | undefined {
  return carePlansData.find(plan => plan.id === id);
}

// Medications data - Basic structure (kept for backward compatibility)
export const medicationsData = {
  summary: {
    active: 8,
    status: 'All on schedule',
    statusType: 'healthy' as const,
  },
  medications: [
    {
      name: 'Metformin',
      patient: 'Juli Feldman',
      dosage: '500mg twice daily',
      nextDose: 'Today 8:00 AM',
    },
    {
      name: 'Aspirin',
      patient: 'John Feldman',
      dosage: '81mg daily',
      nextDose: 'Today 7:00 AM',
    },
    {
      name: 'Lisinopril',
      patient: 'Robert Feldman',
      dosage: '10mg daily',
      nextDose: 'Today 9:00 AM',
    },
  ],
};

// Medication interface with full prescription details
export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  patientId: string;
  patientName: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "twice daily", "once daily", "every 8 hours"
  instructions?: string; // Additional instructions like "with food", "before meals"
  prescribedBy: string; // Doctor name
  doctorId?: string;
  prescriptionDate: string; // ISO date string
  startDate: string; // ISO date string
  endDate?: string; // ISO date string (if applicable)
  status: 'active' | 'completed' | 'discontinued';
  refillsRemaining?: number;
  totalRefills?: number;
  pharmacy?: string;
  pharmacyPhone?: string;
  indication?: string; // What it's prescribed for
  sideEffects?: string[];
  notes?: string;
}

// Medications data with full prescription details
export const medications: Medication[] = [
  {
    id: 'med-1',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    dosage: '500mg',
    frequency: 'Twice daily',
    instructions: 'Take with meals',
    prescribedBy: 'Dr. Sarah Johnson',
    doctorId: 'doctor-1',
    prescriptionDate: '2025-01-15',
    startDate: '2025-01-16',
    status: 'active',
    refillsRemaining: 2,
    totalRefills: 3,
    pharmacy: 'CVS Pharmacy',
    pharmacyPhone: '+1 (555) 234-5678',
    indication: 'Type 2 Diabetes',
    sideEffects: ['Nausea', 'Diarrhea'],
    notes: 'Monitor blood glucose levels',
  },
  {
    id: 'med-2',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    dosage: '81mg',
    frequency: 'Once daily',
    instructions: 'Take with water',
    prescribedBy: 'Dr. Sarah Johnson',
    doctorId: 'doctor-1',
    prescriptionDate: '2025-01-10',
    startDate: '2025-01-11',
    status: 'active',
    refillsRemaining: 5,
    totalRefills: 6,
    pharmacy: 'Walgreens',
    pharmacyPhone: '+1 (555) 345-6789',
    indication: 'Cardiovascular protection',
    notes: 'Low-dose aspirin for heart health',
  },
  {
    id: 'med-3',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    dosage: '10mg',
    frequency: 'Once daily',
    instructions: 'Take in the morning',
    prescribedBy: 'Dr. Robert Martinez',
    doctorId: 'doctor-4',
    prescriptionDate: '2025-01-08',
    startDate: '2025-01-09',
    status: 'active',
    refillsRemaining: 1,
    totalRefills: 3,
    pharmacy: 'Rite Aid',
    pharmacyPhone: '+1 (555) 456-7890',
    indication: 'Hypertension',
    sideEffects: ['Dry cough', 'Dizziness'],
    notes: 'Monitor blood pressure regularly',
  },
  {
    id: 'med-4',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    dosage: '20mg',
    frequency: 'Once daily',
    instructions: 'Take at bedtime',
    prescribedBy: 'Dr. Robert Martinez',
    doctorId: 'doctor-4',
    prescriptionDate: '2025-01-08',
    startDate: '2025-01-09',
    status: 'active',
    refillsRemaining: 2,
    totalRefills: 3,
    pharmacy: 'Rite Aid',
    pharmacyPhone: '+1 (555) 456-7890',
    indication: 'High Cholesterol',
    sideEffects: ['Muscle pain', 'Liver enzyme elevation'],
    notes: 'Take with food to reduce stomach upset',
  },
  {
    id: 'med-5',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    dosage: '20mg',
    frequency: 'Once daily',
    instructions: 'Take before breakfast',
    prescribedBy: 'Dr. Sarah Johnson',
    doctorId: 'doctor-1',
    prescriptionDate: '2024-12-25',
    startDate: '2024-12-26',
    endDate: '2025-02-26',
    status: 'active',
    refillsRemaining: 1,
    totalRefills: 2,
    pharmacy: 'Walgreens',
    pharmacyPhone: '+1 (555) 345-6789',
    indication: 'Acid reflux',
    notes: 'Short-term treatment for post-surgery',
  },
  {
    id: 'med-6',
    name: 'Gabapentin',
    genericName: 'Gabapentin',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    dosage: '300mg',
    frequency: 'Three times daily',
    instructions: 'Take with food',
    prescribedBy: 'Dr. Patricia Brown',
    doctorId: 'doctor-7',
    prescriptionDate: '2024-12-20',
    startDate: '2024-12-21',
    endDate: '2025-01-21',
    status: 'completed',
    refillsRemaining: 0,
    totalRefills: 1,
    pharmacy: 'CVS Pharmacy',
    pharmacyPhone: '+1 (555) 234-5678',
    indication: 'Post-surgical pain',
    sideEffects: ['Drowsiness', 'Dizziness'],
    notes: 'Completed course after surgery recovery',
  },
  {
    id: 'med-7',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    dosage: '75mcg',
    frequency: 'Once daily',
    instructions: 'Take on empty stomach, 30 minutes before breakfast',
    prescribedBy: 'Dr. Sarah Johnson',
    doctorId: 'doctor-1',
    prescriptionDate: '2024-11-01',
    startDate: '2024-11-02',
    status: 'active',
    refillsRemaining: 4,
    totalRefills: 6,
    pharmacy: 'CVS Pharmacy',
    pharmacyPhone: '+1 (555) 234-5678',
    indication: 'Hypothyroidism',
    notes: 'Lifelong medication, monitor TSH levels',
  },
  {
    id: 'med-8',
    name: 'Metoprolol',
    genericName: 'Metoprolol Tartrate',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    dosage: '25mg',
    frequency: 'Twice daily',
    instructions: 'Take with meals',
    prescribedBy: 'Dr. Robert Martinez',
    doctorId: 'doctor-4',
    prescriptionDate: '2024-10-15',
    startDate: '2024-10-16',
    status: 'active',
    refillsRemaining: 3,
    totalRefills: 6,
    pharmacy: 'Rite Aid',
    pharmacyPhone: '+1 (555) 456-7890',
    indication: 'Hypertension, Heart rate control',
    sideEffects: ['Fatigue', 'Cold hands and feet'],
    notes: 'Do not stop abruptly',
  },
];

// Helper functions for medications
export function getMedicationsByPatientId(patientId: string): Medication[] {
  return medications.filter(med => med.patientId === patientId);
}

export function getActiveMedicationsByPatientId(patientId: string): Medication[] {
  return medications.filter(med => med.patientId === patientId && med.status === 'active');
}

export function getMedicationById(id: string): Medication | undefined {
  return medications.find(med => med.id === id);
}

export function getMedicationsByDoctorId(doctorId: string): Medication[] {
  return medications.filter(med => med.doctorId === doctorId);
}

// Doctor interface
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
  patients: string[]; // Patient IDs
  medicalProviders?: string[]; // Medical Provider IDs - a doctor can be associated with multiple providers
  lastVisit?: string; // ISO date string
  nextAppointment?: string; // ISO date string
  notes?: string;
}

// Doctors data
export const doctorsData: Doctor[] = [
  {
    id: 'doctor-1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practice',
    email: 'sarah.johnson@maccabi.co.il',
    phone: '+972-3-777-1111',
    patients: ['patient-1', 'patient-2'],
    medicalProviders: ['provider-1'], // Maccabi HealthCare
    lastVisit: '2025-01-15',
  },
  {
    id: 'doctor-2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    email: 'mchen@maccabi.co.il',
    phone: '+972-3-777-2222',
    patients: ['patient-1'],
    medicalProviders: ['provider-1', 'provider-3'], // Maccabi HealthCare, Assuta Medical Center
    lastVisit: '2024-12-10',
  },
  {
    id: 'doctor-3',
    name: 'Dr. Emily Carter',
    specialty: 'Oncology',
    email: 'ecarter@sheba.co.il',
    phone: '+972-3-530-3333',
    patients: ['patient-1', 'patient-2'],
    medicalProviders: ['provider-2'], // Sheba Medical Center
    lastVisit: '2024-11-20',
  },
  {
    id: 'doctor-4',
    name: 'Dr. Robert Martinez',
    specialty: 'Cardiology',
    email: 'rmartinez@maccabi.co.il',
    phone: '+972-3-777-4444',
    patients: ['patient-3'],
    medicalProviders: ['provider-1'], // Maccabi HealthCare
    lastVisit: '2025-01-08',
  },
  {
    id: 'doctor-5',
    name: 'Dr. Lisa Wang',
    specialty: 'Endocrinology',
    email: 'lwang@maccabi.co.il',
    phone: '+972-3-777-5555',
    patients: ['patient-2'],
    medicalProviders: ['provider-1'], // Maccabi HealthCare
    lastVisit: '2024-12-05',
  },
  {
    id: 'doctor-6',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    email: 'jwilson@assuta.co.il',
    phone: '+972-3-764-6666',
    patients: ['patient-1'],
    medicalProviders: ['provider-3'], // Assuta Medical Center
    lastVisit: '2024-10-15',
  },
  {
    id: 'doctor-7',
    name: 'Dr. Patricia Brown',
    specialty: 'Urology',
    email: 'pbrown@sheba.co.il',
    phone: '+972-3-530-7777',
    patients: ['patient-1'],
    medicalProviders: ['provider-2'], // Sheba Medical Center
    lastVisit: '2024-12-20',
  },
  {
    id: 'doctor-8',
    name: 'Dr. David Kim',
    specialty: 'Orthopedics',
    email: 'dkim@assuta.co.il',
    phone: '+972-3-764-8888',
    patients: ['patient-3'],
    medicalProviders: ['provider-3'], // Assuta Medical Center
    lastVisit: '2024-09-10',
  },
];

export function getDoctorsByPatientId(patientId: string): Doctor[] {
  return doctorsData.filter(doctor => doctor.patients.includes(patientId));
}

export function getDoctorsByMedicalProviderId(providerId: string): Doctor[] {
  return doctorsData.filter(doctor => doctor.medicalProviders?.includes(providerId));
}

export function getMedicalProvidersByDoctorId(doctorId: string): MedicalProvider[] {
  return medicalProvidersData.filter(provider => provider.doctors?.includes(doctorId));
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctorsData.find(doctor => doctor.id === id);
}

// Medical Record interface
export interface MedicalRecord {
  id: string;
  title: string;
  type: 'MRI' | 'CT Scan' | 'PET Scan' | 'X-Ray' | 'Ultrasound' | 'Blood Test' | 'Lab Test' | 'Biopsy' | 'Doctor Letter' | 'Prescription' | 'Hospital Discharge' | 'Surgery Report' | 'Pathology Report' | 'Other';
  patientId: string;
  patientName: string;
  date: string; // ISO date string (medical date - when the test/procedure was done)
  doctorId?: string;
  doctorName?: string;
  facility?: string;
  description?: string;
  fileUrl?: string; // URL to the actual file/document
  tags?: string[]; // e.g., ['urgent', 'follow-up', 'for doctor']
  notes?: string;
  // Submission tracking
  channel?: 'Email' | 'Telegram' | 'WhatsApp' | 'Direct Upload'; // How the document was submitted
  receivedAt?: string; // ISO date string - when we received the document
  processedAt?: string; // ISO date string - when AI finished processing it
}

// Medical Records data
export const medicalRecordsData: MedicalRecord[] = [
  // MRI Scans
  {
    id: 'record-1',
    title: 'MRI Brain - T1 Weighted',
    type: 'MRI',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2025-01-10',
    doctorId: 'doctor-6',
    doctorName: 'Dr. James Wilson',
    facility: 'Neurological Institute',
    description: 'MRI brain scan with contrast. No abnormalities detected.',
    tags: ['follow-up'],
    channel: 'Email',
    receivedAt: '2025-01-11T10:30:00Z',
    processedAt: '2025-01-11T10:35:00Z',
  },
  {
    id: 'record-2',
    title: 'MRI Brain - T2/FLAIR',
    type: 'MRI',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2025-01-10',
    doctorId: 'doctor-6',
    doctorName: 'Dr. James Wilson',
    facility: 'Neurological Institute',
    description: 'Follow-up MRI scan.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-11T10:30:00Z',
    processedAt: '2025-01-11T10:35:00Z',
  },
  {
    id: 'record-3',
    title: 'MRI Brain with Lesion',
    type: 'MRI',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-12-15',
    doctorId: 'doctor-6',
    doctorName: 'Dr. James Wilson',
    facility: 'Neurological Institute',
    description: 'MRI showing small lesion in left frontal lobe. Follow-up recommended.',
    tags: ['urgent', 'follow-up'],
    channel: 'Direct Upload',
    receivedAt: '2024-12-16T09:15:00Z',
    processedAt: '2024-12-16T09:20:00Z',
  },
  {
    id: 'record-4',
    title: 'MRI Knee - Right',
    type: 'MRI',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    date: '2024-11-20',
    doctorId: 'doctor-8',
    doctorName: 'Dr. David Kim',
    facility: 'Bone & Joint Clinic',
    description: 'MRI of right knee showing meniscal tear.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-11-21T14:20:00Z',
    processedAt: '2024-11-21T14:25:00Z',
  },
  
  // CT Scans
  {
    id: 'record-5',
    title: 'CT Scan - Brain',
    type: 'CT Scan',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-05',
    doctorId: 'doctor-6',
    doctorName: 'Dr. James Wilson',
    facility: 'Neurological Institute',
    description: 'CT scan of brain without contrast.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-12-06T11:00:00Z',
    processedAt: '2024-12-06T11:05:00Z',
  },
  {
    id: 'record-6',
    title: 'CT Scan - Chest',
    type: 'CT Scan',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-11-10',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    description: 'CT chest scan for cancer staging.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-11-11T08:30:00Z',
    processedAt: '2024-11-11T08:35:00Z',
  },
  {
    id: 'record-7',
    title: 'CT Scan - Abdomen',
    type: 'CT Scan',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-18',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'CT abdomen scan pre-surgery.',
    tags: [],
    channel: 'Direct Upload',
    receivedAt: '2024-12-19T10:00:00Z',
    processedAt: '2024-12-19T10:05:00Z',
  },
  
  // PET-CT Scans
  {
    id: 'record-8',
    title: 'PET-CT Brain',
    type: 'PET Scan',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-20',
    doctorId: 'doctor-6',
    doctorName: 'Dr. James Wilson',
    facility: 'Neurological Institute',
    description: 'PET-CT scan of brain for cancer detection.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-12-21T09:00:00Z',
    processedAt: '2024-12-21T09:10:00Z',
  },
  {
    id: 'record-9',
    title: 'PET-CT Abdomen',
    type: 'PET Scan',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-11-15',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    description: 'PET-CT abdomen for metastasis screening.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-11-16T10:30:00Z',
    processedAt: '2024-11-16T10:35:00Z',
  },
  
  // X-Rays
  {
    id: 'record-10',
    title: 'X-Ray - Chest',
    type: 'X-Ray',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    date: '2024-10-05',
    doctorId: 'doctor-4',
    doctorName: 'Dr. Robert Martinez',
    facility: 'Heart Health Institute',
    description: 'Chest X-ray showing clear lungs.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-10-06T13:00:00Z',
    processedAt: '2024-10-06T13:05:00Z',
  },
  {
    id: 'record-11',
    title: 'X-Ray - Hand',
    type: 'X-Ray',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    date: '2024-09-15',
    doctorId: 'doctor-8',
    doctorName: 'Dr. David Kim',
    facility: 'Bone & Joint Clinic',
    description: 'X-ray of left hand showing no fractures.',
    tags: [],
    channel: 'Direct Upload',
    receivedAt: '2024-09-16T11:00:00Z',
    processedAt: '2024-09-16T11:05:00Z',
  },
  
  // Blood Tests
  {
    id: 'record-12',
    title: 'Complete Blood Count (CBC)',
    type: 'Blood Test',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2025-01-15',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    facility: 'Manhattan Medical Center',
    description: 'CBC results within normal range.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-16T08:00:00Z',
    processedAt: '2025-01-16T08:05:00Z',
  },
  {
    id: 'record-13',
    title: 'Blood Test - Lipid Panel',
    type: 'Blood Test',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    date: '2025-01-08',
    doctorId: 'doctor-4',
    doctorName: 'Dr. Robert Martinez',
    facility: 'Heart Health Institute',
    description: 'Cholesterol levels improved with medication.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-09T09:00:00Z',
    processedAt: '2025-01-09T09:05:00Z',
  },
  {
    id: 'record-14',
    title: 'Blood Test - HbA1c',
    type: 'Blood Test',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2025-01-10',
    doctorId: 'doctor-5',
    doctorName: 'Dr. Lisa Wang',
    facility: 'Metabolic Health Clinic',
    description: 'HbA1c level: 6.8% - Good control.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-11T10:00:00Z',
    processedAt: '2025-01-11T10:05:00Z',
  },
  
  // Lab Tests
  {
    id: 'record-15',
    title: 'Urine Analysis',
    type: 'Lab Test',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2025-01-12',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'Urine analysis showing normal results.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-13T11:00:00Z',
    processedAt: '2025-01-13T11:05:00Z',
  },
  {
    id: 'record-16',
    title: 'Thyroid Function Test',
    type: 'Lab Test',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-12-20',
    doctorId: 'doctor-5',
    doctorName: 'Dr. Lisa Wang',
    facility: 'Metabolic Health Clinic',
    description: 'TSH, T3, T4 levels within normal range.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-12-21T09:00:00Z',
    processedAt: '2024-12-21T09:05:00Z',
  },
  
  // Biopsies
  {
    id: 'record-17',
    title: 'Kidney Biopsy',
    type: 'Biopsy',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-11-25',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'Biopsy of left kidney showing malignant cells.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-11-26T14:00:00Z',
    processedAt: '2024-11-26T14:10:00Z',
  },
  
  // Doctor Letters
  {
    id: 'record-18',
    title: 'Consultation Letter - Cardiology',
    type: 'Doctor Letter',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-10',
    doctorId: 'doctor-2',
    doctorName: 'Dr. Michael Chen',
    facility: 'Heart Health Clinic',
    description: 'Consultation summary and recommendations.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-12-11T10:00:00Z',
    processedAt: '2024-12-11T10:05:00Z',
  },
  {
    id: 'record-19',
    title: 'Follow-up Letter - Oncology',
    type: 'Doctor Letter',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-11-20',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    description: 'Follow-up consultation notes.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-11-21T09:00:00Z',
    processedAt: '2024-11-21T09:05:00Z',
  },
  
  // Prescriptions
  {
    id: 'record-23',
    title: 'Prescription - Metformin',
    type: 'Prescription',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2025-01-15',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    facility: 'Manhattan Medical Center',
    description: 'Metformin 500mg, twice daily. 90-day supply.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-15T14:00:00Z',
    processedAt: '2025-01-15T14:05:00Z',
  },
  {
    id: 'record-24',
    title: 'Prescription - Aspirin',
    type: 'Prescription',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2025-01-10',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    facility: 'Manhattan Medical Center',
    description: 'Aspirin 81mg, daily. 30-day supply.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-10T11:00:00Z',
    processedAt: '2025-01-10T11:05:00Z',
  },
  {
    id: 'record-25',
    title: 'Prescription - Lisinopril',
    type: 'Prescription',
    patientId: 'patient-3',
    patientName: 'Robert Feldman',
    date: '2025-01-08',
    doctorId: 'doctor-4',
    doctorName: 'Dr. Robert Martinez',
    facility: 'Heart Health Institute',
    description: 'Lisinopril 10mg, daily. 90-day supply.',
    tags: [],
    channel: 'Email',
    receivedAt: '2025-01-08T10:00:00Z',
    processedAt: '2025-01-08T10:05:00Z',
  },
  
  // Hospital Discharge
  {
    id: 'record-26',
    title: 'Hospital Discharge Summary',
    type: 'Hospital Discharge',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-20',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'Discharge summary after kidney surgery. Recovery instructions included.',
    tags: ['urgent', 'follow-up'],
    channel: 'Direct Upload',
    receivedAt: '2024-12-21T08:00:00Z',
    processedAt: '2024-12-21T08:10:00Z',
  },
  {
    id: 'record-27',
    title: 'Hospital Discharge Summary',
    type: 'Hospital Discharge',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-11-10',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    description: 'Discharge summary after treatment procedure.',
    tags: ['follow-up'],
    channel: 'Email',
    receivedAt: '2024-11-11T09:00:00Z',
    processedAt: '2024-11-11T09:05:00Z',
  },
  
  // Surgery Reports
  {
    id: 'record-28',
    title: 'Surgery Report - Kidney Resection',
    type: 'Surgery Report',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-18',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'Partial nephrectomy of left kidney. Procedure successful.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-12-19T10:00:00Z',
    processedAt: '2024-12-19T10:15:00Z',
  },
  
  // Pathology Reports
  {
    id: 'record-29',
    title: 'Pathology Report - Kidney Tissue',
    type: 'Pathology Report',
    patientId: 'patient-1',
    patientName: 'John Feldman',
    date: '2024-12-18',
    doctorId: 'doctor-7',
    doctorName: 'Dr. Patricia Brown',
    facility: 'New York Surgical Center',
    description: 'Pathology analysis of resected kidney tissue.',
    tags: ['urgent'],
    channel: 'Email',
    receivedAt: '2024-12-20T11:00:00Z',
    processedAt: '2024-12-20T11:10:00Z',
  },
  {
    id: 'record-30',
    title: 'Pathology Report - Biopsy',
    type: 'Pathology Report',
    patientId: 'patient-2',
    patientName: 'Juli Feldman',
    date: '2024-10-15',
    doctorId: 'doctor-3',
    doctorName: 'Dr. Emily Carter',
    facility: 'New York Cancer Center',
    description: 'Pathology report from tissue biopsy.',
    tags: [],
    channel: 'Email',
    receivedAt: '2024-10-16T09:00:00Z',
    processedAt: '2024-10-16T09:05:00Z',
  },
];

export function getMedicalRecordsByPatientId(patientId: string): MedicalRecord[] {
  return medicalRecordsData.filter(record => record.patientId === patientId);
}

export function getMedicalRecordsByType(type: MedicalRecord['type']): MedicalRecord[] {
  return medicalRecordsData.filter(record => record.type === type);
}

export function getMedicalRecordById(id: string): MedicalRecord | undefined {
  return medicalRecordsData.find(record => record.id === id);
}

export function getMedicalRecordsByDoctorId(doctorId: string): MedicalRecord[] {
  return medicalRecordsData.filter(record => record.doctorId === doctorId);
}

// Medical Provider interface
export interface MedicalProvider {
  id: string;
  name: string;
  type: 'HMO' | 'Hospital' | 'Clinic' | 'Medical Center';
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  specialties?: string[]; // Services/specialties offered
  notes?: string;
  patients: string[]; // Patient IDs using this provider
  doctors?: string[]; // Doctor IDs associated with this provider
}

// Medical Providers data
export const medicalProvidersData: MedicalProvider[] = [
  {
    id: 'provider-1',
    name: 'Maccabi HealthCare',
    type: 'HMO',
    phone: '+972-3-777-7777',
    email: 'contact@maccabi.co.il',
    website: 'https://www.maccabi4u.co.il',
    address: '27 Hamered St',
    city: 'Tel Aviv',
    country: 'Israel',
    specialties: ['Primary Care', 'Specialists', 'Emergency Care', 'Pharmacy'],
    patients: ['patient-1', 'patient-2', 'patient-3'],
    doctors: ['doctor-1', 'doctor-2', 'doctor-4', 'doctor-5'],
  },
  {
    id: 'provider-2',
    name: 'Sheba Medical Center',
    type: 'Hospital',
    phone: '+972-3-530-3030',
    email: 'info@sheba.co.il',
    website: 'https://www.sheba.co.il',
    address: 'Derech Sheba 2',
    city: 'Ramat Gan',
    country: 'Israel',
    specialties: ['Oncology', 'Cardiology', 'Surgery', 'Emergency', 'Research'],
    patients: ['patient-1', 'patient-2'],
    doctors: ['doctor-3', 'doctor-7'],
  },
  {
    id: 'provider-3',
    name: 'Assuta Medical Center',
    type: 'Medical Center',
    phone: '+972-3-764-4444',
    email: 'info@assuta.co.il',
    website: 'https://www.assuta.co.il',
    address: '20 Habarzel St',
    city: 'Tel Aviv',
    country: 'Israel',
    specialties: ['Surgery', 'Oncology', 'Cardiology', 'Imaging', 'Laboratory'],
    patients: ['patient-1'],
    doctors: ['doctor-2', 'doctor-6', 'doctor-8'],
  },
];

export function getMedicalProvidersByPatientId(patientId: string): MedicalProvider[] {
  return medicalProvidersData.filter(provider => provider.patients.includes(patientId));
}

export function getMedicalProviderById(id: string): MedicalProvider | undefined {
  return medicalProvidersData.find(provider => provider.id === id);
}

export function getMedicalProvidersByType(type: MedicalProvider['type']): MedicalProvider[] {
  return medicalProvidersData.filter(provider => provider.type === type);
}
