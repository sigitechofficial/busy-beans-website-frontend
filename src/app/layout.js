"use client";
import localFont from "next/font/local";
import {
  Inter,
  Nunito,
  Roboto_Serif,
  Playfair_Display,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/ui/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/ui/Footer";
import { Provider } from "@/components/ui/provider"


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
  display: "swap",
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
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  display: "swap",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/sign");

  return (
    <html lang="en">
      <body
        className={`${switzer.variable} ${satoshi.variable} ${inter.variable} ${nunito.variable} ${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Provider>
        <ToastContainer />
        {!isAuth && <Header />}

        <section>{children}</section>
        {!isAuth && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
