import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Eye,
  Copy,
  Trash2,
  MapPin,
  IndianRupee,
  Users,
  Calendar,
  Briefcase,
  Share2,
} from 'lucide-react';
import { DataTable, Column } from '../components/data-table/DataTable';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { formatCurrency, formatDate, getStatusColor } from '@/shared/lib/utils';
import { mockInternships } from '@/shared/data/mockData';
import { InternshipDetailsModal } from '../components/InternshipDetailsModal';
import type { Internship } from '../types';

export const Internships: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setInternships(mockInternships);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBulkClose = (selectedInternships: Internship[]) => {
    console.log('Closing internships:', selectedInternships);
    // Handle bulk close logic here
  };

  const handleBulkDelete = (selectedInternships: Internship[]) => {
    console.log('Deleting internships:', selectedInternships);
    // Handle bulk delete logic here
  };

  const handleEdit = (internship: Internship) => {
    console.log('Editing internship:', internship);
    // Handle edit logic here
  };

  const handleViewApplicants = (internship: Internship) => {
    console.log('Viewing applicants for:', internship);
    // Navigate to applicants filtered by internship
  };

  const handleClone = (internship: Internship) => {
    console.log('Cloning internship:', internship);
    // Handle clone logic here
  };

  const handleShare = (internship: Internship) => {
  const shareUrl = `${window.location.origin}/internship/${internship.id}`;
  // For now, just copy to clipboard
  navigator.clipboard.writeText(shareUrl);
  console.log('Sharing internship:', internship);
  // You could add a toast notification here
  };

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div>
          <div 
            className="font-semibold text-gray-900 cursor-pointer hover:text-teal-600 transition-colors"
            onClick={() => handleViewDetails(row)}
          >
            {value}
          </div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {row.location}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: 'stipend',
      header: 'Stipend',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm font-medium">
          <IndianRupee className="w-3 h-3 mr-1" />
          {formatCurrency(value)}/mo
        </div>
      ),
    },
    {
      key: 'applicantCount',
      header: 'Applicants',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm">
          <Users className="w-3 h-3 mr-1" />
          {value}
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
      key: 'deadline',
      header: 'Deadline',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(value)}
        </div>
      ),
    },
    {
      key: 'datePosted',
      header: 'Posted',
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const bulkActions = [
    {
      label: 'Close Selected',
      icon: Trash2,
      onClick: handleBulkClose,
    },
    {
      label: 'Delete Selected',
      icon: Trash2,
      onClick: handleBulkDelete,
    },
  ];

  const rowActions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: handleViewDetails,
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: handleEdit,
    },
    {
      label: 'View Applicants',
      icon: Eye,
      onClick: handleViewApplicants,
    },
    {
      label: 'Clone',
      icon: Copy,
      onClick: handleClone,
    },
    {
      label: 'Share',
      icon: Share2,
      onClick: handleShare,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Internships</h1>
          <p className="text-gray-600 mt-1">
            Manage your internship postings and track applications
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
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.filter(i => i.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.filter(i => i.status === 'Draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.filter(i => i.status === 'Closed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Table */}
      <div className="flex justify-end mb-4">
        <Link to="/company/post-internship">
          <Button className="bg-teal-600 hover:bg-teal-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Post New Internship
          </Button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DataTable
          data={internships}
          columns={columns}
          isLoading={isLoading}
          onRowSelect={(selected) => console.log('Selected rows:', selected)}
          bulkActions={bulkActions}
          rowActions={rowActions}
        />
      </motion.div>

      {/* Internship Details Modal */}
      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};


