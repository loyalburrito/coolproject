import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'fr' | 'pt' | 'sw' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    'welcome_back': 'Welcome back',
    'ready_to_continue': 'Ready to continue your STEM adventure?',
    'level': 'Level',
    'learning_master': 'Learning Master',
    'day_streak': 'Day Streak',
    'completed': 'Completed',
    'xp_points': 'XP Points',
    'progress_to_next': 'Progress to next level',
    'mathematics': 'Mathematics',
    'science': 'Science',
    'technology': 'Technology',
    'engineering': 'Engineering',
    'continue_learning': 'Continue Learning',
    'complete_other_subjects': 'Complete Other Subjects',
    'recent_activity': 'Recent Activity',
    'settings': 'Settings',
    'language_region': 'Language & Region',
    'select_language': 'Select Language',
    'data_sync': 'Data Sync',
    'sms_sync': 'SMS Sync',
    'offline_ready': 'Offline Ready',
    'stem_focus': 'STEM Focus',
    'gamified_learning': 'Gamified Learning',
    'start_learning': 'Start Learning',
    'teacher_dashboard': 'Teacher Dashboard',
    'learn_stem_play_games': 'Learn STEM, Play Games',
    'interactive_stem_description': 'Interactive STEM learning platform designed for rural schools. Gamified education with offline access, multilingual content, and teacher analytics.',
    'works_offline_online': 'Works Offline & Online',
    'earn_points_unlock': 'Earn points, unlock levels, and compete with friends',
    'download_content_learn': 'Download content and learn without internet',
    'math_science_tech': 'Math, Science, Technology & Engineering'
  },
  es: {
    'welcome_back': 'Bienvenido de vuelta',
    'ready_to_continue': '¿Listo para continuar tu aventura STEM?',
    'level': 'Nivel',
    'learning_master': 'Maestro del Aprendizaje',
    'day_streak': 'Racha de Días',
    'completed': 'Completado',
    'xp_points': 'Puntos XP',
    'progress_to_next': 'Progreso al siguiente nivel',
    'mathematics': 'Matemáticas',
    'science': 'Ciencias',
    'technology': 'Tecnología',
    'engineering': 'Ingeniería',
    'continue_learning': 'Continuar Aprendiendo',
    'complete_other_subjects': 'Completa Otras Materias',
    'recent_activity': 'Actividad Reciente',
    'settings': 'Configuración',
    'language_region': 'Idioma y Región',
    'select_language': 'Seleccionar Idioma',
    'data_sync': 'Sincronización de Datos',
    'sms_sync': 'Sincronización SMS',
    'offline_ready': 'Listo sin Conexión',
    'stem_focus': 'Enfoque STEM',
    'gamified_learning': 'Aprendizaje Gamificado',
    'start_learning': 'Comenzar a Aprender',
    'teacher_dashboard': 'Panel del Profesor',
    'learn_stem_play_games': 'Aprende STEM, Juega',
    'interactive_stem_description': 'Plataforma de aprendizaje STEM interactiva diseñada para escuelas rurales. Educación gamificada con acceso sin conexión, contenido multilingüe y análisis para profesores.',
    'works_offline_online': 'Funciona Sin Conexión y En Línea',
    'earn_points_unlock': 'Gana puntos, desbloquea niveles y compite con amigos',
    'download_content_learn': 'Descarga contenido y aprende sin internet',
    'math_science_tech': 'Matemáticas, Ciencias, Tecnología e Ingeniería'
  },
  fr: {
    'welcome_back': 'Bon retour',
    'ready_to_continue': 'Prêt à continuer votre aventure STEM?',
    'level': 'Niveau',
    'learning_master': 'Maître de l\'Apprentissage',
    'day_streak': 'Série de Jours',
    'completed': 'Terminé',
    'xp_points': 'Points XP',
    'progress_to_next': 'Progrès vers le niveau suivant',
    'mathematics': 'Mathématiques',
    'science': 'Sciences',
    'technology': 'Technologie',
    'engineering': 'Ingénierie',
    'continue_learning': 'Continuer l\'Apprentissage',
    'complete_other_subjects': 'Terminer d\'Autres Matières',
    'recent_activity': 'Activité Récente',
    'settings': 'Paramètres',
    'language_region': 'Langue et Région',
    'select_language': 'Sélectionner la Langue',
    'data_sync': 'Synchronisation des Données',
    'sms_sync': 'Synchronisation SMS',
    'offline_ready': 'Prêt Hors Ligne',
    'stem_focus': 'Focus STEM',
    'gamified_learning': 'Apprentissage Gamifié',
    'start_learning': 'Commencer à Apprendre',
    'teacher_dashboard': 'Tableau de Bord Enseignant',
    'learn_stem_play_games': 'Apprendre STEM, Jouer',
    'interactive_stem_description': 'Plateforme d\'apprentissage STEM interactive conçue pour les écoles rurales. Éducation gamifiée avec accès hors ligne, contenu multilingue et analyses pour enseignants.',
    'works_offline_online': 'Fonctionne Hors Ligne et En Ligne',
    'earn_points_unlock': 'Gagnez des points, débloquez des niveaux et rivalisez avec des amis',
    'download_content_learn': 'Téléchargez du contenu et apprenez sans internet',
    'math_science_tech': 'Mathématiques, Sciences, Technologie et Ingénierie'
  },
  pt: {
    'welcome_back': 'Bem-vindo de volta',
    'ready_to_continue': 'Pronto para continuar sua aventura STEM?',
    'level': 'Nível',
    'learning_master': 'Mestre do Aprendizado',
    'day_streak': 'Sequência de Dias',
    'completed': 'Concluído',
    'xp_points': 'Pontos XP',
    'progress_to_next': 'Progresso para o próximo nível',
    'mathematics': 'Matemática',
    'science': 'Ciências',
    'technology': 'Tecnologia',
    'engineering': 'Engenharia',
    'continue_learning': 'Continuar Aprendendo',
    'complete_other_subjects': 'Complete Outras Matérias',
    'recent_activity': 'Atividade Recente',
    'settings': 'Configurações',
    'language_region': 'Idioma e Região',
    'select_language': 'Selecionar Idioma',
    'data_sync': 'Sincronização de Dados',
    'sms_sync': 'Sincronização SMS',
    'offline_ready': 'Pronto Offline',
    'stem_focus': 'Foco STEM',
    'gamified_learning': 'Aprendizado Gamificado',
    'start_learning': 'Começar a Aprender',
    'teacher_dashboard': 'Painel do Professor',
    'learn_stem_play_games': 'Aprenda STEM, Jogue',
    'interactive_stem_description': 'Plataforma de aprendizado STEM interativa projetada para escolas rurais. Educação gamificada com acesso offline, conteúdo multilíngue e análises para professores.',
    'works_offline_online': 'Funciona Offline e Online',
    'earn_points_unlock': 'Ganhe pontos, desbloqueie níveis e compita com amigos',
    'download_content_learn': 'Baixe conteúdo e aprenda sem internet',
    'math_science_tech': 'Matemática, Ciências, Tecnologia e Engenharia'
  },
  sw: {
    'welcome_back': 'Karibu tena',
    'ready_to_continue': 'Uko tayari kuendelea na safari yako ya STEM?',
    'level': 'Kiwango',
    'learning_master': 'Bwana wa Kujifunza',
    'day_streak': 'Mfululizo wa Siku',
    'completed': 'Imekamilika',
    'xp_points': 'Alama za XP',
    'progress_to_next': 'Maendeleo hadi kiwango kijacho',
    'mathematics': 'Hisabati',
    'science': 'Sayansi',
    'technology': 'Teknolojia',
    'engineering': 'Uhandisi',
    'continue_learning': 'Endelea Kujifunza',
    'complete_other_subjects': 'Maliza Masomo Mengine',
    'recent_activity': 'Shughuli za Hivi Karibuni',
    'settings': 'Mipangilio',
    'language_region': 'Lugha na Mkoa',
    'select_language': 'Chagua Lugha',
    'data_sync': 'Usawazishaji wa Data',
    'sms_sync': 'Usawazishaji wa SMS',
    'offline_ready': 'Tayari Bila Mtandao',
    'stem_focus': 'Lengo la STEM',
    'gamified_learning': 'Kujifunza kwa Mchezo',
    'start_learning': 'Anza Kujifunza',
    'teacher_dashboard': 'Dashibodi ya Mwalimu',
    'learn_stem_play_games': 'Jifunze STEM, Cheza',
    'interactive_stem_description': 'Jukwaa la kujifunza STEM la maingiliano lililotengenezwa kwa shule za vijijini. Elimu ya mchezo na ufikiaji bila mtandao, maudhui ya lugha nyingi na uchambuzi kwa walimu.',
    'works_offline_online': 'Inafanya Kazi Bila Mtandao na Kwenye Mtandao',
    'earn_points_unlock': 'Pata alama, fungua viwango na shindana na marafiki',
    'download_content_learn': 'Pakua maudhui na ujifunze bila mtandao',
    'math_science_tech': 'Hisabati, Sayansi, Teknolojia na Uhandisi'
  },
  hi: {
    'welcome_back': 'वापसी पर स्वागत',
    'ready_to_continue': 'अपनी STEM यात्रा जारी रखने के लिए तैयार हैं?',
    'level': 'स्तर',
    'learning_master': 'सीखने का मास्टर',
    'day_streak': 'दिन की लकीर',
    'completed': 'पूर्ण',
    'xp_points': 'XP अंक',
    'progress_to_next': 'अगले स्तर तक प्रगति',
    'mathematics': 'गणित',
    'science': 'विज्ञान',
    'technology': 'प्रौद्योगिकी',
    'engineering': 'इंजीनियरिंग',
    'continue_learning': 'सीखना जारी रखें',
    'complete_other_subjects': 'अन्य विषय पूरे करें',
    'recent_activity': 'हाल की गतिविधि',
    'settings': 'सेटिंग्स',
    'language_region': 'भाषा और क्षेत्र',
    'select_language': 'भाषा चुनें',
    'data_sync': 'डेटा सिंक',
    'sms_sync': 'SMS सिंक',
    'offline_ready': 'ऑफलाइन तैयार',
    'stem_focus': 'STEM फोकस',
    'gamified_learning': 'गेमिफाइड लर्निंग',
    'start_learning': 'सीखना शुरू करें',
    'teacher_dashboard': 'शिक्षक डैशबोर्ड',
    'learn_stem_play_games': 'STEM सीखें, खेल खेलें',
    'interactive_stem_description': 'ग्रामीण स्कूलों के लिए डिज़ाइन किया गया इंटरैक्टिव STEM लर्निंग प्लेटफॉर्म। ऑफलाइन एक्सेस, बहुभाषी सामग्री और शिक्षक विश्लेषण के साथ गेमिफाइड शिक्षा।',
    'works_offline_online': 'ऑफलाइन और ऑनलाइन काम करता है',
    'earn_points_unlock': 'अंक अर्जित करें, स्तर अनलॉक करें और दोस्तों के साथ प्रतिस्पर्धा करें',
    'download_content_learn': 'सामग्री डाउनलोड करें और बिना इंटरनेट के सीखें',
    'math_science_tech': 'गणित, विज्ञान, प्रौद्योगिकी और इंजीनियरिंग'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};