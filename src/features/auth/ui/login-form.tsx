import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { UserAuth } from "@/app/auth-context";
import { useState } from "react";
import { Spinner } from "@/shared/ui/kit/spinner";

const loginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(8, "Пароль должен состоять из 8 символов.").max(8, "Пароль должен состоять из 8 символов."),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loading, login } = UserAuth();
  const [error, setError] = useState<string>("");

  const handleLogin = form.handleSubmit(async (data: z.infer<typeof loginSchema>) => {
    setError("");

    // TODO: problem with error handling (errors are not shown)

    try {
      const result = await login(data.email, data.password);

      if (result.error) {
        setError("Ошибка при входе: " + (result.error.message ?? "Неизвестная ошибка"));
        return;
      }
    } catch (error) {
      setError("Ошибка при входе: " + ((error as Error).message ?? "Неизвестная ошибка"));
    }
  });

  return (
    <form id="auth-form" className="flex flex-col gap-4" onSubmit={handleLogin}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-form-login">Email</FieldLabel>
            <Input {...field} id="auth-form-login" aria-invalid={fieldState.invalid} placeholder="test@gmail.com" autoComplete="off" />
            {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-form-password">Пароль</FieldLabel>
            <Input
              {...field}
              type="password"
              id="auth-form-password"
              aria-invalid={fieldState.invalid}
              placeholder="********"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Войти"}
      </Button>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </form>
  );
}
