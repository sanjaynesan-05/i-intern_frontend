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
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2,
  Building2
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

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || employer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
              <Button>Add Employer</Button>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          {employer.status === 'pending' && (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Company
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <XCircle className="mr-2 h-4 w-4" />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
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
    </>
  );
}


