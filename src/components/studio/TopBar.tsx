import { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
    <header className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center gap-4">
        {isLive ? (
          <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-md">
            <div className="w-2 h-2 bg-white rounded-full animate-[pulse_2s_infinite] opacity-100"></div>
            <span className="text-xs font-black tracking-widest text-white uppercase">Live</span>
          </div>
        ) : (
          <h1 className="text-lg font-black tracking-widest uppercase italic bg-white/5 px-4 py-1 rounded-md border border-white/10 shrink-0">
            <span className="text-[#00F5FF]">PRO</span>CASTER
          </h1>
        )}
        <div className="hidden md:block">
          {isLive ? (
             <>
               <h1 className="text-lg font-bold">LIVE BROADCAST</h1>
               <p className="text-xs text-gray-400 font-mono uppercase tracking-[1px]">Main Feed Active</p>
             </>
          ) : (
             <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => useStudioStore.getState().setView('studio')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${useStudioStore.getState().view === 'studio' ? 'bg-[#00F5FF]/20 text-[#00F5FF]' : 'text-gray-500 hover:text-white'}`}
                >
                  Live Studio
                </button>
                <button 
                  onClick={() => useStudioStore.getState().setView('overlayBuilder')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${useStudioStore.getState().view === 'overlayBuilder' ? 'bg-[#00F5FF]/20 text-[#00F5FF]' : 'text-gray-500 hover:text-white'}`}
                >
                  Overlay Builder
                </button>
             </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center w-20">
          <div className="stat-label">Bitrate</div>
          <div className="text-sm font-mono text-[#00F5FF]">6.2 Mbps</div>
        </div>
        <div className="text-center w-20">
          <div className="stat-label">Quality</div>
          <div className="text-sm font-mono">1080p60</div>
        </div>
        <div className="text-center w-20">
          <div className="stat-label">Duration</div>
          <div className="text-sm font-mono">{isLive ? formatStreamTime(streamTimer) : '00:00:00'}</div>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
          <div className="w-4 h-2 border border-white/40 rounded-sm relative">
            <div className="absolute left-0 top-0 h-full bg-green-500" style={{width: '84%'}}></div>
          </div>
          <span className="text-[10px] font-bold">84%</span>
        </div>
      </div>
    </header>
  );
}
