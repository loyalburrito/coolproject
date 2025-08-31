import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Trophy, Users, Wifi, WifiOff } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onTeacherDashboard?: () => void;
}

export const Hero = ({ onGetStarted, onTeacherDashboard }: HeroProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center text-white relative z-10">
        <div className="animate-slide-up">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Wifi className="w-4 h-4 mr-2" />
            {t('works_offline_online')}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('learn_stem_play_games').split(',')[0]},
            <br />
            <span className="text-energy">{t('learn_stem_play_games').split(',')[1]}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('interactive_stem_description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="energy" 
              size="xl" 
              onClick={onGetStarted}
              className="animate-bounce-in"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              {t('start_learning')}
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={onTeacherDashboard}
            >
              <Users className="w-6 h-6 mr-2" />
              {t('teacher_dashboard')}
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Trophy className="w-12 h-12 text-energy mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{t('gamified_learning')}</h3>
              <p className="text-white/80">{t('earn_points_unlock')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <WifiOff className="w-12 h-12 text-success mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{t('offline_ready')}</h3>
              <p className="text-white/80">{t('download_content_learn')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <BookOpen className="w-12 h-12 text-warning mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{t('stem_focus')}</h3>
              <p className="text-white/80">{t('math_science_tech')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};