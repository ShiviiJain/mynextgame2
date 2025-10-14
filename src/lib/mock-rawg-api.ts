// Mock RAWG API responses for demo purposes
export const mockRAWGGames = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    released: "2013-09-17",
    background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    rating: 4.47,
    rating_top: 5,
    ratings: [
      { id: 4, title: "recommended", count: 1200, percent: 60.0 },
      { id: 5, title: "exceptional", count: 600, percent: 30.0 },
      { id: 3, title: "meh", count: 200, percent: 10.0 }
    ],
    ratings_count: 2000,
    description_raw: "Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ],
    platforms: [
      { platform: { id: 4, name: "PC", slug: "pc" } },
      { platform: { id: 1, name: "Xbox One", slug: "xbox-one" } },
      { platform: { id: 18, name: "PlayStation 4", slug: "playstation4" } }
    ],
    developers: [
      { id: 1, name: "Rockstar North", slug: "rockstar-north" }
    ],
    publishers: [
      { id: 1, name: "Rockstar Games", slug: "rockstar-games" }
    ]
  },
  {
    id: 4200,
    name: "Portal 2",
    released: "2011-04-18",
    background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    rating: 4.62,
    rating_top: 5,
    ratings: [
      { id: 5, title: "exceptional", count: 800, percent: 80.0 },
      { id: 4, title: "recommended", count: 200, percent: 20.0 }
    ],
    ratings_count: 1000,
    description_raw: "Portal 2 is a puzzle-platform game developed and published by Valve Corporation. It is the sequel to Portal (2007) and was released on April 19, 2011, for Microsoft Windows, Mac OS X, PlayStation 3, and Xbox 360.",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ],
    platforms: [
      { platform: { id: 4, name: "PC", slug: "pc" } },
      { platform: { id: 1, name: "Xbox 360", slug: "xbox360" } },
      { platform: { id: 16, name: "PlayStation 3", slug: "playstation3" } }
    ],
    developers: [
      { id: 1, name: "Valve", slug: "valve" }
    ],
    publishers: [
      { id: 1, name: "Valve", slug: "valve" }
    ]
  },
  {
    id: 5286,
    name: "Tomb Raider (2013)",
    released: "2013-03-05",
    background_image: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    rating: 4.25,
    rating_top: 5,
    ratings: [
      { id: 4, title: "recommended", count: 600, percent: 60.0 },
      { id: 5, title: "exceptional", count: 300, percent: 30.0 },
      { id: 3, title: "meh", count: 100, percent: 10.0 }
    ],
    ratings_count: 1000,
    description_raw: "Tomb Raider is an action-adventure video game developed by Crystal Dynamics and published by Square Enix. It is the tenth title in the Tomb Raider franchise and the fifth developed by Crystal Dynamics.",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ],
    platforms: [
      { platform: { id: 4, name: "PC", slug: "pc" } },
      { platform: { id: 1, name: "Xbox 360", slug: "xbox360" } },
      { platform: { id: 16, name: "PlayStation 3", slug: "playstation3" } }
    ],
    developers: [
      { id: 1, name: "Crystal Dynamics", slug: "crystal-dynamics" }
    ],
    publishers: [
      { id: 1, name: "Square Enix", slug: "square-enix" }
    ]
  },
  {
    id: 13536,
    name: "Portal",
    released: "2007-10-10",
    background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    rating: 4.58,
    rating_top: 5,
    ratings: [
      { id: 5, title: "exceptional", count: 700, percent: 70.0 },
      { id: 4, title: "recommended", count: 300, percent: 30.0 }
    ],
    ratings_count: 1000,
    description_raw: "Portal is a puzzle-platform game developed and published by Valve Corporation. It was released in a bundle package called The Orange Box for Microsoft Windows, Xbox 360 and PlayStation 3 on October 10, 2007.",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ],
    platforms: [
      { platform: { id: 4, name: "PC", slug: "pc" } },
      { platform: { id: 1, name: "Xbox 360", slug: "xbox360" } },
      { platform: { id: 16, name: "PlayStation 3", slug: "playstation3" } }
    ],
    developers: [
      { id: 1, name: "Valve", slug: "valve" }
    ],
    publishers: [
      { id: 1, name: "Valve", slug: "valve" }
    ]
  },
  {
    id: 3498,
    name: "The Witcher 3: Wild Hunt",
    released: "2015-05-19",
    background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    rating: 4.66,
    rating_top: 5,
    ratings: [
      { id: 5, title: "exceptional", count: 1200, percent: 80.0 },
      { id: 4, title: "recommended", count: 300, percent: 20.0 }
    ],
    ratings_count: 1500,
    description_raw: "The Witcher 3: Wild Hunt is an action role-playing game developed and published by CD Projekt RED. It is the sequel to The Witcher 2: Assassins of Kings and the third main installment in The Witcher series.",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ],
    platforms: [
      { platform: { id: 4, name: "PC", slug: "pc" } },
      { platform: { id: 1, name: "Xbox One", slug: "xbox-one" } },
      { platform: { id: 18, name: "PlayStation 4", slug: "playstation4" } }
    ],
    developers: [
      { id: 1, name: "CD Projekt RED", slug: "cd-projekt-red" }
    ],
    publishers: [
      { id: 1, name: "CD Projekt", slug: "cd-projekt" }
    ]
  }
]

export function getMockRAWGGames(limit: number = 20) {
  return {
    count: mockRAWGGames.length,
    next: null,
    previous: null,
    results: mockRAWGGames.slice(0, limit)
  }
}

export function searchMockRAWGGames(query: string, limit: number = 20) {
  const filtered = mockRAWGGames.filter(game => 
    game.name.toLowerCase().includes(query.toLowerCase()) ||
    game.genres.some(genre => genre.name.toLowerCase().includes(query.toLowerCase()))
  )
  
  return {
    count: filtered.length,
    next: null,
    previous: null,
    results: filtered.slice(0, limit)
  }
}
