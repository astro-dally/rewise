"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Star, Plus, BookOpen, Users, Tag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

// Types
interface Deck {
  id: string
  title: string
  description: string
  creator: {
    name: string
    avatar: string
  }
  cardCount: number
  category: string
  rating: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  createdAt: string
  usedBy: number
}

// Categories with colors
const categories = [
  { name: "All", color: "bg-primary" },
  { name: "Languages", color: "bg-blue-500" },
  { name: "Science", color: "bg-green-500" },
  { name: "Mathematics", color: "bg-purple-500" },
  { name: "History", color: "bg-amber-500" },
  { name: "Programming", color: "bg-rose-500" },
  { name: "Arts", color: "bg-indigo-500" },
  { name: "Business", color: "bg-emerald-500" },
]

// Dummy data for community decks
const dummyDecks: Deck[] = [
  {
    id: "1",
    title: "Spanish Vocabulary Essentials",
    description: "Learn the most common Spanish words for everyday conversations.",
    creator: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    cardCount: 120,
    category: "Languages",
    rating: 4.8,
    difficulty: "Beginner",
    createdAt: "2023-09-15",
    usedBy: 1245,
  },
  {
    id: "2",
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript programming language.",
    creator: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=AC",
    },
    cardCount: 85,
    category: "Programming",
    rating: 4.9,
    difficulty: "Intermediate",
    createdAt: "2023-10-22",
    usedBy: 3782,
  },
  {
    id: "3",
    title: "Human Anatomy Basics",
    description: "Learn about the major systems and organs in the human body.",
    creator: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    cardCount: 150,
    category: "Science",
    rating: 4.7,
    difficulty: "Intermediate",
    createdAt: "2023-08-05",
    usedBy: 2156,
  },
  {
    id: "4",
    title: "World History: Ancient Civilizations",
    description: "Explore the major ancient civilizations and their contributions.",
    creator: {
      name: "Prof. Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
    cardCount: 95,
    category: "History",
    rating: 4.6,
    difficulty: "Intermediate",
    createdAt: "2023-11-10",
    usedBy: 1876,
  },
  {
    id: "5",
    title: "Calculus I Concepts",
    description: "Review key concepts from Calculus I including limits, derivatives, and integrals.",
    creator: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
    },
    cardCount: 75,
    category: "Mathematics",
    rating: 4.9,
    difficulty: "Advanced",
    createdAt: "2023-07-28",
    usedBy: 4231,
  },
  {
    id: "6",
    title: "French for Beginners",
    description: "Start your journey learning French with these essential phrases and vocabulary.",
    creator: {
      name: "Pierre Dubois",
      avatar: "/placeholder.svg?height=40&width=40&text=PD",
    },
    cardCount: 100,
    category: "Languages",
    rating: 4.5,
    difficulty: "Beginner",
    createdAt: "2023-12-03",
    usedBy: 1543,
  },
  {
    id: "7",
    title: "React Hooks Explained",
    description: "Comprehensive guide to all React hooks with practical examples.",
    creator: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
    },
    cardCount: 65,
    category: "Programming",
    rating: 4.9,
    difficulty: "Advanced",
    createdAt: "2023-10-15",
    usedBy: 2876,
  },
  {
    id: "8",
    title: "Basic Music Theory",
    description: "Learn the fundamentals of music theory including notes, scales, and chords.",
    creator: {
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
    },
    cardCount: 80,
    category: "Arts",
    rating: 4.7,
    difficulty: "Beginner",
    createdAt: "2023-09-20",
    usedBy: 1932,
  },
  {
    id: "9",
    title: "Marketing Fundamentals",
    description: "Essential marketing concepts every business professional should know.",
    creator: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
    },
    cardCount: 90,
    category: "Business",
    rating: 4.6,
    difficulty: "Intermediate",
    createdAt: "2023-11-28",
    usedBy: 2145,
  },
  {
    id: "10",
    title: "Physics: Mechanics",
    description: "Comprehensive review of classical mechanics principles and problem-solving.",
    creator: {
      name: "Dr. Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=RC",
    },
    cardCount: 110,
    category: "Science",
    rating: 4.8,
    difficulty: "Advanced",
    createdAt: "2023-08-15",
    usedBy: 3254,
  },
  {
    id: "11",
    title: "Italian Cuisine Vocabulary",
    description: "Learn the Italian names for ingredients, dishes, and cooking techniques.",
    creator: {
      name: "Giulia Romano",
      avatar: "/placeholder.svg?height=40&width=40&text=GR",
    },
    cardCount: 70,
    category: "Languages",
    rating: 4.5,
    difficulty: "Beginner",
    createdAt: "2023-12-10",
    usedBy: 1432,
  },
  {
    id: "12",
    title: "Data Structures & Algorithms",
    description: "Master the essential data structures and algorithms for coding interviews.",
    creator: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
    },
    cardCount: 130,
    category: "Programming",
    rating: 4.9,
    difficulty: "Advanced",
    createdAt: "2023-07-05",
    usedBy: 5421,
  },
]

