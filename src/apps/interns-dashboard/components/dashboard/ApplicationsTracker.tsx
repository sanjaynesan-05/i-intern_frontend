import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

// Placeholder data for applications
const mockApplications = [
  {
    id: "1",
    company: "Tech Corp",
    position: "Frontend Developer",
    title: "Frontend Developer",
    status: "pending" as const,
    appliedDate: "2024-01-15",
    interviewDate: "2024-01-25"
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Data Science Intern",
    title: "Data Science Intern",
    status: "accepted" as const,
    appliedDate: "2024-01-10",
    interviewDate: "2024-01-20"
  },
  {
    id: "3",
    company: "Design Studio",
    position: "UI/UX Designer",
    title: "UI/UX Designer",
    status: "rejected" as const,
    appliedDate: "2024-01-08",
    interviewDate: "2024-01-18"
  }
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-warning text-warning-foreground",
    label: "Pending"
  },
  accepted: {
    icon: CheckCircle,
    color: "bg-success text-success-foreground",
    label: "Accepted"
  },
  rejected: {
    icon: XCircle,
    color: "bg-destructive text-destructive-foreground",
    label: "Rejected"
  },
  interview: {
    icon: Users,
    color: "bg-primary text-primary-foreground",
    label: "Interview"
  }
};

export const ApplicationsTracker = () => {
  const displayApplications = mockApplications.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Recent Applications
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {displayApplications.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No applications yet</p>
              <p className="text-sm text-muted-foreground">
                Start applying to internships to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayApplications.map((application, index) => {
                const config = statusConfig[application.status];
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 border rounded-lg hover:bg-card-hover transition-smooth cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">
                          {application.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {application.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`ml-2 ${config.color} flex items-center space-x-1`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="text-xs">{config.label}</span>
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


