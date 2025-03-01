import type { Metadata } from "next";
import { Bree_Serif, Lato, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Badge from "@/components/Badge";

const breeSerif = Bree_Serif({
  variable: "--font-bree-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "MoneyHive",
  description: "MoneyHive is a modern banking platform for everyone.",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${breeSerif.variable} ${lato.variable} ${robotoMono.variable} antialiased`}
      >
        <Badge />
        {children}
      </body>
    </html>
  );
}
