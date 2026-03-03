import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skyvilla Sudirman | Sky-High Luxury Living in Jakarta",
  description:
    "Skyvilla Sudirman — Private villas in the sky above Jakarta's most prestigious boulevard. 62 stories of panoramic luxury with Sky Penthouses, Infinity Pool, and Helipad.",
  keywords:
    "Skyvilla Sudirman, luxury sky villa Jakarta, SCBD penthouse, sky garden residence, premium living Jakarta, Sudirman CBD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
