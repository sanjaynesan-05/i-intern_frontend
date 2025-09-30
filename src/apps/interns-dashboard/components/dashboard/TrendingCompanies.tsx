import { motion } from "framer-motion";
import { TrendingUp, Building, Users, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

const trendingCompanies = [
  {
    id: "1",
    name: "OpenAI",
    logo: "🤖",
    industry: "AI/ML",
    location: "San Francisco, CA",
    openPositions: 12,
    rating: 4.8,
    trend: "+15%",
    isHiring: true
  },
  {
    id: "2",
    name: "Stripe",
    logo: "💳",
    industry: "FinTech",
    location: "San Francisco, CA",
    openPositions: 8,
    rating: 4.7,
    trend: "+12%",
    isHiring: true
  },
  {
    id: "3",
    name: "Figma",
    logo: "🎨",
    industry: "Design Tools",
    location: "San Francisco, CA",
    openPositions: 15,
    rating: 4.9,
    trend: "+18%",
    isHiring: true
  },
  {
    id: "4",
    name: "Notion",
    logo: "📝",
    industry: "Productivity",
    location: "San Francisco, CA",
    openPositions: 6,
    rating: 4.6,
    trend: "+10%",
    isHiring: true
  },
  {
    id: "5",
    name: "Discord",
    logo: "🎮",
    industry: "Communication",
    location: "San Francisco, CA",
    openPositions: 9,
    rating: 4.5,
    trend: "+8%",
    isHiring: true
  }
];

export const TrendingCompanies = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Trending Companies
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {trendingCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-3 border rounded-lg hover:bg-card-hover transition-smooth cursor-pointer bg-gradient-card"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                      {company.logo}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {company.name}
                      </h4>
                      <Badge className="bg-success text-success-foreground text-xs">
                        {company.trend}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-1">
                      {company.industry}
                    </p>
                    
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">SF, CA</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{company.openPositions} roles</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current text-warning" />
                        <span>{company.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


