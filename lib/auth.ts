import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface JWTPayload {
  adminId: string
  email: string
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (adminId: string, email: string): string => {
  return jwt.sign({ adminId, email }, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export const authenticateAdmin = async (
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValid = await verifyPassword(password, admin.password)

    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    const token = generateToken(admin.id, admin.email)

    return { success: true, token }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, error: 'Authentication failed' }
  }
}
