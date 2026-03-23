"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { GlassCard } from "@/components/ui/GlassCard"
import { GlowButton } from "@/components/ui/GlowButton"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/components/ui/ToastProvider"
import { Mail, Lock, User, Hexagon } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/login%3Fverified=true`,
      }
    })

    if (error) {
      toast(error.message, "error")
    } else {
      toast("Check your email for the confirmation link.", "success")
      router.push('/login')
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
          Create Account
        </h1>
        <p className="text-base-content/60 text-sm">
          Join the Micro-Apps Portal
        </p>
      </div>

      <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={<User className="w-5 h-5" />}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            icon={<User className="w-5 h-5" />}
            required
          />
        </div>
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
        
        <GlowButton type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Creating..." : "Sign Up"}
        </GlowButton>
      </form>

      <div className="mt-8 text-sm text-base-content/60">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
          Sign In
        </Link>
      </div>
    </GlassCard>
  )
}
