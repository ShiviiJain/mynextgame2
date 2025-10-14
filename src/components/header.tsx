"use client"

import { useState } from "react"
import { Search, Menu, X, Gamepad2, Filter, Loader2, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGameSearch } from "@/hooks/use-games"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  const { games: searchResults, loading: searchLoading } = useGameSearch(searchQuery, 5)
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="mynextgame" className="h-8 w-8" />
          <span className="text-xl font-bold">mynextgame</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSearchResults(e.target.value.length > 0)
              }}
              onFocus={() => setShowSearchResults(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 max-h-80 overflow-y-auto rounded-lg border border-border bg-background shadow-lg z-50">
                {searchLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                        onClick={() => {
                          setSearchQuery(game.title)
                          setShowSearchResults(false)
                          router.push(`/game/${encodeURIComponent(game.title)}`)
                        }}
                      >
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                          <p className="text-xs text-muted-foreground">{game.developer}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img src="/angry.png" alt="Rating" className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">{game.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length > 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No games found for "{searchQuery}"
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Discover
          </a>
          <a href="/recommendations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Browse Games
          </a>
          <a href="/ai-recommendations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Recommendations
          </a>
          
          {session ? (
            <>
              <a href="/profile" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span>Profile</span>
              </a>
              <button
                onClick={async () => {
                  await signOut()
                  window.location.href = "/"
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a href="/auth/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </a>
              <a href="/auth/signup" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign Up
              </a>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              
              {/* Mobile Search Results */}
              {searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-4 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((game) => (
                        <div
                          key={game.id}
                          className="flex items-center space-x-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                          onClick={() => {
                            setSearchQuery(game.title)
                            setIsMenuOpen(false)
                            router.push(`/game/${encodeURIComponent(game.title)}`)
                          }}
                        >
                          <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                            <p className="text-xs text-muted-foreground">{game.developer}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img src="/angry.png" alt="Rating" className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">{game.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length > 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No games found for "{searchQuery}"
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <a href="/" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Discover
              </a>
              <a href="/recommendations" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Browse Games
              </a>
              <a href="/ai-recommendations" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Recommendations
              </a>
              
              {session ? (
                <>
                  <a href="/profile" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Profile
                  </a>
                  <button 
                    onClick={async () => {
                      await signOut()
                      window.location.href = "/"
                    }}
                    className="w-full inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href="/auth/signin" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </a>
                  <a href="/auth/signup" className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Sign Up
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
