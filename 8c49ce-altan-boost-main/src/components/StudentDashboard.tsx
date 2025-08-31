import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SettingsMenu } from "@/components/SettingsMenu";
import { toast } from "@/components/ui/sonner";
import { getQuestionsByGradeAndSubject } from "@/data/gradeSpecificQuizzes";
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Calculator, 
  FlaskConical, 
  Cpu, 
  Cog,
  Play,
  Lock,
  Settings,
  Zap,
  Target,
  Award
} from "lucide-react";

interface StudentDashboardProps {
  onStartLesson: (subject: string, lessonId: string) => void;
}

export const StudentDashboard = ({ onStartLesson }: StudentDashboardProps) => {
  const { t } = useLanguage();
  const { user, updateProgress } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const studentStats = {
    level: user?.level || 0,
    xp: user?.xp || 0,
    xpToNext: 500,
    streak: user?.streak || 0,
    totalLessons: user?.totalLessons || 0,
    completedLessons: user?.completedLessons || 0
  };

  const userGrade = user?.grade ? parseInt(user.grade.replace('Grade ', '')) : 6;

  const subjects = [
    {
      id: "mathematics",
      name: t('mathematics'),
      icon: Calculator,
      color: "math",
      progress: calculateSubjectProgress("mathematics"),
      lessons: getQuestionsByGradeAndSubject(userGrade, "mathematics").length,
      completed: Math.floor(calculateSubjectProgress("mathematics") / 100 * getQuestionsByGradeAndSubject(userGrade, "mathematics").length),
      locked: false
    },
    {
      id: "science",
      name: t('science'),
      icon: FlaskConical,
      color: "science",
      progress: calculateSubjectProgress("science"),
      lessons: getQuestionsByGradeAndSubject(userGrade, "science").length,
      completed: Math.floor(calculateSubjectProgress("science") / 100 * getQuestionsByGradeAndSubject(userGrade, "science").length),
      locked: false
    },
    {
      id: "technology",
      name: t('technology'),
      icon: Cpu,
      color: "technology",
      progress: calculateSubjectProgress("technology"),
      lessons: getQuestionsByGradeAndSubject(userGrade, "technology").length,
      completed: Math.floor(calculateSubjectProgress("technology") / 100 * getQuestionsByGradeAndSubject(userGrade, "technology").length),
      locked: false
    },
    {
      id: "engineering",
      name: t('engineering'),
      icon: Cog,
      color: "engineering",
      progress: calculateSubjectProgress("engineering"),
      lessons: getQuestionsByGradeAndSubject(userGrade, "engineering").length,
      completed: Math.floor(calculateSubjectProgress("engineering") / 100 * getQuestionsByGradeAndSubject(userGrade, "engineering").length),
      locked: studentStats.level < 3 
    }
  ];

  function calculateSubjectProgress(subject: string): number {
    const baseProgress = (user?.xp || 0) / 10; 
    const subjectMultiplier = {
      mathematics: 1.2,
      science: 1.0,
      technology: 0.8,
      engineering: 0.6
    };
    return Math.min(100, Math.floor(baseProgress * (subjectMultiplier[subject as keyof typeof subjectMultiplier] || 1)));
  }

  const recentLessons = [
    { 
      id: "1", 
      title: "Algebra Basics", 
      subject: "Mathematics", 
      completed: true,
      score: "8/10",
      grade: userGrade
    },
    { 
      id: "2", 
      title: "Chemical Properties", 
      subject: "Science", 
      completed: true,
      score: "9/10",
      grade: userGrade
    },
    { 
      id: "3", 
      title: "Programming Logic", 
      subject: "Technology", 
      completed: false,
      score: "In Progress",
      grade: userGrade
    },
  ];

  const handleLessonClick = (lesson: any) => {
    if (lesson.completed) {
      toast.info(`Quiz Report: ${lesson.title}`, {
        description: `Score: ${lesson.score} | Grade: ${lesson.grade} | Status: Completed`
      });
    } else {
      toast.info(`Continuing: ${lesson.title}`, {
        description: "Resuming where you left off..."
      });
      setTimeout(() => {
        onStartLesson(lesson.subject.toLowerCase(), lesson.id);
      }, 1000);
    }
  };

  const handleSubjectClick = (subject: any) => {
    if (subject.locked) {
      toast.warning("Subject Locked", {
        description: `Reach level 3 to unlock ${subject.name}! Current level: ${studentStats.level}`
      });
      return;
    }
    
    const availableQuestions = getQuestionsByGradeAndSubject(userGrade, subject.id);
    if (availableQuestions.length === 0) {
      toast.warning("No Questions Available", {
        description: `No ${subject.name} questions available for ${user?.grade || 'your grade'} yet.`
      });
      return;
    }
    
    toast.success(`Starting ${subject.name}`, {
      description: `Loading ${user?.grade || 'Grade 6'} level questions...`
    });
    
    setTimeout(() => {
      onStartLesson(subject.id, "current");
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 dark:from-background dark:via-primary/10 dark:to-secondary/10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="gradient-primary text-white border-0 animate-slide-up hover-glow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2 animate-slide-in-left">
                        {t('welcome_back')}, {user?.name || 'Student'}! 
                      </h1>
                      <p className="text-white/90">{user?.grade || 'Grade 6'} • {user?.school || 'School'}</p>
                      <p className="text-white/80 text-sm">Roll: {user?.rollNumber || 'N/A'}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setSettingsOpen(true)}
                    >
                      <Settings className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <Trophy className="w-6 h-6 text-energy mx-auto mb-1" />
                      <div className="text-lg font-bold">{t('level')} {studentStats.level}</div>
                      <div className="text-xs text-white/80">{studentStats.level === 0 ? 'Beginner' : 'Learning'}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <Zap className="w-6 h-6 text-warning mx-auto mb-1" />
                      <div className="text-lg font-bold">{studentStats.streak}</div>
                      <div className="text-xs text-white/80">{t('day_streak')}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <Target className="w-6 h-6 text-success mx-auto mb-1" />
                      <div className="text-lg font-bold">{studentStats.completedLessons}</div>
                      <div className="text-xs text-white/80">{t('completed')}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <Award className="w-6 h-6 text-energy mx-auto mb-1" />
                      <div className="text-lg font-bold">{studentStats.xp}</div>
                      <div className="text-xs text-white/80">{t('xp_points')}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-white/90 mb-2">
                      <span>{t('progress_to_next')}</span>
                      <span>{studentStats.xp}/{studentStats.xp + studentStats.xpToNext} XP</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-energy h-full rounded-full animate-progress-fill"
                        style={{ 
                          width: `${(studentStats.xp / (studentStats.xp + studentStats.xpToNext)) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <Card 
                  key={subject.id} 
                  className={`group hover-lift clickable border-0 shadow-lg animate-bounce-in bg-card dark:bg-card ${
                    subject.locked ? 'opacity-75' : 'hover-glow'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-4 rounded-xl bg-gradient-to-br from-${subject.color} to-${subject.color}/80 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white animate-float" />
                      </div>
                      {subject.locked && (
                        <Badge variant="outline" className="text-xs">
                          <Lock className="w-3 h-3 mr-1" />
                          Level {3} Required
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {subject.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {subject.completed} of {subject.lessons} questions completed
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-2">
                          <span>Progress</span>
                          <span className="text-primary">{subject.progress}%</span>
                        </div>
                        <div className="bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-${subject.color} to-${subject.color}/80 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        variant={subject.locked ? "outline" : subject.color as any}
                        className="w-full font-semibold"
                        disabled={subject.locked}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubjectClick(subject);
                        }}
                      >
                        {subject.locked ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {t('continue_learning')}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-0 shadow-lg animate-slide-up bg-card dark:bg-card" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="w-6 h-6 text-primary" />
                {t('recent_activity')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/50 dark:from-muted/20 dark:to-muted/40 rounded-xl hover-lift clickable"
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full animate-pulse-gentle ${
                        lesson.completed ? 'bg-success' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="font-semibold text-foreground">{lesson.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{lesson.subject} • Grade {lesson.grade}</p>
                          {lesson.completed && (
                            <Badge variant="success" className="text-xs">
                              ✓ {lesson.score}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={lesson.completed ? "outline" : "default"} 
                      size="sm"
                      className="font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLessonClick(lesson);
                      }}
                    >
                      {lesson.completed ? (
                        <>
                          <Trophy className="w-3 h-3 mr-1" />
                          View Report
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Continue
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <SettingsMenu 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </>
  );
};