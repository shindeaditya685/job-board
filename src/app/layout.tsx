import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Board",
  description: "Best Job's finding website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
          <footer className="container py-8 text-gray-500">
            Job Board &copy; 2024 - All rights reserved
          </footer>
        </Suspense>
      </body>
    </html>
  );
}
