import type { Metadata } from "next";
import { Bungee } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary ${bungee.className} container mx-auto`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
