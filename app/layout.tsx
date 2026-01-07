import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Bookwise - Accounting made easy",
  description: "Manage your accounting company with Bookwise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
