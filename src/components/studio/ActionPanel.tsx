import { useStudioStore } from '../../store/useStudioStore';

export function ActionPanel() {
  const { cutToPreview, isLive, toggleLive, overlaysVisible, toggleOverlays } = useStudioStore();

  return (
    <div className="h-24 glass rounded-2xl flex items-center px-6 justify-between shrink-0">
      <div className="flex gap-4">
        <button 
          onClick={toggleLive}
          className={`h-12 w-12 rounded-full glass flex items-center justify-center transition-all ${isLive ? 'border-red-500/40 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/10' : 'text-gray-400 hover:text-white'}`}
          title={isLive ? "End Stream" : "Go Live"}
        >
          <span className="material-symbols-outlined">{isLive ? 'stop_circle' : 'podcasts'}</span>
        </button>
        <button 
          onClick={toggleOverlays}
          className={`h-12 w-12 rounded-full glass flex items-center justify-center transition-all ${overlaysVisible ? 'border-[#00F5FF]/40 text-[#00F5FF] bg-[#00F5FF]/10 shadow-[0_0_15px_rgba(0,245,255,0.2)]' : 'text-gray-400 hover:text-white'}`}
          title="Toggle Overlays"
        >
          <span className="material-symbols-outlined">layers</span>
        </button>
      </div>

      <div className="flex-1 flex justify-center gap-2 mx-8">
        <button onClick={cutToPreview} className="flex-1 py-3 rounded-lg glass text-[10px] font-bold uppercase tracking-widest border-white/5 hover:bg-white/10 transition-colors">
          Cut
        </button>
        <button onClick={cutToPreview} className="flex-1 py-3 rounded-lg btn-active text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border border-[#00F5FF]/50 shadow-[0_0_15px_rgba(0,245,255,0.4)]">
          Auto
        </button>
        <button onClick={cutToPreview} className="flex-1 py-3 rounded-lg glass text-[10px] font-bold uppercase tracking-widest border-white/5 hover:bg-white/10 transition-colors">
          Sports Wipe
        </button>
      </div>

      <button className="px-6 py-3 rounded-xl bg-orange-600 font-black text-xs uppercase italic tracking-widest shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:bg-orange-500 transition-colors border border-orange-400/50">
        Instant Replay
      </button>
    </div>
  );
}
