import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ProfilesRepository } from '@/lib/repositories/profiles.repository'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      let redirectToPage = next || '/home'
      
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // 1. Ensure a record exists in the public.users table (extends auth.users)
          const { data: dbUser, error: dbUserError } = await (supabase as any)
            .from('users')
            .select('id')
            .eq('id', user.id)
            .single()

          if (!dbUser) {
            const { error: insertUserError } = await (supabase as any)
              .from('users')
              .insert({
                id: user.id,
                email: user.email!,
                role: 'tenant', // Default role
              })
            
            if (insertUserError) {
              console.error('Failed to auto-create public user record in callback:', insertUserError)
            }
          }

          // 2. Ensure a profile exists in public.profiles table
          const profilesRepo = new ProfilesRepository()
          const existingProfile = await profilesRepo.findByUserId(user.id)
          
          if (!existingProfile) {
            // First time login - auto-create profile from OAuth metadata
            await profilesRepo.create({
              user_id: user.id,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'New User',
              avatar_url: user.user_metadata?.avatar_url || null,
              city: 'Bengaluru', // Default city
              locality: null,
            })
            
            // Redirect first-time OAuth users to onboarding
            if (!next) {
              redirectToPage = '/onboarding'
            }
          }
        }
      } catch (profileErr) {
        // Log error but do not interrupt authentication flow
        console.error('Error during post-auth sync/profile creation:', profileErr)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectToPage}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectToPage}`)
      } else {
        return NextResponse.redirect(`${origin}${redirectToPage}`)
      }
    } else {
      console.error('Auth callback exchange code for session error:', error)
    }
  }

  // Redirect to login error page if something goes wrong
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
