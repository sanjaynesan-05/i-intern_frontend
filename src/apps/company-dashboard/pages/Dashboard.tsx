import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  UserCheck,
  TrendingUp,
  Plus,
  Star,
  Search,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { StatCard } from '../components/dashboard/StatCard';
import { InternshipCard } from '../components/dashboard/InternshipCard';
import { ApplicantCard } from '../components/dashboard/ApplicantCard';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton';
import { InternshipDetailsModal } from '../components/InternshipDetailsModal';
import { ApplicantDetailsModal } from '../components/ApplicantDetailsModal';
import { NotificationSystem, useNotifications } from '../components/NotificationSystem';
import { 
  mockStats, 
  mockInternships, 
  mockApplicants
} from '@/shared/data/mockData';
import type { DashboardStats, Internship, Applicant } from '@/shared/types';

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [applicantSearch, setApplicantSearch] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);

  // Notification system
  const { notifications, addNotification, markAsRead, removeNotification } = useNotifications();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setStats(mockStats);
      setInternships(mockInternships.filter(i => i.status === 'Active').slice(0, 3));
      setApplicants(mockApplicants.slice(0, 4));
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
    applicant.skills.some(skill => 
      skill.toLowerCase().includes(applicantSearch.toLowerCase())
    )
  );

  const handleInternshipClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  const handleApplicantClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsApplicantModalOpen(true);
  };

  const handleCloseApplicantModal = () => {
    setIsApplicantModalOpen(false);
    setSelectedApplicant(null);
  };

  const handleStatusUpdate = (applicantId: string, newStatus: Applicant['status']) => {
    setApplicants(prevApplicants =>
      prevApplicants.map(applicant => {
        if (applicant.id === applicantId) {
          const updatedApplicant = { 
            ...applicant, 
            status: newStatus,
            // Update contact visibility based on workflow
            canViewContactDetails: newStatus === 'Hired' || newStatus === 'Offer Accepted',
            // Add timestamps for workflow tracking
            ...(newStatus === 'Offered' && { offerSentDate: new Date() }),
            ...(newStatus === 'Offer Accepted' && { offerResponseDate: new Date() }),
            ...(newStatus === 'Offer Rejected' && { offerResponseDate: new Date() })
          };

          // Send notifications based on status change
          const applicantName = applicant.name;
          const internshipTitle = applicant.internshipTitle;

          switch (newStatus) {
            case 'Under Review':
              addNotification({
                type: 'application_received',
                title: 'Application Under Review',
                message: `${applicantName}'s application for ${internshipTitle} is now under review.`,
                recipientType: 'company',
                relatedId: applicantId
              });
              break;

            case 'Offered':
              addNotification({
                type: 'offer_sent',
                title: 'Offer Letter Sent',
                message: `Offer letter sent to ${applicantName} for ${internshipTitle}. Waiting for response.`,
                recipientType: 'company',
                relatedId: applicantId
              });
              break;

            case 'Offer Accepted':
              addNotification({
                type: 'offer_response',
                title: 'Offer Accepted!',
                message: `${applicantName} has accepted the offer for ${internshipTitle}. Contact details are now available.`,
                recipientType: 'company',
                relatedId: applicantId
              });
              break;

            case 'Offer Rejected':
              addNotification({
                type: 'offer_response',
                title: 'Offer Declined',
                message: `${applicantName} has declined the offer for ${internshipTitle}.`,
                recipientType: 'company',
                relatedId: applicantId
              });
              break;

            case 'Hired':
              addNotification({
                type: 'hire_confirmed',
                title: 'Candidate Hired!',
                message: `${applicantName} has been successfully hired for ${internshipTitle}. Welcome to the team!`,
                recipientType: 'company',
                relatedId: applicantId
              });
              break;
          }

          return updatedApplicant;
        }
        return applicant;
      })
    );
    
    // Update the selected applicant if it's the same one
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev => prev ? { 
        ...prev, 
        status: newStatus,
        canViewContactDetails: newStatus === 'Hired' || newStatus === 'Offer Accepted',
        ...(newStatus === 'Offered' && { offerSentDate: new Date() }),
        ...(newStatus === 'Offer Accepted' && { offerResponseDate: new Date() }),
        ...(newStatus === 'Offer Rejected' && { offerResponseDate: new Date() })
      } : null);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Internships"
          value={stats?.totalInternships || 0}
          change="+2 this week"
          icon={Briefcase}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          index={0}
        />
        <StatCard
          title="Total Applicants"
          value={stats?.totalApplicants || 0}
          change="+12% from last month"
          icon={Users}
          gradient="bg-gradient-to-br from-teal-500 to-teal-600"
          index={1}
        />
        <StatCard
          title="Total Hires"
          value={stats?.totalHires || 0}
          change="+3 this month"
          icon={UserCheck}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          index={2}
        />
        <StatCard
          title="Active Internships"
          value={stats?.activeInternships || 0}
          change="2 ending soon"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          index={3}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Post New Internship CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-900 mb-2">
                      Ready to hire top talent?
                    </h3>
                    <p className="text-teal-700 text-sm mb-4">
                      Post a new internship and start receiving applications from qualified candidates.
                    </p>
                    <Link to="/company/post-internship">
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Internship
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 bg-teal-200 rounded-full flex items-center justify-center">
                      <Briefcase className="w-10 h-10 text-teal-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Internships */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Active Internships</CardTitle>
                  <Button variant="ghost" size="sm" className="text-teal-600">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {internships.map((internship, index) => (
                    <InternshipCard
                      key={internship.id}
                      internship={internship}
                      index={index}
                      onClick={handleInternshipClick}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Features Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">
                      Upgrade to Premium
                    </h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Get advanced analytics, priority support, and unlimited postings.
                    </p>
                    <Link to="/pricing?type=company">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-200"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Applicant Search */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Find Candidates</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Filter className="w-4 h-4 mr-1" />
                      Advanced
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search by name, skills, or position..."
                      value={applicantSearch}
                      onChange={(e) => setApplicantSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Applicants */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Applicants</CardTitle>
                  <Button variant="ghost" size="sm" className="text-teal-600">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredApplicants.map((applicant, index) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant={applicant}
                      index={index}
                      onClick={handleApplicantClick}
                    />
                  ))}
                  {filteredApplicants.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No applicants found matching your search.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>

      {/* Internship Details Modal */}
      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Applicant Details Modal */}
      <ApplicantDetailsModal
        applicant={selectedApplicant}
        isOpen={isApplicantModalOpen}
        onClose={handleCloseApplicantModal}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onRemove={removeNotification}
      />
    </div>
  );
};


