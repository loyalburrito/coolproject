import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Star, BookOpen } from "lucide-react";

interface GradeSelectionProps {
  onGradeSelected: () => void;
}

export const GradeSelection = ({ onGradeSelected }: GradeSelectionProps) => {
  const { updateUserData } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const grades = [
    { id: "grade-6", name: "Grade 6", level: "Elementary", subjects: 12, color: "primary" },
    { id: "grade-7", name: "Grade 7", level: "Middle School", subjects: 15, color: "secondary" },
    { id: "grade-8", name: "Grade 8", level: "Middle School", subjects: 18, color: "success" },
    { id: "grade-9", name: "Grade 9", level: "High School", subjects: 20, color: "warning" },
    { id: "grade-10", name: "Grade 10", level: "High School", subjects: 22, color: "energy" },
    { id: "grade-11", name: "Grade 11", level: "High School", subjects: 25, color: "math" },
    { id: "grade-12", name: "Grade 12", level: "High School", subjects: 28, color: "science" },
  ];

  const handleGradeSelection = (gradeId: string, gradeName: string) => {
    setSelectedGrade(gradeId);
    updateUserData({ grade: gradeName });
    
    // Simulate loading and then proceed
    setTimeout(() => {
      onGradeSelected();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 dark:from-background dark:via-primary/10 dark:to-secondary/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <GraduationCap className="w-4 h-4 mr-2" />
            Student Setup
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Choose Your Grade
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your current grade level to access appropriate learning materials and quizzes
          </p>
        </div>

        {/* Grade Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {grades.map((grade, index) => (
            <Card 
              key={grade.id}
              className={`group hover-lift clickable border-2 transition-all duration-300 animate-bounce-in ${
                selectedGrade === grade.id 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleGradeSelection(grade.id, grade.name)}
            >
              <CardHeader className="text-center pb-3">
                <div className={`mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-${grade.color} to-${grade.color}/80 shadow-lg`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {grade.name}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {grade.level}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-energy" />
                    <span className="text-sm font-medium">{grade.subjects} Subjects Available</span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div>• Mathematics & Algebra</div>
                    <div>• Science & Physics</div>
                    <div>• Technology & Coding</div>
                    <div>• Engineering Basics</div>
                  </div>
                </div>
                
                <Button 
                  variant={grade.color as any}
                  className="w-full"
                  disabled={selectedGrade === grade.id}
                >
                  {selectedGrade === grade.id ? 'Setting up...' : 'Select Grade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Don't worry, you can change your grade level later in settings.
          </p>
        </div>
      </div>
    </div>
  );
};