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
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  XCircle, 
  RotateCcw, 
  Trash2,
  Users,
  GraduationCap,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  BookOpen,
  Target,
  Plus,
  Phone,
  Briefcase,
  Star
} from "lucide-react";
// Placeholder data for interns
const interns = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    university: "IIT Mumbai",
    course: "Computer Science",
    year: "3rd Year",
    skills: ["React", "TypeScript", "Node.js"],
    status: "Active",
    internshipTitle: "Frontend Developer",
    company: "Tech Corp",
    startDate: "2024-01-15",
    dateJoined: "2024-01-15",
    gpa: 8.5,
    profileCompletion: 95,
    applications: 5,
    avatar: "",
    phone: "+91-9876543210",
    location: "Mumbai, Maharashtra",
    bio: "Passionate computer science student with experience in web development",
    projects: ["E-commerce Platform", "Task Management App"],
    experience: "6 months internship at StartupXYZ",
    achievements: ["Dean's List", "Hackathon Winner"],
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  },
  {
    id: "2",
    name: "Jane Smith", 
    email: "jane@example.com",
    university: "IIT Delhi",
    course: "Data Science",
    year: "4th Year", 
    skills: ["Python", "Machine Learning", "SQL"],
    status: "Active",
    internshipTitle: "Data Science Intern",
    company: "StartupXYZ",
    startDate: "2024-01-10",
    dateJoined: "2024-01-10",
    gpa: 9.0,
    profileCompletion: 88,
    applications: 3,
    avatar: "",
    phone: "+91-9876543211",
    location: "Delhi, India",
    bio: "Data science enthusiast with strong analytical skills",
    projects: ["Customer Segmentation", "Predictive Analytics Dashboard"],
    experience: "Research Assistant at University Lab",
    achievements: ["Best Project Award", "Academic Excellence"],
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith"
  }
];

const universities = [...new Set(interns.map(intern => intern.university))];

export default function AdminInterns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddInternModal, setShowAddInternModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         intern.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = universityFilter === "all" || intern.university === universityFilter;
    
    return matchesSearch && matchesUniversity;
  });

  // Handler functions
  const handleViewProfile = (intern: any) => {
    setSelectedIntern(intern);
    setShowDetailsModal(true);
  };

  const handleSuspendIntern = (internId: string) => {
    console.log('Suspending intern:', internId);
    alert('Intern account suspended successfully!');
  };

  const handleReactivateIntern = (internId: string) => {
    console.log('Reactivating intern:', internId);
    alert('Intern account reactivated successfully!');
  };

  const handleDeleteIntern = (intern: any) => {
    setSelectedIntern(intern);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteIntern = () => {
    console.log('Deleting intern:', selectedIntern?.id);
    alert('Intern account deleted successfully!');
    setShowDeleteConfirm(false);
    setSelectedIntern(null);
  };

  const handleAddIntern = () => {
    setShowAddInternModal(true);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalApplications = interns.reduce((sum, intern) => sum + intern.applications, 0);
  const avgApplicationsPerIntern = Math.round(totalApplications / interns.length);

  return (
    <>
      <AdminHeader 
        title="Interns Management" 
        subtitle="Manage student accounts and monitor application activity"
      />
      
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{interns.length}</p>
                  <p className="text-xs text-muted-foreground">Total Interns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{universities.length}</p>
                  <p className="text-xs text-muted-foreground">Universities</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{totalApplications}</p>
                  <p className="text-xs text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{avgApplicationsPerIntern}</p>
                  <p className="text-xs text-muted-foreground">Avg per Intern</p>
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
                <CardTitle>Interns</CardTitle>
                <CardDescription>
                  View and manage all student accounts
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  console.log('Exporting data');
                  alert('Data export initiated successfully!');
                }}>
                  Export Data
                </Button>
                <Button onClick={handleAddIntern}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Intern
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search interns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={universityFilter} onValueChange={setUniversityFilter}>
                <SelectTrigger className="w-52">
                  <SelectValue placeholder="Filter by university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {universities.map(university => (
                    <SelectItem key={university} value={university}>{university}</SelectItem>
                  ))}
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
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={intern.avatar} alt={intern.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(intern.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{intern.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {intern.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{intern.university}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(intern.dateJoined).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={intern.applications > 10 ? "border-success text-success" : ""}
                      >
                        {intern.applications}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleViewProfile(intern)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendIntern(intern.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReactivateIntern(intern.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteIntern(intern)}
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

      {/* Intern Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedIntern?.avatar} />
                <AvatarFallback>
                  {selectedIntern && getInitials(selectedIntern.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">{selectedIntern?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedIntern?.course} • {selectedIntern?.year}</div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedIntern && (
            <div className="space-y-6">
              {/* Status and Quick Actions */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedIntern.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(selectedIntern.dateJoined).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleSuspendIntern(selectedIntern.id)}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Suspend
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{selectedIntern.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div>{selectedIntern.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div>{selectedIntern.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">University</div>
                        <div>{selectedIntern.university}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>Course</span>
                      </div>
                      <span className="font-medium">{selectedIntern.course}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span>Year</span>
                      </div>
                      <span className="font-medium">{selectedIntern.year}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <span>GPA</span>
                      </div>
                      <Badge variant="outline">{selectedIntern.gpa}/10</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-muted-foreground" />
                        <span>Profile Completion</span>
                      </div>
                      <Badge variant="outline">{selectedIntern.profileCompletion}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntern.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Internship */}
              {selectedIntern.internshipTitle && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{selectedIntern.internshipTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          at {selectedIntern.company} • Started {new Date(selectedIntern.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedIntern.bio}</p>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedIntern.projects.map((project: string, index: number) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{project}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedIntern.experience}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedIntern.achievements.map((achievement: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a 
                      href={selectedIntern.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Users className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a 
                      href={selectedIntern.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Intern Modal */}
      <Dialog open={showAddInternModal} onOpenChange={setShowAddInternModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Intern</DialogTitle>
            <DialogDescription>
              Create a new intern account in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="student@university.edu" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">University</label>
                <Input placeholder="University name" />
              </div>
              <div>
                <label className="text-sm font-medium">Course</label>
                <Input placeholder="e.g., Computer Science" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Year</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="+91-XXXXXXXXXX" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="City, State" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Skills</label>
              <Input placeholder="React, Python, Machine Learning (comma separated)" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea 
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
                placeholder="Brief description about the student"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAddInternModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              console.log('Adding new intern');
              alert('Intern added successfully!');
              setShowAddInternModal(false);
            }}>
              Add Intern
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Intern Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this intern account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedIntern && (
            <div className="p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedIntern.avatar} />
                  <AvatarFallback>{getInitials(selectedIntern.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedIntern.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedIntern.email}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteIntern}>
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


