"use client"

import { useState, useEffect } from "react"
import FlashcardViewer from "@/components/flashcard-viewer"
import StatsDashboard from "@/components/stats-dashboard"
import ReviewComplete from "@/components/review-complete"
import { flashcards, initialStats } from "@/data/dummy-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BarChart } from "lucide-react"
import { motion } from "framer-motion"

export default function StudyPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [reviewComplete, setReviewComplete] = useState(false)
  const [stats, setStats] = useState(initialStats)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("review")

  // Load saved progress from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("rewiseStats")
    const savedIndex = localStorage.getItem("rewiseCardIndex")
    const savedComplete = localStorage.getItem("rewiseComplete")

    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }

    if (savedIndex) {
      setCurrentCardIndex(Number.parseInt(savedIndex))
    }

    if (savedComplete) {
      setReviewComplete(JSON.parse(savedComplete))
    }

    setIsLoading(false)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("rewiseStats", JSON.stringify(stats))
      localStorage.setItem("rewiseCardIndex", currentCardIndex.toString())
      localStorage.setItem("rewiseComplete", JSON.stringify(reviewComplete))
    }
  }, [stats, currentCardIndex, reviewComplete, isLoading])

  const handleCardReview = (known: boolean) => {
    // Update stats
    const today = new Date().toISOString().split("T")[0]
    const updatedStats = { ...stats }

    // Update today's stats
    updatedStats.todayTotal += 1
    if (known) {
      updatedStats.todayKnown += 1
    } else {
      updatedStats.todayUnknown += 1
    }

    // Update weekly stats
    const dayIndex = updatedStats.weeklyData.findIndex((day) => day.date === today)
    if (dayIndex >= 0) {
      updatedStats.weeklyData[dayIndex].total += 1
      if (known) {
        updatedStats.weeklyData[dayIndex].known += 1
      } else {
        updatedStats.weeklyData[dayIndex].unknown += 1
      }
    } else {
      // If today isn't in the weekly data, add it
      updatedStats.weeklyData.push({
        date: today,
        total: 1,
        known: known ? 1 : 0,
        unknown: known ? 0 : 1,
      })
      // Keep only the last 7 days
      if (updatedStats.weeklyData.length > 7) {
        updatedStats.weeklyData.shift()
      }
    }

    setStats(updatedStats)

    // Move to next card or complete review
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1)
    } else {
      setReviewComplete(true)
    }
  }

  const resetReview = () => {
    setCurrentCardIndex(0)
    setReviewComplete(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Study Session</h1>
            <TabsList>
              <TabsTrigger value="review" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Review</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Statistics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="review" className="mt-0">
            <div className="flex min-h-[70vh] items-center justify-center">
              {reviewComplete ? (
                <ReviewComplete stats={stats} onReset={resetReview} />
              ) : (
                <FlashcardViewer
                  flashcard={flashcards[currentCardIndex]}
                  onReview={handleCardReview}
                  progress={{ current: currentCardIndex + 1, total: flashcards.length }}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <div className="flex min-h-[70vh] items-center justify-center py-8">
              <StatsDashboard stats={stats} />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
