"use client";
import localFont from "next/font/local";
import {  Inter, Nunito , Geist, Geist_Mono, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/ui/Header";
import { usePathname } from "next/navigation";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "../fonts/satoshi/Satoshi-Bold.ttf", weight: "700", style: "bold" },
    {
      path: "../fonts/satoshi/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const switzer = localFont({
  src: [
    {
      path: "../fonts/switzer/Switzer-Regular.otf",
      weight: "400",
      style: "normal",
    },
    { path: "../fonts/switzer/Switzer-Bold.otf", weight: "700", style: "bold" },
    {
      path: "../fonts/switzer/Switzer-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/switzer/Switzer-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/switzer/Switzer-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/switzer/Switzer-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-switzer",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/sign");

  return (
    <html lang="en">
      <body
        className={`${switzer.variable} ${satoshi.variable} ${inter.variable} ${nunito.variable} ${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable}  antialiased`}
      >
        <ToastContainer />
        {!isAuth && <Header />}

        <section>{children}</section>
      </body>
    </html>
  );
}
