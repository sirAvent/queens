import type { Metadata } from "next";
import { GlobalProvider } from "@/context/GlobalContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Queens",
  description: "A game from LinkedIn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
