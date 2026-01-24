import type { Metadata } from "next";
import "./globals.css";
import { Pathway_Extreme } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner";


const pathwayExtreme = Pathway_Extreme({
  variable: "--font-pathway-extreme",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  icons:{
    icon: [{
      media: "(prefers-color-scheme: light)",
      url: "/images/favicon-light.png",
      type: "image/png",
      href: "/images/favicon-light.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/images/favicon-dark.png",
      type: "image/png",
      href: "/images/favicon-dark.png",
    }]
  },
  title: "BookWise - Manage Accounting team",
  description: "Manage your accounting team with BookWise - the ultimate accounting dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={` ${pathwayExtreme.className}  antialiased min-h-screen relative before:absolute before:inset-0 before:bg-[url('/texture.png')] before:bg-size-[180px] before:bg-repeat before:opacity-[0.035] before:pointer-events-none before:z-100`}
      >
        {children}
           <Toaster  position="bottom-right" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
