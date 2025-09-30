export interface Internship {
  id: string;
  title: string;
  location: string;
  stipend: number;
  applicantCount: number;
  status: 'Active' | 'Closed' | 'Draft';
  datePosted: Date;
  deadline: Date;
  description: string;
  requirements: string[];
  duration: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  skills: string[];
  applicationDate: Date;
  status: 'Pending' | 'Under Review' | 'Hired' | 'Rejected';
  internshipId: string;
  internshipTitle: string;
  experience: string;
  education: string;
  resumeUrl?: string;
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