// Deck card component
const DeckCard = ({ deck, onAddToLibrary }: { deck: Deck; onAddToLibrary: (deck: Deck) => void }) => {
  // Get category color
  const categoryColor = categories.find((c) => c.name === deck.category)?.color || "bg-primary"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <Badge className={`${categoryColor} px-2 py-0.5 text-xs font-medium text-white`}>{deck.category}</Badge>
              <h3 className="mt-2 line-clamp-1 text-lg font-bold">{deck.title}</h3>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {deck.rating.toFixed(1)}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{deck.description}</p>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={deck.creator.avatar || "/placeholder.svg"} alt={deck.creator.name} />
              <AvatarFallback>{deck.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{deck.creator.name}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{deck.cardCount} cards</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{deck.usedBy.toLocaleString()} users</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3.5 w-3.5" />
              <span>{deck.difficulty}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={() => onAddToLibrary(deck)} className="w-full gap-1" variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add to Library
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Loading skeleton for deck cards
const DeckCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="p-4 pb-0">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-2 h-6 w-40" />
        </div>
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-3/4" />
    </CardHeader>
    <CardContent className="p-4 pt-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-8 w-full" />
    </CardFooter>
  </Card>
)

export default function CommunityDecks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popular")
  const [filteredDecks, setFilteredDecks] = useState<Deck[]>(dummyDecks)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort decks
  useEffect(() => {
    let result = [...dummyDecks]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (deck) =>
          deck.title.toLowerCase().includes(query) ||
          deck.description.toLowerCase().includes(query) ||
          deck.creator.name.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((deck) => deck.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty.length > 0) {
      result = result.filter((deck) => selectedDifficulty.includes(deck.difficulty))
    }

    // Sort decks
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.usedBy - a.usedBy)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "cards":
        result.sort((a, b) => b.cardCount - a.cardCount)
        break
      default:
        break
    }

    setFilteredDecks(result)
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const handleAddToLibrary = (deck: Deck) => {
    toast({
      title: "Deck added to library",
      description: `"${deck.title}" has been added to your library.`,
      duration: 3000,
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Community Decks</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and learn from flashcard decks created by the Rewise community.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search decks by title, description, or creator..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Difficulty
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedDifficulty.includes("Beginner")}
                  onCheckedChange={() => handleDifficultyChange("Beginner")}
                >
                  Beginner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedDifficulty.includes("Intermediate")}
                  onCheckedChange={() => handleDifficultyChange("Intermediate")}
                >
                  Intermediate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedDifficulty.includes("Advanced")}
                  onCheckedChange={() => handleDifficultyChange("Advanced")}
                >
                  Advanced
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tabs defaultValue="popular" value={sortBy} onValueChange={setSortBy}>
              <TabsList className="h-9">
                <TabsTrigger value="popular" className="text-xs">
                  Popular
                </TabsTrigger>
                <TabsTrigger value="rating" className="text-xs">
                  Top Rated
                </TabsTrigger>
                <TabsTrigger value="newest" className="text-xs">
                  Newest
                </TabsTrigger>
                <TabsTrigger value="cards" className="text-xs">
                  Most Cards
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              className={`cursor-pointer px-3 py-1 ${
                selectedCategory === category.name
                  ? `${category.color} text-white hover:${category.color}`
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {isLoading ? "Loading decks..." : `Showing ${filteredDecks.length} decks`}
        </div>

        {/* Deck grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => <DeckCardSkeleton key={index} />)
              : filteredDecks.map((deck) => <DeckCard key={deck.id} deck={deck} onAddToLibrary={handleAddToLibrary} />)}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {!isLoading && filteredDecks.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No decks found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedDifficulty([])
                setSortBy("popular")
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
