import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Users, BookOpen, Plus, Check } from "lucide-react";

interface ClassSelectionProps {
  onClassesSelected: () => void;
}

export const ClassSelection = ({ onClassesSelected }: ClassSelectionProps) => {
  const { updateUserData } = useAuth();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableClasses = [
    { 
      id: "math-6a", 
      name: "Mathematics 6A", 
      grade: "Grade 6", 
      students: 24, 
      subject: "Mathematics",
      color: "math"
    },
    { 
      id: "science-7b", 
      name: "Science 7B", 
      grade: "Grade 7", 
      students: 28, 
      subject: "Science",
      color: "science"
    },
    { 
      id: "tech-8a", 
      name: "Technology 8A", 
      grade: "Grade 8", 
      students: 22, 
      subject: "Technology",
      color: "technology"
    },
    { 
      id: "eng-9c", 
      name: "Engineering 9C", 
      grade: "Grade 9", 
      students: 26, 
      subject: "Engineering",
      color: "engineering"
    },
    { 
      id: "math-10a", 
      name: "Advanced Math 10A", 
      grade: "Grade 10", 
      students: 20, 
      subject: "Mathematics",
      color: "math"
    },
    { 
      id: "science-11b", 
      name: "Physics 11B", 
      grade: "Grade 11", 
      students: 18, 
      subject: "Science",
      color: "science"
    },
  ];

  const handleClassToggle = (classId: string) => {
    setSelectedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleContinue = () => {
    if (selectedClasses.length === 0) return;
    
    setIsLoading(true);
    
    // Get selected class names
    const selectedClassNames = availableClasses
      .filter(cls => selectedClasses.includes(cls.id))
      .map(cls => cls.name);
    
    updateUserData({ classes: selectedClassNames });
    
    // Simulate loading and then proceed
    setTimeout(() => {
      onClassesSelected();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 dark:from-background dark:via-secondary/10 dark:to-primary/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
            <Users className="w-4 h-4 mr-2" />
            Teacher Setup
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Select Your Classes
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the classes you teach to manage students and create assignments
          </p>
        </div>

        {/* Class Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableClasses.map((classItem, index) => {
            const isSelected = selectedClasses.includes(classItem.id);
            
            return (
              <Card 
                key={classItem.id}
                className={`group hover-lift clickable border-2 transition-all duration-300 animate-bounce-in ${
                  isSelected 
                    ? 'border-secondary shadow-lg scale-105 bg-secondary/5' 
                    : 'border-border hover:border-secondary/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleClassToggle(classItem.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${classItem.color} to-${classItem.color}/80 shadow-md`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    {isSelected && (
                      <div className="p-1 rounded-full bg-secondary text-secondary-foreground">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-foreground">
                    {classItem.name}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {classItem.grade}
                    </Badge>
                    <Badge variant={classItem.color as any} className="text-xs">
                      {classItem.subject}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="w-4 h-4" />
                    <span>{classItem.students} students</span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div>• Create custom quizzes</div>
                    <div>• Track student progress</div>
                    <div>• Manage assignments</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Selected {selectedClasses.length} class{selectedClasses.length !== 1 ? 'es' : ''}
            </p>
            {selectedClasses.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedClasses.map(classId => {
                  const classItem = availableClasses.find(c => c.id === classId);
                  return (
                    <Badge key={classId} variant="secondary" className="text-xs">
                      {classItem?.name}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
          
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleContinue}
            disabled={selectedClasses.length === 0 || isLoading}
            className="min-w-48"
          >
            {isLoading ? 'Setting up...' : `Continue with ${selectedClasses.length} class${selectedClasses.length !== 1 ? 'es' : ''}`}
          </Button>
          
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Request New Class
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            You can add or remove classes later in your teacher dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};