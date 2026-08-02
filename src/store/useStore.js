import { create } from 'zustand';

export const useStore = create((set) => ({
  isBooted: false,
  setBooted: (status) => set({ isBooted: status }),
  
  isAudioEnabled: true,
  setAudioEnabled: (status) => set({ isAudioEnabled: status }),
  
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
}));
