import { AdminHeader } from "../../components/admin/AdminHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Building2, Users, Briefcase, Clock, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from "@/shared/lib/utils";

// Placeholder data for admin dashboard
const kpiMetrics = [
  { title: "Total Companies", value: "1,234", icon: "building", trend: "up", change: "12" },
  { title: "Active Interns", value: "5,678", icon: "users", trend: "up", change: "8" },
  { title: "Total Internships", value: "890", icon: "briefcase", trend: "up", change: "15" },
  { title: "Applications", value: "12,345", icon: "clock", trend: "up", change: "23" }
];

const chartData = [
  { name: 'Jan', applications: 400, placements: 240 },
  { name: 'Feb', applications: 300, placements: 139 },
  { name: 'Mar', applications: 200, placements: 980 },
  { name: 'Apr', applications: 278, placements: 390 },
  { name: 'May', applications: 189, placements: 480 },
  { name: 'Jun', applications: 239, placements: 380 }
];

const recentActivities = [
  { id: 1, type: "employer_verification", status: "pending", description: "New company registration", timestamp: "2 hours ago" },
  { id: 2, type: "intern_application", status: "approved", description: "Internship application", timestamp: "4 hours ago" }
];

const auditLogs = [
  { 
    id: 1, 
    action: "User Login", 
    user: "admin@example.com", 
    timestamp: "2024-01-15 10:30:00", 
    ip: "192.168.1.1",
    adminName: "Admin User",
    targetName: "System",
    targetType: "Authentication"
  },
  { 
    id: 2, 
    action: "Data Export", 
    user: "admin@example.com", 
    timestamp: "2024-01-15 09:15:00", 
    ip: "192.168.1.1",
    adminName: "Admin User",
    targetName: "User Data",
    targetType: "Export"
  }
];

const cohortAnalytics = [
  { 
    name: "Summer 2024", 
    graduationYear: "2024",
    totalInterns: 150, 
    completionRate: 85, 
    avgRating: 4.2,
    activeApplications: 45,
    successRate: 85,
    avgApplicationsPerIntern: 3.2
  },
  { 
    name: "Spring 2024", 
    graduationYear: "2024",
    totalInterns: 120, 
    completionRate: 92, 
    avgRating: 4.5,
    activeApplications: 32,
    successRate: 92,
    avgApplicationsPerIntern: 2.8
  }
];

const employerEngagements = [
  { 
    company: "Tech Corp", 
    employerId: "1",
    companyName: "Tech Corp",
    activeInterns: 25, 
    totalPostings: 12, 
    responseRate: 95,
    postingsThisMonth: 8,
    postingsLastMonth: 6,
    qualityScore: 9.2,
    avgTimeToFill: 14,
    successRate: 95
  },
  { 
    company: "StartupXYZ", 
    employerId: "2",
    companyName: "StartupXYZ",
    activeInterns: 15, 
    totalPostings: 8, 
    responseRate: 88,
    postingsThisMonth: 5,
    postingsLastMonth: 7,
    qualityScore: 8.7,
    avgTimeToFill: 18,
    successRate: 88
  }
];

const iconMap = {
  building: Building2,
  users: Users, 
  briefcase: Briefcase,
  clock: Clock
};

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader 
        title="Dashboard" 
        subtitle="Overview of platform metrics and recent activity"
      />
      
      <main className="flex-1 p-6 space-y-8 overflow-auto bg-gradient-to-br from-background to-muted/30 animate-fade-in">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiMetrics.map((metric, index) => {
            const IconComponent = iconMap[metric.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={metric.title} 
                className="card-elevated hover:scale-105 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {metric.title}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={cn(
                      "font-medium",
                      metric.trend === 'up' ? "text-success" : "text-destructive"
                    )}>
                      {Math.abs(parseInt(metric.change))}%
                    </span>
                    <span className="text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <Card className="card-elevated animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                User Growth Trends
              </CardTitle>
              <CardDescription>
                Employers vs Interns registration over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData.slice(-15)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).getDate().toString()}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-elevated)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="employers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Employers"
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interns" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    name="Interns"
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--success))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Chart */}
          <Card className="card-elevated animate-scale-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-warning" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Internships posted vs applications submitted
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-elevated)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="postings" 
                    fill="hsl(var(--primary))" 
                    name="Postings"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="applications" 
                    fill="hsl(var(--success))" 
                    name="Applications"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="card-elevated animate-scale-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                Cohort Analysis
              </CardTitle>
              <CardDescription>
                Intern applications by graduation year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohortAnalytics.map((cohort, index) => (
                  <div key={cohort.graduationYear} className="p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-all duration-200 animate-fade-in" style={{ animationDelay: `${400 + index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">Class of {cohort.graduationYear}</span>
                      <Badge className="bg-success/10 text-success border-success/20">{cohort.totalInterns} interns</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Applications</p>
                        <p className="font-bold text-xl text-primary">{cohort.activeApplications}</p>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-bold text-xl text-success">{cohort.successRate}%</p>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Avg/Intern</p>
                        <p className="font-bold text-xl text-warning">{cohort.avgApplicationsPerIntern}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated animate-scale-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Employer Engagement
              </CardTitle>
              <CardDescription>
                Company posting frequency and success metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employerEngagements.map((employer, index) => (
                  <div key={employer.employerId} className="p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-all duration-200 animate-fade-in" style={{ animationDelay: `${500 + index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">{employer.companyName}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${employer.postingsThisMonth > employer.postingsLastMonth ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                          {employer.postingsThisMonth > employer.postingsLastMonth ? '↗' : '↘'} {employer.postingsThisMonth} posts
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {employer.qualityScore}/10
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Fill Time</p>
                        <p className="font-bold text-xl text-primary">{employer.avgTimeToFill}d</p>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Success</p>
                        <p className="font-bold text-xl text-success">{employer.successRate}%</p>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/20">
                        <p className="text-muted-foreground">Response</p>
                        <p className="font-bold text-xl text-warning">{employer.responseRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-elevated animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-warning" />
                Audit Log
              </CardTitle>
              <CardDescription>
                Recent admin actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.slice(0, 5).map((log, index) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-all duration-200 group animate-fade-in" style={{ animationDelay: `${700 + index * 100}ms` }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        log.action.includes('APPROVE') || log.action.includes('VERIFY') ? 'bg-success' :
                        log.action.includes('SUSPEND') || log.action.includes('DELETE') ? 'bg-destructive' :
                        'bg-warning'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{log.adminName}</p>
                        <p className="text-xs text-muted-foreground">{log.action.toLowerCase().replace('_', ' ')} • {log.targetName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {log.targetType}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated animate-slide-up" style={{ animationDelay: "700ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  Pending Verifications
                </span>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                  {recentActivities.filter(a => a.status === 'pending').length}
                </Badge>
              </CardTitle>
              <CardDescription>
                Employer verification requests awaiting review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.filter(a => a.type === 'employer_verification' && a.status === 'pending').map((activity, index) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-all duration-200 group animate-fade-in" style={{ animationDelay: `${800 + index * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">StartupXYZ</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90 shadow-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}


