export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: number;
  applicantCount: number;
  status: 'Active' | 'Closed' | 'Draft';
  datePosted: Date;
  deadline: Date;
  description: string;
  requirements: string[];
  duration: string;
  type: 'Remote' | 'On-site' | 'Hybrid' | 'Full-time' | 'Part-time';
  // Additional fields to match intern view - making them optional for easier mock data
  logo?: string;
  rating?: number;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits?: string[];
  skills?: string[];
  postedDate?: Date;
  applicants?: number;
  isBookmarked?: boolean;
  industry?: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;  // Contact details only visible after acceptance
  skills: string[];
  applicationDate: Date;
  status: 'Applied' | 'Under Review' | 'Offered' | 'Offer Accepted' | 'Offer Rejected' | 'Hired' | 'Rejected';
  internshipId: string;
  internshipTitle: string;
  experience: string;
  education: string;
  resumeUrl?: string;
  // Workflow tracking
  offerSentDate?: Date;
  offerResponseDate?: Date;
  offerLetter?: string;  // Offer letter content
  canViewContactDetails?: boolean;  // Only true after offer acceptance
}

export interface DashboardStats {
  totalInternships: number;
  totalApplicants: number;
  totalHires: number;
  activeInternships: number;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
}

// Notification system for the workflow
export interface Notification {
  id: string;
  type: 'internship_posted' | 'application_received' | 'offer_sent' | 'offer_response' | 'hire_confirmed';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  relatedId: string;  // internship or applicant ID
  recipientType: 'intern' | 'company';
}

// Application workflow states
export interface ApplicationWorkflow {
  applicationId: string;
  internshipId: string;
  applicantId: string;
  companyId: string;
  currentStage: 'applied' | 'reviewing' | 'offered' | 'offer_pending' | 'accepted' | 'rejected' | 'hired';
  stageHistory: {
    stage: string;
    timestamp: Date;
    note?: string;
  }[];
  offerDetails?: {
    offerLetter: string;
    sentDate: Date;
    responseDeadline: Date;
    response?: 'accepted' | 'rejected';
    responseDate?: Date;
  };
}