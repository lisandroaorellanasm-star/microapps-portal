export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-pink/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-blue/20 blur-[100px] pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md px-4 py-12 animate-in fade-in zoom-in-95 duration-700">
        {children}
      </div>
    </div>
  )
}
