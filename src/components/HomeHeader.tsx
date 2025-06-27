import React from "react";
import Logo from "../../public/pot-of-food-svgrepo-com.svg";
import Burger from "../../public/burger-button.svg";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import CardButton from "./ui/buttons/CardButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HomeHeader = () => {
  return (
    <header className="w-full">
      <nav className="bg-white shadow-md border-b border-orange-200 px-6 py-3 flex items-center justify-between relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={50} height={50} />
          <span className="font-bold text-orange-700 text-xl">За Вечеря</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-orange-800 hover:text-orange-600 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-2">
          <CardButton
            route="/login"
            text="Login"
            variant="login"
            showIcon={false}
            className="justify-center"
          />
          <CardButton
            route="/signup"
            text="Sign Up"
            variant="logout"
            showIcon={false}
            className="justify-center"
          />
        </div>

        {/* Mobile Hamburger with Shadcn Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="focus:ring-2 focus:ring-orange-400"
                aria-label="Open menu">
                <Image src={Burger} alt="logo" width={52} height={52} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-64 sm:w-72">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-orange-200">
                  <Image src={Logo} alt="logo" width={50} height={50} />
                  <span className="font-bold text-orange-700 text-xl ml-2">
                    За Вечеря
                  </span>
                </div>
                <ul className="flex flex-col gap-2 p-4 flex-grow align-center">
                  {navLinks.map((link) => (
                    <li
                      key={link.href}
                      className="mx-auto hover:bg-amber-500 w-full text-center">
                      <Link
                        href={link.href}
                        className="block text-orange-800 hover:text-white py-2 transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 p-4 border-t border-orange-200">
                  <CardButton
                    route="/login"
                    text="Login"
                    variant="login"
                    showIcon={false}
                    className="justify-center"
                  />
                  <CardButton
                    route="/signup"
                    text="Sign Up"
                    variant="logout"
                    showIcon={false}
                    className="justify-center"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
