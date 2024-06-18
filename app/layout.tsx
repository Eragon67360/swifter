import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";

import "./globals.css";
import Navigation from "@/components/Navigation";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", });

export const metadata: Metadata = {
  title: "Swiftter",
  description: "A wonderful Social Network for Swifties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dancing.variable} ${inter.variable} light`}>
        <Providers>
          {children}
          <Navigation />
        </Providers>
      </body>
    </html>
  );
}
