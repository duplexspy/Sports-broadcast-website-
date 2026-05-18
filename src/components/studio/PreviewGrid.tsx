import { useStudioStore, CameraFeed } from '../../store/useStudioStore';

function PreviewCard({ camera, key }: { camera: CameraFeed, key?: string }) {
  const { previewCameraId, activeCameraId, setPreviewCamera } = useStudioStore();
  
  const isPreview = previewCameraId === camera.id;
  const isActive = activeCameraId === camera.id;
  
  return (
    <div 
      onClick={() => setPreviewCamera(camera.id)}
      className={`
        relative overflow-hidden rounded-lg aspect-video cursor-pointer transition-all border-2
        ${isActive ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 
          isPreview ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 
          'border-zinc-800 hover:border-zinc-600'}
      `}
    >
      {camera.mockUrl ? (
        <img src={camera.mockUrl} alt={camera.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
          <span className="text-zinc-600 font-mono text-xs">OFFLINE</span>
        </div>
      )}
      
      {/* Tally Light Overlay */}
      <div className="absolute top-2 right-2 flex gap-1">
        {isActive && <div className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">PGM</div>}
        {isPreview && <div className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">PRV</div>}
      </div>

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-2 pt-6">
        <div className="flex justify-between items-end">
          <span className="text-xs font-medium text-white shadow-sm">{camera.name}</span>
          <span className="text-[10px] font-mono text-white/70">{camera.battery}%</span>
        </div>
      </div>
    </div>
  );
}

export function PreviewGrid() {
  const { cameras } = useStudioStore();
  
  return (
    <div className="h-full bg-zinc-950/50 rounded-xl border border-zinc-800/50 p-3 overflow-y-auto w-64 xl:w-80 flex flex-col gap-3">
      <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1 mb-1">Inputs</div>
      <div className="grid grid-cols-1 gap-3">
        {cameras.map(cam => (
          <PreviewCard key={cam.id} camera={cam} />
        ))}
      </div>
      
      <button className="h-16 mt-2 border border-dashed border-zinc-800 hover:border-zinc-600 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors">
        <span className="text-xs font-medium uppercase tracking-wider">+ Add Camera QR</span>
      </button>
    </div>
  );
}
