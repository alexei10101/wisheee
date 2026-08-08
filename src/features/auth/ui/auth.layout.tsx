import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { type ReactNode } from "react";

export function AuthLayout({
  title,
  description,
  form,
  footerText,
}: {
  title: ReactNode;
  description: ReactNode;
  form: ReactNode;
  footerText: ReactNode;
}) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 before:absolute before:top-[-18rem] before:left-1/2 before:-z-10 before:size-[34rem] before:-translate-x-1/2 before:rounded-full before:bg-primary/10 before:blur-3xl">
      <Card className="w-full max-w-md gap-2 border-border/70 bg-card/90 shadow-xl shadow-primary/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
