import { AnimatePresence, motion } from 'motion/react';
import { useStudioStore } from '../../store/useStudioStore';

function BaseScorecard() {
  const { scoreData, overlaysVisible, sport } = useStudioStore();
  
  if (!overlaysVisible) return null;

  // Let's create an ESPN/Star Sports style modern base scorecard wrapper
  const isBasketball = sport === 'basketball';
  const isTennis = sport === 'tennis' || sport === 'volleyball';
  const isMMA = sport === 'mma';
  const isKabaddi = sport === 'kabaddi';

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
      {/* Top Banner indicating match context, typical for broadcasting */}
      <div className="flex bg-black/60 backdrop-blur-md rounded-t-md px-3 py-1 w-fit border-b border-zinc-500/30">
        <span className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">
           {isBasketball ? 'FINALS - GAME 7' : isTennis ? 'CHAMPIONSHIP MATCH' : isMMA ? 'MAIN EVENT' : isKabaddi ? 'SUPER RAID STAGE' : 'CHAMPIONS LEAGUE'}
        </span>
      </div>

      <div className="flex gap-2 items-start">
        {/* Main Score Pill */}
        <div className="flex items-stretch bg-zinc-950/90 backdrop-blur-lg rounded-b-lg rounded-tr-lg overflow-hidden border border-white/10 shadow-2xl">
          {/* Team 1 */}
          <div className="flex flex-col justify-center px-4 py-2 bg-gradient-to-r from-blue-900/60 to-transparent min-w-[80px]">
            <span className="font-display font-bold text-xl leading-none text-white">{scoreData.team1Name}</span>
          </div>
          
          {/* Scores */}
          <div className="flex items-center bg-zinc-900/90 px-3 border-x border-zinc-800">
            <span className="font-display font-bold text-3xl w-10 text-center">{scoreData.team1Score}</span>
            {isTennis && <span className="font-mono text-sm text-yellow-500 px-1 ml-1">{scoreData.extra?.team1Cards || 0}</span>}
            <span className="text-zinc-600 font-bold mx-1 text-xl">-</span>
            {isTennis && <span className="font-mono text-sm text-yellow-500 px-1 mr-1">{scoreData.extra?.team2Cards || 0}</span>}
            <span className="font-display font-bold text-3xl w-10 text-center">{scoreData.team2Score}</span>
          </div>
          
          {/* Team 2 */}
          <div className="flex flex-col justify-center px-4 py-2 bg-gradient-to-l from-red-900/60 to-transparent min-w-[80px] items-end">
            <span className="font-display font-bold text-xl leading-none text-white">{scoreData.team2Name}</span>
          </div>
        </div>

        {/* Timer / Period Pill */}
        {!isTennis && (
          <div className="flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-lg rounded-lg border border-white/10 px-4 min-w-[90px] self-stretch shadow-2xl border-l-4 border-l-yellow-500">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">{scoreData.period}</div>
            <div className="font-mono text-xl font-bold text-yellow-400 leading-none mt-1.5 tracking-tight">
               {Math.floor(scoreData.timer / 60)}:{(scoreData.timer % 60).toString().padStart(2, '0')}
            </div>
            {isBasketball && <div className="text-[9px] text-red-500 mt-1 font-bold animate-pulse">SHOT CLOCK: 14</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function GoalAnimation() {
  const { activeGraphic, scoreData } = useStudioStore();
  
  if (activeGraphic !== 'goal') return null;
  
  return (
    <div className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center animate-in fade-in zoom-in duration-300">
       <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.6)] skew-x-[-10deg] flex flex-col items-center">
         <span className="font-display font-black text-6xl text-white italic tracking-tighter uppercase mb-2 drop-shadow-2xl">
           GOAL!
         </span>
         <span className="font-display font-bold text-2xl text-white tracking-widest">{scoreData.team1Name}</span>
       </div>
    </div>
  );
}

function LowerThird() {
  const { activeGraphic } = useStudioStore();
  
  if (activeGraphic !== 'lowerThird') return null;

  return (
    <div className="absolute bottom-8 left-8 py-2 px-6 z-40 animate-in slide-in-from-left duration-500">
      <div className="bg-white/90 backdrop-blur-md rounded-tr-xl border-l-4 border-blue-600 shadow-2xl p-4 min-w-[300px]">
        <h3 className="font-display font-bold text-2xl text-zinc-900 mb-1 leading-none uppercase">Live Broadcasting</h3>
        <p className="text-zinc-600 font-mono text-sm tracking-tight">Studio Quality Output • Multicam</p>
      </div>
    </div>
  );
}

function ReplayOverlay() {
  const { activeGraphic } = useStudioStore();
  
  if (activeGraphic !== 'replay') return null;

  return (
    <div className="absolute top-8 right-8 z-40 animate-in fade-in duration-300">
       <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-sm font-bold text-zinc-300 tracking-widest">REPLAY R</span>
       </div>
    </div>
  );
}

export function ProgramMonitor() {
  const { cameras, activeCameraId, isLive } = useStudioStore();
  
  const activeCamera = cameras.find(c => c.id === activeCameraId);

  return (
    <div className="relative flex-1 bg-black rounded-xl overflow-hidden border border-zinc-800 ring-1 ring-black shadow-2xl flex flex-col">
      {/* Program Output Label */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm shadow-md">PGM</div>
        {isLive && (
           <div className="bg-red-600 flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm shadow-md animate-[pulse_2s_ease-in-out_infinite]">
             <div className="w-1.5 h-1.5 bg-white rounded-full" />
             LIVE
           </div>
        )}
      </div>

      {/* Graphics Overlays */}
      <GoalAnimation />
      <LowerThird />
      <ReplayOverlay />
      
      {/* Scorecard Overlays */}
      <BaseScorecard />

      {/* Video Feed Placeholder */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeCamera?.id || 'none'}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeCamera?.mockUrl ? (
              <img src={activeCamera.mockUrl} alt="Program" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900 absolute">
                <span className="text-zinc-500 font-mono">NO SIGNAL</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Camera Stats Overlay (Small terminal style text) */}
      <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] text-white/50 space-y-1 drop-shadow-md">
        <div>CAM: {activeCamera?.name || 'NONE'}</div>
        <div>NET: {activeCamera?.status === 'online' ? 'STABLE 5G' : 'ERR'}</div>
        <div>BAT: {activeCamera?.battery ?? '--'}%</div>
      </div>
    </div>
  );
}
