import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Eye,
  FileText,
  MessageSquare,
  UserCheck,
  UserX,
  Clock,
  GraduationCap,
  Briefcase,
  Users,
} from 'lucide-react';
import { DataTable, Column } from '../components/data-table/DataTable';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { formatDate, getStatusColor } from '@/shared/lib/utils';
import { mockApplicants } from '@/shared/data/mockData';
import type { Applicant } from '@/shared/types';

export const Applicants: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setApplicants(mockApplicants);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBulkStatusChange = (selectedApplicants: Applicant[]) => {
    console.log('Changing status for:', selectedApplicants);
    // Handle bulk status change logic here
  };

  const handleBulkMessage = (selectedApplicants: Applicant[]) => {
    console.log('Sending bulk message to:', selectedApplicants);
    // Handle bulk message logic here
  };

  const handleViewResume = (applicant: Applicant) => {
    console.log('Viewing resume for:', applicant);
    // Handle view resume logic here
  };

  const handleViewProfile = (applicant: Applicant) => {
    console.log('Viewing profile for:', applicant);
    // Handle view profile logic here
  };

  const handleSendMessage = (applicant: Applicant) => {
    console.log('Sending message to:', applicant);
    // Handle send message logic here
  };

  const columns: Column<Applicant>[] = [
    {
      key: 'name',
      header: 'Candidate',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {row.canViewContactDetails ? row.email : 'Contact details protected'}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'internshipTitle',
      header: 'Position Applied',
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'skills',
      header: 'Skills',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((skill: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-50 text-teal-700 border border-teal-200"
            >
              {skill}
            </span>
          ))}
          {value.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              +{value.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'education',
      header: 'Education',
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center">
          <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge className={getStatusColor(value)} variant="secondary">
          {value}
        </Badge>
      ),
    },
    {
      key: 'applicationDate',
      header: 'Applied Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm">
          <Clock className="w-3 h-3 mr-1 text-gray-400" />
          {formatDate(value)}
        </div>
      ),
    },
  ];

  const bulkActions = [
    {
      label: 'Change Status',
      icon: UserCheck,
      onClick: handleBulkStatusChange,
    },
    {
      label: 'Send Bulk Message',
      icon: MessageSquare,
      onClick: handleBulkMessage,
    },
  ];

  const rowActions = [
    {
      label: 'View Resume',
      icon: FileText,
      onClick: handleViewResume,
    },
    {
      label: 'View Profile',
      icon: Eye,
      onClick: handleViewProfile,
    },
    {
      label: 'Send Message',
      icon: MessageSquare,
      onClick: handleSendMessage,
    },
  ];

  const getStatusStats = () => {
    const stats = applicants.reduce((acc, applicant) => {
      acc[applicant.status] = (acc[applicant.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600 mt-1">
            Review and manage internship applications
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applicants.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statusStats['Pending'] || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statusStats['Under Review'] || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statusStats['Hired'] || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DataTable
          data={applicants}
          columns={columns}
          isLoading={isLoading}
          onRowSelect={(selected) => console.log('Selected rows:', selected)}
          bulkActions={bulkActions}
          rowActions={rowActions}
        />
      </motion.div>
    </div>
  );
};


