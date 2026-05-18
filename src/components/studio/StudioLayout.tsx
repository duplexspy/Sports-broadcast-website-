import { useEffect } from 'react';
import { TopBar } from './TopBar';
import { ScoreControls } from './ScoreControls';
import { ProgramMonitor } from './ProgramMonitor';
import { PreviewGrid } from './PreviewGrid';
import { ActionPanel } from './ActionPanel';
import { useStudioStore } from '../../store/useStudioStore';

export function StudioLayout() {
  const { isLive, incrementStreamTimer } = useStudioStore();

  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(incrementStreamTimer, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive, incrementStreamTimer]);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#08080A]">
      <TopBar />
      
      {/* Main Layout Area - Below TopBar */}
      <div className="flex-1 flex pt-12 overflow-hidden h-full">
        {/* Left Side: Score Controls */}
        <ScoreControls />

        {/* Center/Right Area */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden relative">
           
           <div className="flex flex-1 gap-4 overflow-hidden">
               {/* Main Program Output */}
               <ProgramMonitor />
               
               {/* Action Panel */}
               <ActionPanel />
           </div>

           {/* Bottom area with Preview Cameras grid */}
           <div className="h-44 shrink-0 bg-transparent rounded-xl flex gap-4">
               <div className="flex-1 overflow-x-auto flex gap-3 pb-2 items-center px-1">
                   {/* Preview Grid equivalent but horizontal */}
                   <PreviewGridHorizontal />
               </div>
           </div>

        </div>
      </div>
    </div>
  );
}

// Temporary inline horizontal preview grid since layout fits horizontal better
function PreviewGridHorizontal() {
  const { cameras, previewCameraId, activeCameraId, setPreviewCamera } = useStudioStore();
  
  return (
    <>
      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest leading-tight -rotate-180" style={{ writingMode: 'vertical-rl' }}>Inputs</div>
      {cameras.map(camera => {
        const isPreview = previewCameraId === camera.id;
        const isActive = activeCameraId === camera.id;
        
        return (
          <div 
            key={camera.id}
            onClick={() => setPreviewCamera(camera.id)}
            className={`
              relative overflow-hidden rounded-lg h-36 aspect-video shrink-0 cursor-pointer transition-all border-2
              ${isActive ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 
                isPreview ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 
                'border-zinc-800 hover:border-zinc-600'}
            `}
          >
            {camera.mockUrl ? (
              <img src={camera.mockUrl} alt={camera.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <span className="text-zinc-600 font-mono text-[10px]">OFFLINE</span>
              </div>
            )}
            
            <div className="absolute top-1.5 right-1.5 flex gap-1">
              {isActive && <div className="bg-red-500 text-white text-[8px] font-bold px-1 rounded-sm shadow border border-red-400">PGM</div>}
              {isPreview && <div className="bg-green-500 text-white text-[8px] font-bold px-1 rounded-sm shadow border border-green-400">PRV</div>}
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-2 pt-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold tracking-wide text-white shadow-sm">{camera.name}</span>
                <span className="text-[8px] font-mono text-green-400">{camera.battery}%</span>
              </div>
            </div>
          </div>
        )
      })}
      
      <button className="h-36 shrink-0 aspect-video ml-2 border border-dashed border-zinc-700/50 hover:border-zinc-500 rounded-lg flex flex-col gap-2 items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-900/50">
        <span className="text-[10px] font-bold uppercase tracking-wider text-center px-4">Add WiFi<br/>Camera</span>
      </button>
    </>
  );
}
