import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Trophy, Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface SignupLoginProps {
  onAuthSuccess: (role: 'student' | 'teacher', userData: any) => void;
}

export const SignupLogin = ({ onAuthSuccess }: SignupLoginProps) => {
  const [activeTab, setActiveTab] = useState("student");
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Student form data
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    rollNumber: ""
  });

  // Teacher form data
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    facultyId: ""
  });

  // Login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!studentData.name || !studentData.email || !studentData.password || !studentData.school || !studentData.rollNumber) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: `student_${Date.now()}`,
        name: studentData.name,
        email: studentData.email,
        role: 'student' as const,
        school: studentData.school,
        rollNumber: studentData.rollNumber,
        grade: null, // Will be set in grade selection
        level: 0,
        xp: 0,
        streak: 0,
        completedLessons: 0,
        totalLessons: 0
      };

      toast.success(`Welcome ${studentData.name}!`, {
        description: "Account created successfully. Please select your grade."
      });

      onAuthSuccess('student', userData);
      setLoading(false);
    }, 1000);
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!teacherData.name || !teacherData.email || !teacherData.password || !teacherData.school || !teacherData.facultyId) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: `teacher_${Date.now()}`,
        name: teacherData.name,
        email: teacherData.email,
        role: 'teacher' as const,
        school: teacherData.school,
        facultyId: teacherData.facultyId,
        classes: [], // Will be set in class selection
        totalStudents: 0,
        activeToday: 0,
        avgProgress: 0
      };

      toast.success(`Welcome ${teacherData.name}!`, {
        description: "Account created successfully. Please select your classes."
      });

      onAuthSuccess('teacher', userData);
      setLoading(false);
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter email and password");
      setLoading(false);
      return;
    }

    // Simulate API call - In real app, this would verify credentials
    setTimeout(() => {
      // Mock user data based on email pattern
      const isTeacher = loginData.email.includes('teacher') || loginData.email.includes('faculty');
      
      if (isTeacher) {
        const userData = {
          id: `teacher_${Date.now()}`,
          name: "Sarah Teacher",
          email: loginData.email,
          role: 'teacher' as const,
          school: "Demo School",
          facultyId: "FAC001",
          classes: ["Math 6A", "Science 7B"], // Pre-existing user
          totalStudents: 24,
          activeToday: 18,
          avgProgress: 68
        };
        onAuthSuccess('teacher', userData);
      } else {
        const userData = {
          id: `student_${Date.now()}`,
          name: "Alex Student",
          email: loginData.email,
          role: 'student' as const,
          school: "Demo School",
          rollNumber: "STU001",
          grade: "Grade 8", // Pre-existing user
          level: 5,
          xp: 1250,
          streak: 3,
          completedLessons: 12,
          totalLessons: 20
        };
        onAuthSuccess('student', userData);
      }

      toast.success("Login successful!", {
        description: "Welcome back!"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 dark:from-background dark:via-primary/10 dark:to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            STEM Learning Platform
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {mode === "signup" ? "Join Our Platform" : "Welcome Back"}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {mode === "signup" 
              ? "Create your account to start your STEM learning journey" 
              : "Sign in to continue your learning adventure"
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={mode === "signup" ? "default" : "ghost"}
              onClick={() => setMode("signup")}
              className="px-6"
            >
              Sign Up
            </Button>
            <Button
              variant={mode === "login" ? "default" : "ghost"}
              onClick={() => setMode("login")}
              className="px-6"
            >
              Login
            </Button>
          </div>
        </div>

        {mode === "signup" ? (
          /* Signup Form */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Teacher
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4 mt-6">
                  <form onSubmit={handleStudentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student-name">Full Name</Label>
                        <Input
                          id="student-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={studentData.name}
                          onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="Enter your email"
                          value={studentData.email}
                          onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student-school">School Name</Label>
                        <Input
                          id="student-school"
                          type="text"
                          placeholder="Enter your school name"
                          value={studentData.school}
                          onChange={(e) => setStudentData({...studentData, school: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-roll">Roll Number</Label>
                        <Input
                          id="student-roll"
                          type="text"
                          placeholder="Enter your roll number"
                          value={studentData.rollNumber}
                          onChange={(e) => setStudentData({...studentData, rollNumber: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={studentData.password}
                          onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Student Account"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-6">
                  <form onSubmit={handleTeacherSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teacher-name">Full Name</Label>
                        <Input
                          id="teacher-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={teacherData.name}
                          onChange={(e) => setTeacherData({...teacherData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="teacher-email">Email</Label>
                        <Input
                          id="teacher-email"
                          type="email"
                          placeholder="Enter your email"
                          value={teacherData.email}
                          onChange={(e) => setTeacherData({...teacherData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teacher-school">School Name</Label>
                        <Input
                          id="teacher-school"
                          type="text"
                          placeholder="Enter your school name"
                          value={teacherData.school}
                          onChange={(e) => setTeacherData({...teacherData, school: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="teacher-faculty">Faculty ID</Label>
                        <Input
                          id="teacher-faculty"
                          type="text"
                          placeholder="Enter your faculty ID"
                          value={teacherData.facultyId}
                          onChange={(e) => setTeacherData({...teacherData, facultyId: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="teacher-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="teacher-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={teacherData.password}
                          onChange={(e) => setTeacherData({...teacherData, password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Teacher Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          /* Login Form */
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Demo accounts:</p>
                <p>Student: student@demo.com | Teacher: teacher@demo.com</p>
                <p>Password: any password</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};