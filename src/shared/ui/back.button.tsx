import { useNavigate } from "react-router";
import { Button } from "./kit/button";

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <Button
      type="button"
      className="-ms-3 min-h-10 px-3"
      variant="ghost"
      onClick={handleBack}
      aria-label="Назад"
    >
      ← Назад
    </Button>
  );
}
