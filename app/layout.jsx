import localFont from "next/font/local";
import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import DarkModeProvider from "@/providers/DarkModeProvider";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ZedKala",
  description: "ZedKala Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <DarkModeProvider>
        <html lang="fa" dir="rtl">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <div>
              <Toaster position="top-center" />
            </div>
          </body>
        </html>
      </DarkModeProvider>
    </ReactQueryClientProvider>
  );
}
