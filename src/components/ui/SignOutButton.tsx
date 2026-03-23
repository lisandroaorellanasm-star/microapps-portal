"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { GlowButton } from "./GlowButton"

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    
    // Explicitly refresh the router and push to login
    router.push('/login')
    router.refresh()
  }

  return (
    <GlowButton 
      variant="ghost" 
      onClick={handleSignOut} 
      disabled={loading}
      className="opacity-80 hover:opacity-100 px-6 py-2 rounded-full border border-white/10"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </GlowButton>
  )
}
