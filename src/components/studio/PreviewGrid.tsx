import { useStudioStore, CameraFeed } from '../../store/useStudioStore';

function PreviewCard({ camera, isActive }: { camera: CameraFeed; isActive: boolean; key?: string }) {
  const { setActiveCamera } = useStudioStore();
  
  const isLowBattery = camera.battery !== undefined && camera.battery < 20;
  const isPoorSignal = camera.status === 'connecting' || camera.status === 'offline';
  
  return (
    <div 
      onClick={() => setActiveCamera(camera.id)}
      className={`
        relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all
        ${isActive ? 'neon-border' : 'border border-white/10 grayscale-[0.4] hover:grayscale-0'}
        ${isPoorSignal ? 'opacity-70' : ''}
      `}
    >
      {camera.mockUrl ? (
        <img src={camera.mockUrl} alt={camera.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-black/80 flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-white/20 text-3xl">videocam_off</span>
          <span className="text-white/40 font-mono text-[10px] uppercase">{camera.status}</span>
        </div>
      )}
      
      {/* Active Tally indicator overlay */}
      {isActive && (
        <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none"></div>
      )}

      {/* Top Indicators */}
      <div className="absolute top-1 right-1 left-1 flex justify-between items-start pointer-events-none">
        <div className="flex gap-1">
          {isActive && (
            <span className="text-[9px] font-bold bg-[#00F5FF] text-black px-1.5 py-0.5 rounded shadow">PGM</span>
          )}
        </div>
        <div className="flex gap-1">
          {isLowBattery && (
             <span className="text-[8px] bg-red-600 px-1 py-0.5 rounded flex items-center shadow" title="Low Battery">
               BAT {camera.battery}%
             </span>
          )}
          {isPoorSignal && (
             <span className="text-[8px] bg-orange-600 px-1 py-0.5 rounded flex items-center shadow" title="Poor Signal">
               WARN
             </span>
          )}
          <span className="text-[8px] font-mono bg-black/60 px-1 py-0.5 rounded text-white/80 backdrop-blur-sm">
            {camera.status === 'online' ? '1080p' : '---'}
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-1 left-1 right-1">
        <div className="text-[10px] font-bold text-white drop-shadow-md truncate bg-black/40 px-1.5 py-0.5 rounded w-fit backdrop-blur-sm">
          {camera.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export function PreviewGrid() {
  const { cameras, activeCameraId } = useStudioStore();
  
  return (
    <>
      <h3 className="text-[10px] font-bold text-gray-500 uppercase px-1 shrink-0">Camera Switcher</h3>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {cameras.map(cam => (
            <PreviewCard key={cam.id} camera={cam} isActive={cam.id === activeCameraId} />
          ))}

          {/* Add Camera Slot */}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer transition-all border-dashed hover:border-white/30 hover:bg-white/5">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-50">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-[8px] uppercase font-bold tracking-widest text-center mt-1">Add Codec /<br/>Local Cam</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
