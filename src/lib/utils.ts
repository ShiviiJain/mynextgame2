import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getRandomGames(games: any[], count: number) {
  const shuffled = [...games].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
