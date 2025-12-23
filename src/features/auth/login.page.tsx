import { Link } from "react-router";
import { AuthLayout } from "./ui/auth-layout";
import { ROUTES } from "../../shared/model/routes";
import { LoginForm } from "./ui/login-form";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш логин и пароль для входа в систему"
      form={<LoginForm />}
      footerText={
        <>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }></AuthLayout>
  );
};

export default LoginPage;
