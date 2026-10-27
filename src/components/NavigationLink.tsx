"use client";

import Link, { useLinkStatus } from "next/link";
import { ComponentProps } from "react";
import { createPortal } from "react-dom";
import Loading from "@/components/Loading";

function PendingNavigation() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  // Show the existing loader in the current browser page while Next navigates.
  // This adds no server Suspense boundary that could prematurely send HTTP 200.
  return createPortal(
    <div
      role="status"
      aria-label="Зареждане на страницата"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <Loading />
    </div>,
    document.querySelector("main") ?? document.body,
  );
}

export default function NavigationLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      {children}
      <PendingNavigation />
    </Link>
  );
}
