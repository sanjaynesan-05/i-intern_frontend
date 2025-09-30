import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Building, Calendar } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { mockRecommendations, mockSearchResults } from "@/shared/data/mockData";

const InternshipDetailPage = () => {
  const { id } = useParams();
  const allInternships = [...mockRecommendations, ...mockSearchResults];
  const internship = allInternships.find(item => item.id === id);

  if (!internship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Internship not found</p>
            <Link to="/interns" className="text-primary hover:underline">
              Return to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link to="/interns" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{internship.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{internship.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{internship.matchPercentage}% Match</span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{internship.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.requirements.map((req) => (
                    <Badge
                      key={req}
                      variant="outline"
                      className="border-primary/20 text-primary"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button className="flex-1 bg-gradient-primary">
                  Apply Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipDetailPage;


