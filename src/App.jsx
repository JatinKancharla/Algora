import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VisualizerPage from './pages/Visualizer'
import ComplexityTable from './pages/Complexitytable'
import Aboutus from './components/Aboutus'
import './App.css'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  render() {
    if (this.state.hasError) return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
        <p className="text-black dark:text-white font-semibold">Something went wrong</p>
        <p className="text-black/50 dark:text-white/50 text-sm max-w-xs">{this.state.error?.message}</p>
        <button onClick={() => this.setState({ hasError: false })}
          className="px-5 py-2 border border-black/20 dark:border-white/20 text-black dark:text-white text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
          Try again
        </button>
      </div>
    )
    return this.props.children
  }
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
          <Route path="/complexity" element={<ComplexityTable />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
