import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skyvilla Sudirman | 62 Stories Above the Ordinary",
  description:
    "Skyvilla Sudirman — Jakarta's most daring residential tower. 62 floors of bold luxury in the heart of SCBD. Sky Penthouses, Infinity Pool, and unmatched city views.",
  keywords:
    "Skyvilla Sudirman, luxury apartment Jakarta, SCBD residence, sky penthouse, premium living Jakarta",
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
