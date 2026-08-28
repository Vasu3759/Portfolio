'use client';

// Sound system disabled completely by user request.
// Mock playSound function to prevent runtime errors in other modules.
export const sounds = {
  keyboard: null,
  paper: null,
  switch: null,
  hum: null,
  beep: null,
  crt: null
};

export default function AudioManager() {
  return null; // Headless component
}

export const playSound = () => {
  // No-op
};
