import { create } from 'zustand';

export type SportType = 'football' | 'basketball' | 'tennis' | 'mma' | 'volleyball' | 'kabaddi' | 'hockey' | 'badminton' | 'tableTennis';

export type AppView = 'studio' | 'overlayBuilder';

export interface CameraFeed {
  id: string;
  name: string;
  type: 'main' | 'goal' | 'audience' | 'commentary' | 'replay' | 'local';
  status: 'online' | 'offline' | 'connecting';
  battery?: number;
  mockUrl?: string;
  stream?: MediaStream;
  connectedAt?: Date;
}

interface ScoreData {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  timer: number;
  timerRunning: boolean;
  period: string;
  extra?: {
     team1Cards?: number; // Football
     team2Cards?: number;
     possession?: number;
     fouls?: number[];
  }
}

interface StudioState {
  view: AppView;
  setView: (view: AppView) => void;
  sport: SportType;
  setSport: (sport: SportType) => void;
  
  cameras: CameraFeed[];
  activeCameraId: string | null;
  previewCameraId: string | null;
  
  setActiveCamera: (id: string) => void;
  setPreviewCamera: (id: string) => void;
  cutToPreview: () => void;
  
  isLive: boolean;
  toggleLive: () => void;
  
  streamTimer: number;
  incrementStreamTimer: () => void;
  
  scoreData: ScoreData;
  updateScore: (updates: Partial<ScoreData>) => void;
  
  overlaysVisible: boolean;
  toggleOverlays: () => void;
  
  // Graphics
  activeGraphic: 'none' | 'goal' | 'lowerThird' | 'replay';
  triggerGraphic: (type: 'none' | 'goal' | 'lowerThird' | 'replay') => void;
  
  addLocalCamera: () => Promise<void>;
}

const mockCameras: CameraFeed[] = [
  { id: 'cam1', name: 'Main Cam', type: 'main', status: 'online', battery: 92, mockUrl: 'https://images.unsplash.com/photo-1518605368461-1ee7e50220fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
  { id: 'cam2', name: 'Goal Cam Left', type: 'goal', status: 'online', battery: 84, mockUrl: 'https://images.unsplash.com/photo-1522778526582-75ca440c9bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
  { id: 'cam3', name: 'Coach Cam', type: 'audience', status: 'online', battery: 45, mockUrl: 'https://images.unsplash.com/photo-1554068344-93ab18b321a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
  { id: 'cam4', name: 'Replay Cam', type: 'replay', status: 'offline', battery: 0 },
];

export const useStudioStore = create<StudioState>((set, get) => ({
  view: 'studio',
  setView: (view) => set({ view }),
  sport: 'football',
  setSport: (sport) => set({ sport }),
  
  cameras: mockCameras,
  activeCameraId: 'cam1',
  previewCameraId: 'cam2',
  
  setActiveCamera: (id) => set({ activeCameraId: id }),
  setPreviewCamera: (id) => set({ previewCameraId: id }),
  cutToPreview: () => {
    const { previewCameraId, activeCameraId } = get();
    if (previewCameraId) {
      set({ activeCameraId: previewCameraId, previewCameraId: activeCameraId });
    }
  },
  
  isLive: false,
  toggleLive: () => set((state) => ({ isLive: !state.isLive, streamTimer: 0 })),
  
  streamTimer: 0,
  incrementStreamTimer: () => set((state) => ({ streamTimer: state.streamTimer + 1 })),
  
  scoreData: {
    team1Name: 'RM',
    team2Name: 'FCB',
    team1Score: 0,
    team2Score: 0,
    timer: 0,
    timerRunning: false,
    period: '1st Half'
  },
  
  updateScore: (updates) => set((state) => ({ scoreData: { ...state.scoreData, ...updates } })),
  
  overlaysVisible: true,
  toggleOverlays: () => set((state) => ({ overlaysVisible: !state.overlaysVisible })),
  
  activeGraphic: 'none',
  triggerGraphic: (type) => {
    set({ activeGraphic: type });
    if (type !== 'none') {
      setTimeout(() => {
        set((state) => state.activeGraphic === type ? { activeGraphic: 'none' } : state);
      }, 4000);
    }
  },

  addLocalCamera: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      const newCam: CameraFeed = {
        id: `cam-local-${Date.now()}`,
        name: 'Local Cam',
        type: 'local',
        status: 'online',
        battery: 100,
        stream: stream,
      };
      set((state) => ({ cameras: [...state.cameras, newCam] }));
    } catch (e) {
      console.error('Error accessing local camera', e);
      alert('Could not access local camera.');
    }
  }
}));
