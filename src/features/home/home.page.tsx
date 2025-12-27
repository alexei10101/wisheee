import { UserAuth } from "@/app/auth-context";
import { Link } from "react-router";

const HomePage = () => {
  const { session, logout } = UserAuth();

  return (
    <>
      {/* Мой профиль: имя ползователя
    фото
    друзья
    мои пожелания
    */}

      {session ? (
        <>
          <p>Logged in as {session.user.email}</p>
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <Link to="/login">to auth</Link>
      )}
    </>
  );
};

export default HomePage;
