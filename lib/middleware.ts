import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export const withAuth = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get('authorization')?.replace('Bearer ', '')

      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        )
      }

      const payload = verifyToken(token)

      if (!payload) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        )
      }

      // Add admin info to request headers for use in handlers
      req.headers.set('x-admin-id', payload.adminId)
      req.headers.set('x-admin-email', payload.email)

      return handler(req)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }
}
