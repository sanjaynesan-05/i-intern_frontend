import { motion } from "framer-motion";
import { Gift, DollarSign, Calendar, CheckCircle, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
// Placeholder data for offers
const mockOffers = [
  {
    id: "1",
    company: "Tech Corp",
    position: "Frontend Developer",
    title: "Frontend Developer",
    salary: "₹50,000",
    location: "Mumbai, Maharashtra",
    startDate: "2024-02-01",
    status: "pending" as const,
    deadline: "2024-01-30"
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Data Science Intern",
    title: "Data Science Intern",
    salary: "₹60,000",
    location: "Bangalore, Karnataka",
    startDate: "2024-02-15",
    status: "accepted" as const,
    deadline: "2024-02-05"
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
  declined: {
    icon: X,
    color: "bg-destructive text-destructive-foreground",
    label: "Declined"
  },
  hired: {
    icon: CheckCircle,
    color: "bg-primary text-primary-foreground",
    label: "Hired"
  }
};

export const Offers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Gift className="mr-2 h-5 w-5 text-primary" />
            My Offers
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {mockOffers.length === 0 ? (
            <div className="text-center py-8">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No offers yet</p>
              <p className="text-sm text-muted-foreground">
                Keep applying to get your first offer
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOffers.map((offer, index) => {
                const config = statusConfig[offer.status];
                const StatusIcon = config.icon;
                
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border rounded-lg hover:bg-card-hover transition-smooth cursor-pointer bg-gradient-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {offer.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          {offer.company}
                        </p>
                      </div>
                      <Badge className={`ml-2 ${config.color} flex items-center space-x-1`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="text-xs">{config.label}</span>
                      </Badge>
                    </div>
                    
                    {offer.salary && (
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="h-3 w-3 text-success" />
                        <span className="text-xs text-success font-medium">
                          {offer.salary}
                        </span>
                      </div>
                    )}
                    
                    {offer.startDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Starts {offer.startDate}
                        </span>
                      </div>
                    )}
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


