"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, BarChart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface NavbarProps {
  mode: string
  toggleMode: () => void
}

export default function Navbar({ mode, toggleMode }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Rewise</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMode}
            aria-label={mode === "review" ? "Switch to Stats Mode" : "Switch to Review Mode"}
          >
            {mode === "review" ? <BarChart className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
