import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@repo/ui/lib/utils";
import { Toaster } from '@repo/ui/components/sonner'
import { SessionProvider } from "next-auth/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findorra",
  description: "AI Powered - Local Business Discovery Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geistSans.variable, geistMono.variable)}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <SessionProvider>
              {children}
            </SessionProvider>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
