"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Brain, Clock, Award } from "lucide-react"

// Animation component for sections
function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Team member component
function TeamMember({
  name,
  role,
  bio,
  avatarSrc,
}: {
  name: string
  role: string
  bio: string
  avatarSrc: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="mt-2 text-sm">{bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Value proposition component
function ValueCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">About Rewise</h1>
        <p className="mb-12 text-xl text-muted-foreground">
          We're on a mission to revolutionize how people learn and remember information through the power of spaced
          repetition.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mx-auto mb-20 max-w-4xl" delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How Rewise came to be</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-base">
            <p>
              Rewise was born out of frustration with traditional learning methods. As students and lifelong learners
              ourselves, we experienced firsthand the challenges of retaining information over the long term. We'd spend
              hours studying, only to forget crucial details when we needed them most.
            </p>
            <p>
              In 2021, our team of educators, developers, and cognitive scientists came together with a shared vision:
              to create a learning tool that works with your brain, not against it. We combined cutting-edge research in
              cognitive psychology with modern technology to develop Rewise's spaced repetition system.
            </p>
            <p>
              What started as a simple flashcard app has evolved into a comprehensive learning platform used by
              students, professionals, and lifelong learners worldwide. Our mission remains the same: to help people
              learn more effectively and remember information for life, not just for tests.
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>

      <AnimatedSection className="mb-20" delay={0.2}>
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ValueCard
            icon={Brain}
            title="Science-Based"
            description="We build our learning tools based on proven cognitive science and memory research."
          />
          <ValueCard
            icon={Clock}
            title="Time-Efficient"
            description="We respect your time and design our system to maximize learning in minimal time."
          />
          <ValueCard
            icon={BookOpen}
            title="Accessible Learning"
            description="We believe effective learning tools should be available to everyone, everywhere."
          />
          <ValueCard
            icon={Award}
            title="Continuous Improvement"
            description="We constantly refine our algorithms and features based on user feedback and new research."
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-20" delay={0.3}>
        <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TeamMember
            name="Alex Chen"
            role="Founder & CEO"
            bio="Cognitive scientist with a passion for educational technology. Alex leads our vision and strategy."
            avatarSrc="/placeholder.svg?height=96&width=96&text=AC"
          />
          <TeamMember
            name="Maya Patel"
            role="Lead Developer"
            bio="Full-stack developer with expertise in educational software. Maya architects our technical solutions."
            avatarSrc="/placeholder.svg?height=96&width=96&text=MP"
          />
          <TeamMember
            name="David Kim"
            role="Learning Scientist"
            bio="PhD in Educational Psychology. David ensures our methods are backed by the latest research."
            avatarSrc="/placeholder.svg?height=96&width=96&text=DK"
          />
          <TeamMember
            name="Sarah Johnson"
            role="UX Designer"
            bio="Human-centered designer focused on creating intuitive learning experiences for all users."
            avatarSrc="/placeholder.svg?height=96&width=96&text=SJ"
          />
          <TeamMember
            name="Carlos Rodriguez"
            role="Community Manager"
            bio="Former teacher who builds and nurtures our growing community of learners worldwide."
            avatarSrc="/placeholder.svg?height=96&width=96&text=CR"
          />
          <TeamMember
            name="Emma Wilson"
            role="Content Strategist"
            bio="Educational content expert who develops learning resources and guides our content strategy."
            avatarSrc="/placeholder.svg?height=96&width=96&text=EW"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-3xl text-center" delay={0.4}>
        <h2 className="mb-6 text-3xl font-bold">Join Our Mission</h2>
        <p className="mb-6 text-xl text-muted-foreground">
          We're always looking for passionate individuals to join our team and help revolutionize learning.
        </p>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4">
              If you're excited about educational technology, cognitive science, or simply want to make a difference in
              how people learn, we'd love to hear from you.
            </p>
            <p className="text-muted-foreground">
              Check out our open positions or reach out to us at{" "}
              <a href="mailto:careers@rewise.app" className="text-primary hover:underline">
                careers@rewise.app
              </a>
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  )
}
