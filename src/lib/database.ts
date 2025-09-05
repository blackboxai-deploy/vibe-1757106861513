import Database from 'better-sqlite3'
import { join } from 'path'
import { hash } from 'bcryptjs'

const db = new Database(join(process.cwd(), 'personal_trainer.db'))

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    subscription_plan TEXT DEFAULT 'basic',
    subscription_status TEXT DEFAULT 'active',
    trial_ends_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_pt TEXT NOT NULL,
    description TEXT NOT NULL,
    description_pt TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    duration INTEGER NOT NULL,
    instructions TEXT NOT NULL,
    instructions_pt TEXT NOT NULL,
    form_tips TEXT NOT NULL,
    form_tips_pt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    progress_status TEXT DEFAULT 'not_started',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (exercise_id) REFERENCES exercises (id),
    UNIQUE(user_id, exercise_id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL,
    stripe_payment_id TEXT,
    subscription_period_start DATETIME,
    subscription_period_end DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`)

// Sample exercises data
const sampleExercises = [
  {
    title: 'Push-ups',
    title_pt: 'Flexões',
    description: 'Classic upper body strengthening exercise targeting chest, shoulders, and triceps',
    description_pt: 'Exercício clássico de fortalecimento da parte superior do corpo, trabalhando peito, ombros e tríceps',
    video_url: 'https://placehold.co/800x600?text=Push-up+Exercise+Video+Demonstration',
    thumbnail_url: 'https://placehold.co/400x300?text=Push-up+Thumbnail',
    category: 'strength',
    difficulty: 'beginner',
    duration: 300,
    instructions: 'Start in plank position, lower your body until chest nearly touches floor, push back up',
    instructions_pt: 'Comece na posição de prancha, abaixe o corpo até o peito quase tocar o chão, empurre de volta',
    form_tips: 'Keep your body straight, engage your core, full range of motion',
    form_tips_pt: 'Mantenha o corpo reto, contraia o abdômen, amplitude completa de movimento'
  },
  {
    title: 'Squats',
    title_pt: 'Agachamentos',
    description: 'Lower body exercise targeting quadriceps, glutes, and hamstrings',
    description_pt: 'Exercício para membros inferiores trabalhando quadríceps, glúteos e isquiotibiais',
    video_url: 'https://placehold.co/800x600?text=Squat+Exercise+Video+Demonstration',
    thumbnail_url: 'https://placehold.co/400x300?text=Squat+Thumbnail',
    category: 'strength',
    difficulty: 'beginner',
    duration: 240,
    instructions: 'Stand with feet shoulder-width apart, lower body as if sitting back into chair, return to start',
    instructions_pt: 'Fique em pé com os pés na largura dos ombros, abaixe o corpo como se fosse sentar numa cadeira, retorne ao início',
    form_tips: 'Keep knees behind toes, chest up, weight in heels',
    form_tips_pt: 'Mantenha os joelhos atrás dos dedos dos pés, peito para cima, peso nos calcanhares'
  },
  {
    title: 'Plank',
    title_pt: 'Prancha',
    description: 'Core strengthening isometric exercise for stability and endurance',
    description_pt: 'Exercício isométrico de fortalecimento do core para estabilidade e resistência',
    video_url: 'https://placehold.co/800x600?text=Plank+Exercise+Video+Demonstration',
    thumbnail_url: 'https://placehold.co/400x300?text=Plank+Thumbnail',
    category: 'strength',
    difficulty: 'intermediate',
    duration: 180,
    instructions: 'Hold body straight from head to heels, supported on forearms and toes',
    instructions_pt: 'Mantenha o corpo reto da cabeça aos calcanhares, apoiado nos antebraços e dedos dos pés',
    form_tips: 'Keep hips level, breathe normally, engage core muscles',
    form_tips_pt: 'Mantenha os quadris nivelados, respire normalmente, contraia os músculos do core'
  },
  {
    title: 'Jumping Jacks',
    title_pt: 'Polichinelos',
    description: 'Full-body cardio exercise to increase heart rate and coordination',
    description_pt: 'Exercício cardiovascular de corpo inteiro para aumentar a frequência cardíaca e coordenação',
    video_url: 'https://placehold.co/800x600?text=Jumping+Jacks+Exercise+Video+Demonstration',
    thumbnail_url: 'https://placehold.co/400x300?text=Jumping+Jacks+Thumbnail',
    category: 'cardio',
    difficulty: 'beginner',
    duration: 300,
    instructions: 'Jump feet apart while raising arms overhead, then jump back to starting position',
    instructions_pt: 'Pule separando os pés enquanto levanta os braços acima da cabeça, depois pule de volta à posição inicial',
    form_tips: 'Land softly, maintain rhythm, keep movements controlled',
    form_tips_pt: 'Aterrisse suavemente, mantenha o ritmo, mantenha os movimentos controlados'
  }
]

// Insert sample data
const insertExercise = db.prepare(`
  INSERT OR IGNORE INTO exercises (title, title_pt, description, description_pt, video_url, thumbnail_url, category, difficulty, duration, instructions, instructions_pt, form_tips, form_tips_pt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const exercise of sampleExercises) {
  insertExercise.run(
    exercise.title,
    exercise.title_pt,
    exercise.description,
    exercise.description_pt,
    exercise.video_url,
    exercise.thumbnail_url,
    exercise.category,
    exercise.difficulty,
    exercise.duration,
    exercise.instructions,
    exercise.instructions_pt,
    exercise.form_tips,
    exercise.form_tips_pt
  )
}

// Create a demo user
const createDemoUser = async () => {
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('demo@example.com')
  
  if (!existingUser) {
    const hashedPassword = await hash('demo123', 12)
    const insertUser = db.prepare(`
      INSERT INTO users (email, password_hash, name, subscription_plan, subscription_status)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    const result = insertUser.run('demo@example.com', hashedPassword, 'Demo User', 'premium', 'active')
    const userId = result.lastInsertRowid
    
    // Assign all exercises to demo user
    const assignExercise = db.prepare(`
      INSERT OR IGNORE INTO user_exercises (user_id, exercise_id)
      VALUES (?, ?)
    `)
    
    const exercises = db.prepare('SELECT id FROM exercises').all()
    for (const exercise of exercises) {
      assignExercise.run(userId, exercise.id)
    }
  }
}

createDemoUser()

export { db }