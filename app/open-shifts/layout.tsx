import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/navigation-bar";
import { Card } from "@/components/ui/card";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRoleById } from "@/lib/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Shifts",
  description: "",
};

export default async function OpenShiftsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //protect route
  const result = await verifyAuth();

  if(!result.user) {
    return redirect('/');
  }

  const role = getRoleById(result.user.id);

  return (
    <html lang="en">
        <body className={inter.className}>
            <NavigationBar role={role}/>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Available Open Shifts</h1>
              <Card className="flex justify-around mt-4">{children}</Card>
            </div> 
        </body>
    </html>
  );
}
