"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Stats } from "@/data/dummy-data"
import { CheckCircle, RotateCcw, BarChart } from "lucide-react"

interface ReviewCompleteProps {
  stats: Stats
  onReset: () => void
}

export default function ReviewComplete({ stats, onReset }: ReviewCompleteProps) {
  const knowledgeRatio = stats.todayTotal > 0 ? Math.round((stats.todayKnown / stats.todayTotal) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CardHeader>
          <div className="flex justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Review Complete!</CardTitle>
          <CardDescription className="text-center">You've completed your flashcard review session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-background p-4">
            <h3 className="mb-2 font-medium">Today's Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold">{stats.todayTotal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Known</p>
                <p className="text-xl font-bold text-green-600">{stats.todayKnown}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unknown</p>
                <p className="text-xl font-bold text-red-500">{stats.todayUnknown}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-background p-4 text-center">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-3xl font-bold">{knowledgeRatio}%</p>
            <p className="mt-1 text-sm">
              {knowledgeRatio >= 80
                ? "Excellent! Keep up the good work!"
                : knowledgeRatio >= 60
                  ? "Good progress! Review the cards you missed."
                  : "Keep practicing! You'll improve with repetition."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Review Again</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
            <BarChart className="h-4 w-4" />
            <span>View Stats</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
