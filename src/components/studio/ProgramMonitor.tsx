import { AnimatePresence, motion } from 'motion/react';
import { useStudioStore } from '../../store/useStudioStore';

function BaseScorecard() {
  const { scoreData, overlaysVisible, sport } = useStudioStore();
  
  if (!overlaysVisible) return null;

  const isBasketball = sport === 'basketball';
  const isTennis = sport === 'tennis' || sport === 'volleyball';
  const isMMA = sport === 'mma';
  const isKabaddi = sport === 'kabaddi';

  return (
    <div className="absolute top-6 left-6 flex items-center bg-black/80 p-0.5 rounded shadow-2xl scale-110 z-20 origin-top-left">
      <div className="bg-white px-2 py-1 flex items-center justify-center rounded-l-sm">
        <span className="text-[#0A0B0E] font-black italic text-sm">
           {isBasketball ? 'NBA' : isTennis ? 'ATP' : isMMA ? 'UFC' : 'PL'}
        </span>
      </div>
      <div className="px-3 flex gap-2 font-bold text-xs">
        <span className="opacity-80 uppercase">{scoreData.team1Name}</span>
        <span className="text-[#00F5FF]">{scoreData.team1Score}</span>
        <span className="opacity-30">:</span>
        <span className="text-[#00F5FF]">{scoreData.team2Score}</span>
        <span className="opacity-80 uppercase">{scoreData.team2Name}</span>
      </div>
      {!isTennis && (
        <div className="bg-red-600 px-2 py-1 text-[10px] font-black rounded-r-sm tracking-[1px]">
          {Math.floor(scoreData.timer / 60).toString().padStart(2, '0')}:{(scoreData.timer % 60).toString().padStart(2, '0')}
        </div>
      )}
    </div>
  );
}

function GoalAnimation() {
  const { activeGraphic, scoreData } = useStudioStore();
  if (activeGraphic !== 'goal') return null;
  return (
    <div className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center animate-in fade-in zoom-in duration-300">
       <div className="bg-gradient-to-r from-[#00F5FF]/80 to-[#0055FF]/80 p-8 rounded-xl shadow-[0_0_50px_rgba(0,245,255,0.4)] backdrop-blur-md flex flex-col items-center">
         <span className="font-sans font-black text-6xl text-white italic tracking-tighter uppercase mb-2 drop-shadow-2xl">
           GOAL!
         </span>
         <span className="font-sans font-bold text-2xl text-white tracking-widest uppercase">{scoreData.team1Name}</span>
       </div>
    </div>
  );
}

function LowerThird() {
  const { activeGraphic, scoreData } = useStudioStore();
  if (activeGraphic !== 'lowerThird') return null;
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 glass p-3 border-l-4 border-l-[#00F5FF] z-40 animate-in slide-in-from-bottom duration-500">
      <div className="text-[10px] font-bold text-[#00F5FF] tracking-widest uppercase mb-1">Live Update</div>
      <div className="text-sm font-black uppercase">TEAM {scoreData.team1Name} AHEAD</div>
      <div className="text-[9px] font-bold opacity-60 uppercase">Possession Control Maintained</div>
    </div>
  );
}

function ReplayOverlay() {
  const { activeGraphic } = useStudioStore();
  if (activeGraphic !== 'replay') return null;
  return (
    <div className="absolute top-6 right-6 z-40 animate-in fade-in duration-300 pointer-events-none">
       <div className="px-3 py-1.5 rounded bg-black/40 backdrop-blur border border-white/10 text-[9px] uppercase font-bold tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="opacity-80">INSTANT REPLAY</span>
       </div>
    </div>
  );
}

export function ProgramMonitor() {
  const { cameras, activeCameraId, isLive, streamTimer } = useStudioStore();
  const activeCamera = cameras.find(c => c.id === activeCameraId);

  const formatStreamTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 rounded-2xl bg-black relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0 pointer-events-none">
        <div className="text-xs uppercase tracking-widest font-mono">Main Program Output</div>
      </div>

      <GoalAnimation />
      <LowerThird />
      <ReplayOverlay />
      <BaseScorecard />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeCamera?.id || 'none'}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeCamera?.mockUrl ? (
              <img src={activeCamera.mockUrl} alt="Program" className="w-full h-full object-cover" />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 z-20 pointer-events-none">
        {isLive && (
          <div className="px-2 py-1 rounded bg-black/40 backdrop-blur border border-white/10 text-[9px] uppercase font-bold tracking-tighter flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            REC {formatStreamTime(streamTimer)}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-white/50 space-y-1 drop-shadow-md pointer-events-none tracking-[1px]">
        <div>CAM: {activeCamera?.name || 'NONE'}</div>
        <div>NET: {activeCamera?.status === 'online' ? 'STABLE 5G' : 'ERR'}</div>
      </div>
    </div>
  );
}
