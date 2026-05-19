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
    <div className="w-screen h-screen flex flex-col bg-[#0A0B0E] p-4 text-[#E0E0E0] overflow-hidden">
      <TopBar />
      
      <main className="flex-1 grid grid-cols-12 gap-4 overflow-hidden pt-2">
        {/* Left Side: Score Controls */}
        <section className="col-span-3 flex flex-col gap-3 overflow-hidden h-full">
           <ScoreControls />
        </section>

        {/* Center: Program Monitor + Actions */}
        <section className="col-span-6 flex flex-col gap-4 h-full overflow-hidden">
          <ProgramMonitor />
          <ActionPanel />
        </section>

        {/* Right Side: Cameras */}
        <section className="col-span-3 flex flex-col gap-3 overflow-hidden h-full">
           <PreviewGrid />
        </section>
      </main>
    </div>
  );
}

