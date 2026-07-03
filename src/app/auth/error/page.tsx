"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const errorMessages: Record<string, string> = {
  Configuration: "Възникна проблем с конфигурацията на сървъра.",
  AccessDenied: "Достъпът беше отказан. Моля, опитайте отново.",
  Verification: "Връзката за потвърждение е изтекла или вече е използвана.",
  OAuthSignin: "Възникна грешка при стартиране на вписването.",
  OAuthCallback: "Възникна грешка при обработката на вписването.",
  OAuthCreateAccount: "Не можа да се създаде профил.",
  EmailCreateAccount: "Не можа да се създаде профил с този имейл.",
  Callback: "Възникна грешка при заявката.",
  OAuthAccountNotLinked: "Този имейл вече е свързан с друг профил.",
  Default: "Възникна неочаквана грешка.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const message = errorMessages[error] || errorMessages.Default;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-md mx-auto px-4 py-16 w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-800 mb-3">
            Грешка при вписване
          </h1>
          <p className="text-gray-600 mb-8">{message}</p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Върни се към страницата за вписване
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}