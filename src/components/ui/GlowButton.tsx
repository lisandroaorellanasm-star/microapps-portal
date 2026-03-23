import { cn } from "@/lib/utils"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

export function GlowButton({ className, variant = 'primary', ...props }: GlowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === 'primary' && "bg-gradient-to-r from-primary to-accent-pink text-primary-content hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]",
        variant === 'ghost' && "bg-transparent text-base-content hover:bg-white/5 hover:text-white",
        className
      )}
      {...props}
    />
  )
}
