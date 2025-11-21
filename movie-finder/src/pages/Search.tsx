import { useEffect, useState } from 'react'
import { buildSearchUrl, buildDetailsUrl } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../context/FavoritesContext'

type SearchResult = { Search?: Movie[]; totalResults?: string; Response: string; Error?: string }
type DetailsResult = Movie & { Plot: string; Genre: string; Runtime: string; imdbRating: string }

export default function Search() {
  const [query, setQuery] = useState('naruto')
  const [page, setPage] = useState(1)
  const url = query ? buildSearchUrl(query, page) : null
  const { data, loading, error } = useFetch<SearchResult>(url, [url])
  const [selected, setSelected] = useState<string | null>(null)
  const detailsUrl = selected ? buildDetailsUrl(selected) : null
  const details = useFetch<DetailsResult>(detailsUrl, [detailsUrl])

  useEffect(() => { setPage(1) }, [query])

  const results = data?.Search || []
  const total = Number(data?.totalResults || 0)
  const maxPage = total ? Math.ceil(total / 10) : 0

  return (
    <div>
      <header>
        <h2>Recherche</h2>
        <div className="input-row">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Titre de film..." />
          <button onClick={() => setPage(1)}>Rechercher</button>
        </div>
      </header>

      {loading && <p>Chargement…</p>}
      {error && <p>Erreur: {error}</p>}

      {!loading && !error && results.length === 0 && (
        <p className="empty">Aucun résultat.</p>
      )}

      <div className="grid">
        {results.map(m => (
          <MovieCard key={m.imdbID} movie={m} onOpen={setSelected} />
        ))}
      </div>

      {maxPage > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Précédent</button>
          <span>Page {page} / {maxPage}</span>
          <button disabled={page >= maxPage} onClick={() => setPage(p => p + 1)}>Suivant</button>
        </div>
      )}

      {selected && details.data && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="body">
            <div className="row"><strong>{details.data.Title}</strong><span className="badge">{details.data.Year}</span></div>
            <p>{details.data.Plot}</p>
            <small>{details.data.Genre} - {details.data.Runtime} - Note {details.data.imdbRating}</small>
            <div className="row">
              <button onClick={() => setSelected(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
