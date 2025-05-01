"use client";

import ErrorPage from "@/components/ErrorPage";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <ErrorPage
      title="Възникна грешка"
      message="Нещо се обърка. Моля, опитайте отново или се върнете към началната страница."
      error={error}
    />
  );
}
