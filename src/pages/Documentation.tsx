import { FileText, Search } from 'lucide-react';

export function Documentation() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="sticky top-24">
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-muted absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search docs..."
              className="w-full bg-surface border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-text"
            />
          </div>

          <nav className="space-y-1">
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-2">Getting Started</div>
            {['Introduction', 'Installation', 'Deployment'].map(item => (
              <button key={item} className="w-full text-left px-3 py-1.5 rounded text-sm text-muted hover:text-text hover:bg-white/5 transition-colors">
                {item}
              </button>
            ))}

            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-2 mt-6">Core Concepts</div>
            {['Routing', 'Middleware', 'Services', 'Fibers', 'State Management'].map(item => (
              <button key={item} className="w-full text-left px-3 py-1.5 rounded text-sm text-muted hover:text-text hover:bg-white/5 transition-colors">
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-3xl">
        <div className="mb-4 text-primary text-sm font-mono flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Getting Started / Installation</span>
        </div>
        
        <h1 className="text-4xl font-bold text-text mb-6">Installation</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted mb-6">
            AETHER requires PHP 8.1+ and the ext-fiber extension. It is designed to run in CLI mode as a long-running process, bypassing traditional web servers like Apache or Nginx.
          </p>

          <h3 className="text-2xl font-bold text-text mt-8 mb-4">Composer</h3>
          <p className="text-muted mb-4">Install the framework via Composer:</p>
          
          <div className="relative bg-surface rounded-lg p-4 border border-white/10 mb-8 font-mono text-sm text-text">
            <code>composer create-project aether/aether-app my-project</code>
            <button className="absolute top-2 right-2 p-1.5 text-muted hover:text-text bg-white/5 rounded">Copy</button>
          </div>

          <h3 className="text-2xl font-bold text-text mt-8 mb-4">Starting the Runtime</h3>
          <p className="text-muted mb-4">Boot the AETHER runtime. This single command initializes the kernel, loads the routing table into memory, and spins up the worker pool.</p>

          <div className="relative bg-surface rounded-lg p-4 border border-white/10 mb-8 font-mono text-sm text-text">
            <code>php aether serve --workers=8</code>
          </div>

          <div className="p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg mb-8">
            <p className="text-sm text-muted">
              <strong className="text-text">Note:</strong> You do not need PHP-FPM. AETHER binds directly to a socket and handles HTTP requests internally.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
