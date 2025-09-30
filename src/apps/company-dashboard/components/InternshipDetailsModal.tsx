import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase,
  CheckCircle,
  AlertCircle,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { formatCurrency, formatDate, getStatusColor } from '@/shared/lib/utils';
import { Internship } from '../types';

interface InternshipDetailsModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipDetailsModal: React.FC<InternshipDetailsModalProps> = ({
  internship,
  isOpen,
  onClose,
}) => {
  if (!internship) return null;

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
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Briefcase className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {internship.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>TechCorp</span>
                      </div>
                      <Badge
                        className={getStatusColor(internship.status)}
                        variant="secondary"
                      >
                        {internship.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Key Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold">{internship.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Stipend</p>
                          <p className="font-semibold">{formatCurrency(internship.stipend)}/mo</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold">{internship.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Applicants</p>
                          <p className="font-semibold">{internship.applicantCount}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Job Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {internship.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Requirements
                      </h3>
                      <div className="space-y-2">
                        {internship.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Timeline */}
                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Posted</p>
                            <p className="text-xs text-gray-600">
                              {formatDate(internship.datePosted)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Application Deadline</p>
                            <p className="text-xs text-gray-600">
                              {formatDate(internship.deadline)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Work Type */}
                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Work Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Work Type</span>
                          <Badge variant="outline">{internship.type}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Duration</span>
                          <span className="text-sm font-medium">{internship.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge
                            className={getStatusColor(internship.status)}
                            variant="secondary"
                          >
                            {internship.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm">
                          View Applicants
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          Edit Internship
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          Share Internship
                        </Button>
                      </div>
                    </Card>

                    {/* Application Stats */}
                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Application Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Applications</span>
                          <span className="font-semibold">{internship.applicantCount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Under Review</span>
                          <span className="font-semibold">
                            {Math.floor(internship.applicantCount * 0.3)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Shortlisted</span>
                          <span className="font-semibold">
                            {Math.floor(internship.applicantCount * 0.15)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


