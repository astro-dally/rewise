"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { initialStats, type Stats } from "@/data/dummy-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Brain, Check, X, Award, Clock } from "lucide-react"

export default function StatisticsPage() {
  const [stats, setStats] = useState<Stats>(initialStats)
  const [timeframe, setTimeframe] = useState("week")
  const [isLoading, setIsLoading] = useState(true)

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("rewiseStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Format data for charts
  const weeklyChartData = stats.weeklyData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    known: day.known,
    unknown: day.unknown,
    total: day.total,
  }))

  const knowledgeRatio = stats.todayTotal > 0 ? Math.round((stats.todayKnown / stats.todayTotal) * 100) : 0

  // Pie chart data
  const pieData = [
    { name: "Known", value: stats.todayKnown, color: "#22c55e" },
    { name: "Unknown", value: stats.todayUnknown, color: "#ef4444" },
  ]

  // Learning streak data (dummy data)
  const streakData = {
    current: 24,
    best: 42,
    todayGoal: 20,
    todayCompleted: 15,
    weeklyAverage: 18,
  }

  // Time spent data (dummy data)
  const timeSpentData = [
    { day: "Mon", minutes: 15 },
    { day: "Tue", minutes: 22 },
    { day: "Wed", minutes: 18 },
    { day: "Thu", minutes: 25 },
    { day: "Fri", minutes: 30 },
    { day: "Sat", minutes: 12 },
    { day: "Sun", minutes: 20 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Timeframe:</span>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews Today</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayTotal}</div>
              <p className="text-xs text-muted-foreground">Cards reviewed today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Known Cards</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayKnown}</div>
              <p className="text-xs text-muted-foreground">{knowledgeRatio}% success rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unknown Cards</CardTitle>
              <X className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayUnknown}</div>
              <p className="text-xs text-muted-foreground">Cards to review again</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>Your flashcard review performance over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="known" name="Known" fill="#22c55e" />
                  <Bar dataKey="unknown" name="Unknown" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Knowledge Distribution</CardTitle>
              <CardDescription>Breakdown of your review results today</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Learning Streak</CardTitle>
                <CardDescription>Your daily learning consistency</CardDescription>
              </div>
              <Award className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold">{streakData.current} Days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-3xl font-bold">{streakData.best} Days</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">Today's Goal</p>
                  <p className="text-sm text-muted-foreground">
                    {streakData.todayCompleted}/{streakData.todayGoal} cards
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(streakData.todayCompleted / streakData.todayGoal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 })
                  .map((_, i) => {
                    const isCompleted = i < 5
                    constlength: 7
                  })
                  .map((_, i) => {
                    const isCompleted = i < 5
                    const isToday = i === 5
                    return (
                      <div key={i} className="text-center">
                        <div
                          className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                            isToday ? "border-2 border-primary bg-primary/10" : isCompleted ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          {isCompleted && <Check className="h-5 w-5 text-primary-foreground" />}
                          {isToday && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </p>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Time Spent Learning</CardTitle>
                <CardDescription>Minutes spent reviewing each day</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    name="Minutes"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
              <CardDescription>Your review trend over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total Reviews"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line type="monotone" dataKey="known" name="Known" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
