import { motion } from "framer-motion";
import { FileText, Coins, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { mockUser } from "@/shared/data/mockData";

const statItems = [
  {
    label: "Applications",
    value: mockUser.completedApplications,
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Total applications sent"
  },
  {
    label: "Credits",
    value: "250", // Display as string to add currency symbol if needed
    icon: Coins,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Available for premium features"
  },
  {
    label: "Accepted Internships",
    value: mockUser.offers,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Successfully accepted"
  }
];

export const QuickStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-smooth">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            My Stats
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Your personal internship journey overview
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3">
            {statItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-primary/20 cursor-pointer"
                >
                  <div className={`p-3 rounded-lg ${item.bgColor} flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate mb-1">{item.description}</p>
                    <motion.div 
                      className="flex items-baseline space-x-1"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <span className="text-2xl font-bold text-foreground">
                        {item.value}
                      </span>
                      {item.label === "Credits" && (
                        <span className="text-xs text-muted-foreground">pts</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


