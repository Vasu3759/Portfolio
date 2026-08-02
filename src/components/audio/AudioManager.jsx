'use client';

import { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useStore } from '@/store/useStore';

export const sounds = {
  keyboard: null,
  paper: null,
  switch: null,
  hum: null,
  beep: null,
  crt: null
};

export default function AudioManager() {
  const isAudioEnabled = useStore((state) => state.isAudioEnabled);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Initialize Howl instances (placeholders for actual files)
      // These would ideally point to /sounds/keyboard.mp3 etc in the public folder
      sounds.keyboard = new Howl({ src: ['/sounds/keyboard.wav'], volume: 0.5 });
      sounds.paper = new Howl({ src: ['/sounds/paper.wav'], volume: 0.6 });
      sounds.switch = new Howl({ src: ['/sounds/switch.wav'], volume: 0.7 });
      sounds.beep = new Howl({ src: ['/sounds/beep.wav'], volume: 0.4 });
      sounds.crt = new Howl({ src: ['/sounds/crt-on.wav'], volume: 0.6 });
      
      // Ambient hum loops continuously when enabled
      sounds.hum = new Howl({ 
        src: ['/sounds/ambient-hum.wav'], 
        volume: 0.2, 
        loop: true 
      });

      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Global mute/unmute based on store state
    Howler.mute(!isAudioEnabled);
    
    if (isAudioEnabled && sounds.hum && !sounds.hum.playing()) {
      sounds.hum.play();
    } else if (!isAudioEnabled && sounds.hum) {
      sounds.hum.pause();
    }
  }, [isAudioEnabled]);

  return null; // Headless component
}

// Utility to play sounds from anywhere
export const playSound = (soundName) => {
  const isAudioEnabled = useStore.getState().isAudioEnabled;
  if (!isAudioEnabled || !sounds[soundName]) return;
  sounds[soundName].play();
};
