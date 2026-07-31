import { Link } from "react-router";
import { ROUTES } from "../../shared/routes";
import { AuthLayout } from "@/features/auth/ui/auth.layout";
import { SignupForm } from "@/features/auth/ui/signup.form";

function SignupPage() {
  return (
    <AuthLayout
      title="Регистрация в системе"
      description="Введите ваши данные для регистрации в системе"
      form={<SignupForm />}
      footerText={
        <>
          Есть аккаунт? <Link to={ROUTES.SIGNIN}>Войти</Link>
        </>
      }
    />
  );
}

export default SignupPage;
