import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Trophy } from "lucide-react";

interface LoginProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

export const Login = ({ onRoleSelect }: LoginProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleRoleSelection = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    // Simulate login process
    setTimeout(() => {
      onRoleSelect(role);
    }, 500);
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
            Welcome Back!
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access your personalized learning dashboard
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Login */}
          <Card 
            className={`group hover-lift clickable border-2 transition-all duration-300 ${
              selectedRole === 'student' 
                ? 'border-primary shadow-lg scale-105' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleRoleSelection('student')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-6 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Student Login
              </CardTitle>
              <p className="text-muted-foreground">
                Access your courses, quizzes, and track your progress
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Trophy className="w-5 h-5 text-energy" />
                  <span className="text-sm">Track your learning progress</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-success" />
                  <span className="text-sm">Take interactive quizzes</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <span className="text-sm">Choose your grade level</span>
                </div>
              </div>
              
              <Button 
                variant="hero" 
                className="w-full mt-6"
                disabled={selectedRole === 'student'}
              >
                {selectedRole === 'student' ? 'Logging in...' : 'Login as Student'}
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Login */}
          <Card 
            className={`group hover-lift clickable border-2 transition-all duration-300 ${
              selectedRole === 'teacher' 
                ? 'border-secondary shadow-lg scale-105' 
                : 'border-border hover:border-secondary/50'
            }`}
            onClick={() => handleRoleSelection('teacher')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-6 rounded-full bg-gradient-to-br from-secondary to-secondary/80 shadow-lg">
                <Users className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Teacher Login
              </CardTitle>
              <p className="text-muted-foreground">
                Manage classes, create quizzes, and monitor student progress
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Manage your classes</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-warning" />
                  <span className="text-sm">Create custom quizzes</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Trophy className="w-5 h-5 text-energy" />
                  <span className="text-sm">Track student progress</span>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full mt-6"
                disabled={selectedRole === 'teacher'}
              >
                {selectedRole === 'teacher' ? 'Logging in...' : 'Login as Teacher'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            New to our platform? Contact your administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};