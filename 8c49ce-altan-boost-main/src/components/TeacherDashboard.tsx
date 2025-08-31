import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import {
  Users,
  TrendingUp,
  Clock,
  Trophy,
  BookOpen,
  BarChart3,
  Download,
  MessageSquare,
  Wifi,
  WifiOff,
  Star,
  Settings,
  Plus,
  Eye,
  Edit
} from "lucide-react";

export const TeacherDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  
  const classStats = {
    totalStudents: 24,
    activeToday: 18,
    avgProgress: 68,
    avgEngagement: 85,
    lessonsCompleted: 156,
    quizzesCompleted: 89
  };

  const recentActivity = [
    { student: "Maria Santos", action: "Completed Math Quiz", score: "8/10", time: "2 hours ago", subject: "math" },
    { student: "João Silva", action: "Started Science Lesson", score: "In Progress", time: "3 hours ago", subject: "science" },
    { student: "Ana Costa", action: "Completed Engineering Challenge", score: "9/10", time: "5 hours ago", subject: "engineering" },
    { student: "Pedro Lima", action: "Synced via SMS", score: "Data Updated", time: "1 day ago", subject: "technology" }
  ];

  const studentProgress = [
    { name: "Maria Santos", math: 85, science: 78, technology: 65, engineering: 45, status: "online" },
    { name: "João Silva", math: 72, science: 89, technology: 58, engineering: 32, status: "offline" },
    { name: "Ana Costa", math: 91, science: 85, technology: 78, engineering: 67, status: "online" },
    { name: "Pedro Lima", math: 68, science: 62, technology: 71, engineering: 28, status: "offline" }
  ];

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      math: "bg-math",
      science: "bg-science", 
      technology: "bg-technology",
      engineering: "bg-engineering"
    };
    return colors[subject] || "bg-muted";
  };

  const handleExportReport = () => {
    toast.success("Generating Report", {
      description: "Your class report is being prepared for download..."
    });
    // Simulate report generation
    setTimeout(() => {
      toast.success("Report Ready!", {
        description: "Class_Report_2024.pdf has been downloaded."
      });
    }, 2000);
  };

  const handleSendSMS = () => {
    toast.info("SMS Updates", {
      description: "Sending progress updates to 16 students via SMS..."
    });
    setTimeout(() => {
      toast.success("SMS Sent!", {
        description: "Progress updates sent to all students with SMS enabled."
      });
    }, 1500);
  };

  const handleViewStudent = (studentName: string) => {
    setSelectedStudent(studentName);
    toast.info(`Viewing ${studentName}`, {
      description: "Loading detailed student progress..."
    });
  };

  const handleEditProfile = () => {
    toast.info("Edit Profile", {
      description: "Opening profile editor..."
    });
  };

  const handlePrivacySettings = () => {
    toast.info("Privacy Settings", {
      description: "Opening privacy configuration..."
    });
  };

  const handleCreateAssignment = () => {
    toast.success("Create Assignment", {
      description: "Opening assignment builder..."
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-card dark:bg-card border border-border dark:border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Monitor student progress and engagement</p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="hero" onClick={handleSendSMS}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send SMS Updates
                </Button>
                <Button variant="success" onClick={handleCreateAssignment}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Assignment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card dark:bg-card border border-border dark:border-border hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{classStats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">{classStats.activeToday} active today</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-card border border-border dark:border-border hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold text-foreground">{classStats.avgProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <Progress value={classStats.avgProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-card border border-border dark:border-border hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-2xl font-bold text-foreground">{classStats.avgEngagement}%</p>
                </div>
                <Trophy className="w-8 h-8 text-energy" />
              </div>
              <div className="mt-3 flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= 4 ? 'text-energy fill-energy' : 'text-muted'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-card border border-border dark:border-border hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  <p className="text-2xl font-bold text-foreground">{classStats.lessonsCompleted}</p>
                </div>
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                +{classStats.quizzesCompleted} quizzes completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted dark:bg-muted">
            <TabsTrigger value="progress" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">Student Progress</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-card dark:bg-card border border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Student Progress by Subject
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProgress.map((student, index) => (
                    <div key={index} className="p-4 border border-border dark:border-border rounded-lg bg-muted/20 dark:bg-muted/10 hover-lift">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          <Badge variant={student.status === "online" ? "success" : "outline"}>
                            {student.status === "online" ? (
                              <Wifi className="w-3 h-3 mr-1" />
                            ) : (
                              <WifiOff className="w-3 h-3 mr-1" />
                            )}
                            {student.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewStudent(student.name)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.info(`Editing ${student.name}'s profile`)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-math mb-1">Mathematics</p>
                          <Progress value={student.math} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{student.math}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-science mb-1">Science</p>
                          <Progress value={student.science} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{student.science}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-technology mb-1">Technology</p>
                          <Progress value={student.technology} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{student.technology}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-engineering mb-1">Engineering</p>
                          <Progress value={student.engineering} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{student.engineering}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card dark:bg-card border border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-3 border border-border dark:border-border rounded-lg hover-lift clickable bg-muted/20 dark:bg-muted/10"
                      onClick={() => toast.info(`Viewing details for ${activity.student}`)}
                    >
                      <div className={`w-3 h-3 rounded-full ${getSubjectColor(activity.subject)}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{activity.score}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card dark:bg-card border border-border dark:border-border">
                <CardHeader>
                  <CardTitle>Offline Sync Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Students with offline access</span>
                      <Badge variant="success">20/24</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">SMS sync enabled</span>
                      <Badge variant="energy">16/24</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Data pending sync</span>
                      <Badge variant="warning">3 students</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => toast.info("Syncing offline data...")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Sync Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card border border-border dark:border-border">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Mathematics</span>
                        <span className="text-sm text-muted-foreground">79%</span>
                      </div>
                      <Progress value={79} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Science</span>
                        <span className="text-sm text-muted-foreground">84%</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Technology</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">Engineering</span>
                        <span className="text-sm text-muted-foreground">43%</span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full mt-4"
                    onClick={() => toast.success("Generating detailed analytics report...")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};