"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Brain,
  BarChart,
  Clock,
  Award,
  Users,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Sparkles,
  X,
  Check,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Animation component for sections
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Feature card component
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <Card className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

// Testimonial component
function Testimonial({
  quote,
  author,
  role,
  avatarSrc,
}: {
  quote: string
  author: string
  role: string
  avatarSrc: string
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <div className="mb-4 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mb-4 text-base italic text-foreground/90">"{quote}"</p>
        </div>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3 w-3" />
                New Learning Experience
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Master Anything with <span className="text-primary">Smart Flashcards</span>
              </h1>
              <p className="mb-8 max-w-md text-xl text-muted-foreground">
                Rewise uses spaced repetition science to help you learn faster and remember longer.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/study">
                    Start Learning Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#how-it-works">
                    How It Works
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="gap-2">
                  <Link href="/community">
                    Explore Community Decks
                    <Users className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">1,000+</span> students already learning
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto aspect-square max-w-md rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-xl"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-background p-4">
                <div className="flex h-full flex-col rounded-md border bg-card p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="font-medium">React Fundamentals</span>
                    </div>
                    <Badge variant="outline">12 cards</Badge>
                  </div>
                  <div className="flex-1 rounded-md border bg-card p-6 shadow-sm">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Question</div>
                    <p className="text-lg font-medium">What is the virtual DOM in React?</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1 gap-1 border-red-200 text-red-500">
                      <X className="h-4 w-4" />
                      <span>Don't know</span>
                    </Button>
                    <Button className="flex-1 gap-1 bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4" />
                      <span>Know it</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Flashcards Created", value: "1.2M+" },
              { label: "Reviews Completed", value: "25M+" },
              { label: "Success Rate", value: "94%" },
            ].map((stat, i) => (
              <AnimatedSection key={i} className="text-center">
                <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features for Effective Learning</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Our scientifically-backed approach helps you learn faster and remember longer.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection>
              <FeatureCard
                icon={Brain}
                title="Smart Scheduling"
                description="Our algorithm adapts to your performance, showing cards at the optimal time for memory retention."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={BarChart}
                title="Progress Tracking"
                description="Visualize your learning journey with detailed statistics and performance metrics."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={BookOpen}
                title="Custom Decks"
                description="Create and manage personalized flashcard decks for any subject you want to master."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Clock}
                title="Time-Efficient"
                description="Study smarter, not harder. Our system optimizes your study time for maximum retention."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Users}
                title="Community Decks"
                description="Browse and use flashcard decks created by other learners in our community."
              />
            </AnimatedSection>
            <AnimatedSection>
              <FeatureCard
                icon={Award}
                title="Gamified Learning"
                description="Earn achievements and maintain streaks to stay motivated on your learning journey."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How Rewise Works</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Our spaced repetition system is designed to optimize your learning and memory retention.
            </p>
          </AnimatedSection>

          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="study">Study</TabsTrigger>
                <TabsTrigger value="track">Track</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-4 text-2xl font-bold">Create Your Flashcards</h3>
                    <ul className="space-y-4">
                      {[
                        "Create custom flashcards with questions and answers",
                        "Organize cards into decks by subject or topic",
                        "Import existing decks from our community library",
                        "Add images and formatting to enhance your cards",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-6 w-fit">
                      <Link href="/study">Start Creating</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center rounded-xl bg-background p-6 shadow-lg">
                    <div className="w-full max-w-sm rounded-lg border bg-card p-4">
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Deck Name</label>
                        <div className="rounded-md border bg-background p-2">React Fundamentals</div>
                      </div>
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Question</label>
                        <div className="rounded-md border bg-background p-2">What is JSX?</div>
                      </div>
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Answer</label>
                        <div className="rounded-md border bg-background p-2">
                          A syntax extension for JavaScript that looks similar to HTML and allows us to write HTML in
                          React.
                        </div>
                      </div>
                      <Button className="w-full">Add Card</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="study" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-4 text-2xl font-bold">Study Efficiently</h3>
                    <ul className="space-y-4">
                      {[
                        "Review flashcards with our spaced repetition algorithm",
                        "Rate your confidence to optimize future reviews",
                        "Focus on difficult cards that need more attention",
                        "Study anywhere on any device with cloud sync",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-6 w-fit">
                      <Link href="/study">Start Studying</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center rounded-xl bg-background p-6 shadow-lg">
                    <div className="w-full max-w-sm space-y-4">
                      <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <div className="mb-2 text-sm font-medium text-muted-foreground">Question</div>
                        <p className="text-lg font-medium">What is the virtual DOM in React?</p>
                        <div className="mt-4 text-center text-sm text-muted-foreground">Tap to reveal answer</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 gap-1 border-red-200 text-red-500">
                          <X className="h-4 w-4" />
                          <span>Don't know</span>
                        </Button>
                        <Button className="flex-1 gap-1 bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4" />
                          <span>Know it</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="track" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-4 text-2xl font-bold">Track Your Progress</h3>
                    <ul className="space-y-4">
                      {[
                        "View detailed statistics on your learning progress",
                        "See your daily streak and maintain your momentum",
                        "Analyze performance by deck and subject area",
                        "Identify problem cards that need more attention",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-6 w-fit">
                      <Link href="/statistics">View Statistics</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center rounded-xl bg-background p-6 shadow-lg">
                    <div className="w-full max-w-sm space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg border bg-card p-3 text-center">
                          <p className="text-2xl font-bold">24</p>
                          <p className="text-xs text-muted-foreground">Day Streak</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3 text-center">
                          <p className="text-2xl font-bold">87%</p>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                        <div className="rounded-lg border bg-card p-3 text-center">
                          <p className="text-2xl font-bold">156</p>
                          <p className="text-xs text-muted-foreground">Cards Mastered</p>
                        </div>
                      </div>
                      <div className="rounded-lg border bg-card p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Weekly Progress</h4>
                        </div>
                        <div className="h-32 w-full">
                          <div className="flex h-full items-end gap-1">
                            {[30, 45, 60, 40, 75, 50, 65].map((height, i) => (
                              <div key={i} className="relative flex-1">
                                <div className="w-full rounded-t bg-primary" style={{ height: `${height}%` }}></div>
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Learning Streak - Creative Element */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16 text-center">
            <Badge className="mb-4 px-3 py-1 text-sm">
              <Sparkles className="mr-1 h-3 w-3" />
              New Feature
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Maintain Your Learning Streak</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Stay motivated with daily goals and achievements to build a consistent learning habit.
            </p>
          </AnimatedSection>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <AnimatedSection className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Daily Goals</h3>
                    <p className="text-muted-foreground">
                      Set personalized daily review targets to maintain your learning momentum.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Achievements</h3>
                    <p className="text-muted-foreground">
                      Earn badges and unlock achievements as you progress in your learning journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Leaderboards</h3>
                    <p className="text-muted-foreground">
                      Compete with friends and see who can maintain the longest learning streak.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-8 w-fit">
                <Link href="/study">Start Your Streak</Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection>
              <div className="overflow-hidden rounded-xl border bg-background shadow-lg">
                <div className="border-b bg-muted/30 p-4">
                  <h3 className="text-lg font-medium">Your Learning Streak</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                      <p className="text-3xl font-bold">24 Days</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Best Streak</p>
                      <p className="text-3xl font-bold">42 Days</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium">Today's Goal</p>
                      <p className="text-sm text-muted-foreground">15/20 cards</p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[75%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const isCompleted = i < 5
                      const isToday = i === 5
                      return (
                        <div key={i} className="text-center">
                          <div
                            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                              isToday
                                ? "border-2 border-primary bg-primary/10"
                                : isCompleted
                                  ? "bg-primary"
                                  : "bg-muted"
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

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                        <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">7-Day Streak</p>
                          <Badge variant="outline">Achieved</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Complete reviews for 7 days in a row</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <Award className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">30-Day Streak</p>
                          <Badge variant="outline">6 days left</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Complete reviews for 30 days in a row</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Join thousands of satisfied learners who have transformed their learning experience with Rewise.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection>
              <Testimonial
                quote="Rewise has completely transformed how I study. The spaced repetition system helps me remember concepts for much longer than traditional methods."
                author="Sarah Johnson"
                role="Medical Student"
                avatarSrc="/placeholder.svg?height=40&width=40&text=SJ"
              />
            </AnimatedSection>
            <AnimatedSection>
              <Testimonial
                quote="I've tried many flashcard apps, but Rewise stands out with its clean interface and powerful spaced repetition algorithm. It's helped me ace my programming interviews."
                author="Michael Chen"
                role="Software Engineer"
                avatarSrc="/placeholder.svg?height=40&width=40&text=MC"
              />
            </AnimatedSection>
            <AnimatedSection>
              <Testimonial
                quote="The statistics and progress tracking keep me motivated. I can actually see my improvement over time, which makes me want to keep going."
                author="Emily Rodriguez"
                role="Language Learner"
                avatarSrc="/placeholder.svg?height=40&width=40&text=ER"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Learning?</h2>
                <p className="mb-8 text-xl text-muted-foreground">
                  Join thousands of learners who are already using Rewise to master new skills and knowledge.
                </p>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/study">
                    Get Started for Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">No credit card required. Start learning today.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
