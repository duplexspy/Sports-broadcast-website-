import { useState, useEffect } from 'react';
import { useStudioStore, SportType } from '../../store/useStudioStore';
import { Play, Square, RotateCcw, Plus, Minus, Settings2 } from 'lucide-react';

export function ScoreControls() {
  const { scoreData, updateScore, sport, setSport, triggerGraphic } = useStudioStore();
  
  useEffect(() => {
    let interval: any;
    if (scoreData.timerRunning) {
      interval = setInterval(() => {
        updateScore({ timer: scoreData.timer + 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [scoreData.timerRunning, scoreData.timer, updateScore]);

  return (
    <div className="w-80 bg-zinc-950 border-r border-zinc-800 flex flex-col pt-12 z-40 relative shadow-[5px_0_20px_rgba(0,0,0,0.5)]">
      
      {/* Sport Selector */}
      <div className="p-3 border-b border-zinc-800/50 bg-zinc-900 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sport Engine</span>
        <select 
          value={sport}
          onChange={(e) => setSport(e.target.value as SportType)}
          className="bg-zinc-800 border border-zinc-700/50 rounded text-xs px-2 py-1 outline-none focus:border-blue-500 font-bold"
        >
          <option value="football">Football / Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="tennis">Tennis / Badminton</option>
          <option value="volleyball">Volleyball</option>
          <option value="kabaddi">Kabaddi</option>
          <option value="hockey">Hockey</option>
          <option value="mma">MMA / Boxing</option>
        </select>
      </div>

      <div className="p-4 border-b border-zinc-800/80 bg-black/40">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Score Editor</h2>
        
        {/* Controls Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
             <input 
               className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm font-bold text-center text-blue-400 focus:outline-none focus:border-blue-500"
               value={scoreData.team1Name}
               onChange={(e) => updateScore({ team1Name: e.target.value.toUpperCase().slice(0, 4) })}
               maxLength={4}
             />
             <div className="flex gap-1 justify-center bg-zinc-950 border border-zinc-800 rounded p-1">
                <button onClick={() => updateScore({ team1Score: Math.max(0, scoreData.team1Score - 1) })} className="w-8 h-8 flex items-center justify-center bg-zinc-900 rounded hover:bg-zinc-800 active:bg-zinc-700 text-zinc-400"><Minus size={16} /></button>
                <div className="w-10 h-8 flex items-center justify-center font-display font-bold text-xl">{scoreData.team1Score}</div>
                <button onClick={() => updateScore({ team1Score: scoreData.team1Score + 1 })} className="w-8 h-8 flex items-center justify-center bg-zinc-900 rounded hover:bg-zinc-800 active:bg-zinc-700 text-zinc-400"><Plus size={16} /></button>
             </div>
          </div>

          <div className="flex flex-col gap-2">
             <input 
               className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm font-bold text-center text-red-500 focus:outline-none focus:border-red-500"
               value={scoreData.team2Name}
               onChange={(e) => updateScore({ team2Name: e.target.value.toUpperCase().slice(0, 4) })}
               maxLength={4}
             />
             <div className="flex gap-1 justify-center bg-zinc-950 border border-zinc-800 rounded p-1">
                <button onClick={() => updateScore({ team2Score: Math.max(0, scoreData.team2Score - 1) })} className="w-8 h-8 flex items-center justify-center bg-zinc-900 rounded hover:bg-zinc-800 active:bg-zinc-700 text-zinc-400"><Minus size={16} /></button>
                <div className="w-10 h-8 flex items-center justify-center font-display font-bold text-xl">{scoreData.team2Score}</div>
                <button onClick={() => updateScore({ team2Score: scoreData.team2Score + 1 })} className="w-8 h-8 flex items-center justify-center bg-zinc-900 rounded hover:bg-zinc-800 active:bg-zinc-700 text-zinc-400"><Plus size={16} /></button>
             </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Timer Control</h3>
        
        <div className="flex items-center gap-2 mb-3">
           <input 
               className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs font-bold text-center text-yellow-400 focus:outline-none focus:border-yellow-500"
               value={scoreData.period}
               onChange={(e) => updateScore({ period: e.target.value.toUpperCase() })}
           />
           <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 font-mono text-center font-bold text-yellow-400">
              {Math.floor(scoreData.timer / 60)}:{(scoreData.timer % 60).toString().padStart(2, '0')}
           </div>
        </div>

        <div className="flex gap-2">
           <button 
             onClick={() => updateScore({ timerRunning: !scoreData.timerRunning })}
             className={`flex-1 flex items-center justify-center gap-1 py-2 rounded text-xs tracking-wide font-bold transition-all ${
                scoreData.timerRunning ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
             }`}
           >
              {scoreData.timerRunning ? <Square size={14} /> : <Play size={14} />}
              {scoreData.timerRunning ? 'STOP' : 'START'}
           </button>
           <button 
             onClick={() => updateScore({ timer: 0, timerRunning: false })}
             className="px-3 py-2 bg-zinc-800 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
           >
              <RotateCcw size={14} />
           </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
         {/* Action Bar based on Sport */}
         {(sport === 'tennis' || sport === 'volleyball' || sport === 'badminton' || sport === 'tableTennis') && (
           <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
             <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Points / Extras</div>
             <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">{scoreData.team1Name} Pts</span>
                <input 
                   type="number"
                   className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-center text-yellow-400 font-mono"
                   value={scoreData.extra?.team1Cards || 0}
                   onChange={e => updateScore({ extra: { ...scoreData.extra, team1Cards: parseInt(e.target.value) || 0 }})}
                />
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm font-bold">{scoreData.team2Name} Pts</span>
                <input 
                   type="number"
                   className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-center text-yellow-400 font-mono"
                   value={scoreData.extra?.team2Cards || 0}
                   onChange={e => updateScore({ extra: { ...scoreData.extra, team2Cards: parseInt(e.target.value) || 0 }})}
                />
             </div>
           </div>
         )}
         
         <div className="space-y-2 mt-auto">
           <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Quick TV Graphics</div>
           <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => triggerGraphic('goal')}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-colors rounded p-2 text-xs text-zinc-300 font-medium"
              >
                Goal Animation
              </button>
              <button 
                onClick={() => triggerGraphic('lowerThird')}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-colors rounded p-2 text-xs text-zinc-300 font-medium"
              >
                Lower Third
              </button>
              <button 
                onClick={() => triggerGraphic('replay')}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-colors rounded p-2 text-xs text-zinc-300 font-medium text-left px-3"
              >
                <span className="block text-white font-bold mb-1">Start Replay</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">5 Sec Buffer</span>
              </button>
              <button 
                onClick={() => triggerGraphic('none')}
                className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-colors rounded p-2 text-xs text-zinc-300 font-medium text-left px-3"
              >
                <span className="block text-white font-bold mb-1">Clear Screen</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Fade Out</span>
              </button>
           </div>
         </div>
      </div>
    </div>
  );
}
