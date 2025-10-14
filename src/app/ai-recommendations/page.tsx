"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RecommendationForm } from "@/components/recommendation-form"
import { RecommendationResults } from "@/components/recommendation-results"
import DecryptedText from "@/components/DecryptedText"
import { ArrowLeft } from "lucide-react"

interface Recommendation {
  title: string
  reason: string
  coverImage: string
  rating: number
  genres: string[]
  platforms: string[]
  price?: number
}

export default function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleRecommendations = (newRecommendations: Recommendation[]) => {
    setRecommendations(newRecommendations)
    setShowResults(true)
  }

  const handleBackToForm = () => {
    setShowResults(false)
    setRecommendations([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToForm}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Form
            </button>
          </div>

          {!showResults ? (
            <RecommendationForm onRecommendations={handleRecommendations} />
          ) : (
            <RecommendationResults recommendations={recommendations} />
          )}
        </div>
      </main>

      {/* Community Message */}
      {!showResults && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">
                Thanks for being a part of the community 👑! Please check the about page to continue supporting efforts.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="mynextgame" className="h-8 w-8" />
              <span className="text-lg font-bold">mynextgame</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 mynextgame. Your quirky AI gaming buddy!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
