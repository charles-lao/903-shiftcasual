"use client";
import { db } from "@/db/index";
import { userTable } from "@/db/schema"
import * as React from "react";
 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/lib/auth-actions";


export default function Home() {


  const [formState, formAction] = useFormState(login, {});

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <form action={formAction}>
        <Card className="w-[350px] p-4 shadow-md">
          <CardHeader>
            <CardTitle>Login account</CardTitle>
            <CardDescription>Please enter your credentials to log in.</CardDescription>
          </CardHeader>
          <CardContent>
            
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="Username" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Password" required />
                </div>

                {formState.errors && (
                  Object.keys(formState.errors).map((error) => (
                    <p className="text-red-500">{formState.errors[error]}</p>
                  ))
                )}

              </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button type="submit">Login</Button>
            <Link href="/register">
              <p className="text-sm">Don&apos;t have an account? Sign up</p>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

