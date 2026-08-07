import { Button } from "@/shared/ui/kit/button";
import { CircleAlert } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "Произошла непредвиденная ошибка.";
  let errorStatus = "";

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-border/70 bg-card p-7 text-center shadow-xl shadow-primary/5 sm:p-10">
        <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <CircleAlert className="size-7" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Упс!</h1>
        <p className="mt-2 text-lg">Ошибочка вышла…</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {errorStatus && <span className="font-medium text-foreground">{errorStatus}: </span>}
          {errorMessage}
        </p>
        <Button asChild className="mt-7">
          <Link to="/">На главную</Link>
        </Button>
      </section>
    </main>
  );
}
