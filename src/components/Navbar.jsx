import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const linkClass = (path) =>
    `px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
      location.pathname === path
        ? 'bg-black text-white dark:bg-white dark:text-black'
        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-black/8 dark:border-white/8 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 flex items-center justify-between h-14">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Algora Logo" className="w-8 h-8 object-contain transition-transform hover:scale-105" />
          <span className="text-black dark:text-white font-bold tracking-tight text-base transition-colors">Algora</span>
        </Link>

        {/* Nav links — center */}
        <div className="hidden sm:flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/visualizer" className={linkClass('/visualizer')}>Visualizer</Link>
          <Link to="/complexity" className={linkClass('/complexity')}>Complexity</Link>
        </div>

        {/* Right: theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 transition-all"
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            /* Sun icon — click to go light */
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            /* Moon icon — click to go dark */
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
