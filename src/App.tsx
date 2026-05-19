import { StudioLayout } from './components/studio/StudioLayout';
import { OverlayBuilder } from './components/builder/OverlayBuilder';
import { useStudioStore } from './store/useStudioStore';

export default function App() {
  const view = useStudioStore(s => s.view);
  return view === 'studio' ? <StudioLayout /> : <OverlayBuilder />;
}
