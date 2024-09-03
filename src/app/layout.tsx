import type { Metadata } from "next";
import { GlobalProvider } from "@/context/GlobalContext";
import { Roboto } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Queens",
  description: "A game from LinkedIn",
  openGraph: {
    title: "Queens",
    description: "A game from LinkedIn",
    images: [
      {
        url: "/queens.jpg",
        width: 600,
        height: 600,
        alt: "Queens Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queens",
    description: "A game from LinkedIn",
    images: ["/queens.jpg"],
  },
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
