import { cn } from "@/lib/utils"

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
