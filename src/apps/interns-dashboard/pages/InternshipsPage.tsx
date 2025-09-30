import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Star, 
  Bookmark, 
  ArrowLeft,
  Clock,
  Users,
  Briefcase
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useDebounce } from "@/shared/hooks/useDebounce";
import InternshipDetailsModal from "../components/InternshipDetailsModal";

// Enhanced internship interface
interface Internship {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid';
  duration: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: Date;
  deadline: Date;
  applicants: number;
  rating: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  isBookmarked?: boolean;
}

// Mock internships data
const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Development Intern',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'Full-time',
    duration: '6 months',
    salary: '₹25,000/month',
    description: 'Join our dynamic frontend team to build cutting-edge web applications using modern JavaScript frameworks. You will work closely with senior developers to create responsive and user-friendly interfaces.',
    requirements: ['Bachelor\'s in Computer Science or related field', 'Basic knowledge of HTML, CSS, JavaScript', 'Familiarity with React or Vue.js preferred'],
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'Responsive Design'],
    postedDate: new Date('2024-09-15'),
    deadline: new Date('2024-10-15'),
    applicants: 245,
    rating: 4.5,
    category: 'Technology',
    level: 'Beginner',
    benefits: ['Health Insurance', 'Learning Budget', 'Flexible Hours', 'Free Lunch'],
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    location: 'Chennai, India',
    type: 'Hybrid',
    duration: '4 months',
    salary: '₹35,000/month',
    description: 'Apply machine learning and data analysis techniques to solve real-world business problems. Work with large datasets and build predictive models.',
    requirements: ['Knowledge of Python/R', 'Statistics background', 'Machine Learning fundamentals'],
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'SQL', 'Tableau'],
    postedDate: new Date('2024-09-20'),
    deadline: new Date('2024-10-20'),
    applicants: 134,
    rating: 4.8,
    category: 'Data Science',
    level: 'Intermediate',
    benefits: ['Stock Options', 'Remote Work', 'Professional Development', 'Health Insurance'],
    isBookmarked: true
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'CreativeSpace',
    location: 'Delhi, India',
    type: 'Full-time',
    duration: '6 months',
    salary: '₹26,000/month',
    description: 'Collaborate with designers and developers to create beautiful and functional user interfaces. Learn the complete design process from research to implementation.',
    requirements: ['Design portfolio', 'Figma/Sketch experience', 'Understanding of design principles'],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'CSS'],
    postedDate: new Date('2024-09-18'),
    deadline: new Date('2024-10-18'),
    applicants: 203,
    rating: 4.4,
    category: 'Design',
    level: 'Beginner',
    benefits: ['Creative Environment', 'Design Tools License', 'Mentorship', 'Portfolio Development'],
    isBookmarked: false
  },
  {
    id: '4',
    title: 'Full Stack Developer Intern',
    company: 'InnovateLabs',
    location: 'Mumbai, India',
    type: 'Remote',
    duration: '5 months',
    salary: '₹30,000/month',
    description: 'Work on both frontend and backend technologies to create comprehensive web solutions. Join our agile development team and learn modern development practices.',
    requirements: ['Full-stack development knowledge', 'Experience with databases', 'Version control (Git)'],
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Express', 'React', 'API Development'],
    postedDate: new Date('2024-09-22'),
    deadline: new Date('2024-10-22'),
    applicants: 189,
    rating: 4.3,
    category: 'Technology',
    level: 'Intermediate',
    benefits: ['Remote Work', 'Flexible Schedule', 'Learning Budget', 'Tech Equipment'],
    isBookmarked: false
  },
  {
    id: '5',
    title: 'Digital Marketing Intern',
    company: 'MarketGrow Agency',
    location: 'Pune, India',
    type: 'Hybrid',
    duration: '3 months',
    salary: '₹20,000/month',
    description: 'Learn digital marketing strategies including SEO, social media marketing, and content creation. Work with real clients and campaigns.',
    requirements: ['Marketing fundamentals', 'Social media knowledge', 'Content writing skills'],
    skills: ['SEO', 'Social Media Marketing', 'Content Writing', 'Google Analytics', 'Adobe Photoshop'],
    postedDate: new Date('2024-09-25'),
    deadline: new Date('2024-10-25'),
    applicants: 312,
    rating: 4.2,
    category: 'Marketing',
    level: 'Beginner',
    benefits: ['Client Exposure', 'Certificate', 'Networking', 'Performance Bonus'],
    isBookmarked: true
  },
  {
    id: '6',
    title: 'Mobile App Development Intern',
    company: 'AppVenture Studio',
    location: 'Hyderabad, India',
    type: 'Full-time',
    duration: '6 months',
    salary: '₹28,000/month',
    description: 'Develop mobile applications for iOS and Android platforms. Learn cross-platform development and app store optimization.',
    requirements: ['Mobile development basics', 'Java/Kotlin or Swift knowledge', 'Object-oriented programming'],
    skills: ['React Native', 'Flutter', 'Java', 'Swift', 'Mobile UI/UX', 'App Store Optimization'],
    postedDate: new Date('2024-09-12'),
    deadline: new Date('2024-10-12'),
    applicants: 167,
    rating: 4.6,
    category: 'Technology',
    level: 'Intermediate',
    benefits: ['Device Testing', 'App Store Credits', 'Mentorship', 'Portfolio Projects'],
    isBookmarked: false
  }
];

const InternshipsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInternships, setFilteredInternships] = useState(mockInternships);
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter and search logic
  useEffect(() => {
    let filtered = mockInternships;

    // Search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          internship.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          internship.skills.some(skill => 
            skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
      );
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(internship => 
        internship.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(internship => 
        internship.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(internship => 
        internship.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
        break;
      case "salary":
        filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary.replace(/[^\d]/g, ''));
          const salaryB = parseInt(b.salary.replace(/[^\d]/g, ''));
          return salaryB - salaryA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "applicants":
        filtered.sort((a, b) => a.applicants - b.applicants);
        break;
      default:
        break;
    }

    setFilteredInternships(filtered);
  }, [debouncedSearchTerm, locationFilter, categoryFilter, typeFilter, sortBy]);

  const toggleBookmark = (id: string) => {
    setFilteredInternships(prev => 
      prev.map(internship => 
        internship.id === id 
          ? { ...internship, isBookmarked: !internship.isBookmarked }
          : internship
      )
    );
  };

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  const handleApplyFromModal = (internship: Internship) => {
    alert(`Applying to ${internship.title} at ${internship.company}`);
  };

  const handleApply = (internship: Internship) => {
    alert(`Applying to ${internship.title} at ${internship.company}`);
  };

  const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/interns')}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Discover Internships
                </h1>
                <p className="text-muted-foreground">
                  Find your perfect internship opportunity
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {filteredInternships.length}
              </p>
              <p className="text-sm text-muted-foreground">
                {filteredInternships.length === 1 ? 'Opportunity' : 'Opportunities'}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search internships, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Work Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="applicants">Least Competitive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {internship.company}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">
                            {internship.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground mb-2">
                        {internship.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{internship.location}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {internship.type}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(internship.id)}
                      className="p-2 h-8 w-8"
                    >
                      <Bookmark 
                        className={`w-4 h-4 ${
                          internship.isBookmarked 
                            ? 'fill-current text-primary' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {internship.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">
                        {internship.salary}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-foreground">
                        {internship.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-foreground">
                        {internship.applicants} applied
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-foreground">
                        {getDaysRemaining(internship.deadline)} days left
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Skills Required:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.skills.slice(0, 3).map((skill, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs border-primary/20 text-primary"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {internship.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{internship.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleViewDetails(internship)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => handleApply(internship)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No internships found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
                setCategoryFilter("all");
                setTypeFilter("all");
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Internship Details Modal */}
        <InternshipDetailsModal
          internship={selectedInternship}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApply={handleApplyFromModal}
          onBookmark={toggleBookmark}
        />
      </div>
    </div>
  );
};

export default InternshipsPage;