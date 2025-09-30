import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Star,
  User,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Trophy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { formatDate, getStatusColor } from '@/shared/lib/utils';
import { Applicant } from '@/shared/types';

interface ApplicantDetailsModalProps {
  applicant: Applicant | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: (applicantId: string, newStatus: Applicant['status']) => void;
}

export const ApplicantDetailsModal: React.FC<ApplicantDetailsModalProps> = ({
  applicant,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  const [showDetailedView, setShowDetailedView] = React.useState(false);
  
  if (!applicant) return null;

  const handleStatusUpdate = (newStatus: Applicant['status']) => {
    if (onStatusUpdate) {
      onStatusUpdate(applicant.id, newStatus);
    }
    
    // Show success notification
    const statusMessages = {
      'Applied': 'Application received! 📥',
      'Under Review': 'Application moved to review! 👀',
      'Offered': 'Offer letter sent! ✉️',
      'Offer Accepted': 'Offer accepted by candidate! ✅',
      'Offer Rejected': 'Offer declined by candidate! ❌',
      'Hired': 'Candidate successfully hired! 🎉',
      'Rejected': 'Application rejected! ❌'
    };

    const message = statusMessages[newStatus] || 'Status updated!';
    
    if (typeof document !== 'undefined') {
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.className = 'fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    }
  };

  const handleSendOfferLetter = () => {
    // First update status to 'Offered'
    if (onStatusUpdate) {
      onStatusUpdate(applicant.id, 'Offered');
    }
    
    // Show success notification
    if (typeof document !== 'undefined') {
      const notification = document.createElement('div');
      notification.textContent = '✉️ Offer letter sent to candidate! They will receive a notification.';
      notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg z-50 max-w-sm';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 5000);
    }

    // In a real app, this would:
    // 1. Send notification to intern's dashboard
    // 2. Create offer letter record
    // 3. Set response deadline
    // 4. Send email notification
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied':
        return <Clock className="w-4 h-4" />;
      case 'Under Review':
        return <AlertCircle className="w-4 h-4" />;
      case 'Offered':
        return <Mail className="w-4 h-4" />;
      case 'Offer Accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'Offer Rejected':
        return <XCircle className="w-4 h-4" />;
      case 'Hired':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleDownloadResume = () => {
    if (applicant.resumeUrl) {
      // Create a temporary link to download the resume
      const link = document.createElement('a');
      link.href = applicant.resumeUrl;
      link.download = `${applicant.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Show notification that resume is not available
      const notification = document.createElement('div');
      notification.textContent = '📄 Resume not available for this applicant';
      notification.className = 'fixed top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {applicant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{applicant.name}</h2>
                      {/* Only show contact details if offer has been accepted */}
                      {applicant.canViewContactDetails ? (
                        <>
                          <p className="text-teal-100 flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{applicant.email}</span>
                          </p>
                          {applicant.phone && (
                            <p className="text-teal-100 flex items-center space-x-1 mt-1">
                              <Phone className="w-4 h-4" />
                              <span>{applicant.phone}</span>
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-teal-100 flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>Contact details will be available after offer acceptance</span>
                        </p>
                      )}
                      <p className="text-teal-100 flex items-center space-x-1 mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span>Applied for: {applicant.internshipTitle}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`${getStatusColor(applicant.status)} text-white`}
                    >
                      {getStatusIcon(applicant.status)}
                      <span className="ml-1">{applicant.status}</span>
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Application Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-teal-600" />
                          <span>Application Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Application Date</label>
                            <p className="text-gray-900">{formatDate(applicant.applicationDate)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(applicant.status)}>
                                {getStatusIcon(applicant.status)}
                                <span className="ml-1">{applicant.status}</span>
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Position Applied</label>
                            <p className="text-gray-900">{applicant.internshipTitle}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Applicant ID</label>
                            <p className="text-gray-900 font-mono text-sm">#{applicant.id}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experience & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Briefcase className="w-5 h-5 text-teal-600" />
                            <span>Experience</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            {applicant.experience || 'No experience information provided.'}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <GraduationCap className="w-5 h-5 text-teal-600" />
                            <span>Education</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">
                            {applicant.education || 'No education information provided.'}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-teal-600" />
                          <span>Skills & Competencies</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className="border-teal-200 text-teal-700 bg-teal-50"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    
                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          onClick={handleDownloadResume}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowDetailedView(!showDetailedView);
                            
                            // Scroll to the detailed sections when expanding
                            if (!showDetailedView) {
                              setTimeout(() => {
                                const detailedSection = document.getElementById('detailed-applicant-info');
                                if (detailedSection) {
                                  detailedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }
                          }}
                          className="w-full"
                        >
                          <User className="w-4 h-4 mr-2" />
                          {showDetailedView ? 'Hide Details' : 'View Full Details'}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Status Management & Workflow Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Application Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Current Status Display */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Current Status</p>
                          <p className="font-medium text-gray-900">{applicant.status}</p>
                        </div>

                        {/* Workflow Actions based on current status */}
                        {applicant.status === 'Applied' && (
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate('Under Review')}
                            className="w-full"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Start Review Process
                          </Button>
                        )}

                        {applicant.status === 'Under Review' && (
                          <>
                            <Button
                              variant="default"
                              onClick={() => handleSendOfferLetter()}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Offer Letter
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleStatusUpdate('Rejected')}
                              className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject Application
                            </Button>
                          </>
                        )}

                        {applicant.status === 'Offered' && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              ✉️ Offer letter sent on {applicant.offerSentDate ? formatDate(applicant.offerSentDate) : 'N/A'}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Waiting for candidate response...
                            </p>
                          </div>
                        )}

                        {applicant.status === 'Offer Accepted' && (
                          <Button
                            variant="default"
                            onClick={() => handleStatusUpdate('Hired')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Hiring
                          </Button>
                        )}

                        {applicant.status === 'Offer Rejected' && (
                          <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">
                              ❌ Candidate declined the offer
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Application closed
                            </p>
                          </div>
                        )}

                        {applicant.status === 'Hired' && (
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">
                              ✅ Candidate successfully hired!
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Contact details are now available
                            </p>
                          </div>
                        )}

                        {applicant.status === 'Rejected' && (
                          <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">
                              ❌ Application rejected
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Application closed
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Application Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Application Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {/* Application Submitted */}
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">Application Submitted</p>
                              <p className="text-xs text-gray-500">{formatDate(applicant.applicationDate)}</p>
                            </div>
                          </div>
                          
                          {/* Under Review */}
                          {['Under Review', 'Offered', 'Offer Accepted', 'Offer Rejected', 'Hired', 'Rejected'].includes(applicant.status) && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Review Started</p>
                                <p className="text-xs text-gray-500">Application under evaluation</p>
                              </div>
                            </div>
                          )}

                          {/* Offer Sent */}
                          {['Offered', 'Offer Accepted', 'Offer Rejected', 'Hired'].includes(applicant.status) && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Offer Letter Sent</p>
                                <p className="text-xs text-gray-500">
                                  {applicant.offerSentDate ? formatDate(applicant.offerSentDate) : 'Offer sent to candidate'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Offer Response */}
                          {applicant.status === 'Offer Accepted' && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Offer Accepted</p>
                                <p className="text-xs text-gray-500">
                                  {applicant.offerResponseDate ? formatDate(applicant.offerResponseDate) : 'Candidate accepted offer'}
                                </p>
                              </div>
                            </div>
                          )}

                          {applicant.status === 'Offer Rejected' && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Offer Declined</p>
                                <p className="text-xs text-gray-500">
                                  {applicant.offerResponseDate ? formatDate(applicant.offerResponseDate) : 'Candidate declined offer'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Final Status */}
                          {applicant.status === 'Hired' && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Successfully Hired</p>
                                <p className="text-xs text-gray-500">Candidate onboarded</p>
                              </div>
                            </div>
                          )}

                          {applicant.status === 'Rejected' && (
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium">Application Rejected</p>
                                <p className="text-xs text-gray-500">Application closed</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Detailed View Section */}
              {showDetailedView && (
                <div id="detailed-applicant-info" className="px-6 py-6 border-t bg-gray-50">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">Detailed Information</h3>
                  
                  {/* Skills Assessment */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Technical Skills Assessment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">React Development</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">4/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">JavaScript/TypeScript</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">5/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Node.js</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 3 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">3/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Database Management</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 3 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">3/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Git Version Control</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">4/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">UI/UX Design</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">4/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Work Experience Details */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Detailed Work Experience</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">Frontend Developer Intern</h5>
                          <span className="text-sm text-gray-500">Jun 2023 - Aug 2023</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">TechStart Solutions Inc.</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Developed responsive web components using React and Tailwind CSS</li>
                          <li>• Collaborated with design team to implement user interface mockups</li>
                          <li>• Optimized application performance resulting in 20% faster load times</li>
                          <li>• Participated in code reviews and agile development processes</li>
                        </ul>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">React</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">TypeScript</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Tailwind CSS</span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">Web Development Assistant</h5>
                          <span className="text-sm text-gray-500">Jan 2023 - May 2023</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">University Web Services</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Maintained and updated university department websites</li>
                          <li>• Created documentation for content management procedures</li>
                          <li>• Assisted with accessibility compliance testing and improvements</li>
                        </ul>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">HTML/CSS</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">WordPress</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Accessibility</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio & Projects */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Portfolio & Key Projects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">E-Commerce Dashboard</h5>
                        <p className="text-sm text-gray-600 mb-3">Full-stack web application with React frontend and Node.js backend for managing online store operations.</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">React</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Node.js</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">MongoDB</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">github.com/alexchen/ecommerce-dashboard</span>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Task Management App</h5>
                        <p className="text-sm text-gray-600 mb-3">Mobile-responsive task management application with real-time updates and team collaboration features.</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Vue.js</span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Firebase</span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">PWA</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">taskflow-app.netlify.app</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Academic Information</h4>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Current GPA</h5>
                          <p className="text-2xl font-bold text-green-600">3.8/4.0</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Relevant Coursework</h5>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Data Structures & Algorithms</span>
                              <span className="text-sm font-medium text-gray-800">A</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Web Development</span>
                              <span className="text-sm font-medium text-gray-800">A+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Database Systems</span>
                              <span className="text-sm font-medium text-gray-800">A-</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Software Engineering</span>
                              <span className="text-sm font-medium text-gray-800">A</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements & Certifications */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Achievements & Certifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h5 className="font-medium text-gray-900 mb-2">Certifications</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-gray-700">AWS Cloud Practitioner</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Google Analytics Certified</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">Scrum Fundamentals Certified</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h5 className="font-medium text-gray-900 mb-2">Awards & Recognition</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-gray-700">Dean's List (Fall 2023)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Hackathon 2nd Place (2023)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-700">Outstanding Student Contributor</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability & Preferences */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">Availability & Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h5 className="font-medium text-blue-900 mb-1">Work Schedule</h5>
                        <p className="text-sm text-blue-700">Full-time (40 hrs/week)</p>
                        <p className="text-sm text-blue-600">Flexible hours preferred</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <h5 className="font-medium text-green-900 mb-1">Start Date</h5>
                        <p className="text-sm text-green-700">Immediately available</p>
                        <p className="text-sm text-green-600">2+ weeks notice preferred</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-900 mb-1">Work Mode</h5>
                        <p className="text-sm text-purple-700">Hybrid preferred</p>
                        <p className="text-sm text-purple-600">Open to remote/on-site</p>
                      </div>
                    </div>
                  </div>

                  {/* References */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-3 text-gray-800">References</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border rounded-lg p-4">
                        <h5 className="font-medium text-gray-900">Dr. Sarah Johnson</h5>
                        <p className="text-sm text-gray-600">Computer Science Professor</p>
                        <p className="text-sm text-gray-600">Stanford University</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">s.johnson@stanford.edu</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">(650) 123-4567</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <h5 className="font-medium text-gray-900">Mark Rodriguez</h5>
                        <p className="text-sm text-gray-600">Senior Developer</p>
                        <p className="text-sm text-gray-600">TechStart Solutions Inc.</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">mark.r@techstart.com</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">(555) 987-6543</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Application ID: #{applicant.id} • Applied {formatDate(applicant.applicationDate)}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};