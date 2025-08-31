import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SignupLogin } from "@/components/SignupLogin";
import { GradeSelection } from "@/components/GradeSelection";
import { ClassSelection } from "@/components/ClassSelection";
import { Hero } from "@/components/Hero";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { QuizComponent } from "@/components/QuizComponent";
import { getQuestionsByGradeAndSubject } from "@/data/gradeSpecificQuizzes";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, GraduationCap, Users, Moon, Sun, LogOut } from "lucide-react";

type ViewMode = "landing" | "student-auth" | "teacher-auth" | "grade-selection" | "class-selection" | "student" | "teacher" | "quiz";

const Index = () => {
  const { user, userRole, isAuthenticated, login, logout, updateProgress } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>("landing");
  const [currentSubject, setCurrentSubject] = useState<string>("");
  const { theme, toggleTheme } = useTheme();

  const getInitialView = (): ViewMode => {
    if (!isAuthenticated) return "landing";
    
    if (userRole === "student") {
      if (!user?.grade) return "grade-selection";
      return "student";
    }
    
    if (userRole === "teacher") {
      if (!user?.classes || user.classes.length === 0) return "class-selection";
      return "teacher";
    }
    
    return "landing";
  };

  useEffect(() => {
    setCurrentView(getInitialView());
  }, [isAuthenticated, userRole, user]);

  const handleGetStarted = () => {
    setCurrentView("student-auth");
  };

  const handleTeacherDashboard = () => {
    setCurrentView("teacher-auth");
  };

  const handleAuthSuccess = (role: 'student' | 'teacher', userData: any) => {
    login(userData);
  };

  const handleGradeSelected = () => {
    setCurrentView("student");
  };

  const handleClassesSelected = () => {
    setCurrentView("teacher");
  };

  const handleStartLesson = (subject: string, lessonId: string) => {
    setCurrentSubject(subject);
    setCurrentView("quiz");
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const xpGained = score * 10; 
    const newLevel = Math.floor((user?.xp || 0 + xpGained) / 500); 
    const newCompletedLessons = (user?.completedLessons || 0) + 1;
    
    updateProgress({
      xp: xpGained,
      level: newLevel,
      completedLessons: newCompletedLessons
    });

    console.log(`Quiz completed! Score: ${score}/${totalQuestions}, XP gained: ${xpGained}`);
    setCurrentView("student");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleSwitchToTeacher = () => {
    if (userRole === "teacher") {
      setCurrentView("teacher");
    }
  };

  const handleSwitchToStudent = () => {
    if (userRole === "student") {
      setCurrentView("student");
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView("landing");
  };

  const renderNavigation = () => {
    if (currentView === "landing" || currentView === "student-auth" || currentView === "teacher-auth" || currentView === "grade-selection" || currentView === "class-selection") {
      return null;
    }

    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackToLanding} className="bg-background/90 backdrop-blur-sm border-border">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          
          {userRole === "teacher" && currentView !== "teacher" && (
            <Button variant="outline" onClick={handleSwitchToTeacher} className="bg-background/90 backdrop-blur-sm border-border">
              <Users className="w-4 h-4 mr-2" />
              Teacher View
            </Button>
          )}
          
          {userRole === "student" && currentView !== "student" && (
            <Button variant="outline" onClick={handleSwitchToStudent} className="bg-background/90 backdrop-blur-sm border-border">
              <GraduationCap className="w-4 h-4 mr-2" />
              Student View
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme} 
            className="bg-background/90 backdrop-blur-sm border-border"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {isAuthenticated && (
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-background/90 backdrop-blur-sm border-border text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderNavigation()}
      
      {currentView === "landing" && (
        <Hero 
          onGetStarted={handleGetStarted} 
          onTeacherDashboard={handleTeacherDashboard}
        />
      )}

      {currentView === "student-auth" && (
        <SignupLogin onAuthSuccess={handleAuthSuccess} />
      )}

      {currentView === "teacher-auth" && (
        <SignupLogin onAuthSuccess={handleAuthSuccess} />
      )}

      {currentView === "grade-selection" && (
        <GradeSelection onGradeSelected={handleGradeSelected} />
      )}

      {currentView === "class-selection" && (
        <ClassSelection onClassesSelected={handleClassesSelected} />
      )}
      
      {currentView === "student" && userRole === "student" && (
        <StudentDashboard onStartLesson={handleStartLesson} />
      )}
      
      {currentView === "teacher" && userRole === "teacher" && (
        <TeacherDashboard />
      )}
      
      {currentView === "quiz" && userRole === "student" && (
        <QuizComponent
          questions={getQuestionsByGradeAndSubject(
            user?.grade ? parseInt(user.grade.replace('Grade ', '')) : 6,
            currentSubject
          )}
          onComplete={handleQuizComplete}
          subject={currentSubject}
        />
      )}
    </>
  );
};

export default Index;