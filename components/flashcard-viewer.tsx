"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Flashcard } from "@/data/dummy-data"

interface FlashcardViewerProps {
  flashcard: Flashcard
  onReview: (known: boolean) => void
  progress: { current: number; total: number }
}

export default function FlashcardViewer({ flashcard, onReview, progress }: FlashcardViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setIsFlipped(!isFlipped)
    }
  }

  const handleReview = (known: boolean) => {
    // If card is not flipped yet, flip it first
    if (!isFlipped) {
      setIsFlipped(true)
      return
    }

    onReview(known)
    setIsFlipped(false)
  }

  const progressPercentage = (progress.current / progress.total) * 100

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8">
      <div className="w-full">
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Card {progress.current} of {progress.total}
          </span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="relative h-64 w-full cursor-pointer perspective-1000" onClick={handleFlip}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationComplete={() => setIsAnimating(false)}
            className="absolute inset-0 flex items-center justify-center rounded-xl border bg-card p-6 shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="text-xs font-medium uppercase text-muted-foreground">
                {isFlipped ? "Answer" : "Question"}
              </div>
              <div className="text-xl font-medium">{isFlipped ? flashcard.answer : flashcard.question}</div>
              <div className="text-sm text-muted-foreground">
                {isFlipped ? "Click anywhere to go back" : "Click to reveal answer"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex w-full gap-4">
        <Button
          variant="outline"
          className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => handleReview(false)}
        >
          <X className="h-5 w-5" />
          <span>Don't know it</span>
        </Button>
        <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleReview(true)}>
          <Check className="h-5 w-5" />
          <span>Know it</span>
        </Button>
      </div>
    </div>
  )
}
