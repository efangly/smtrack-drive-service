import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (req: NextRequest) {
  const token = req.cookies.get('token')
  const currentPath = req.nextUrl.pathname

  if (!token && currentPath !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && currentPath === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/api/drive']
}
