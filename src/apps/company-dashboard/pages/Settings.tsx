import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <SettingsIcon className="w-8 h-8 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account and application preferences
          </p>
        </div>
      </motion.div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Update your company information and contact details.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Company name and description</div>
                <div>• Contact information</div>
                <div>• Profile picture and branding</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Configure how and when you receive notifications.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• New application alerts</div>
                <div>• Deadline reminders</div>
                <div>• Email preferences</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Manage your account security and privacy settings.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Change password</div>
                <div>• Two-factor authentication</div>
                <div>• Login history</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <span>Billing & Plans</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Manage your subscription and payment methods.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Current plan details</div>
                <div>• Payment methods</div>
                <div>• Billing history</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};


