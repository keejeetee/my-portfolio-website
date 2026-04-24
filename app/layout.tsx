import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kent Genesis — AI Automation Specialist",
  description:
    "AI Automation Specialist and Agentic Developer from Davao del Sur, PH. Ask my avatar anything about my projects, skills, and how I can automate your business.",
  openGraph: {
    title: "Kent Genesis — AI Automation Specialist",
    description:
      "An AI-native portfolio. Chat with my avatar to learn about my work in Claude Code, n8n, Zapier, Make, and agentic development.",
    type: "website",
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = 'dark';
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
