import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";

const signupSchema = z
  .object({
    email: z.email("Введите корректный email"),
    login: z.string().min(3, "Логин должен состоять минимум из 3 символов").max(15, "Максимальная длина логина - 15 символов"),
    // login: z.string().min(3, "Login must be at least 3 characters.").max(15, "Login must be at most 15 characters."),
    password: z.string().min(8, "Пароль должен состоять из 8 символов").max(8, "Пароль должен состоять из 8 символов"),
    // password: z.string().min(8, "Password must be at least 8 characters.").max(8, "Password must be at most 8 characters."),
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
      login: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form id="auth-form" className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
        name="login"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="auth-form-login">Логин</FieldLabel>
            <Input {...field} id="auth-form-login" aria-invalid={fieldState.invalid} placeholder="test" autoComplete="off" />
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
      {/* TODO: <Button disabled={isPending} type="submit"> */}
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
}
