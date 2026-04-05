import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { useState } from "react";
import { Spinner } from "@/shared/ui/kit/spinner";
import { useLogin } from "@/entities/user/model/user.mutations";

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

  const login = useLogin();
  const [error, setError] = useState<string>("");

  const handleLogin = form.handleSubmit(async (data: z.infer<typeof loginSchema>) => {
    setError("");

    try {
      await login.mutateAsync(data);
    } catch (error) {
      // TODO: sonner and console
      setError("Ошибка при входе: " + ((error as Error).message ?? "Неизвестная ошибка"));
    }
  });

  return (
    <form id="auth-form" className="flex flex-col gap-1 sm:gap-4" onSubmit={handleLogin}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-0.5">
            <FieldLabel htmlFor="auth-form-login">Email</FieldLabel>
            <Input {...field} id="auth-form-login" aria-invalid={fieldState.invalid} placeholder="name@example.com" autoComplete="off" />
            {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-0.5">
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

      <Button type="submit" disabled={login.isPending} className="mt-2">
        {login.isPending ? <Spinner /> : "Войти"}
      </Button>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </form>
  );
}
