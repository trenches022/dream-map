import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface IDream {
  id: string;
  description: string;
  tags: string[];
  feelings: string[];
}

interface DreamStore {
  dreams: IDream[];
  addDream: (dream: Omit<IDream, 'id'>) => void;
  removeDream: (id: string) => void;
  updateDream: (id: string, updatedDream: Partial<IDream>) => void;
}

export const useDreamStore = create<DreamStore>()(
  persist(
    (set) => ({
      dreams: [],
      addDream: (dream) =>
        set((state) => ({
          dreams: [...state.dreams, { ...dream, id: uuidv4() }],
        })),
      removeDream: (id) =>
        set((state) => ({
          dreams: state.dreams.filter((dream) => dream.id !== id),
        })),
      updateDream: (id, updatedDream) =>
        set((state) => ({
          dreams: state.dreams.map((dream) =>
            dream.id === id ? { ...dream, ...updatedDream } : dream
          ),
        })),
    }),
    {
      name: 'dream-map-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);