import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";

export default function CheckEmailPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 before:absolute before:top-[-18rem] before:left-1/2 before:-z-10 before:size-[34rem] before:-translate-x-1/2 before:rounded-full before:bg-primary/10 before:blur-3xl">
      <Card className="w-full max-w-md gap-2 border-border/70 bg-card/90 shadow-xl shadow-primary/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight sm:text-2xl">
            Спасибо за регистрацию 🎉
          </CardTitle>
          <CardDescription className="leading-relaxed">
            Мы отправили письмо на указанный вами email. <br />
            Подтвердите email, чтобы продолжить.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
