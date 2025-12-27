import { Link } from "react-router";
import { ROUTES } from "../../shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { SignupForm } from "./ui/signup-form";

const SignupPage = () => {
  return (
    <AuthLayout
      title="Регистрация в системе"
      description="Введите ваш email и пароль для регистрации в системе"
      form={<SignupForm />}
      footerText={
        <>
          Есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }></AuthLayout>
  );
};

export default SignupPage;
