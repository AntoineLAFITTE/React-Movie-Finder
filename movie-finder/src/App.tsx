import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const { dark, toggleDark } = useTheme()
  const loc = useLocation()

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="container">
        <nav>
          <div className="row">
            <h1>Movie Finder</h1>
          </div>
          <div className="links">
            <Link to="/search" className={loc.pathname === '/search' ? 'active' : ''}>Recherche</Link>
            <Link to="/favorites" className={loc.pathname === '/favorites' ? 'active' : ''}>Favoris</Link>
            <button onClick={toggleDark}>{dark ? '☀️ Clair' : '🌙 Sombre'}</button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  )
}
