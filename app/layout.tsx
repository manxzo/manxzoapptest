import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Link from "next/link";
import { User } from "lucide-react";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="mx-auto w-full min-h-screen">
            {children}
            <Link
              href="/admin"
              className="fixed bottom-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition-colors"
            >
              <User className="h-4 w-4 text-white" />
            </Link>
          </main>
        </Providers>
      </body>
    </html>
  );
}
