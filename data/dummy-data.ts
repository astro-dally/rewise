export interface Flashcard {
  id: number
  question: string
  answer: string
}

export interface DayStats {
  date: string
  total: number
  known: number
  unknown: number
}

export interface Stats {
  todayTotal: number
  todayKnown: number
  todayUnknown: number
  weeklyData: DayStats[]
}

// Generate dates for the past 7 days
const generatePastDates = (days: number): string[] => {
  const dates: string[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split("T")[0])
  }
  return dates
}

// Flashcard data
export const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces, particularly single-page applications.",
  },
  {
    id: 2,
    question: "What is JSX?",
    answer: "A syntax extension for JavaScript that looks similar to HTML and allows us to write HTML in React.",
  },
  {
    id: 3,
    question: "What is a React component?",
    answer:
      "An independent, reusable piece of code that returns React elements describing what should appear on the screen.",
  },
  {
    id: 4,
    question: "What are props in React?",
    answer:
      "Props (short for properties) are read-only inputs to components that allow passing data from parent to child components.",
  },
  {
    id: 5,
    question: "What is state in React?",
    answer:
      "State is a built-in object that stores property values that belong to a component and determines how it renders and behaves.",
  },
  {
    id: 6,
    question: "What is the virtual DOM?",
    answer:
      "A lightweight copy of the real DOM that React uses to improve performance by minimizing direct manipulation of the DOM.",
  },
  {
    id: 7,
    question: "What are React hooks?",
    answer:
      "Functions that let you use state and other React features in functional components without writing a class.",
  },
  {
    id: 8,
    question: "What is the useEffect hook used for?",
    answer:
      "To perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
  },
  {
    id: 9,
    question: "What is the difference between controlled and uncontrolled components?",
    answer:
      "Controlled components have their state controlled by React, while uncontrolled components store their state in the DOM.",
  },
  {
    id: 10,
    question: "What is the Context API in React?",
    answer:
      "A way to share values like themes or user data between components without explicitly passing props through every level.",
  },
  {
    id: 11,
    question: "What is Redux?",
    answer: "A predictable state container for JavaScript apps, often used with React for managing application state.",
  },
  {
    id: 12,
    question: "What is the purpose of keys in React lists?",
    answer:
      "Keys help React identify which items have changed, are added, or are removed, improving performance when rendering lists.",
  },
  {
    id: 13,
    question: "What is React Router?",
    answer: "A standard library for routing in React that enables navigation among views in a React application.",
  },
  {
    id: 14,
    question: "What is the difference between state and props?",
    answer:
      "Props are passed to a component and are immutable, while state is managed within a component and can be updated.",
  },
  {
    id: 15,
    question: "What is a Higher-Order Component (HOC)?",
    answer:
      "A pattern where a function takes a component and returns a new component with additional props or behavior.",
  },
]

// Generate dummy stats data
const pastDates = generatePastDates(7)
const generateRandomStats = (): DayStats[] => {
  return pastDates.map((date) => {
    const total = Math.floor(Math.random() * 15) + 5 // 5-20 cards per day
    const known = Math.floor(Math.random() * (total - 2)) + 2 // At least 2 known
    return {
      date,
      total,
      known,
      unknown: total - known,
    }
  })
}

// Initial stats
export const initialStats: Stats = {
  todayTotal: 0,
  todayKnown: 0,
  todayUnknown: 0,
  weeklyData: generateRandomStats(),
}
