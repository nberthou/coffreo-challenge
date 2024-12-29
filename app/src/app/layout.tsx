"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RaceProvider } from "@/context/RaceContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={client}>
          <RaceProvider>
            <main className="w-screen h-screen grid place-items-center">
              <div className="text-center">{children}</div>
            </main>
          </RaceProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
