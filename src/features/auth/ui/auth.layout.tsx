import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import * as React from "react";

export function AuthLayout({
  title,
  description,
  form,
  footerText,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  form: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className="p-2 min-h-screen sm:h-auto flex justify-center items-center">
      <Card className="w-full sm:max-w-100 gap-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">{footerText}</p>
        </CardFooter>
      </Card>
    </main>
  );
}
