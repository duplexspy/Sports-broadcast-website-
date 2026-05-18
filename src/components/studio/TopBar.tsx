import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Radio, Settings, Activity } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const { isLive, streamTimer } = useStudioStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatStreamTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-12 w-full bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 fixed top-0 z-50">
      <div className="flex items-center gap-6">
        <h1 className="font-display font-bold text-xl tracking-wide flex items-center gap-2">
          <span className="text-blue-500">PRO</span>CASTER
        </h1>
        
        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
          <Activity size={14} className="text-zinc-400" />
          <span className="text-xs font-mono text-zinc-400">1080p60</span>
          <span className="text-xs font-mono text-zinc-400 ml-2">6.2 MB/s</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {isLive && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full animate-pulse border border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-bold tracking-widest uppercase">Live</span>
            </div>
            <span className="font-mono text-sm">{formatStreamTime(streamTimer)}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Wifi size={16} className="text-green-500" />
          </div>
          <div className="flex items-center gap-1.5">
            <Battery size={16} />
            <span className="text-xs font-mono">87%</span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <span className="text-sm font-mono">{format(time, 'HH:mm:ss')}</span>
          <button className="hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
