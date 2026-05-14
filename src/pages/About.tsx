import { Code } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      
      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
        <Code className="w-10 h-10 text-primary" />
      </div>

      <h1 className="text-5xl font-bold text-text mb-6">Built for Speed.<br/>Designed for Scale.</h1>
      
      <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-12">
        AETHER was born out of frustration with the standard PHP request lifecycle. 
        We wanted the developer experience of Laravel with the raw throughput of Go or Node.js. 
        By reimagining PHP as a persistent runtime rather than a scripting engine, AETHER bridges that gap.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-text mb-2">Performance-First</h3>
          <p className="text-sm text-muted">Every abstraction is measured. If it adds overhead, it is redesigned or removed. We believe in mechanical sympathy.</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-text mb-2">Minimalism</h3>
          <p className="text-sm text-muted">A framework should get out of your way. AETHER provides the necessary plumbing without dictating your application structure.</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-text mb-2">Persistent Memory</h3>
          <p className="text-sm text-muted">Embrace state. By keeping the runtime hot, we unlock entirely new paradigms for PHP development.</p>
        </div>
      </div>

      <div className="inline-flex space-x-4 flex-wrap justify-center gap-y-4">
        <a href="https://github.com/kisalnelaka/aether" target="_blank" rel="noreferrer" className="px-6 py-3 bg-surface border border-white/10 hover:border-white/30 rounded flex items-center space-x-2 text-text transition-all">
          <Code className="w-5 h-5" />
          <span>GitHub</span>
        </a>
        <a href="https://kisalnelaka.github.io/aether" target="_blank" rel="noreferrer" className="px-6 py-3 bg-surface border border-white/10 hover:border-white/30 rounded flex items-center space-x-2 text-text transition-all">
          <span>GH Page</span>
        </a>
        <a href="https://github.com/kisalnelaka/aether-demo" target="_blank" rel="noreferrer" className="px-6 py-3 bg-surface border border-white/10 hover:border-white/30 rounded flex items-center space-x-2 text-text transition-all">
          <span>Demo App</span>
        </a>
        <a href="https://github.com/kisalnelaka/aether-crud" target="_blank" rel="noreferrer" className="px-6 py-3 bg-surface border border-white/10 hover:border-white/30 rounded flex items-center space-x-2 text-text transition-all">
          <span>CRUD Example</span>
        </a>
      </div>

    </div>
  );
}
