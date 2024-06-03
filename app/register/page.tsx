"use client";

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { signup } from "@/lib/auth-actions";
import { useFormState } from "react-dom";


export default function RegisterPage() {

  const [formState, formAction] = useFormState(signup, {});

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <Card className="w-[350px] p-4 shadow-md">
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Please enter your credentials to create an account.</CardDescription>
          </CardHeader>
          <CardContent>
            
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="Username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm Password" />
                </div>
              </div>
            
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button type="submit">Register</Button>
            <Link href="/">
              <p className="text-sm">Already have an account? Sign in</p>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

