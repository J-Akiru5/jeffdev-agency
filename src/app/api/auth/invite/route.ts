import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth Invite API Route
 * ---------------------
 * Handles the invite authentication flow.
 * For production, this would integrate with Firebase Auth email link flow.
 */

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }
  
  // For now, redirect to login with the token in state
  // The login page will handle the OAuth flow and complete the invite
  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('invite', token);
  
  return NextResponse.redirect(loginUrl);
}
