import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/navigationBar";
import { Card } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <NavigationBar />
            <div className="p-8">
              <h1 className="text-2xl font-bold">Welcome back username!</h1>
              <Card className="flex justify-around mt-4">{children}</Card>
            </div> 
        </body>
    </html>
  );
}
