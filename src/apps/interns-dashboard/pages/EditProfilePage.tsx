import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Save, User, Mail, Calendar, Briefcase, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { mockUser } from "@/shared/data/mockData";
import { useToast } from "@/shared/hooks/use-toast";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    dateOfBirth: "1999-05-15",
    bio: "Passionate computer science student with a strong interest in web development and artificial intelligence.",
    skills: "React, TypeScript, Node.js, Python, JavaScript, HTML, CSS, Java, C++, SQL, MongoDB, PostgreSQL, Git, Docker, AWS, Azure, Machine Learning, Data Science, REST APIs, GraphQL, Express.js, Spring Boot, Django, Flask, Next.js, Vue.js, Angular, Kubernetes, Jenkins, Linux, Cybersecurity, Penetration Testing, Network Security, Ethical Hacking, Cryptography, Vulnerability Assessment, Firewall Configuration, SIEM, Cloud Security, DevOps, CI/CD, Agile, Scrum",
    linkedIn: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev"
  });

  const [educationEntries, setEducationEntries] = useState([
    {
      id: 1,
      university: mockUser.university,
      major: "Computer Science",
      graduationYear: "2025",
      gradingType: "GPA",
      gradingScore: "3.8"
    }
  ]);

  const [experienceEntries, setExperienceEntries] = useState([
    {
      id: 1,
      company: "Tech Corp",
      position: "Software Development Intern",
      startYear: "2024",
      endYear: "2024",
      description: "Developed web applications using React and Node.js. Collaborated with senior developers on various projects and gained hands-on experience in full-stack development."
    }
  ]);

  const [projectEntries, setProjectEntries] = useState([
    {
      id: 1,
      title: "E-Commerce Web Application",
      technologies: "React, Node.js, MongoDB, Express",
      startDate: "2024-01",
      endDate: "2024-06",
      description: "Built a full-stack e-commerce platform with user authentication, shopping cart, payment integration, and admin dashboard. Implemented responsive design and optimized for performance.",
      githubUrl: "https://github.com/johndoe/ecommerce-app",
      liveUrl: "https://ecommerce-demo.vercel.app"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationChange = (id: number, field: string, value: string) => {
    setEducationEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addEducationEntry = () => {
    const newId = Math.max(...educationEntries.map(e => e.id)) + 1;
    setEducationEntries(prev => [...prev, {
      id: newId,
      university: "",
      major: "",
      graduationYear: "",
      gradingType: "GPA",
      gradingScore: ""
    }]);
  };

  const removeEducationEntry = (id: number) => {
    if (educationEntries.length > 1) {
      setEducationEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setExperienceEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addExperienceEntry = () => {
    const newId = Math.max(...experienceEntries.map(e => e.id)) + 1;
    setExperienceEntries(prev => [...prev, {
      id: newId,
      company: "",
      position: "",
      startYear: "",
      endYear: "",
      description: ""
    }]);
  };

  const removeExperienceEntry = (id: number) => {
    if (experienceEntries.length > 1) {
      setExperienceEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleProjectChange = (id: number, field: string, value: string) => {
    setProjectEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addProjectEntry = () => {
    const newId = Math.max(...projectEntries.map(e => e.id)) + 1;
    setProjectEntries(prev => [...prev, {
      id: newId,
      title: "",
      technologies: "",
      startDate: "",
      endDate: "",
      description: "",
      githubUrl: "",
      liveUrl: ""
    }]);
  };

  const removeProjectEntry = (id: number) => {
    if (projectEntries.length > 1) {
      setProjectEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/interns")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32 ring-4 ring-primary/10">
                    <AvatarImage src={mockUser.avatar} alt={formData.name} />
                    <AvatarFallback className="text-2xl">
                      {formData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the camera icon to upload a new profile picture
                </p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="linkedIn">LinkedIn</Label>
                  <Input
                    id="linkedIn"
                    value={formData.linkedIn}
                    onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Education
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEducationEntry}
                    className="flex items-center"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Education
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {educationEntries.map((education, index) => (
                  <motion.div
                    key={education.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative border rounded-lg p-4 space-y-4"
                  >
                    {educationEntries.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducationEntry(education.id)}
                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`university-${education.id}`}>University</Label>
                        <Input
                          id={`university-${education.id}`}
                          value={education.university}
                          onChange={(e) => handleEducationChange(education.id, "university", e.target.value)}
                          placeholder="Enter university name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`major-${education.id}`}>Major</Label>
                        <Input
                          id={`major-${education.id}`}
                          value={education.major}
                          onChange={(e) => handleEducationChange(education.id, "major", e.target.value)}
                          placeholder="Enter your major"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`graduationYear-${education.id}`}>Graduation Year</Label>
                        <Input
                          id={`graduationYear-${education.id}`}
                          value={education.graduationYear}
                          onChange={(e) => handleEducationChange(education.id, "graduationYear", e.target.value)}
                          placeholder="2025"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`gradingType-${education.id}`}>Grading System</Label>
                        <Select
                          value={education.gradingType}
                          onValueChange={(value) => handleEducationChange(education.id, "gradingType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grading system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GPA">GPA (4.0 scale)</SelectItem>
                            <SelectItem value="CGPA">CGPA (10.0 scale)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor={`gradingScore-${education.id}`}>
                          {education.gradingType} Score (Optional)
                        </Label>
                        <Input
                          id={`gradingScore-${education.id}`}
                          value={education.gradingScore}
                          onChange={(e) => handleEducationChange(education.id, "gradingScore", e.target.value)}
                          placeholder={education.gradingType === "CGPA" ? "8.5" : "3.8"}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder="React, TypeScript, Node.js, Python..."
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.split(",").map((skill, index) => (
                      skill.trim() && (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.trim()}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Work Experience
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExperienceEntry}
                    className="flex items-center"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experienceEntries.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative border rounded-lg p-4 space-y-4"
                  >
                    {experienceEntries.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperienceEntry(experience.id)}
                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(experience.id, "company", e.target.value)}
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`position-${experience.id}`}>Position/Role</Label>
                        <Input
                          id={`position-${experience.id}`}
                          value={experience.position}
                          onChange={(e) => handleExperienceChange(experience.id, "position", e.target.value)}
                          placeholder="Enter your position"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`startYear-${experience.id}`}>Start Year</Label>
                        <Input
                          id={`startYear-${experience.id}`}
                          value={experience.startYear}
                          onChange={(e) => handleExperienceChange(experience.id, "startYear", e.target.value)}
                          placeholder="2023"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endYear-${experience.id}`}>End Year</Label>
                        <Input
                          id={`endYear-${experience.id}`}
                          value={experience.endYear}
                          onChange={(e) => handleExperienceChange(experience.id, "endYear", e.target.value)}
                          placeholder="2024 or 'Present'"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`description-${experience.id}`}>Description</Label>
                      <Textarea
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) => handleExperienceChange(experience.id, "description", e.target.value)}
                        placeholder="Describe your work, responsibilities, and achievements..."
                        rows={3}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Projects
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addProjectEntry}
                    className="flex items-center"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Project
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {projectEntries.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative border rounded-lg p-4 space-y-4"
                  >
                    {projectEntries.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProjectEntry(project.id)}
                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                        <Input
                          id={`title-${project.id}`}
                          value={project.title}
                          onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                          placeholder="Enter project title"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                        <Input
                          id={`technologies-${project.id}`}
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(project.id, "technologies", e.target.value)}
                          placeholder="React, Node.js, MongoDB, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${project.id}`}
                          type="month"
                          value={project.startDate}
                          onChange={(e) => handleProjectChange(project.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${project.id}`}
                          type="month"
                          value={project.endDate}
                          onChange={(e) => handleProjectChange(project.id, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`description-${project.id}`}>Project Description</Label>
                      <Textarea
                        id={`description-${project.id}`}
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                        placeholder="Describe the project, your role, challenges faced, and outcomes achieved..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`githubUrl-${project.id}`}>GitHub URL (Optional)</Label>
                        <Input
                          id={`githubUrl-${project.id}`}
                          value={project.githubUrl}
                          onChange={(e) => handleProjectChange(project.id, "githubUrl", e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`liveUrl-${project.id}`}>Live Demo URL (Optional)</Label>
                        <Input
                          id={`liveUrl-${project.id}`}
                          value={project.liveUrl}
                          onChange={(e) => handleProjectChange(project.id, "liveUrl", e.target.value)}
                          placeholder="https://project-demo.vercel.app"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
              >
                <Save className="mr-2 h-5 w-5" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;