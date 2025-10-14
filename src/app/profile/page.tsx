"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProfilePictureSelector } from "@/components/profile-picture-selector"
import { GameSearchSelector } from "@/components/game-search-selector"
import { User, Settings, LogOut, Gamepad2, Clock, DollarSign, Edit, Heart, Play } from "lucide-react"

const GAMING_PLATFORMS = [
  "PC", "PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", 
  "Nintendo Switch", "Mobile", "VR"
]

const GAME_GENRES = [
  "Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", 
  "Racing", "Fighting", "Puzzle", "Horror", "Platformer", "Shooter"
]

const PLAY_TIME_OPTIONS = [
  { value: "casual", label: "Casual (1-5 hours/week)" },
  { value: "moderate", label: "Moderate (6-15 hours/week)" },
  { value: "hardcore", label: "Hardcore (15+ hours/week)" }
]

const BUDGET_OPTIONS = [
  { value: "free", label: "Free to Play" },
  { value: "low", label: "Low ($1-20)" },
  { value: "medium", label: "Medium ($21-60)" },
  { value: "high", label: "High ($60+)" }
]

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    bio: "",
    favoriteGenres: [] as string[],
    gamingPlatforms: [] as string[],
    playTime: "",
    budget: "",
    favoriteGames: [] as string[],
    gamesPlayed: [] as any[],
    wishlist: [] as any[],
    profileImage: ""
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      // Reset initialization state when session changes (new login)
      setHasInitialized(false)
      fetchProfile()
    }
  }, [session?.user?.id])

  // Check if profile has been saved before (has any data)
  const hasProfileData = profileData.bio || 
    profileData.favoriteGenres.length > 0 || 
    profileData.gamingPlatforms.length > 0 || 
    profileData.playTime || 
    profileData.budget || 
    profileData.gamesPlayed.length > 0 ||
    profileData.wishlist.length > 0 ||
    profileData.profileImage

  // Set initial editing state when profile data is fetched
  const [hasInitialized, setHasInitialized] = useState(false)

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        
        setProfileData({
          bio: data.bio || "",
          favoriteGenres: data.favoriteGenres || [],
          gamingPlatforms: data.gamingPlatforms || [],
          playTime: data.playTime || "",
          budget: data.budget || "",
          favoriteGames: data.favoriteGames || [],
          gamesPlayed: data.gamesPlayed || [],
          wishlist: data.wishlist || [],
          profileImage: data.profileImage || ""
        })
        
        // Set initial editing state based on whether user has profile data
        if (!hasInitialized) {
          const hasData = data.bio || 
            (data.favoriteGenres && data.favoriteGenres.length > 0) || 
            (data.gamingPlatforms && data.gamingPlatforms.length > 0) || 
            data.playTime || 
            data.budget || 
            (data.gamesPlayed && data.gamesPlayed.length > 0) ||
            (data.wishlist && data.wishlist.length > 0) ||
            data.profileImage
          
          setIsEditing(!hasData) // Start in edit mode if no data, view mode if has data
          setHasInitialized(true)
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        alert("Profile updated successfully!")
        // Don't switch to view mode - let user continue editing
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      alert("Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  const handleDoneEditing = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reload profile data to discard any unsaved changes
    fetchProfile()
    setIsEditing(false)
  }

  const handleGenreToggle = (genre: string) => {
    setProfileData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }))
  }

  const handlePlatformToggle = (platform: string) => {
    setProfileData(prev => ({
      ...prev,
      gamingPlatforms: prev.gamingPlatforms.includes(platform)
        ? prev.gamingPlatforms.filter(p => p !== platform)
        : [...prev.gamingPlatforms, platform]
    }))
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary-foreground" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {session.user?.name || "User"}
                </h1>
                <p className="text-muted-foreground">{session.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing && hasProfileData && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
              <button
                onClick={async () => {
                  await signOut()
                  window.location.href = "/"
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h2>
            {isEditing ? (
              <ProfilePictureSelector
                currentImage={profileData.profileImage}
                onImageSelect={(imageUrl) => setProfileData(prev => ({ ...prev, profileImage: imageUrl }))}
              />
            ) : (
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bio Section */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  About You
                </h2>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about your gaming preferences..."
                  className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Gaming Preferences */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Gaming Preferences
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Play Time
                    </label>
                    <select
                      value={profileData.playTime}
                      onChange={(e) => setProfileData(prev => ({ ...prev, playTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your play time</option>
                      {PLAY_TIME_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget
                    </label>
                    <select
                      value={profileData.budget}
                      onChange={(e) => setProfileData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your budget</option>
                      {BUDGET_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* About Section - LinkedIn Style */}
              {profileData.bio && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
                  <p className="text-foreground leading-relaxed">{profileData.bio}</p>
                </div>
              )}

              {/* Gaming Profile Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Gamepad2 className="w-6 h-6 mr-3" />
                  Gaming Profile
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Play Time */}
                  {profileData.playTime && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Play Time</h3>
                        <p className="text-muted-foreground">
                          {PLAY_TIME_OPTIONS.find(opt => opt.value === profileData.playTime)?.label || profileData.playTime}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Budget */}
                  {profileData.budget && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Budget</h3>
                        <p className="text-muted-foreground">
                          {BUDGET_OPTIONS.find(opt => opt.value === profileData.budget)?.label || profileData.budget}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isEditing ? (
            <>
              {/* Favorite Genres - Edit Mode */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Favorite Genres</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {GAME_GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => handleGenreToggle(genre)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        profileData.favoriteGenres.includes(genre)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gaming Platforms - Edit Mode */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Gaming Platforms</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {GAMING_PLATFORMS.map(platform => (
                    <button
                      key={platform}
                      onClick={() => handlePlatformToggle(platform)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        profileData.gamingPlatforms.includes(platform)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Games Played - Edit Mode */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Games I've Played
                </h2>
                <GameSearchSelector
                  selectedGames={profileData.gamesPlayed}
                  onGamesChange={(games) => setProfileData(prev => ({ ...prev, gamesPlayed: games }))}
                  placeholder="Search for games you've played..."
                  maxGames={100}
                />
              </div>

              {/* Wishlist - Edit Mode */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  My Wishlist
                </h2>
                <GameSearchSelector
                  selectedGames={profileData.wishlist}
                  onGamesChange={(games) => setProfileData(prev => ({ ...prev, wishlist: games }))}
                  placeholder="Search for games you want to play..."
                  maxGames={50}
                />
              </div>
            </>
          ) : (
            <>
              {/* Favorite Genres - LinkedIn Style */}
              {profileData.favoriteGenres.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Favorite Genres</h2>
                  <div className="flex flex-wrap gap-3">
                    {profileData.favoriteGenres.map(genre => (
                      <span
                        key={genre}
                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaming Platforms - LinkedIn Style */}
              {profileData.gamingPlatforms.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Gaming Platforms</h2>
                  <div className="flex flex-wrap gap-3">
                    {profileData.gamingPlatforms.map(platform => (
                      <span
                        key={platform}
                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Games Played - LinkedIn Style */}
              {profileData.gamesPlayed.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Play className="w-6 h-6 mr-3" />
                    Games I've Played ({profileData.gamesPlayed.length})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {profileData.gamesPlayed.map((game) => (
                      <div key={game.id} className="text-center">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                        <p className="text-xs text-muted-foreground">{game.developer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist - LinkedIn Style */}
              {profileData.wishlist.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Heart className="w-6 h-6 mr-3" />
                    My Wishlist ({profileData.wishlist.length})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {profileData.wishlist.map((game) => (
                      <div key={game.id} className="text-center">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium text-foreground truncate">{game.title}</p>
                        <p className="text-xs text-muted-foreground">{game.developer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Action Buttons - Only show when editing */}
          {isEditing && (
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="border border-border bg-background text-muted-foreground px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleDoneEditing}
                className="border border-border bg-background text-foreground px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                Done Editing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
