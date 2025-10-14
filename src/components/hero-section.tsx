"use client"

import { ArrowRight, TrendingUp, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
            <img src="/angry.png" alt="AI Gaming Buddy" className="mr-2 h-4 w-4" />
            Your AI Gaming Buddy
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Meet
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}mynextgame
            </span>
          </h1>

          {/* Story */}
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Stuck on what to play tonight?<br />
              We've got you covered.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/ai-recommendations" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105">
              Find My Next Obsession!
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="/recommendations" className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-accent transition-all duration-200">
              Browse Our Game Collection
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Games We're Obsessed With</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <img src="/angry.png" alt="Success Rate" className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate (We're Pretty Good!)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
