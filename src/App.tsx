import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Playground } from './pages/Playground';
import { RuntimeVisualizer } from './pages/RuntimeVisualizer';
import { RouteExplorer } from './pages/RouteExplorer';
import { Benchmarks } from './pages/Benchmarks';
import { Architecture } from './pages/Architecture';
import { Documentation } from './pages/Documentation';
import { About } from './pages/About';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <main className="flex-grow pt-16 flex flex-col">
        {children}
      </main>
      
      <footer className="border-t border-white/5 py-8 text-center text-sm text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
             <span className="font-bold text-text tracking-wider">AETHER</span>
             <span className="text-white/20">|</span>
             <span>Persistent Memory PHP</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
             <a href="https://github.com/kisalnelaka/aether" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">GitHub</a>
             <a href="https://kisalnelaka.github.io/aether" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">GH Page</a>
             <a href="https://github.com/kisalnelaka/aether-demo" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">Demo App</a>
             <a href="https://github.com/kisalnelaka/aether-crud" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">CRUD Example</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/runtime" element={<RuntimeVisualizer />} />
        <Route path="/routes" element={<RouteExplorer />} />
        <Route path="/benchmarks" element={<Benchmarks />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
