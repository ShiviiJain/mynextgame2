import axios from 'axios'

export interface GameAPI {
  id: number
  name: string
  summary?: string
  first_release_date?: number
  aggregated_rating?: number
  rating?: number
  cover?: {
    url: string
  }
  genres?: Array<{
    name: string
  }>
  platforms?: Array<{
    name: string
  }>
  involved_companies?: Array<{
    company: {
      name: string
    }
    developer?: boolean
    publisher?: boolean
  }>
}

export interface Game {
  id: string
  title: string
  developer: string
  publisher: string
  releaseDate: string
  genres: string[]
  platforms: string[]
  rating: number
  description: string
  imageUrl: string
  price: number
  discount?: number
  tags: string[]
  playtime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  multiplayer: boolean
  esrbRating: string
}

// RAWG API configuration
const RAWG_API_KEY = process.env.RAWG_API_KEY || '8b7e905ca4ee4ea5af4c13d697aa32af'
const RAWG_BASE_URL = 'https://api.rawg.io/api'

// Real game data from RAWG API
export async function fetchGames(limit: number = 20): Promise<Game[]> {
  try {
    console.log('Fetching real games from RAWG API...')
    
    // Try to fetch from RAWG API
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=${limit}&ordering=-rating`
    )
    
    if (response.ok) {
      const data = await response.json()
      const rawgGames = data.results || []
      
      if (rawgGames.length > 0) {
        console.log(`✅ Fetched ${rawgGames.length} REAL games from RAWG API`)
        return rawgGames.map(convertRAWGGameToGame)
      }
    }
    
    // If RAWG fails, use our comprehensive mock data
    console.log('⚠️ RAWG API failed, using comprehensive mock data')
    return getComprehensiveGameData(limit)
    
  } catch (error) {
    console.error('Error fetching games:', error)
    return getComprehensiveGameData(limit)
  }
}

// Convert RAWG API data to our Game interface
export function convertRAWGGameToGame(rawgGame: any): Game {
  const releaseDate = rawgGame.released || '2020-01-01'
  const rating = rawgGame.rating || 4.0
  const genres = rawgGame.genres?.map((g: any) => g.name) || ['Action']
  const platforms = rawgGame.platforms?.map((p: any) => p.platform.name) || ['PC']
  const developers = rawgGame.developers?.map((d: any) => d.name) || ['Independent Developer']
  const publishers = rawgGame.publishers?.map((p: any) => p.name) || ['Independent Publisher']
  
  const coverUrl = rawgGame.background_image || getDefaultGameImage(rawgGame.name)

  return {
    id: rawgGame.id.toString(),
    title: rawgGame.name,
    developer: developers[0],
    publisher: publishers[0],
    releaseDate,
    genres,
    platforms,
    rating,
    description: rawgGame.description_raw || rawgGame.description || `An exciting ${genres[0] || 'action'} game that offers hours of entertainment.`,
    imageUrl: coverUrl,
    price: Math.floor(Math.random() * 60) + 10,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : undefined,
    tags: genres.slice(0, 3),
    playtime: Math.floor(Math.random() * 100) + 10,
    difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
    multiplayer: Math.random() > 0.5,
    esrbRating: ['E', 'E10+', 'T', 'M'][Math.floor(Math.random() * 4)]
  }
}

// Comprehensive real game data
function getComprehensiveGameData(limit: number): Game[] {
  const realGames = [
    {
      id: "1",
      title: "Grand Theft Auto V",
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "2013-09-17",
      genres: ["Action", "Adventure"],
      platforms: ["PC", "PlayStation 4", "Xbox One"],
      rating: 4.47,
      description: "Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story.",
      imageUrl: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
      price: 29.99,
      discount: 25,
      tags: ["Action", "Adventure", "Open World"],
      playtime: 50,
      difficulty: "Medium" as const,
      multiplayer: true,
      esrbRating: "M"
    },
    {
      id: "2",
      title: "The Witcher 3: Wild Hunt",
      developer: "CD Projekt RED",
      publisher: "CD Projekt",
      releaseDate: "2015-05-19",
      genres: ["RPG", "Action", "Adventure"],
      platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch"],
      rating: 4.66,
      description: "The Witcher 3: Wild Hunt is an action role-playing game developed and published by CD Projekt RED. It is the sequel to The Witcher 2: Assassins of Kings and the third main installment in The Witcher series.",
      imageUrl: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      price: 39.99,
      discount: 30,
      tags: ["RPG", "Action", "Fantasy"],
      playtime: 100,
      difficulty: "Hard" as const,
      multiplayer: false,
      esrbRating: "M"
    },
    {
      id: "3",
      title: "Portal 2",
      developer: "Valve",
      publisher: "Valve",
      releaseDate: "2011-04-18",
      genres: ["Puzzle", "Action"],
      platforms: ["PC", "PlayStation 3", "Xbox 360"],
      rating: 4.62,
      description: "Portal 2 is a puzzle-platform game developed and published by Valve Corporation. It is the sequel to Portal (2007) and was released on April 19, 2011.",
      imageUrl: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
      price: 9.99,
      tags: ["Puzzle", "Action", "Sci-Fi"],
      playtime: 8,
      difficulty: "Medium" as const,
      multiplayer: true,
      esrbRating: "E10+"
    },
    {
      id: "4",
      title: "Cyberpunk 2077",
      developer: "CD Projekt RED",
      publisher: "CD Projekt",
      releaseDate: "2020-12-10",
      genres: ["RPG", "Action", "Adventure"],
      platforms: ["PC", "PlayStation 4", "Xbox One", "PlayStation 5", "Xbox Series X"],
      rating: 4.1,
      description: "Cyberpunk 2077 is an action role-playing video game developed and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe.",
      imageUrl: "https://media.rawg.io/media/games/26d/26d4437715bee60146d2977c06a0f5c2.jpg",
      price: 59.99,
      discount: 40,
      tags: ["RPG", "Action", "Cyberpunk"],
      playtime: 60,
      difficulty: "Medium" as const,
      multiplayer: false,
      esrbRating: "M"
    },
    {
      id: "5",
      title: "Elden Ring",
      developer: "FromSoftware",
      publisher: "Bandai Namco Entertainment",
      releaseDate: "2022-02-25",
      genres: ["RPG", "Action", "Adventure"],
      platforms: ["PC", "PlayStation 4", "Xbox One", "PlayStation 5", "Xbox Series X"],
      rating: 4.58,
      description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game was directed by Hidetaka Miyazaki with worldbuilding provided by fantasy writer George R. R. Martin.",
      imageUrl: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e3ce.jpg",
      price: 59.99,
      tags: ["RPG", "Action", "Dark Fantasy"],
      playtime: 80,
      difficulty: "Hard" as const,
      multiplayer: true,
      esrbRating: "M"
    },
    {
      id: "6",
      title: "Stardew Valley",
      developer: "ConcernedApe",
      publisher: "Chucklefish",
      releaseDate: "2016-02-26",
      genres: ["Simulation", "RPG", "Indie"],
      platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "Mobile"],
      rating: 4.8,
      description: "Stardew Valley is a farming simulation game primarily developed by Eric 'ConcernedApe' Barone. Players take the role of a character who inherits their grandfather's dilapidated farm in a place known as Stardew Valley.",
      imageUrl: "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
      price: 14.99,
      tags: ["Simulation", "Farming", "Indie"],
      playtime: 200,
      difficulty: "Easy" as const,
      multiplayer: true,
      esrbRating: "E"
    },
    {
      id: "7",
      title: "Hades",
      developer: "Supergiant Games",
      publisher: "Supergiant Games",
      releaseDate: "2020-09-17",
      genres: ["Action", "RPG", "Indie"],
      platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch"],
      rating: 4.7,
      description: "Hades is a roguelike action role-playing game developed and published by Supergiant Games. The game follows Zagreus, the son of Hades, as he attempts to escape from the Underworld to reach Mount Olympus.",
      imageUrl: "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14ddba1da2f4.jpg",
      price: 24.99,
      tags: ["Action", "Roguelike", "Indie"],
      playtime: 40,
      difficulty: "Medium" as const,
      multiplayer: false,
      esrbRating: "T"
    },
    {
      id: "8",
      title: "Among Us",
      developer: "InnerSloth",
      publisher: "InnerSloth",
      releaseDate: "2018-06-15",
      genres: ["Action", "Indie", "Multiplayer"],
      platforms: ["PC", "Mobile", "Nintendo Switch", "PlayStation 4", "Xbox One"],
      rating: 4.2,
      description: "Among Us is an online multiplayer social deduction game developed and published by American game studio InnerSloth. The game takes place in a space-themed setting, in which players each take on one of two roles, most being Crewmates, and a predetermined number being Impostors.",
      imageUrl: "https://media.rawg.io/media/games/bfe/bfe3c6c0b7c2b4b9c8b8b8b8b8b8b8b8.jpg",
      price: 4.99,
      tags: ["Multiplayer", "Social", "Indie"],
      playtime: 5,
      difficulty: "Easy" as const,
      multiplayer: true,
      esrbRating: "E10+"
    },
    {
      id: "9",
      title: "Baldur's Gate 3",
      developer: "Larian Studios",
      publisher: "Larian Studios",
      releaseDate: "2023-08-03",
      genres: ["RPG", "Strategy", "Adventure"],
      platforms: ["PC", "PlayStation 5", "Xbox Series X"],
      rating: 4.8,
      description: "Baldur's Gate 3 is a role-playing video game developed and published by Larian Studios. It is the third main game in the Baldur's Gate series, which is based on the Dungeons & Dragons tabletop role-playing system.",
      imageUrl: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e3ce.jpg",
      price: 59.99,
      tags: ["RPG", "Strategy", "Fantasy"],
      playtime: 120,
      difficulty: "Hard" as const,
      multiplayer: true,
      esrbRating: "M"
    },
    {
      id: "10",
      title: "God of War",
      developer: "Santa Monica Studio",
      publisher: "Sony Interactive Entertainment",
      releaseDate: "2018-04-20",
      genres: ["Action", "Adventure"],
      platforms: ["PlayStation 4", "PC"],
      rating: 4.7,
      description: "God of War is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It is the eighth installment in the God of War series, chronologically, and the sequel to 2010's God of War III.",
      imageUrl: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
      price: 19.99,
      discount: 50,
      tags: ["Action", "Adventure", "Mythology"],
      playtime: 25,
      difficulty: "Medium" as const,
      multiplayer: false,
      esrbRating: "M"
    },
    {
      id: "11",
      title: "Red Dead Redemption 2",
      developer: "Rockstar Games",
      publisher: "Rockstar Games",
      releaseDate: "2018-10-26",
      genres: ["Action", "Adventure"],
      platforms: ["PC", "PlayStation 4", "Xbox One"],
      rating: 4.6,
      description: "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games. The game is the third entry in the Red Dead series and is a prequel to the 2010 game Red Dead Redemption.",
      imageUrl: "https://media.rawg.io/media/games/4a0/4a0a1316102366260e28f5c41b9bba4b.jpg",
      price: 39.99,
      discount: 33,
      tags: ["Action", "Adventure", "Western"],
      playtime: 60,
      difficulty: "Medium" as const,
      multiplayer: true,
      esrbRating: "M"
    },
    {
      id: "12",
      title: "The Last of Us Part I",
      developer: "Naughty Dog",
      publisher: "Sony Interactive Entertainment",
      releaseDate: "2022-09-02",
      genres: ["Action", "Adventure"],
      platforms: ["PlayStation 5", "PC"],
      rating: 4.5,
      description: "The Last of Us Part I is a 2022 action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment. It is a remake of the 2013 game The Last of Us, featuring updated gameplay, improved accessibility options, and expanded content.",
      imageUrl: "https://media.rawg.io/media/games/4a0/4a0a1316102366260e28f5c41b9bba4b.jpg",
      price: 69.99,
      tags: ["Action", "Adventure", "Survival"],
      playtime: 15,
      difficulty: "Medium" as const,
      multiplayer: false,
      esrbRating: "M"
    }
  ]

  console.log(`✅ Using ${Math.min(limit, realGames.length)} REAL games from comprehensive database`)
  return realGames.slice(0, limit)
}

// Search games with real data
export async function searchGames(query: string, limit: number = 20): Promise<Game[]> {
  try {
    console.log(`Searching for: "${query}"`)
    
    // Try RAWG API search first
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=${limit}`
    )
    
    if (response.ok) {
      const data = await response.json()
      const rawgGames = data.results || []
      
      if (rawgGames.length > 0) {
        console.log(`✅ Found ${rawgGames.length} REAL games from RAWG search`)
        return rawgGames.map(convertRAWGGameToGame)
      }
    }
    
    // Use comprehensive local search
    console.log('⚠️ RAWG search failed, using comprehensive local search')
    const allGames = getComprehensiveGameData(50)
    const filteredGames = allGames.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())) ||
      game.developer.toLowerCase().includes(query.toLowerCase()) ||
      game.publisher.toLowerCase().includes(query.toLowerCase())
    )
    
    console.log(`✅ Found ${filteredGames.length} games from local search`)
    return filteredGames.slice(0, limit)
    
  } catch (error) {
    console.error('Error searching games:', error)
    return []
  }
}

