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
  playtime?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  multiplayer: boolean
  esrbRating: string
}

export const sampleGames: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    releaseDate: "2020-12-10",
    genres: ["RPG", "Action", "Sci-Fi"],
    platforms: ["PC", "PlayStation", "Xbox"],
    rating: 4.2,
    description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and ceaseless body modification.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rpf.jpg",
    price: 59.99,
    discount: 30,
    tags: ["Open World", "Character Customization", "Cyberpunk"],
    playtime: 25,
    difficulty: "Medium",
    multiplayer: false,
    esrbRating: "M"
  },
  {
    id: "2",
    title: "The Witcher 3: Wild Hunt",
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    releaseDate: "2015-05-19",
    genres: ["RPG", "Action", "Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    rating: 4.8,
    description: "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    price: 39.99,
    tags: ["Open World", "Fantasy", "Story Rich"],
    playtime: 50,
    difficulty: "Medium",
    multiplayer: false,
    esrbRating: "M"
  },
  {
    id: "3",
    title: "Elden Ring",
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    releaseDate: "2022-02-25",
    genres: ["RPG", "Action", "Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox"],
    rating: 4.7,
    description: "A new fantasy action RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rpf.jpg",
    price: 59.99,
    tags: ["Souls-like", "Open World", "Fantasy"],
    playtime: 40,
    difficulty: "Hard",
    multiplayer: true,
    esrbRating: "M"
  },
  {
    id: "4",
    title: "Stardew Valley",
    developer: "ConcernedApe",
    publisher: "ConcernedApe",
    releaseDate: "2016-02-26",
    genres: ["Simulation", "RPG", "Indie"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
    rating: 4.6,
    description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    price: 14.99,
    tags: ["Farming", "Relaxing", "Multiplayer"],
    playtime: 100,
    difficulty: "Easy",
    multiplayer: true,
    esrbRating: "E"
  },
  {
    id: "5",
    title: "Hades",
    developer: "Supergiant Games",
    publisher: "Supergiant Games",
    releaseDate: "2020-09-17",
    genres: ["Action", "Roguelike", "Indie"],
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    rating: 4.5,
    description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rpf.jpg",
    price: 24.99,
    tags: ["Roguelike", "Action", "Greek Mythology"],
    playtime: 30,
    difficulty: "Medium",
    multiplayer: false,
    esrbRating: "T"
  },
  {
    id: "6",
    title: "Among Us",
    developer: "InnerSloth",
    publisher: "InnerSloth",
    releaseDate: "2018-06-15",
    genres: ["Multiplayer", "Puzzle", "Indie"],
    platforms: ["PC", "Mobile", "Nintendo Switch"],
    rating: 4.0,
    description: "An online and local party game of teamwork and betrayal for 4-15 players...in space!",
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    price: 4.99,
    tags: ["Multiplayer", "Social Deduction", "Party Game"],
    playtime: 10,
    difficulty: "Easy",
    multiplayer: true,
    esrbRating: "E"
  }
]

export const genres = [
  "Action", "Adventure", "RPG", "Simulation", "Strategy", "Sports", "Racing",
  "Fighting", "Puzzle", "Platformer", "Shooter", "Horror", "Indie", "Casual",
  "Multiplayer", "Singleplayer", "Sci-Fi", "Fantasy", "Historical", "Modern"
]

export const platforms = [
  "PC", "PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One",
  "Nintendo Switch", "Mobile", "VR", "Mac", "Linux"
]

export const difficultyLevels = ["Easy", "Medium", "Hard"] as const
export const esrbRatings = ["E", "E10+", "T", "M", "AO"] as const
