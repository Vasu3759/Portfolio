import "./globals.css";

export const metadata = {
  title: "Vasudev Bansal | Software Engineer",
  description: "I don't just write code. I engineer systems.",
};

import Scene from '@/components/canvas/Scene';
import Cursor from '@/components/ui/Cursor';
import AudioManager from '@/components/audio/AudioManager';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AudioManager />
        <Scene />
        <Cursor />
        <div className="texture-overlay"></div>
        {children}
      </body>
    </html>
  );
}
