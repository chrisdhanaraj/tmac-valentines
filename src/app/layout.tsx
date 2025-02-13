import type { Metadata } from "next";
import dolo from "./images/og-graph.jpg";

import "./globals.css";

export const metadata: Metadata = {
  title: "TMAC Valentine Card Generator",
  description:
    "Love All is what we rally for 🎾❤️ Tmac creatives, @sfmola & @florentific, teamed up to serve some fun V-Day cards—perfect for your rally buddy or doubles sweetheart!",
  openGraph: {
    images: [dolo.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-pink-50">{children}</body>
    </html>
  );
}
