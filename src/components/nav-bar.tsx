"use client";

import * as React from "react";
import Link from "next/link";
import { LogOutIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { JoinRoom } from "./join-room";

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  expires: string;
}

const Navbar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Services", href: "/services" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-1xl font-bold text-primary">
              100x<span className="text-blue-500">liveArena</span>
            </Link>
          </div>
          <div className="hidden md:block flex-1">
            <div className="flex justify-center items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center justify-end">
              <ModeToggle />
              {session ? (
                <>
                  <div className="ml-4 mr-4">
                    <JoinRoom />{" "}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="relative h-9 w-9 rounded-full"
                      >
                        <Avatar className="h-9 w-h-9">
                          <AvatarImage
                            src={session.user.image}
                            alt={session.user.name}
                          />
                          <AvatarFallback>
                            {session.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold leading-none mb-1">
                            {session.user.name}
                          </p>
                          <p className="text-sm leading-none text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          signOut();
                        }}
                        className="text-red-500 hover:bg-red-100 hover:text-red-600"
                      >
                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button className="ml-4" variant="outline">
                    <JoinRoom />
                  </Button>
                  <Button className="ml-4">
                    <Link href={"/sign-in"}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              variant={"ghost"}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-foreground/10">
            <div className="flex items-center px-5">
              <ModeToggle />
              {session ? (
                <div className="ml-4 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback>
                      {session.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{session.user.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => signOut()}>
                      Log out
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button className="ml-4" variant="outline">
                    <JoinRoom />{" "}
                  </Button>
                  <Button className="ml-4">
                    <Link href={"/sign-in"}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
