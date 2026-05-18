import { Scissors, Layers, Trophy, Mic2, Tv } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

export function ActionPanel() {
  const { cutToPreview, isLive, toggleLive, overlaysVisible, toggleOverlays } = useStudioStore();

  return (
    <div className="flex flex-col gap-3 w-32 shrink-0">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-2 flex flex-col gap-2 flex-1">
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center py-1">Transition</div>
        <button 
          onClick={cutToPreview}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 rounded-lg flex flex-col items-center justify-center gap-1 transition-all border border-zinc-700/50"
        >
          <Scissors size={20} className="text-zinc-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Cut</span>
        </button>
        <button 
          onClick={cutToPreview}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 rounded-lg flex flex-col items-center justify-center gap-1 transition-all border border-zinc-700/50"
        >
          <Layers size={20} className="text-zinc-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Auto</span>
        </button>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-2 flex flex-col gap-2">
        <button 
          onClick={toggleOverlays}
          className={`h-12 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
            overlaysVisible ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700/50'
          }`}
        >
          <Trophy size={16} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Overlays</span>
        </button>
        <button 
          className="h-12 rounded-lg flex items-center justify-center gap-2 border bg-zinc-800/80 text-zinc-300 border-zinc-700/50 hover:bg-zinc-700 transition-colors"
        >
          <Mic2 size={16} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Mixer</span>
        </button>
      </div>

      <button 
        onClick={toggleLive}
        className={`h-20 rounded-xl flex flex-col items-center justify-center gap-1 font-bold uppercase tracking-wider transition-all border-2 shadow-xl ${
          isLive 
            ? 'bg-red-500 hover:bg-red-600 text-white border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
        }`}
      >
        <Tv size={24} />
        <span className="text-sm mt-1">{isLive ? 'End Stream' : 'Go Live'}</span>
      </button>
    </div>
  );
}
