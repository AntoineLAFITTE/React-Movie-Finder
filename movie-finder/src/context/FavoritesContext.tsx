import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Movie = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

type FavoritesContextType = {
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
  isFavorite: (id: string) => boolean
  dark: boolean
  toggleDark: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mfavorites')
      const theme = localStorage.getItem('mdark')
      if (raw) setFavorites(JSON.parse(raw))
      if (theme) setDark(theme === '1')
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('mfavorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('mdark', dark ? '1' : '0')
  }, [dark])

  function toggleFavorite(movie: Movie) {
    setFavorites(prev => {
      const exists = prev.some(m => m.imdbID === movie.imdbID)
      return exists ? prev.filter(m => m.imdbID !== movie.imdbID) : [...prev, movie]
    })
  }

  function isFavorite(id: string) {
    return favorites.some(m => m.imdbID === id)
  }

  function toggleDark() { setDark(d => !d) }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, dark, toggleDark }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
