"use client";

import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
    };
  }
}

export function CalendlyBadge() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.Calendly?.initBadgeWidget({
            url: "https://calendly.com/bjtenebro/ai-automation-lead-generation",
            text: "Book a call",
            color: "#0069ff",
            textColor: "#ffffff",
            branding: true,
          });
        }}
      />
    </>
  );
}
