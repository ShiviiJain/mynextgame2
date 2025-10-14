"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GameCard } from "@/components/game-card"
import { ErrorBoundary } from "@/components/error-boundary"
import { useGames } from "@/hooks/use-games"
import { TrendingUp, Clock, Loader2 } from "lucide-react"
import CurvedLoop from "@/components/CurvedLoop"
import Galaxy from "@/components/Galaxy"

export default function Home() {
  const { games: featuredGames, loading: featuredLoading, error: featuredError } = useGames('featured', 6)
  const { games: trendingGames, loading: trendingLoading, error: trendingError } = useGames('trending', 4)

  return (
    <div className="min-h-screen bg-background relative">
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
      
      <ErrorBoundary>
        <main>
          <HeroSection />
          
          {/* Featured Games Section */}
          <section className="py-16">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Featured Games</h2>
                  <p className="text-muted-foreground">Handpicked games you'll love</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
                  View All
                </button>
              </div>
              
              {featuredLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading featured games...</span>
                </div>
              ) : featuredError ? (
                <div className="text-center py-12">
                  <p className="text-destructive">Error loading featured games: {featuredError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Trending Games Section */}
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
                    <p className="text-muted-foreground">What everyone's playing</p>
                  </div>
                </div>
              </div>
              
              {trendingLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading trending games...</span>
                </div>
              ) : trendingError ? (
                <div className="text-center py-12">
                  <p className="text-destructive">Error loading trending games: {trendingError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {trendingGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Curved Loop Section */}
          <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Discover Your Next Game</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Let our AI-powered recommendations guide you to your next gaming obsession
                </p>
              </div>
              <CurvedLoop 
                marqueeText="Discover Amazing Games • Find Your Perfect Match • AI-Powered Recommendations • Gaming Made Simple • Your Next Adventure Awaits"
                speed={2}
                curveAmount={300}
                direction="left"
                interactive={true}
                className="text-primary"
              />
        </div>
          </section>

      </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/20 py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="mynextgame" className="h-8 w-8" />
                <span className="text-lg font-bold">mynextgame</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 mynextgame. All rights reserved.
              </p>
            </div>
          </div>
      </footer>
      </ErrorBoundary>
      </div>
    </div>
  )
}