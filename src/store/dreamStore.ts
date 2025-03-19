import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface IDream {
  id: string;
  description: string;
  tags: string[];
  feelings: string[];
}

interface NodePosition {
  id: string; 
  x: number;
  y: number;
}

interface DreamStore {
  dreams: IDream[];
  nodePositions: Record<string, NodePosition>;
  addDream: (dream: Omit<IDream, 'id'>) => void;
  removeDream: (id: string) => void;
  updateDream: (id: string, updatedDream: Partial<IDream>) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
}

export const useDreamStore = create<DreamStore>()(
  persist(
    (set) => ({
      dreams: [],
      nodePositions: {},
      addDream: (dream) =>
        set((state) => ({
          dreams: [...state.dreams, { ...dream, id: uuidv4() }],
        })),
      removeDream: (id) =>
        set((state) => {
          const newNodePositions = { ...state.nodePositions };
          Object.keys(newNodePositions).forEach((key) => {
            if (key.startsWith(`dream-${id}`)) {
              delete newNodePositions[key];
            }
          });
          return {
            dreams: state.dreams.filter((dream) => dream.id !== id),
            nodePositions: newNodePositions,
          };
        }),
      updateDream: (id, updatedDream) =>
        set((state) => ({
          dreams: state.dreams.map((dream) =>
            dream.id === id ? { ...dream, ...updatedDream } : dream
          ),
        })),
      updateNodePosition: (id, x, y) =>
        set((state) => ({
          nodePositions: {
            ...state.nodePositions,
            [id]: { id, x, y },
          },
        })),
    }),
    {
      name: 'dream-map-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);