import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Job Board",
    template: "%s | Job Board",
  },
  description: "Find a job that matches your profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} min-w-[350px]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
