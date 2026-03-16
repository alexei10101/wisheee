import { Link } from "react-router";
import { ROUTES } from "../../shared/routes";
import { AuthLayout } from "@/features/auth/auth.layout";
import { SignupForm } from "@/features/auth/signup.form";

function SignupPage() {
  return (
    <AuthLayout
      title="Регистрация в системе"
      description="Введите ваш email и пароль для регистрации в системе"
      form={<SignupForm />}
      footerText={
        <>
          Есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  );
}

export default SignupPage;
