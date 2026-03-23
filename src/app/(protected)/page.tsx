import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { GlassCard } from '@/components/ui/GlassCard'
import { SignOutButton } from '@/components/ui/SignOutButton'
import { Hexagon } from 'lucide-react'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile from public.users
  const { data: profile } = await supabase
    .from('users')
    .select('first_name, last_name, role')
    .eq('id', user.id)
    .single()

  const firstName = profile?.first_name || user.user_metadata?.first_name || 'User'

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Decorative centerpiece */}
      <div className="relative mb-12 flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent-pink to-accent-warm opacity-30 blur-2xl rounded-full scale-150 animate-pulse duration-3000" />
        <div className="relative w-32 h-32 rounded-3xl bg-base-200/50 backdrop-blur-md border border-white/10 flex items-center justify-center p-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent-pink opacity-20" />
          <Hexagon className="w-16 h-16 text-primary-content relative z-10 animate-pulse" />
        </div>
      </div>

      <GlassCard className="w-full text-center flex flex-col items-center animate-in slide-in-from-bottom-5 duration-1000">
        <div className="mb-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-accent-pink/50 bg-accent-pink/10 text-accent-pink text-xs font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          Coming Soon
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary via-accent-pink to-accent-warm text-transparent bg-clip-text mb-6">
          Welcome to the Micro-Apps Portal!
        </h1>
        
        <p className="text-xl text-base-content/80 mb-8 max-w-lg">
          We are preparing something amazing for you.
        </p>

        <p className="text-2xl font-light text-white mb-10">
          Hello, <span className="font-medium text-white">{firstName}</span> 👋
        </p>

        <SignOutButton />

        <div className="mt-8 pt-8 border-t border-white/10 w-full text-sm text-base-content/50">
          We will notify you when everything is ready.
        </div>
      </GlassCard>
    </div>
  )
}
