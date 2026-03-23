"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { GlassCard } from "@/components/ui/GlassCard"
import { GlowButton } from "@/components/ui/GlowButton"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/components/ui/ToastProvider"
import { Mail, Lock, Hexagon } from "lucide-react"
import Link from "next/link"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/')
      }
    }
    checkUser()

    if (searchParams.get("verified") === "true") {
      toast("Email confirmed! Your account has been verified.", "success")
    }
    if (searchParams.get("error") === "auth-link-failed") {
      toast("Authentication link failed or expired.", "error")
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, searchParams, supabase, toast])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast(error.message, "error")
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <GlassCard className="flex flex-col items-center">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent-pink p-0.5 mb-6 shadow-[0_0_30px_rgba(124,58,237,0.5)]">
          <div className="w-full h-full bg-base-100 rounded-2xl flex items-center justify-center backdrop-blur-xl">
            <Hexagon className="w-8 h-8 text-primary-content" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent-pink to-accent-warm text-transparent bg-clip-text mb-2">
          Micro-Apps Portal
        </h1>
        <p className="text-base-content/60 text-sm">
          Your micro-apps portal
        </p>
      </div>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        <div className="flex justify-end w-full mb-2">
          <Link href="/forgot-password" className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
            Forgot your password?
          </Link>
        </div>

        <GlowButton type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </GlowButton>
      </form>

      <div className="mt-8 text-sm text-base-content/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
          Sign up
        </Link>
      </div>
    </GlassCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white/50 animate-pulse text-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
