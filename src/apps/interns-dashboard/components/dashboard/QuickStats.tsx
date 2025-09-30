import { motion } from "framer-motion";
import { FileText, Gift, Coins, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { mockStats } from "@/shared/data/mockData";

const statItems = [
  {
    label: "Applications",
    value: mockStats.applications,
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    label: "Offers",
    value: mockStats.offers,
    icon: Gift,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    label: "Credits",
    value: mockStats.credits,
    icon: Coins,
    color: "text-warning",
    bgColor: "bg-warning/10"
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
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {statItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card-hover transition-smooth"
                >
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {item.value}
                    </motion.p>
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


