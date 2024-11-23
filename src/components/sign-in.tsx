"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { login } from "@/actions/auth";

export function SignIn() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-rows-2 gap-6">
          <Button variant="outline" onClick={() => login("github")}>
            <GithubIcon className="mr-2 h-4 w-4" />
            Continue with Github
          </Button>
          <Button variant="outline" onClick={() => login("google")}>
            <Image
              src="/google.svg"
              className="mr-2"
              alt={"google"}
              width={16}
              height={16}
            />
            Continue with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
