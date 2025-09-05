import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'basic' | 'premium' | 'pro';
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  assignedExercises: string[];
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  exp: number;
}

// Mock user database (in production, this would be a real database)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    subscriptionType: 'premium',
    subscriptionStatus: 'active',
    assignedExercises: ['1', '2', '3', '4', '5'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'test@test.com',
    name: 'Test User',
    subscriptionType: 'basic',
    subscriptionStatus: 'trial',
    assignedExercises: ['1', '2'],
    createdAt: new Date('2024-02-01')
  }
];

// Mock password storage (hashed passwords)
const mockPasswords: Record<string, string> = {
  'student@example.com': '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  'test@test.com': '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function generateToken(user: User): Promise<string> {
  return await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = mockUsers.find(u => u.email === email);
  if (!user) return null;

  const hashedPassword = mockPasswords[email];
  if (!hashedPassword) return null;

  const isValid = await verifyPassword(password, hashedPassword);
  return isValid ? user : null;
}

export async function getUserById(id: string): Promise<User | null> {
  return mockUsers.find(u => u.id === id) || null;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    return await getUserById(payload.userId);
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

export async function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
}