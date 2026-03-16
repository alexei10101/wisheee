import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { UserAuth } from "@/app/contexts/auth.context";
import { useState } from "react";
import { Spinner } from "@/shared/ui/kit/spinner";

const signupSchema = z
  .object({
    email: z.email("Введите корректный email"),
    password: z.string().min(8, "Пароль должен состоять из 8 символов").max(8, "Пароль должен состоять из 8 символов"),
    repeatPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const { loading, signUp } = UserAuth();
  const [error, setError] = useState<string>("");

  const handleSignUp = form.handleSubmit(async (data: z.infer<typeof signupSchema>) => {
    setError("");

    try {
      const result = await signUp(data.email, data.password);

      if (result.error) {
        setError("Ошибка при регистрации: " + (result.error.message ?? "Неизвестная ошибка"));
        return;
      }
    } catch (error) {
      setError("Ошибка при регистрации: " + ((error as Error).message ?? "Неизвестная ошибка"));
    }
  });

  return (
    <form id="auth-form" className="flex flex-col gap-4" onSubmit={handleSignUp}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-form-email">Email</FieldLabel>
            <Input {...field} id="auth-form-email" aria-invalid={fieldState.invalid} placeholder="test@gmail.com" autoComplete="off" />
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
      <Controller
        name="repeatPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-form-repeat-password">Подтвердите пароль</FieldLabel>
            <Input
              {...field}
              type="password"
              id="auth-form-repeat-password"
              aria-invalid={fieldState.invalid}
              placeholder="********"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Зарегистрироваться"}
      </Button>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </form>
  );
}
