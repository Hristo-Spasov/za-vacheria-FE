"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import ActionButton from "../ui/buttons/ActionButton";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const userImage = session?.user?.image || "";

  const navLinks = [
    { href: "/", label: "Начало" },
    { href: "/questions", label: "Въпросник" },
    { href: "/main", label: "Рецепти" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white backdrop-blur-sm shadow-sm"
    >
      <div className="relative max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/zavecheria_logo.png"
              alt="За Вечеря"
              width={250}
              height={70}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isUnauthenticated && (
              <ActionButton route="/auth/login" text="Вход" />
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* User Avatar */}
                <Link href="http://localhost:5173/">
                  <Image
                    className="rounded-full"
                    src={userImage}
                    alt={session?.user?.name || ""}
                    width={40}
                    height={40}
                  />
                </Link>

                <button
                  className="font-medium py-2 px-6 sm:px-8 border rounded-full shadow-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md hover:translate-y-[-2px] bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
                  onClick={() => signOut({ callbackUrl: window.location.href })}
                >
                  Изход
                </button>
              </div>
            ) : (
              <ActionButton
                route="/auth/login"
                text="Регистрация"
                variant="secondary"
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-orange-50 transition-colors "
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation - Absolutely positioned, animated */}
        <div
          ref={navRef}
          className={`md:hidden absolute left-0 right-0 top-full bg-white backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="py-4 px-4 border-t border-orange-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="px-4">
            <div className="p-[1px] rounded-full w-full bg-gray-300"></div>
            <div className="w-full flex justify-center">
              <div className="flex justify-center gap-4 mt-4 mb-4 flex-col w-[80%]">
                {isUnauthenticated && (
                  <ActionButton route="/auth/login" text="Вход" />
                )}

                {isUnauthenticated ? (
                  <ActionButton
                    route="/auth/login"
                    text="Регистрация"
                    variant="secondary"
                  />
                ) : (
                  <button
                    className="font-medium py-2 px-6 sm:px-8 border rounded-full shadow-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md hover:translate-y-[-2px] bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
                    onClick={() => signOut({ callbackUrl: window.location.href })}
                  >
                    Изход
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
