import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  Star,
  ArrowRight 
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
  subject: string;
}

export const QuizComponent = ({ questions, onComplete, subject }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowExplanation(true);
    setIsTimerActive(false);
    toast.warning("Time's up!", {
      description: "Moving to explanation..."
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setIsTimerActive(false);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      toast.success("Correct!", {
        description: "Great job! +10 XP"
      });
    } else {
      toast.error("Incorrect", {
        description: "Don't worry, keep learning!"
      });
    }
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
      toast.success("Quiz Complete!", {
        description: `Final Score: ${finalScore}/${questions.length}`
      });
      onComplete(finalScore, questions.length);
    }
  };

  const getAnswerButtonVariant = (index: number) => {
    if (!isAnswered) return "outline";
    if (index === question.correctAnswer) return "success";
    if (index === selectedAnswer && index !== question.correctAnswer) return "destructive";
    return "outline";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Quiz header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="px-3 py-1 bg-card dark:bg-card">
              <Star className="w-4 h-4 mr-2 text-energy" />
              {subject} Quiz
            </Badge>
            
            <div className="flex items-center gap-4">
              <Badge variant={timeLeft <= 10 ? "destructive" : "outline"} className="px-3 py-1">
                <Clock className="w-4 h-4 mr-2" />
                {timeLeft}s
              </Badge>
              
              <Badge variant="outline" className="px-3 py-1">
                Question {currentQuestion + 1}/{questions.length}
              </Badge>
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question card */}
        <Card className="mb-6 shadow-lg bg-card dark:bg-card border border-border dark:border-border">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl leading-relaxed text-foreground">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={getAnswerButtonVariant(index)}
                  className="p-4 h-auto text-left justify-start whitespace-normal"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                >
                  <span className="font-semibold mr-3 text-lg">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1">{option}</span>
                  {isAnswered && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 ml-2 text-success-foreground" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 ml-2 text-destructive-foreground" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Explanation card */}
        {showExplanation && (
          <Card className="mb-6 animate-slide-up border-primary/20 bg-card dark:bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedAnswer === question.correctAnswer ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive" />
                )}
                <span className="text-foreground">
                  {selectedAnswer === question.correctAnswer ? "Correct!" : "Not quite right"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {question.explanation}
              </p>
              
              <Button 
                variant="hero" 
                onClick={handleNextQuestion}
                className="w-full md:w-auto"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Complete Quiz
                    <Trophy className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current score */}
        <Card className="bg-card dark:bg-card border border-border dark:border-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Score:</span>
              <Badge variant={getScoreColor()} className="px-3 py-1">
                <Trophy className="w-4 h-4 mr-2" />
                {score}/{questions.length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};