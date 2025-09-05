export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'endurance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  videoUrl: string;
  thumbnailUrl: string;
  instructions: {
    en: string[];
    pt: string[];
  };
  correctForm: {
    en: string[];
    pt: string[];
  };
  commonMistakes: {
    en: string[];
    pt: string[];
  };
  tips: {
    en: string[];
    pt: string[];
  };
  equipment: string[];
  targetMuscles: string[];
  createdAt: Date;
}

export interface ExerciseProgress {
  userId: string;
  exerciseId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: Date;
  watchTime: number; // in seconds
  lastWatchedAt?: Date;
}

// Mock exercise database
export const mockExercises: Exercise[] = [
  {
    id: '1',
    title: 'Push-ups',
    description: 'Classic upper body strength exercise targeting chest, shoulders, and triceps',
    category: 'strength',
    difficulty: 'beginner',
    duration: 10,
    videoUrl: 'https://placehold.co/1920x1080?text=Push-up+Exercise+Video+Tutorial+with+Proper+Form+Demonstration',
    thumbnailUrl: 'https://placehold.co/400x300?text=Push-up+Exercise+Thumbnail',
    instructions: {
      en: [
        'Start in a plank position with hands slightly wider than shoulders',
        'Keep your body in a straight line from head to heels',
        'Lower your chest until it nearly touches the floor',
        'Push back up to the starting position',
        'Repeat for desired number of repetitions'
      ],
      pt: [
        'Comece em posição de prancha com as mãos um pouco mais largas que os ombros',
        'Mantenha seu corpo em linha reta da cabeça aos calcanhares',
        'Abaixe o peito até quase tocar o chão',
        'Empurre de volta à posição inicial',
        'Repita pelo número desejado de repetições'
      ]
    },
    correctForm: {
      en: [
        'Maintain straight body line throughout the movement',
        'Keep core engaged to prevent sagging hips',
        'Control the descent - don\'t drop down quickly',
        'Full range of motion - chest should nearly touch floor'
      ],
      pt: [
        'Mantenha a linha reta do corpo durante todo o movimento',
        'Mantenha o core ativo para evitar que os quadris caiam',
        'Controle a descida - não desça rapidamente',
        'Amplitude completa de movimento - peito deve quase tocar o chão'
      ]
    },
    commonMistakes: {
      en: [
        'Sagging hips or arching back',
        'Not going through full range of motion',
        'Hands placed too wide or too narrow',
        'Rushing through repetitions'
      ],
      pt: [
        'Quadris caídos ou costas arqueadas',
        'Não fazer amplitude completa de movimento',
        'Mãos muito abertas ou muito fechadas',
        'Pressa nas repetições'
      ]
    },
    tips: {
      en: [
        'Start with knee push-ups if regular push-ups are too difficult',
        'Focus on quality over quantity',
        'Breathe out as you push up, breathe in as you lower',
        'Keep your head in neutral position'
      ],
      pt: [
        'Comece com flexões no joelho se as flexões normais forem muito difíceis',
        'Foque na qualidade ao invés da quantidade',
        'Expire ao empurrar para cima, inspire ao descer',
        'Mantenha a cabeça em posição neutra'
      ]
    },
    equipment: ['None'],
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Squats',
    description: 'Fundamental lower body exercise for building leg and glute strength',
    category: 'strength',
    difficulty: 'beginner',
    duration: 8,
    videoUrl: 'https://placehold.co/1920x1080?text=Squat+Exercise+Video+Tutorial+with+Perfect+Form+Guide',
    thumbnailUrl: 'https://placehold.co/400x300?text=Squat+Exercise+Thumbnail',
    instructions: {
      en: [
        'Stand with feet shoulder-width apart',
        'Keep chest up and core engaged',
        'Lower down as if sitting back into a chair',
        'Go down until thighs are parallel to floor',
        'Drive through heels to return to standing'
      ],
      pt: [
        'Fique em pé com os pés na largura dos ombros',
        'Mantenha o peito erguido e o core ativo',
        'Desça como se fosse sentar em uma cadeira',
        'Desça até as coxas ficarem paralelas ao chão',
        'Empurre pelos calcanhares para voltar em pé'
      ]
    },
    correctForm: {
      en: [
        'Knees track over toes, don\'t cave inward',
        'Weight should be on heels, not toes',
        'Keep chest proud and spine neutral',
        'Hip hinge movement, not just knee bend'
      ],
      pt: [
        'Joelhos seguem a direção dos dedos, não caem para dentro',
        'O peso deve estar nos calcanhares, não nos dedos',
        'Mantenha o peito orgulhoso e coluna neutra',
        'Movimento de articulação do quadril, não só dobrar joelho'
      ]
    },
    commonMistakes: {
      en: [
        'Knees caving inward (valgus collapse)',
        'Not going deep enough',
        'Rounding the back',
        'Weight shifting to toes'
      ],
      pt: [
        'Joelhos caindo para dentro (colapso valgo)',
        'Não descer o suficiente',
        'Arredondar as costas',
        'Peso mudando para os dedos dos pés'
      ]
    },
    tips: {
      en: [
        'Practice with a chair behind you initially',
        'Focus on sitting back, not down',
        'Keep feet flat on the ground',
        'Engage glutes at the top of movement'
      ],
      pt: [
        'Pratique com uma cadeira atrás inicialmente',
        'Foque em sentar para trás, não para baixo',
        'Mantenha os pés totalmente no chão',
        'Ative os glúteos no topo do movimento'
      ]
    },
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    title: 'Jumping Jacks',
    description: 'High-energy cardio exercise for full-body conditioning and heart rate elevation',
    category: 'cardio',
    difficulty: 'beginner',
    duration: 5,
    videoUrl: 'https://placehold.co/1920x1080?text=Jumping+Jacks+Cardio+Exercise+High+Energy+Workout+Tutorial',
    thumbnailUrl: 'https://placehold.co/400x300?text=Jumping+Jacks+Cardio+Thumbnail',
    instructions: {
      en: [
        'Start standing with feet together, arms at sides',
        'Jump while spreading legs shoulder-width apart',
        'Simultaneously raise arms overhead',
        'Jump back to starting position',
        'Maintain steady rhythm throughout'
      ],
      pt: [
        'Comece em pé com pés juntos, braços ao lado',
        'Pule abrindo as pernas na largura dos ombros',
        'Simultaneamente levante os braços acima da cabeça',
        'Pule de volta à posição inicial',
        'Mantenha ritmo constante durante todo exercício'
      ]
    },
    correctForm: {
      en: [
        'Land softly on balls of feet',
        'Keep slight bend in knees when landing',
        'Maintain upright posture throughout',
        'Coordinate arm and leg movements'
      ],
      pt: [
        'Aterrisse suavemente na ponta dos pés',
        'Mantenha leve flexão nos joelhos ao aterrissar',
        'Mantenha postura ereta durante todo movimento',
        'Coordene movimentos de braços e pernas'
      ]
    },
    commonMistakes: {
      en: [
        'Landing too hard on heels',
        'Not fully extending arms overhead',
        'Irregular rhythm or tempo',
        'Letting knees cave inward'
      ],
      pt: [
        'Aterrissar muito forte nos calcanhares',
        'Não estender completamente os braços acima',
        'Ritmo ou tempo irregular',
        'Deixar os joelhos caírem para dentro'
      ]
    },
    tips: {
      en: [
        'Start slow and build up speed gradually',
        'Focus on smooth, controlled movements',
        'Use this as a warm-up exercise',
        'Modify by stepping instead of jumping if needed'
      ],
      pt: [
        'Comece devagar e aumente a velocidade gradualmente',
        'Foque em movimentos suaves e controlados',
        'Use como exercício de aquecimento',
        'Modifique pisando ao invés de pular se necessário'
      ]
    },
    equipment: ['None'],
    targetMuscles: ['Full Body', 'Cardiovascular System'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    title: 'Plank',
    description: 'Isometric core strengthening exercise for building stability and endurance',
    category: 'strength',
    difficulty: 'intermediate',
    duration: 12,
    videoUrl: 'https://placehold.co/1920x1080?text=Plank+Exercise+Core+Strength+Isometric+Hold+Tutorial',
    thumbnailUrl: 'https://placehold.co/400x300?text=Plank+Exercise+Core+Thumbnail',
    instructions: {
      en: [
        'Start in push-up position on forearms',
        'Keep body in straight line from head to heels',
        'Engage core muscles throughout hold',
        'Maintain neutral neck position',
        'Hold for prescribed duration'
      ],
      pt: [
        'Comece em posição de flexão nos antebraços',
        'Mantenha o corpo em linha reta da cabeça aos calcanhares',
        'Mantenha músculos do core ativos durante toda sustentação',
        'Mantenha posição neutra do pescoço',
        'Sustente pela duração prescrita'
      ]
    },
    correctForm: {
      en: [
        'No sagging hips or raised buttocks',
        'Forearms parallel to each other',
        'Breathe normally throughout hold',
        'Squeeze glutes and engage abs'
      ],
      pt: [
        'Sem quadris caídos ou glúteos levantados',
        'Antebraços paralelos um ao outro',
        'Respire normalmente durante a sustentação',
        'Aperte os glúteos e ative o abdômen'
      ]
    },
    commonMistakes: {
      en: [
        'Hips sagging toward floor',
        'Lifting hips too high',
        'Holding breath during exercise',
        'Placing too much weight on arms'
      ],
      pt: [
        'Quadris caindo em direção ao chão',
        'Levantar quadris muito alto',
        'Prender a respiração durante exercício',
        'Colocar muito peso nos braços'
      ]
    },
    tips: {
      en: [
        'Start with shorter holds and build up time',
        'Use a mirror to check alignment',
        'Focus on quality over duration',
        'Modify on knees if needed'
      ],
      pt: [
        'Comece com sustentações mais curtas e aumente o tempo',
        'Use um espelho para verificar alinhamento',
        'Foque na qualidade ao invés da duração',
        'Modifique nos joelhos se necessário'
      ]
    },
    equipment: ['None'],
    targetMuscles: ['Core', 'Shoulders', 'Back', 'Glutes'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '5',
    title: 'Cat-Cow Stretch',
    description: 'Dynamic spinal mobility exercise for improving flexibility and relieving back tension',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 6,
    videoUrl: 'https://placehold.co/1920x1080?text=Cat+Cow+Stretch+Spinal+Mobility+Yoga+Flow+Tutorial',
    thumbnailUrl: 'https://placehold.co/400x300?text=Cat+Cow+Stretch+Flexibility+Thumbnail',
    instructions: {
      en: [
        'Start on hands and knees in tabletop position',
        'For cow: arch back, lift chest and tailbone up',
        'For cat: round spine, tuck chin to chest',
        'Flow smoothly between the two positions',
        'Coordinate movement with breathing'
      ],
      pt: [
        'Comece de quatro em posição de mesa',
        'Para vaca: arqueie as costas, levante peito e cóccix',
        'Para gato: arredonde a coluna, leve queixo ao peito',
        'Flua suavemente entre as duas posições',
        'Coordene movimento com a respiração'
      ]
    },
    correctForm: {
      en: [
        'Move through full range of spinal motion',
        'Keep movements slow and controlled',
        'Breathe in during cow, out during cat',
        'Engage core throughout movement'
      ],
      pt: [
        'Mova através da amplitude completa da coluna',
        'Mantenha movimentos lentos e controlados',
        'Inspire durante vaca, expire durante gato',
        'Mantenha core ativo durante movimento'
      ]
    },
    commonMistakes: {
      en: [
        'Moving too quickly between positions',
        'Not using full range of motion',
        'Forgetting to coordinate with breathing',
        'Placing too much weight on wrists'
      ],
      pt: [
        'Mover muito rapidamente entre posições',
        'Não usar amplitude completa de movimento',
        'Esquecer de coordenar com respiração',
        'Colocar muito peso nos punhos'
      ]
    },
    tips: {
      en: [
        'Focus on articulating each vertebra',
        'Use as a warm-up before other exercises',
        'Great for morning mobility routine',
        'Can be done during work breaks'
      ],
      pt: [
        'Foque em articular cada vértebra',
        'Use como aquecimento antes de outros exercícios',
        'Ótimo para rotina de mobilidade matinal',
        'Pode ser feito durante pausas no trabalho'
      ]
    },
    equipment: ['None'],
    targetMuscles: ['Spine', 'Core', 'Hip Flexors'],
    createdAt: new Date('2024-01-01')
  }
];

// Mock exercise progress database
export const mockExerciseProgress: ExerciseProgress[] = [
  {
    userId: '1',
    exerciseId: '1',
    status: 'completed',
    completedAt: new Date('2024-03-01'),
    watchTime: 600,
    lastWatchedAt: new Date('2024-03-01')
  },
  {
    userId: '1',
    exerciseId: '2',
    status: 'in_progress',
    watchTime: 240,
    lastWatchedAt: new Date('2024-03-02')
  },
  {
    userId: '1',
    exerciseId: '3',
    status: 'completed',
    completedAt: new Date('2024-03-02'),
    watchTime: 300,
    lastWatchedAt: new Date('2024-03-02')
  }
];

export function getExercisesByUser(userId: string, assignedExerciseIds: string[]): Exercise[] {
  return mockExercises.filter(exercise => assignedExerciseIds.includes(exercise.id));
}

export function getExerciseById(id: string): Exercise | null {
  return mockExercises.find(exercise => exercise.id === id) || null;
}

export function getExerciseProgress(userId: string, exerciseId: string): ExerciseProgress | null {
  return mockExerciseProgress.find(
    progress => progress.userId === userId && progress.exerciseId === exerciseId
  ) || null;
}

export function getUserExercisesWithProgress(userId: string, assignedExerciseIds: string[]) {
  const exercises = getExercisesByUser(userId, assignedExerciseIds);
  return exercises.map(exercise => {
    const progress = getExerciseProgress(userId, exercise.id);
    return {
      ...exercise,
      progress: progress || {
        userId,
        exerciseId: exercise.id,
        status: 'not_started' as const,
        watchTime: 0
      }
    };
  });
}