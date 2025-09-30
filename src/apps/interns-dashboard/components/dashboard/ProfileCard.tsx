import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { mockUser } from "@/shared/data/mockData";

export const ProfileCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-smooth">
        <CardHeader className="text-center pb-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4"
          >
            <Avatar className="h-24 w-24 ring-4 ring-primary/10">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="text-xl">
                {mockUser.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <CardTitle className="text-xl">{mockUser.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{mockUser.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{mockUser.phone}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {mockUser.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-accent text-accent-foreground"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Build Resume Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => navigate("/build-resume")}
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            >
              <FileText className="mr-2 h-4 w-4" />
              Build Resume
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


