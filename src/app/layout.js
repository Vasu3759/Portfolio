import "./globals.css";

export const metadata = {
  title: "Vasudev Bansal | The Bansal Gazette",
  description: "Bilingual Software Engineer. Interactive Recruiter Broadsheet & Case Studies.",
};

import Cursor from '@/components/ui/Cursor';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <div className="texture-overlay"></div>
        {children}
      </body>
    </html>
  );
}


