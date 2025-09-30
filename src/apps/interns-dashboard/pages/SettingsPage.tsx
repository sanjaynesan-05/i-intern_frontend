import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Save,
  Camera,
  Upload,
  AlertCircle,
  Mail,
  FileText,
  HelpCircle,
  BookOpen,
  Target,
  Briefcase
} from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Switch } from '@/shared/components/ui/switch';
import { mockUser } from '@/shared/data/mockData';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  // Modal states
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showGettingStartedModal, setShowGettingStartedModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showResumeTipsModal, setShowResumeTipsModal] = useState(false);
  const [showInterviewPrepModal, setShowInterviewPrepModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Computer Science student passionate about technology and innovation.',
    website: 'https://johndoe.dev',
    linkedIn: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    internshipAlerts: true,
    applicationUpdates: true,
    deadlineReminders: true,
    weeklyDigest: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    jobRecommendations: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    indexProfile: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'America/Los_Angeles',
    jobTypes: ['internship', 'full-time'],
    industries: ['technology', 'startups'],
    salaryRange: '50000-80000'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field: string, value: boolean | string) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: string | string[]) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  // API handlers
  const handleSaveProfile = async () => {
    try {
      console.log('Saving profile:', formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      console.log('Saving notifications:', notifications);
      alert('Notification preferences updated!');
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      console.log('Updating password');
      alert('Password updated successfully!');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleExportData = async () => {
    try {
      console.log('Exporting data');
      alert('Data export started. You will receive an email when ready.');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
  };

  const settingsSections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Target },
    { id: 'career', label: 'Career Settings', icon: Briefcase },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter your location"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            rows={4}
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <Input
              value={formData.linkedIn}
              onChange={(e) => handleInputChange('linkedIn', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <Input
              value={formData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-2xl">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <Button 
              variant="outline" 
              className="mr-3"
              onClick={() => setShowAvatarModal(true)}
            >
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                console.log('Removing profile picture');
                alert('Profile picture removed successfully!');
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => {
            setFormData({
              name: mockUser.name,
              email: mockUser.email,
              phone: '+1 (555) 123-4567',
              location: 'San Francisco, CA',
              bio: 'Computer Science student passionate about technology and innovation.',
              website: 'https://johndoe.dev',
              linkedIn: 'https://linkedin.com/in/johndoe',
              github: 'https://github.com/johndoe',
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSaveProfile}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application & Job Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Internship Alerts</div>
              <div className="text-sm text-gray-600">Get notified about new internship opportunities</div>
            </div>
            <Switch
              checked={notifications.internshipAlerts}
              onCheckedChange={(checked) => handleNotificationChange('internshipAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Application Updates</div>
              <div className="text-sm text-gray-600">Status changes on your applications</div>
            </div>
            <Switch
              checked={notifications.applicationUpdates}
              onCheckedChange={(checked) => handleNotificationChange('applicationUpdates', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Deadline Reminders</div>
              <div className="text-sm text-gray-600">Reminders before application deadlines</div>
            </div>
            <Switch
              checked={notifications.deadlineReminders}
              onCheckedChange={(checked) => handleNotificationChange('deadlineReminders', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Job Recommendations</div>
              <div className="text-sm text-gray-600">Personalized job suggestions based on your profile</div>
            </div>
            <Switch
              checked={notifications.jobRecommendations}
              onCheckedChange={(checked) => handleNotificationChange('jobRecommendations', checked)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications via email</div>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">SMS Notifications</div>
              <div className="text-sm text-gray-600">Urgent notifications via SMS</div>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Weekly Digest</div>
              <div className="text-sm text-gray-600">Summary of new opportunities and updates</div>
            </div>
            <Switch
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Marketing Emails</div>
              <div className="text-sm text-gray-600">Tips, career advice, and platform updates</div>
            </div>
            <Switch
              checked={notifications.marketingEmails}
              onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => {
            setNotifications({
              internshipAlerts: true,
              applicationUpdates: true,
              deadlineReminders: true,
              weeklyDigest: true,
              emailNotifications: true,
              smsNotifications: false,
              marketingEmails: false,
              jobRecommendations: true
            });
          }}
        >
          Reset to Default
        </Button>
        <Button onClick={handleSaveNotifications}>
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="private">Private - Only visible to you</option>
              <option value="recruiters">Recruiters Only - Visible to verified recruiters</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Show Email Address</div>
              <div className="text-sm text-gray-600">Display your email on your public profile</div>
            </div>
            <Switch
              checked={privacy.showEmail}
              onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Show Phone Number</div>
              <div className="text-sm text-gray-600">Display your phone number on your public profile</div>
            </div>
            <Switch
              checked={privacy.showPhone}
              onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Allow Messages</div>
              <div className="text-sm text-gray-600">Let recruiters and companies message you</div>
            </div>
            <Switch
              checked={privacy.allowMessages}
              onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Search Engine Indexing</div>
              <div className="text-sm text-gray-600">Allow search engines to index your profile</div>
            </div>
            <Switch
              checked={privacy.indexProfile}
              onCheckedChange={(checked) => handlePrivacyChange('indexProfile', checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => {
            setFormData(prev => ({ 
              ...prev, 
              currentPassword: '', 
              newPassword: '', 
              confirmPassword: '' 
            }));
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleUpdatePassword}>
          <Save className="w-4 h-4 mr-2" />
          Update Settings
        </Button>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCareerSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Job Types
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['internship', 'full-time', 'part-time', 'contract'].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.jobTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePreferenceChange('jobTypes', [...preferences.jobTypes, type]);
                      } else {
                        handlePreferenceChange('jobTypes', preferences.jobTypes.filter(t => t !== type));
                      }
                    }}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Industries
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['technology', 'finance', 'healthcare', 'education', 'startups', 'consulting'].map((industry) => (
                <label key={industry} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.industries.includes(industry)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePreferenceChange('industries', [...preferences.industries, industry]);
                      } else {
                        handlePreferenceChange('industries', preferences.industries.filter(i => i !== industry));
                      }
                    }}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm capitalize">{industry}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Salary Range (Annual)
            </label>
            <select
              value={preferences.salaryRange}
              onChange={(e) => handlePreferenceChange('salaryRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="0-30000">$0 - $30,000</option>
              <option value="30000-50000">$30,000 - $50,000</option>
              <option value="50000-80000">$50,000 - $80,000</option>
              <option value="80000-120000">$80,000 - $120,000</option>
              <option value="120000+">$120,000+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Center</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              title: 'Getting Started Guide', 
              icon: BookOpen, 
              description: 'Learn the basics of using the platform',
              onClick: () => setShowGettingStartedModal(true)
            },
            { 
              title: 'FAQ', 
              icon: HelpCircle, 
              description: 'Frequently asked questions',
              onClick: () => setShowFAQModal(true)
            },
            { 
              title: 'Resume Tips', 
              icon: FileText, 
              description: 'Improve your resume and stand out',
              onClick: () => setShowResumeTipsModal(true)
            },
            { 
              title: 'Interview Preparation', 
              icon: Target, 
              description: 'Ace your interviews with our guides',
              onClick: () => setShowInterviewPrepModal(true)
            }
          ].map((item, index) => (
            <Card 
              key={index} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border hover:border-teal-300"
              onClick={item.onClick}
            >
              <CardContent className="p-0">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mt-1">
                    <item.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 block">{item.title}</span>
                    <span className="text-sm text-gray-600 mt-1">{item.description}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Email Support</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Get help via email within 24 hours</p>
            <Button 
              variant="outline"
              onClick={() => window.open('mailto:support@internhub.com?subject=Support Request', '_blank')}
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-gray-600">Download all your account data</div>
              </div>
              <Button 
                variant="outline"
                onClick={handleExportData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">Delete Account</div>
                <div className="text-sm text-red-700">Permanently delete your account and all data</div>
              </div>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'preferences':
        return renderPreferences();
      case 'career':
        return renderCareerSettings();
      case 'support':
        return renderSupportSettings();
      default:
        return renderProfileSettings();
    }
  };

  // Modal Components
  const AvatarUploadModal = () => (
    showAvatarModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Upload Profile Picture</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drop your photo here or click to browse</p>
            <Button>Choose File</Button>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowAvatarModal(false)}>Cancel</Button>
            <Button onClick={() => {
              console.log('Uploading avatar');
              setShowAvatarModal(false);
              alert('Profile picture updated successfully!');
            }}>Upload</Button>
          </div>
        </div>
      </div>
    )
  );

  const DeleteAccountModal = () => (
    showDeleteAccountModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">This action cannot be undone</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800">
              Deleting your account will permanently remove:
            </p>
            <ul className="list-disc list-inside text-sm text-red-800 mt-2 space-y-1">
              <li>Your profile and resume</li>
              <li>All job applications</li>
              <li>Saved internships and preferences</li>
              <li>Communication history</li>
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type "DELETE" to confirm
            </label>
            <Input placeholder="DELETE" />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowDeleteAccountModal(false)}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                console.log('Deleting account');
                setShowDeleteAccountModal(false);
                alert('Account deletion initiated. You will receive a confirmation email.');
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    )
  );

  // Getting Started Modal
  const GettingStartedModal = () => (
    showGettingStartedModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Getting Started Guide</h3>
                <p className="text-sm text-gray-600">Learn how to make the most of the platform</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowGettingStartedModal(false)}>×</Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Quick Start Steps</h4>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Complete Your Profile", desc: "Add your personal information and skills" },
                    { step: 2, title: "Build Your Resume", desc: "Use our resume builder to create a professional resume" },
                    { step: 3, title: "Search Internships", desc: "Browse and apply to internships that match your interests" },
                    { step: 4, title: "Track Applications", desc: "Monitor your application status and responses" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Key Features</h4>
                <div className="space-y-3">
                  {[
                    { icon: User, title: "Profile Management", desc: "Showcase your skills and experience" },
                    { icon: FileText, title: "Resume Builder", desc: "Create professional resumes with templates" },
                    { icon: Briefcase, title: "Job Search", desc: "Find internships from top companies" },
                    { icon: Bell, title: "Notifications", desc: "Stay updated on application status" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                      <feature.icon className="w-5 h-5 text-teal-600 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 className="font-semibold text-teal-900 mb-2">💡 Pro Tips</h4>
              <ul className="text-sm text-teal-800 space-y-1">
                <li>• Complete your profile 100% to increase visibility to recruiters</li>
                <li>• Use keywords from job descriptions in your profile and resume</li>
                <li>• Apply early - many internships are filled on a first-come basis</li>
                <li>• Follow up on applications after 1-2 weeks if you haven't heard back</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowGettingStartedModal(false)}>Got it!</Button>
          </div>
        </div>
      </div>
    )
  );

  // FAQ Modal
  const FAQModal = () => (
    showFAQModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600">Find answers to common questions</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFAQModal(false)}>×</Button>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do I apply for internships?",
                a: "Browse available internships in the 'Internships' section, click on positions that interest you, and click 'Apply Now'. Make sure your profile and resume are complete before applying."
              },
              {
                q: "Can I edit my application after submitting?",
                a: "Once submitted, applications cannot be edited. However, you can update your profile and resume, which will be reflected in future applications."
              },
              {
                q: "How do I track my applications?",
                a: "Go to your Dashboard to see all your applications and their current status. You'll also receive email notifications when there are updates."
              },
              {
                q: "What should I include in my profile?",
                a: "Include your education, skills, work experience, projects, and any relevant certifications. The more complete your profile, the better your chances of being noticed by recruiters."
              },
              {
                q: "How long does it take to hear back from companies?",
                a: "Response times vary by company, but typically range from 1-4 weeks. Some companies may respond faster, while others may take longer during busy recruiting seasons."
              },
              {
                q: "Can I apply to multiple internships?",
                a: "Yes! We encourage you to apply to multiple positions to increase your chances. However, make sure each application is tailored to the specific role."
              },
              {
                q: "Is there a limit to how many applications I can submit?",
                a: "There's no limit to the number of applications you can submit. Focus on quality applications that match your interests and qualifications."
              },
              {
                q: "How do I improve my chances of getting selected?",
                a: "Complete your profile 100%, tailor your resume to each position, write personalized cover letters, and apply early. Also, make sure to follow up professionally."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2">{faq.q}</div>
                <div className="text-sm text-gray-600">{faq.a}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowFAQModal(false)}>Close</Button>
          </div>
        </div>
      </div>
    )
  );

  // Resume Tips Modal
  const ResumeTipsModal = () => (
    showResumeTipsModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Resume Tips & Best Practices</h3>
                <p className="text-sm text-gray-600">Create a standout resume that gets noticed</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowResumeTipsModal(false)}>×</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Essential Sections</h4>
              <div className="space-y-3">
                {[
                  { title: "Contact Information", desc: "Full name, email, phone, LinkedIn profile" },
                  { title: "Professional Summary", desc: "2-3 sentences highlighting your value proposition" },
                  { title: "Education", desc: "Degree, school, GPA (if 3.5+), relevant coursework" },
                  { title: "Experience", desc: "Internships, jobs, volunteer work with quantified achievements" },
                  { title: "Skills", desc: "Technical and soft skills relevant to the role" },
                  { title: "Projects", desc: "Academic or personal projects showcasing your abilities" }
                ].map((section, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{section.title}</div>
                    <div className="text-sm text-gray-600">{section.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Do's and Don'ts</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-900 mb-2">✅ Do's</div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Use action verbs (achieved, developed, led)</li>
                    <li>• Quantify achievements with numbers</li>
                    <li>• Tailor resume to each job description</li>
                    <li>• Keep it concise (1-2 pages max)</li>
                    <li>• Use consistent formatting</li>
                    <li>• Proofread for spelling and grammar</li>
                  </ul>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-900 mb-2">❌ Don'ts</div>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Use generic objective statements</li>
                    <li>• Include irrelevant personal information</li>
                    <li>• Use unprofessional email addresses</li>
                    <li>• Have typos or grammatical errors</li>
                    <li>• Use overly complex formatting</li>
                    <li>• Include references or "references available"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">🎯 Action Items</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
              <div>
                <div className="font-medium mb-1">For Students:</div>
                <ul className="space-y-1">
                  <li>• Include relevant coursework and projects</li>
                  <li>• Highlight leadership roles and activities</li>
                  <li>• Emphasize transferable skills from part-time jobs</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-1">For Career Changers:</div>
                <ul className="space-y-1">
                  <li>• Focus on transferable skills</li>
                  <li>• Include relevant side projects or certifications</li>
                  <li>• Write a compelling summary explaining your transition</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowResumeTipsModal(false)}>Close</Button>
          </div>
        </div>
      </div>
    )
  );

  // Interview Preparation Modal
  const InterviewPrepModal = () => (
    showInterviewPrepModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Interview Preparation Guide</h3>
                <p className="text-sm text-gray-600">Ace your interviews with confidence</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowInterviewPrepModal(false)}>×</Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Before the Interview</h4>
                <div className="space-y-3">
                  {[
                    { title: "Research the Company", desc: "Know their mission, values, recent news, and culture" },
                    { title: "Review the Job Description", desc: "Understand requirements and prepare relevant examples" },
                    { title: "Prepare Your Stories", desc: "Use STAR method for behavioral questions" },
                    { title: "Practice Common Questions", desc: "Rehearse your answers out loud" },
                    { title: "Prepare Questions to Ask", desc: "Show interest with thoughtful questions" },
                    { title: "Plan Your Outfit", desc: "Dress appropriately for the company culture" }
                  ].map((tip, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-900">{tip.title}</div>
                      <div className="text-sm text-blue-800">{tip.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">During the Interview</h4>
                <div className="space-y-3">
                  {[
                    { title: "Arrive Early", desc: "Be 10-15 minutes early, not too early" },
                    { title: "Make Eye Contact", desc: "Show confidence and engagement" },
                    { title: "Listen Actively", desc: "Pay attention and ask follow-up questions" },
                    { title: "Be Specific", desc: "Give concrete examples with measurable results" },
                    { title: "Show Enthusiasm", desc: "Express genuine interest in the role and company" },
                    { title: "Take Notes", desc: "Shows you're engaged and organized" }
                  ].map((tip, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-900">{tip.title}</div>
                      <div className="text-sm text-green-800">{tip.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Common Interview Questions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-gray-800 mb-2">Behavioral Questions:</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Tell me about yourself</li>
                    <li>• Describe a challenge you overcame</li>
                    <li>• Give an example of teamwork</li>
                    <li>• What's your greatest weakness?</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-800 mb-2">Role-Specific Questions:</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Why are you interested in this role?</li>
                    <li>• What relevant skills do you have?</li>
                    <li>• How do you handle pressure?</li>
                    <li>• Where do you see yourself in 5 years?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">STAR Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                {[
                  { letter: "S", word: "Situation", desc: "Set the context" },
                  { letter: "T", word: "Task", desc: "Describe your responsibility" },
                  { letter: "A", word: "Action", desc: "Explain what you did" },
                  { letter: "R", word: "Result", desc: "Share the outcome" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-1">
                      {item.letter}
                    </div>
                    <div className="font-medium text-purple-900">{item.word}</div>
                    <div className="text-purple-800 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">After the Interview</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Send a thank-you email within 24 hours</li>
                <li>• Reflect on the interview and note areas for improvement</li>
                <li>• Follow up appropriately if you don't hear back</li>
                <li>• Stay positive regardless of the outcome</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowInterviewPrepModal(false)}>Close</Button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-teal-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderSectionContent()}
              </motion.div>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <AvatarUploadModal />
        <DeleteAccountModal />
        <GettingStartedModal />
        <FAQModal />
        <ResumeTipsModal />
        <InterviewPrepModal />
      </div>
    </div>
  );
};

export default SettingsPage;