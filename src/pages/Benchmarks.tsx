import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, Gauge, Zap, Database } from 'lucide-react';

const throughputData = [
  { name: 'Node.js', reqs: 15000, fill: '#4CAF50' },
  { name: 'Symfony', reqs: 3500, fill: '#FFC107' },
  { name: 'Laravel', reqs: 2800, fill: '#F44336' },
  { name: 'AETHER', reqs: 45230, fill: '#00f0ff' },
];

const memoryData = [
  { name: 'Node.js', mem: 120, fill: '#4CAF50' },
  { name: 'Symfony', mem: 85, fill: '#FFC107' },
  { name: 'Laravel', mem: 95, fill: '#F44336' },
  { name: 'AETHER', mem: 14, fill: '#00f0ff' },
];

const bootData = [
  { name: 'Node.js', ms: 150, fill: '#4CAF50' },
  { name: 'Symfony', ms: 45, fill: '#FFC107' },
  { name: 'Laravel', ms: 55, fill: '#F44336' },
  { name: 'AETHER', ms: 0.8, fill: '#00f0ff' },
];

const MetricCard = ({ title, value, unit, icon: Icon, subtext }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6 border-t border-t-primary/30"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-text">{value}<span className="text-sm text-muted ml-1">{unit}</span></div>
      </div>
    </div>
    <h3 className="text-lg font-bold text-text">{title}</h3>
    <p className="text-sm text-muted mt-1">{subtext}</p>
  </motion.div>
);

const ChartCard = ({ title, data, dataKey, unit }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass-card p-6"
  >
    <h3 className="text-lg font-bold text-text mb-6">{title}</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}${unit}`} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#333', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export function Benchmarks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Performance Benchmarks</h1>
        <p className="text-muted text-lg mb-6">
          Compare AETHER's persistent-memory architecture against traditional request/response frameworks and alternative runtimes.
        </p>
        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg text-sm">
          <Info className="w-4 h-4" />
          <span>Demonstration benchmarks for visualization purposes.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MetricCard title="Throughput" value="45.2k" unit="req/s" icon={Gauge} subtext="Peak requests per second" />
        <MetricCard title="Memory Footprint" value="14" unit="MB" icon={Database} subtext="Resident worker memory" />
        <MetricCard title="Cold Boot" value="0.8" unit="ms" icon={Zap} subtext="Time to first response" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Requests Per Second (Higher is Better)" data={throughputData} dataKey="reqs" unit="k" />
        <ChartCard title="Memory Usage (Lower is Better)" data={memoryData} dataKey="mem" unit="MB" />
        <ChartCard title="Boot Time Overhead (Lower is Better)" data={bootData} dataKey="ms" unit="ms" />
      </div>
    </div>
  );
}
