import { useState } from "react";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2,
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Star,
  Plus
} from "lucide-react";
// Placeholder data for employers
const employers = [
  {
    id: "1",
    name: "Tech Corp",
    email: "hr@techcorp.com",
    industry: "Technology",
    size: "500-1000",
    location: "Mumbai, Maharashtra",
    website: "https://techcorp.com",
    status: "Verified",
    joinDate: "2024-01-01",
    dateJoined: "2024-01-01",
    activeInternships: 12,
    activePostings: 12,
    totalInterns: 45,
    rating: 4.5,
    description: "Leading technology company",
    contactPerson: "HR Manager",
    phone: "+91-9876543210"
  },
  {
    id: "2",
    name: "StartupXYZ",
    email: "careers@startupxyz.com", 
    industry: "Fintech",
    size: "50-100",
    location: "Bangalore, Karnataka",
    website: "https://startupxyz.com", 
    status: "Pending",
    joinDate: "2024-01-15",
    dateJoined: "2024-01-15",
    activeInternships: 8,
    activePostings: 8,
    totalInterns: 25,
    rating: 4.2,
    description: "Innovative fintech startup",
    contactPerson: "Talent Acquisition",
    phone: "+91-9876543211"
  }
];
import { cn } from "@/shared/lib/utils";

const statusColors = {
  verified: "bg-status-verified text-white",
  pending: "bg-status-pending text-white", 
  suspended: "bg-status-suspended text-white"
};

export default function AdminEmployers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddEmployerModal, setShowAddEmployerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || employer.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handler functions
  const handleViewProfile = (employer: any) => {
    setSelectedEmployer(employer);
    setShowDetailsModal(true);
  };

  const handleApproveEmployer = (employerId: string) => {
    console.log('Approving employer:', employerId);
    alert('Employer approved successfully!');
    // Here you would typically make an API call
  };

  const handleSuspendEmployer = (employerId: string) => {
    console.log('Suspending employer:', employerId);
    alert('Employer suspended successfully!');
    // Here you would typically make an API call
  };

  const handleEditEmployer = (employer: any) => {
    setSelectedEmployer(employer);
    setShowEditModal(true);
  };

  const handleDeleteEmployer = (employer: any) => {
    setSelectedEmployer(employer);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteEmployer = () => {
    console.log('Deleting employer:', selectedEmployer?.id);
    alert('Employer deleted successfully!');
    setShowDeleteConfirm(false);
    setSelectedEmployer(null);
    // Here you would typically make an API call
  };

  const handleAddEmployer = () => {
    setShowAddEmployerModal(true);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={cn("text-xs font-medium", statusColors[status as keyof typeof statusColors])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <AdminHeader 
        title="Employers Management" 
        subtitle="Manage company accounts and employer verifications"
      />
      
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{employers.length}</p>
                  <p className="text-xs text-muted-foreground">Total Employers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{employers.filter(e => e.status === 'verified').length}</p>
                  <p className="text-xs text-muted-foreground">Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{employers.filter(e => e.status === 'pending').length}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{employers.filter(e => e.status === 'suspended').length}</p>
                  <p className="text-xs text-muted-foreground">Suspended</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employers</CardTitle>
                <CardDescription>
                  View and manage all employer accounts
                </CardDescription>
              </div>
              <Button onClick={handleAddEmployer}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employer
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search employers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Active Postings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployers.map((employer) => (
                  <TableRow key={employer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{employer.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employer.email}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(employer.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(employer.dateJoined).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{employer.activePostings}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewProfile(employer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          {employer.status.toLowerCase() === 'pending' && (
                            <DropdownMenuItem onClick={() => handleApproveEmployer(employer.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Company
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleSuspendEmployer(employer.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditEmployer(employer)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteEmployer(employer)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      
      {/* Employer Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-xl font-semibold">{selectedEmployer?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedEmployer?.industry}</div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedEmployer && (
            <div className="space-y-6">
              {/* Status and Quick Actions */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusBadge(selectedEmployer.status)}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(selectedEmployer.dateJoined).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedEmployer.status.toLowerCase() === 'pending' && (
                    <Button size="sm" onClick={() => handleApproveEmployer(selectedEmployer.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEditEmployer(selectedEmployer)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{selectedEmployer.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div>{selectedEmployer.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Website</div>
                        <a href={selectedEmployer.website} target="_blank" rel="noopener noreferrer" 
                           className="text-primary hover:underline">
                          {selectedEmployer.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div>{selectedEmployer.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Company Size</div>
                        <div>{selectedEmployer.size} employees</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>Active Internships</span>
                      </div>
                      <Badge variant="outline">{selectedEmployer.activeInternships}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Total Interns Hired</span>
                      </div>
                      <Badge variant="outline">{selectedEmployer.totalInterns}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-muted-foreground" />
                        <span>Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedEmployer.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedEmployer.description}</p>
                </CardContent>
              </Card>

              {/* Contact Person */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{selectedEmployer.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">Primary Contact</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Employer Modal */}
      <Dialog open={showAddEmployerModal} onOpenChange={setShowAddEmployerModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Employer</DialogTitle>
            <DialogDescription>
              Create a new employer account in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input placeholder="Enter company name" />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="company@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="+91-XXXXXXXXXX" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input placeholder="https://company.com" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="City, State" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Company Size</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
                placeholder="Brief description about the company"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAddEmployerModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Adding new employer');
              alert('Employer added successfully!');
              setShowAddEmployerModal(false);
            }}>
              Add Employer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Employer Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employer Details</DialogTitle>
            <DialogDescription>
              Update employer information
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <Input defaultValue={selectedEmployer.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <Input defaultValue={selectedEmployer.industry} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={selectedEmployer.email} />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue={selectedEmployer.phone} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input defaultValue={selectedEmployer.website} />
              </div>
              
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input defaultValue={selectedEmployer.location} />
              </div>
              
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue={selectedEmployer.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Updating employer:', selectedEmployer?.id);
              alert('Employer updated successfully!');
              setShowEditModal(false);
            }}>
              Update Employer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employer Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employer account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployer && (
            <div className="p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-destructive" />
                <div>
                  <div className="font-medium">{selectedEmployer.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedEmployer.email}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEmployer}>
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


