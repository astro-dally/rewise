"use client"

import { motion } from "framer-motion"
import CommunityDecks from "@/components/community-decks"

export default function CommunityPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <CommunityDecks />
    </motion.div>
  )
}