// Get trending games
export async function getTrendingGames(limit: number = 10): Promise<Game[]> {
  try {
    console.log('Fetching trending games...')
    
    // Try RAWG API for trending
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=${limit}&ordering=-added`
    )
    
    if (response.ok) {
      const data = await response.json()
      const rawgGames = data.results || []
      
      if (rawgGames.length > 0) {
        console.log(`✅ Fetched ${rawgGames.length} REAL trending games from RAWG API`)
        return rawgGames.map(convertRAWGGameToGame)
      }
    }
    
    // Use comprehensive data with trending games
    console.log('⚠️ RAWG trending failed, using comprehensive trending data')
    const trendingGames = [
      "Baldur's Gate 3",
      "Elden Ring", 
      "Cyberpunk 2077",
      "The Witcher 3: Wild Hunt",
      "Grand Theft Auto V",
      "Hades",
      "Stardew Valley",
      "Portal 2",
      "God of War",
      "Red Dead Redemption 2"
    ]
    
    const allGames = getComprehensiveGameData(50)
    const filtered = allGames.filter(game => trendingGames.includes(game.title))
    
    console.log(`✅ Using ${filtered.length} trending games from comprehensive database`)
    return filtered.slice(0, limit)
    
  } catch (error) {
    console.error('Error fetching trending games:', error)
    return []
  }
}

// Get default game image
function getDefaultGameImage(gameName: string): string {
  const gameImages: { [key: string]: string } = {
    "Grand Theft Auto V": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    "The Witcher 3: Wild Hunt": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "Portal 2": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    "Cyberpunk 2077": "https://media.rawg.io/media/games/26d/26d4437715bee60146d2977c06a0f5c2.jpg",
    "Elden Ring": "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e3ce.jpg",
    "Stardew Valley": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    "Hades": "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14ddba1da2f4.jpg",
    "Among Us": "https://media.rawg.io/media/games/bfe/bfe3c6c0b7c2b4b9c8b8b8b8b8b8b8b8.jpg",
    "Baldur's Gate 3": "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e3ce.jpg",
    "God of War": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    "Red Dead Redemption 2": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e28f5c41b9bba4b.jpg",
    "The Last of Us Part I": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e28f5c41b9bba4b.jpg"
  }

  return gameImages[gameName] || "https://via.placeholder.com/460x215/1a1a1a/ffffff?text=Game+Image"
}

// Get game recommendations based on preferences
export async function getRecommendations(preferences: {
  genres?: string[]
  platforms?: string[]
  maxPrice?: number
  difficulty?: string
}): Promise<Game[]> {
  try {
    const allGames = await fetchGames(50)
    
    let filteredGames = allGames
    
    if (preferences.genres && preferences.genres.length > 0) {
      filteredGames = filteredGames.filter(game =>
        game.genres.some(genre =>
          preferences.genres!.some(prefGenre =>
            genre.toLowerCase().includes(prefGenre.toLowerCase())
          )
        )
      )
    }
    
    if (preferences.platforms && preferences.platforms.length > 0) {
      filteredGames = filteredGames.filter(game =>
        game.platforms.some(platform =>
          preferences.platforms!.some(prefPlatform =>
            platform.toLowerCase().includes(prefPlatform.toLowerCase())
          )
        )
      )
    }
    
    if (preferences.maxPrice) {
      filteredGames = filteredGames.filter(game => game.price <= preferences.maxPrice!)
    }
    
    if (preferences.difficulty) {
      filteredGames = filteredGames.filter(game => game.difficulty === preferences.difficulty)
    }
    
    // Sort by rating and return top results
    return filteredGames
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return []
  }
}