import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/ToastProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Micro-Apps Portal",
  description: "Tu portal de micro aplicaciones",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased selection:bg-primary/30 selection:text-white`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
