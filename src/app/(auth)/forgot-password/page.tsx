"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { GlassCard } from "@/components/ui/GlassCard"
import { GlowButton } from "@/components/ui/GlowButton"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/components/ui/ToastProvider"
import { Mail, Hexagon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/login`,
    })

    if (error) {
      toast(error.message, "error")
    } else {
      toast("Check your email for the password reset link.", "success")
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
          Reset Password
        </h1>
        <p className="text-base-content/60 text-sm">
          Enter your email to receive a reset link
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          required
        />
        
        <GlowButton type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Sending..." : "Send Reset Link"}
        </GlowButton>
      </form>

      <div className="mt-8 flex items-center justify-center w-full">
        <Link href="/login" className="flex items-center gap-2 text-sm text-base-content/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </div>
    </GlassCard>
  )
}
