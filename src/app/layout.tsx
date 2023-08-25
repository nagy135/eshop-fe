import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Categories from "./components/categories/categories";
import Provider from "./provider";
import Banner from "./components/banner";
import Login from "./components/login";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eshop",
  description: "Eshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toaster />
          <Banner />
          <Login />
          <Categories />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
