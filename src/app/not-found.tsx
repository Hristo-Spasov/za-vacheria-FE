import ErrorPage from "@/components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      title="Страницата не е намерена"
      message="Търсената страница не съществува. Моля, върнете се към началната страница."
    />
  );
}
