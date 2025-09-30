import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { mockRecommendations } from "@/shared/data/mockData";

export const Recommendations = () => {
  const navigate = useNavigate();

  const handleRecommendationClick = (id: string) => {
    navigate(`/internship-description/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {mockRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleRecommendationClick(recommendation.id)}
                className="p-4 border rounded-lg hover:shadow-medium transition-smooth cursor-pointer bg-gradient-card"
              >
                                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">
                    {recommendation.title}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-warning fill-warning" />
                    <span className="text-xs">{recommendation.matchScore}% Match</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {recommendation.location}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {recommendation.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {(recommendation.skills || []).slice(0, 3).map((req) => (
                    <Badge
                      key={req}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary"
                    >
                      {req}
                    </Badge>
                  ))}
                  {(recommendation.skills || []).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(recommendation.skills || []).length - 3} more
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


