import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Box, Cpu, Database, Server, Layers } from 'lucide-react';

const frameworks = {
  aether: {
    name: 'AETHER',
    language: 'php',
    file: 'kernel.php',
    code: `<?php

use Aether\\Routing\\Route;
use App\\Models\\User;

// AETHER Persistent Memory Playground

Route::get('/users/{id}', function ($id) {
    // This runs entirely in a persistent worker
    // No bootstrap overhead!
    
    $user = User::find($id);
    
    return response()->json([
        'status' => 'success',
        'data' => $user,
        'execution_time' => '0.001ms'
    ]);
});

Route::middleware('auth')->group(function () {
    Route::post('/settings', function () {
        return ['status' => 'updated'];
    });
});
`,
    logs: [
      { delay: 0, text: 'Compiling AETHER routes...' },
      { delay: 100, text: 'Initializing persistent worker...' },
      { delay: 600, text: 'Worker ready in 1.2ms' },
      { delay: 1200, text: 'Simulating request: GET /users/123' },
      { delay: 1250, text: 'Route match: O(K) complexity' },
      { delay: 1300, text: 'Execution complete. Time: 0.001ms' }
    ],
    status: { process: 'Worker 1', memory: '14MB Resident' },
    architecture: ['Router (Radix)', 'Worker Pool', 'Persistent State']
  },
  laravel: {
    name: 'Laravel',
    language: 'php',
    file: 'web.php',
    code: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Models\\User;

Route::get('/users/{id}', function ($id) {
    // Traditional PHP-FPM lifecycle
    // Bootstraps entire framework per request
    
    $user = User::find($id);
    
    return response()->json([
        'status' => 'success',
        'data' => $user,
        'execution_time' => '45.2ms'
    ]);
});
`,
    logs: [
      { delay: 0, text: 'Simulating request: GET /users/123' },
      { delay: 200, text: 'Bootstrapping Laravel Kernel...' },
      { delay: 600, text: 'Loading Service Providers (42 instances)...' },
      { delay: 1000, text: 'Connecting to Database...' },
      { delay: 1400, text: 'Executing route closure...' },
      { delay: 1800, text: 'Execution complete. Time: 45.2ms' },
      { delay: 2000, text: 'Tearing down app (Garbage Collection)...' }
    ],
    status: { process: 'PHP-FPM Process 4512', memory: '45MB Allocated (Destroyed)' },
    architecture: ['Nginx / Apache', 'PHP-FPM Worker', 'Bootstrap App', 'Destroy & GC']
  },
  node: {
    name: 'Node.js (Express)',
    language: 'javascript',
    file: 'app.js',
    code: `const express = require('express');
const app = express();
const User = require('./models/user');

app.get('/users/:id', async (req, res) => {
    // Single-threaded event loop
    // Non-blocking I/O
    
    const user = await User.findById(req.params.id);
    
    res.json({
        status: 'success',
        data: user,
        execution_time: '2.4ms'
    });
});
`,
    logs: [
      { delay: 0, text: 'Simulating request: GET /users/123' },
      { delay: 100, text: 'Event Loop: delegating I/O task...' },
      { delay: 500, text: 'libuv: executing database query...' },
      { delay: 1000, text: 'Callback pushed to queue...' },
      { delay: 1200, text: 'Execution complete. Time: 2.4ms' }
    ],
    status: { process: 'V8 Main Thread', memory: '32MB Resident' },
    architecture: ['Event Loop', 'Callback Queue', 'V8 Engine']
  },
  django: {
    name: 'Django',
    language: 'python',
    file: 'urls.py',
    code: `from django.urls import path
from django.http import JsonResponse
from .models import User

def get_user(request, id):
    # WSGI synchronous execution
    # Loads middleware chain
    
    user = User.objects.get(pk=id)
    
    return JsonResponse({
        'status': 'success',
        'data': { 'id': user.id, 'name': user.name },
        'execution_time': '28.5ms'
    })

urlpatterns = [
    path('users/<int:id>/', get_user),
]
`,
    logs: [
      { delay: 0, text: 'Simulating request: GET /users/123' },
      { delay: 200, text: 'Gunicorn passing request to WSGI Worker...' },
      { delay: 600, text: 'Traversing Middleware (7 classes)...' },
      { delay: 1200, text: 'Executing ORM Query...' },
      { delay: 1600, text: 'Execution complete. Time: 28.5ms' }
    ],
    status: { process: 'WSGI Worker 3', memory: '60MB Resident' },
    architecture: ['Gunicorn', 'WSGI Worker', 'Middleware Chain', 'View']
  }
};

type FrameworkKey = keyof typeof frameworks;

export function Playground() {
  const [activeFramework, setActiveFramework] = useState<FrameworkKey>('aether');
  const [code, setCode] = useState(frameworks['aether'].code);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/users/123');

  const handleFrameworkChange = (fw: FrameworkKey) => {
    if (isRunning) return;
    setActiveFramework(fw);
    setCode(frameworks[fw].code);
    setLogs([]);
  };

  const handleRun = () => {
    if (!path.trim()) return;
    setIsRunning(true);
    setLogs([]);
    
    const fw = frameworks[activeFramework];
    
    fw.logs.forEach(log => {
      setTimeout(() => {
        // Dynamically replace the default URL in logs with the user's input
        let logText = log.text;
        if (logText.includes('GET /users/123')) {
           logText = logText.replace('GET /users/123', `${method} ${path}`);
        }
        setLogs(prev => [...prev, logText]);
      }, log.delay);
    });

    const maxDelay = Math.max(...fw.logs.map(l => l.delay));
    setTimeout(() => {
      setIsRunning(false);
    }, maxDelay + 500);
  };

  const fwConfig = frameworks[activeFramework];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background">
      
      {/* Framework Tabs */}
      <div className="h-14 border-b border-white/10 bg-surface flex items-center px-4 space-x-2 shrink-0 overflow-x-auto">
        {(Object.keys(frameworks) as FrameworkKey[]).map(key => (
          <button
            key={key}
            onClick={() => handleFrameworkChange(key)}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              activeFramework === key 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-muted hover:text-text hover:bg-white/5 border border-transparent'
            }`}
          >
            {frameworks[key].name}
          </button>
        ))}
      </div>

      {/* Header & Controls */}
      <div className="h-auto md:h-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between px-4 py-2 shrink-0 bg-background/50 gap-2">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-red-500/80" />
            <button className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <button className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-mono text-muted hidden md:inline-block">{fwConfig.file}</span>
        </div>
        
        <div className="flex-1 flex justify-center w-full md:w-auto">
           <div className="flex bg-surface border border-white/10 rounded overflow-hidden max-w-md w-full">
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                className="bg-transparent text-primary text-xs font-bold px-3 py-1.5 focus:outline-none border-r border-white/10 appearance-none"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input 
                type="text" 
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/api/resource"
                className="bg-transparent text-text text-sm px-3 py-1.5 w-full focus:outline-none font-mono"
              />
           </div>
        </div>

        <div className="flex items-center justify-end space-x-3 w-full md:w-auto">
          <button 
            onClick={() => { setCode(fwConfig.code); setLogs([]); }}
            className="p-1.5 text-muted hover:text-text transition-colors border border-transparent hover:border-white/10 rounded"
            title="Reset Workspace"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning || !path}
            className="px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 text-sm font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Sending...' : 'Send Request'}</span>
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Editor Pane */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex-1 w-full h-full min-h-[400px]">
            <Editor
              height="100%"
              width="100%"
              language={fwConfig.language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || '')}
              loading={<div className="p-4 text-muted font-mono">Loading editor...</div>}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Output/Visualization Pane */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full bg-surface/50 flex flex-col min-h-0 relative">
          
          {/* Status Bar */}
          <div className="h-10 border-b border-white/5 flex items-center px-4 space-x-6 text-xs text-muted font-mono shrink-0 bg-background/50">
            <div className="flex items-center space-x-2">
              <Server className="w-3 h-3" />
              <span>{fwConfig.status.process}</span>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <span className="relative flex h-2 w-2">
                <span className={isRunning ? "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" : ""}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>{isRunning ? 'Processing' : 'Idle'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="w-3 h-3" />
              <span>{fwConfig.status.memory}</span>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2 text-muted">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex"
              >
                <span className="text-primary mr-2">{'>'}</span>
                <span>{log}</span>
              </motion.div>
            ))}
            {isRunning && (
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-primary ml-2"
              />
            )}
            {!isRunning && logs.length === 0 && (
              <div className="opacity-30 italic">Click 'Run Simulation' to execute.</div>
            )}
          </div>

          {/* Graphic Visualization Overlay */}
          <div className="absolute top-14 right-4 w-56 border border-white/10 bg-surface/90 backdrop-blur p-4 rounded shadow-lg">
             <div className="text-xs text-muted font-mono mb-3 flex items-center"><Cpu className="w-3 h-3 mr-1"/> Request Pipeline</div>
             <div className="space-y-2">
               {fwConfig.architecture.map((node, index) => (
                 <div key={node}>
                   <div className={`h-8 rounded flex items-center justify-center text-xs border transition-colors ${
                     isRunning 
                       ? 'bg-primary/10 border-primary/40 text-text shadow-[0_0_10px_rgba(255,255,255,0.05)]' 
                       : 'bg-white/5 border-white/5 text-muted'
                   }`}>
                     {node}
                   </div>
                   {index < fwConfig.architecture.length - 1 && (
                     <div className="h-4 flex justify-center"><div className="w-px bg-white/20"></div></div>
                   )}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
