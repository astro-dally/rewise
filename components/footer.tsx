"use client"

import type React from "react"

import Link from "next/link"
import { BookOpen, Twitter, Linkedin, Github, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // In a real app, you would send this to your API
    }
  }

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Community", href: "#" },
        { name: "Learning Tips", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
      ],
    },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Rewise</span>
            </Link>
            <p className="mb-4 max-w-md text-sm text-muted-foreground">
              Rewise helps you learn and remember anything with spaced repetition flashcards. Our scientifically-proven
              method optimizes your learning and saves you time.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 transition-colors hover:text-primary"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 transition-colors hover:text-primary"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 transition-colors hover:text-primary"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </motion.a>
              <motion.a
                href="mailto:info@rewise.app"
                className="text-foreground/80 transition-colors hover:text-primary"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">Email</span>
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-md">
              <h3 className="mb-3 text-sm font-medium">Subscribe to our newsletter</h3>
              {isSubscribed ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Thanks for subscribing! Check your inbox soon.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="max-w-xs"
                  />
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rewise. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
