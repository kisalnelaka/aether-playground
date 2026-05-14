import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

function ParticleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <motion.div 
        animate={{ 
          backgroundPosition: ['0px 0px', '24px 24px'],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px]"
      />
    </div>
  );
}

function LiveMetrics() {
  return (
    <div className="flex space-x-6 mt-8">
      {[
        { label: 'Req/sec', value: '45,230', icon: Activity },
        { label: 'Memory', value: '12MB', icon: Zap },
        { label: 'Boot', value: '0.8ms', icon: Terminal },
      ].map((metric, i) => (
        <motion.div 
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="glass px-4 py-3 rounded-lg border border-white/5 flex items-center space-x-3"
        >
          <metric.icon className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xs text-muted font-mono">{metric.label}</div>
            <div className="text-lg font-bold text-text">{metric.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HeroAnimation() {
  return (
    <div className="relative w-full h-[400px] glass-card flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background/5" />
      {/* Fake Runtime Visualization */}
      <svg className="w-full h-full opacity-60" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path d="M 100 200 C 300 200, 500 100, 700 200" fill="none" stroke="url(#line-grad)" strokeWidth="2" />
        <path d="M 100 200 C 300 200, 500 300, 700 200" fill="none" stroke="url(#line-grad)" strokeWidth="2" />

        <circle cx="100" cy="200" r="8" fill="#fff" filter="url(#glow)">
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="400" cy="150" r="15" fill="#a3a3a3" filter="url(#glow)">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle cx="400" cy="250" r="15" fill="#a3a3a3" filter="url(#glow)">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>

        <circle cx="700" cy="200" r="8" fill="#fff" filter="url(#glow)">
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>

        {/* Moving particles */}
        <circle r="4" fill="#fff" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 100 200 C 300 200, 500 100, 700 200" />
        </circle>
        <circle r="4" fill="#fff" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 100 200 C 300 200, 500 300, 700 200" />
        </circle>

        <text x="100" y="230" fill="#888" fontSize="12" fontFamily="monospace" textAnchor="middle">REQUEST</text>
        <text x="400" y="120" fill="#888" fontSize="12" fontFamily="monospace" textAnchor="middle">ROUTER</text>
        <text x="400" y="290" fill="#888" fontSize="12" fontFamily="monospace" textAnchor="middle">WORKER</text>
        <text x="700" y="230" fill="#888" fontSize="12" fontFamily="monospace" textAnchor="middle">RESPONSE</text>
      </svg>
    </div>
  );
}

export function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <ParticleGrid />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>v1.0.0 Now Available</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-text">Persistent Memory</span>
            <span className="block text-text opacity-50 mt-2">PHP Runtime.</span>
          </h1>
          
          <p className="mt-6 text-xl text-muted max-w-2xl leading-relaxed">
            Built for high-performance applications, scalable systems, and near-zero overhead execution. Experience PHP without the traditional bootstrap cost.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/playground" className="px-8 py-3.5 rounded bg-primary text-background font-bold hover:bg-primary/90 transition-all flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Playground</span>
            </Link>
            <a href="https://github.com/kisalnelaka/aether" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded bg-surface border border-white/10 hover:border-white/30 transition-all flex items-center space-x-2 text-text">
              <ArrowRight className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          <LiveMetrics />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </div>
  );
}
