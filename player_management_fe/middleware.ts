import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './app/login/auth/lib';

export async function middleware(request: NextRequest) {
    // Allow requests for static files to pass through
    if (request.nextUrl.pathname.startsWith('/_next/') || request.nextUrl.pathname.startsWith('/static/')) {
        return NextResponse.next();
    }

    // Check for session cookie
    if (!request.cookies.has('session') && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Update session if the session cookie exists
    return await updateSession(request);
}