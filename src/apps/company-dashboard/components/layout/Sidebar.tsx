import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Crown,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/company/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/company/analytics',
    icon: BarChart3,
  },
  {
    name: 'Internships',
    href: '/company/internships',
    icon: Briefcase,
  },
  {
    name: 'Applicants',
    href: '/company/applicants',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/company/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <motion.div
      className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm"
      animate={{
        width: isCollapsed ? 80 : 256,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">TechCorp</h1>
                <p className="text-xs text-gray-500">Company Portal</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 border-r-2 border-teal-500"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {/* Premium Upgrade Section */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-gray-200"
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-900">
                    Upgrade to Premium
                  </h3>
                  <p className="text-xs text-amber-700">
                    Unlock advanced features
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2 text-xs text-amber-800">
                  <Sparkles className="w-3 h-3" />
                  <span>Unlimited internship postings</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-800">
                  <Sparkles className="w-3 h-3" />
                  <span>Advanced analytics & insights</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-800">
                  <Sparkles className="w-3 h-3" />
                  <span>Priority candidate matching</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-sm">
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4"
        >
          <div className="text-xs text-gray-500 text-center">
            InternHub Dashboard v2.0
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};


