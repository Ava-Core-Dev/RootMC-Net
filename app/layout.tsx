import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RootMC Network",
  description: "Official RootMC survival: closed-loop Gold, live market, and progression that stays with you.",
  openGraph: { title: "RootMC Network", description: "Your journey is written in The Root.", url: "https://rootmc.net", siteName: "RootMC" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
