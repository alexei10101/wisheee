import { Link } from "react-router";
import { ROUTES } from "../../shared/routes";
import { AuthLayout } from "@/features/auth/ui/auth.layout";
import { SignInForm } from "@/features/auth/ui/signin.form";

function SignInPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<SignInForm />}
      footerText={
        <>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }
    />
  );
}

export default SignInPage;
