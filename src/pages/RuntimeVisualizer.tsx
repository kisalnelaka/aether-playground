import { motion } from 'framer-motion';
import { Network, Zap, Repeat } from 'lucide-react';

const DiagramCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="glass-card p-6 relative overflow-hidden group mb-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 rounded bg-surface border border-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-text" />
      </div>
      <h3 className="text-xl font-bold text-text tracking-tight">{title}</h3>
    </div>
    <div className="relative border border-white/10 rounded bg-surface/30 p-6">
      {children}
    </div>
  </div>
);

const ComparisonGrid = ({ leftTitle, rightTitle, leftContent, rightContent }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
    <div>
      <h4 className="text-sm font-mono text-muted mb-6 uppercase tracking-wider text-center">{leftTitle}</h4>
      <div className="h-64 flex items-center justify-center relative">
        {leftContent}
      </div>
    </div>
    <div>
      <h4 className="text-sm font-mono text-primary mb-6 uppercase tracking-wider text-center">{rightTitle}</h4>
      <div className="h-64 flex items-center justify-center relative">
        {rightContent}
      </div>
    </div>
  </div>
);

export function RuntimeVisualizer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Runtime Observability</h1>
        <p className="text-muted text-lg">
          Visualize the inner mechanics of the AETHER engine. Watch how requests traverse the zero-overhead pipeline, from socket to worker fiber.
        </p>
      </div>

      <div className="w-full">
        
        <DiagramCard title="Request Lifecycle" icon={Network}>
          <ComparisonGrid 
            leftTitle="Traditional PHP (FPM)"
            rightTitle="AETHER Runtime"
            leftContent={
              <div className="flex flex-col space-y-3 w-full max-w-xs text-xs font-mono">
                {['Bootstrap Kernel', 'Load Configuration', 'Connect Database', 'Execute Route', 'Garbage Collection'].map((step) => (
                  <div key={step} className="px-3 py-2 border border-red-500/30 bg-red-500/5 text-muted flex items-center justify-between">
                    <span>{step}</span>
                    <span className="text-red-400 opacity-50">Block</span>
                  </div>
                ))}
              </div>
            }
            rightContent={
              <div className="flex w-full items-center justify-between text-xs font-mono relative px-2">
                <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10 -translate-y-1/2 -z-10" />
                <motion.div 
                  className="absolute top-1/2 left-4 h-px bg-primary -translate-y-1/2 -z-10" 
                  initial={{ width: 0 }}
                  animate={{ width: "calc(100% - 32px)" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {['Socket', 'Router', 'Fiber', 'Response'].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded bg-surface border border-primary/50 flex items-center justify-center mb-2 z-10">
                      <div className="w-1.5 h-1.5 bg-primary" />
                    </div>
                    <span className="text-text">{step}</span>
                  </div>
                ))}
              </div>
            }
          />
        </DiagramCard>

        <DiagramCard title="Memory Model" icon={Zap}>
          <ComparisonGrid 
            leftTitle="Shared-Nothing (Stateless)"
            rightTitle="Resident Memory (Stateful)"
            leftContent={
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                 <div className="flex space-x-2">
                   {[1, 2, 3].map(i => (
                     <motion.div 
                       key={i}
                       className="w-12 h-12 border border-white/20 bg-surface flex flex-col items-center justify-center text-[10px] text-muted"
                       animate={{ opacity: [1, 0, 1] }}
                       transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                     >
                       <span>Boot</span>
                       <span className="text-red-400">Destroy</span>
                     </motion.div>
                   ))}
                 </div>
                 <div className="text-xs text-muted max-w-[200px] text-center mt-4 border-t border-white/10 pt-4">
                   Memory allocated and destroyed entirely per request. High GC penalty.
                 </div>
              </div>
            }
            rightContent={
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                 <div className="flex space-x-4 mb-4">
                   {[1, 2, 3].map(i => (
                     <motion.div 
                       key={i}
                       className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs text-muted bg-surface relative z-20"
                       animate={{ y: [0, 10, 0] }}
                       transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                     >
                       {i}
                     </motion.div>
                   ))}
                 </div>
                 <div className="w-48 p-4 border border-primary/30 bg-primary/5 text-center relative z-10">
                    <div className="font-mono text-primary font-bold mb-1">AETHER CACHE</div>
                    <div className="text-[10px] text-text opacity-70">Services & Config Stay Hot</div>
                 </div>
              </div>
            }
          />
        </DiagramCard>

        <DiagramCard title="Execution Strategy" icon={Repeat}>
          <ComparisonGrid 
            leftTitle="Process Blocking (Synchronous)"
            rightTitle="Fiber Scheduler (Async)"
            leftContent={
              <div className="w-full max-w-xs border-l border-white/20 pl-4 relative space-y-4 py-4">
                <div className="h-10 bg-surface border border-white/10 px-3 flex items-center text-xs text-muted">CPU Computing</div>
                <div className="h-16 bg-red-500/10 border border-red-500/30 px-3 flex items-center text-xs text-red-400">Blocked waiting for DB I/O (Idle)</div>
                <div className="h-10 bg-surface border border-white/10 px-3 flex items-center text-xs text-muted">CPU Computing</div>
              </div>
            }
            rightContent={
              <div className="w-full flex space-x-4 px-4 h-full items-end pb-8">
                <div className="flex-1 flex flex-col items-center justify-end relative h-48">
                  <div className="w-full bg-surface border border-white/20 h-full flex flex-col justify-end p-1 space-y-1">
                     <motion.div className="bg-primary/20 border border-primary/50 text-[10px] text-primary p-1 text-center" initial={{height:0}} animate={{height:40}} transition={{repeat:Infinity, duration:2}} >Task A</motion.div>
                     <motion.div className="bg-secondary/20 border border-secondary/50 text-[10px] text-secondary p-1 text-center" initial={{height:0}} animate={{height:60}} transition={{repeat:Infinity, duration:2, delay:1}} >Task B</motion.div>
                     <motion.div className="bg-primary/20 border border-primary/50 text-[10px] text-primary p-1 text-center" initial={{height:0}} animate={{height:30}} transition={{repeat:Infinity, duration:2, delay:2}} >Task A resumes</motion.div>
                  </div>
                  <div className="text-[10px] text-muted font-mono mt-2">Worker 1</div>
                </div>
              </div>
            }
          />
        </DiagramCard>

      </div>
    </div>
  );
}
