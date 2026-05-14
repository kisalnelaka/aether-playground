import { useState, useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Plus, Search, Trash2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultRoutes = [
  '/users/{id}',
  '/users/settings',
  '/posts/{slug}',
  '/api/v1/auth/login'
];

export function RouteExplorer() {
  const [routes, setRoutes] = useState<string[]>(defaultRoutes);
  const [newRoute, setNewRoute] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoute && !routes.includes(newRoute)) {
      setRoutes([...routes, newRoute]);
      setNewRoute('');
    }
  };

  const removeRoute = (r: string) => {
    setRoutes(routes.filter(route => route !== r));
  };

  // Naive radix tree generator for visual purposes
  const cyElements = useMemo(() => {
    const els: any[] = [];
    els.push({ data: { id: 'root', label: '/' } });

    routes.forEach(route => {
      const parts = route.split('/').filter(Boolean);
      let currentParent = 'root';
      
      parts.forEach((part) => {
        // Attempt to compress visually
        const isParam = part.startsWith('{') && part.endsWith('}');
        const label = isParam ? '*' : part;
        const id = `${currentParent}-${label}`;
        
        if (!els.find(e => e.data.id === id)) {
           els.push({ data: { id, label, isParam } });
           els.push({ data: { source: currentParent, target: id, id: `${currentParent}-${id}` } });
        }
        currentParent = id;
      });
    });

    return els;
  }, [routes]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text flex items-center space-x-3">
          <Zap className="w-8 h-8 text-primary" />
          <span>Radix Routing Engine</span>
        </h1>
        <p className="text-muted mt-2">Visually demonstrate compressed path matching and O(K) traversal speed.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 flex flex-col space-y-6 shrink-0">
          
          <div className="glass-card p-4">
             <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-4">Add Route</h3>
             <form onSubmit={addRoute} className="flex space-x-2">
               <input 
                 type="text" 
                 value={newRoute}
                 onChange={e => setNewRoute(e.target.value)}
                 placeholder="/new/route/{id}"
                 className="flex-1 bg-surface border border-white/10 rounded px-3 py-2 text-sm text-text focus:outline-none focus:border-primary/50 transition-colors"
               />
               <button type="submit" className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded transition-colors">
                 <Plus className="w-5 h-5" />
               </button>
             </form>
          </div>

          <div className="glass-card p-4 flex-1 overflow-hidden flex flex-col">
             <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-4">Active Routes ({routes.length})</h3>
             
             <div className="relative mb-4">
               <Search className="w-4 h-4 text-muted absolute left-3 top-2.5" />
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 placeholder="Search routes..."
                 className="w-full bg-surface border border-white/10 rounded pl-9 pr-3 py-2 text-sm text-text focus:outline-none focus:border-primary/50 transition-colors"
               />
             </div>

             <div className="flex-1 overflow-y-auto space-y-2 pr-2">
               {routes.filter(r => r.includes(searchQuery)).map(route => (
                 <motion.div 
                   key={route}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="flex items-center justify-between bg-surface border border-white/5 rounded px-3 py-2 group"
                 >
                   <span className="text-xs font-mono text-muted group-hover:text-text transition-colors truncate">{route}</span>
                   <button 
                     onClick={() => removeRoute(route)}
                     className="text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </motion.div>
               ))}
             </div>
          </div>

          <div className="glass-card p-4">
             <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-4">Metrics</h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted">Node Count</span>
                 <span className="font-mono text-primary">{cyElements.filter(e => !e.data.source).length}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted">Lookup Complexity</span>
                 <span className="font-mono text-secondary">O(K)</span>
               </div>
             </div>
          </div>

        </div>

        {/* Cytoscape Canvas */}
        <div className="flex-1 glass-card overflow-hidden relative min-h-[400px]">
          <div className="absolute top-4 left-4 z-10 text-xs font-mono text-muted bg-surface/80 px-2 py-1 rounded backdrop-blur border border-white/5">
             Radix Tree Visualization
          </div>
          <CytoscapeComponent 
            elements={cyElements} 
            style={{ width: '100%', height: '100%' }}
            layout={{ name: 'breadthfirst', directed: true, spacingFactor: 1.5 }}
            stylesheet={[
              {
                selector: 'node',
                style: {
                  'background-color': '#0d0d0d',
                  'border-width': 2,
                  'border-color': '#00f0ff',
                  'label': 'data(label)',
                  'color': '#fff',
                  'font-size': '12px',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'font-family': 'monospace',
                  'width': 60,
                  'height': 60,
                }
              },
              {
                selector: 'node[?isParam]',
                style: {
                  'border-color': '#bf00ff',
                  'border-style': 'dashed'
                }
              },
              {
                selector: 'node[id = "root"]',
                style: {
                  'border-color': '#39ff14',
                  'background-color': '#39ff14',
                  'background-opacity': 0.1,
                }
              },
              {
                selector: 'edge',
                style: {
                  'width': 2,
                  'line-color': '#333',
                  'target-arrow-color': '#333',
                  'target-arrow-shape': 'triangle',
                  'curve-style': 'bezier'
                }
              }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
