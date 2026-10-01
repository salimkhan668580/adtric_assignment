import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/src/components/common/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Manthan School",
    template: "%s | The Manthan School",
  },
  description:
    "The Manthan School — admissions, news, events and achievements.",
  icons: {
    icon: "https://adtric.com/wp-content/uploads/2025/01/cropped-favicon-icon-32x32.png",
    shortcut: "https://adtric.com/wp-content/uploads/2025/01/cropped-favicon-icon-32x32.png",
    apple: "https://adtric.com/wp-content/uploads/2025/01/cropped-favicon-icon-32x32.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
