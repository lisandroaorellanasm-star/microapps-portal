export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-blue/10 blur-[150px] pointer-events-none" />
      
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 animate-in fade-in duration-1000">
        {children}
      </main>
    </div>
  )
}
