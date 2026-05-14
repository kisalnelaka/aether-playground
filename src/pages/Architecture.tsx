import { motion } from 'framer-motion';
import { Cpu, Zap, Share2, Layers, Box } from 'lucide-react';

const sections = [
  {
    id: 'kernel',
    title: 'Kernel Architecture',
    icon: Cpu,
    traditional: 'Traditional PHP bootstraps the entire framework (routing, DI container, config) on every single HTTP request, adding 30-50ms of overhead.',
    content: 'The AETHER kernel represents a fundamental shift. Instead of bootstrapping per request, the kernel boots once. It establishes the runtime core, initializes the worker model, and binds core services to memory ahead-of-time (AOT).',
  },
  {
    id: 'routing',
    title: 'Routing Engine',
    icon: Share2,
    traditional: 'Traditional routers iterate through massive arrays of regex patterns, meaning routing time increases linearly O(N) as the app grows.',
    content: 'Our routing engine employs compressed radix trees for O(K) lookup complexity. By compressing common prefixes and evaluating variables dynamically at runtime, AETHER guarantees consistent nanosecond-level route resolution.',
  },
  {
    id: 'fiber',
    title: 'Fiber System',
    icon: Zap,
    traditional: 'Traditional PHP blocks the entire system process while waiting for I/O (like a database query), requiring hundreds of processes (FPM) to handle concurrent traffic.',
    content: 'AETHER introduces native asynchronous execution via PHP Fibers. Through cooperative multitasking, the runtime pauses execution during I/O operations and immediately context-switches to another request on the same thread.',
  },
  {
    id: 'memory',
    title: 'Resident Memory Model',
    icon: Layers,
    traditional: 'Traditional PHP follows a "shared-nothing" architecture. All variables and objects are destroyed at the end of the request, forcing garbage collection and zero memory sharing.',
    content: 'By persisting workers in memory, AETHER dramatically reduces garbage collection overhead and object instantiation cost. Controllers, services, and configuration remain "hot" in memory.',
  },
  {
    id: 'container',
    title: 'Service Container',
    icon: Box,
    traditional: 'Standard DI containers instantiate services on every request even if they are stateless, wasting CPU cycles.',
    content: 'The AETHER dependency injection container is optimized for a long-running environment. It distinguishes between application-level singletons (resolved once during boot) and request-scoped instances.',
  }
];

export function Architecture() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gradient">System Architecture</h1>
        <p className="text-muted text-lg">
          Deep dive into the internals of AETHER. Understand the engineering decisions that enable near-zero overhead execution.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-lg">
               <section.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center space-x-3">
                <span>{section.title}</span>
                <div className="h-px bg-white/10 flex-1 ml-4 hidden sm:block" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-white/5 bg-surface/50 rounded">
                  <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Traditional PHP</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    {section.traditional}
                  </p>
                </div>
                <div className="p-4 border border-primary/20 bg-primary/5 rounded">
                  <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-2">AETHER Approach</h4>
                  <p className="text-text text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-8 glass-card border border-primary/20 text-center">
        <h3 className="text-xl font-bold text-text mb-2">Want to see the code?</h3>
        <p className="text-muted mb-6">Explore the source code on GitHub and see the implementation details.</p>
        <button className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 transition-all font-medium">
          View Repository
        </button>
      </div>
    </div>
  );
}
