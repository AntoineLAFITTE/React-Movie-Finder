import MovieCard from '../components/MovieCard'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div>
      <h2>Mes favoris</h2>
      {favorites.length === 0 && <p className="empty">Aucun favori pour l’instant.</p>}
      <div className="grid">
        {favorites.map(m => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>
    </div>
  )
}
