import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, LogOut, Bot, Crown, Calendar } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ProfileCard } from "../components/dashboard/ProfileCard";
import { ApplicationsTracker } from "../components/dashboard/ApplicationsTracker";
import { Recommendations } from "../components/dashboard/Recommendations";
import { Offers } from "../components/dashboard/Offers";
import { QuickStats } from "../components/dashboard/QuickStats";
import { TrendingCompanies } from "../components/dashboard/TrendingCompanies";


const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Responsive Grid Layout - Reorganized by Importance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile & Tools */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileCard />
            
            {/* Premium Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate("/pricing")}
                className="w-full h-10 bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90 transition-smooth shadow-medium text-white"
              >
                <Crown className="mr-2 h-4 w-4" />
                Go Premium
              </Button>
            </motion.div>
            
            {/* A.U.R.A Button - High Priority */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate("/aura")}
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Bot className="mr-2 h-4 w-4" />
                A.U.R.A AI
              </Button>
            </motion.div>
            
            <ApplicationsTracker />
            
            {/* Secondary Tools */}
            <div className="space-y-4">
              {/* Calendar/Interviews Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => alert("Calendar feature coming soon!")}
                  variant="outline"
                  className="w-full h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar & Interviews
                </Button>
              </motion.div>
            </div>
            
            {/* Logout Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </motion.div>
          </div>

          {/* Main Column - Primary Actions & Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Most Important: Search & Discover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Button
                onClick={() => navigate("/interns/internships")}
                className="w-full h-24 text-xl font-semibold bg-gradient-primary hover:opacity-90 transition-smooth shadow-elegant hover:shadow-glow border-0 relative overflow-hidden group"
              >
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Search className="mr-4 h-8 w-8 animate-pulse" />
                <span className="relative z-10">Search & Discover Internships</span>
              </Button>
            </motion.div>


            {/* Medium Priority: Trending Content */}
            <TrendingCompanies />
            
            {/* Lower Priority: Personalized Content */}
            <Recommendations />
          </div>

          {/* Right Column - Secondary Info & Stats */}
          <div className="lg:col-span-3 space-y-6">
            <QuickStats />
            <Offers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


