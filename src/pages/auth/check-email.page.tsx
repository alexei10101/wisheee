import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";

export default function CheckEmailPage() {
  return (
    <main className="p-2 min-h-screen sm:h-auto flex justify-center items-center">
      <Card className="w-full sm:max-w-100 gap-2">
        <CardHeader>
          <CardTitle>Спасибо за регистрацию 🎉</CardTitle>
          <CardDescription>
            Мы отправили письмо на указанный вами email. <br />
            Подтвердите email, чтобы продолжить.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
