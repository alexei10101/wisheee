import { Link } from "react-router";
import { ROUTES } from "../../shared/routes";
import { AuthLayout } from "@/features/auth/auth.layout";
import { LoginForm } from "@/features/auth/login.form";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      form={<LoginForm />}
      footerText={
        <>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }
    />
  );
}

export default LoginPage;
