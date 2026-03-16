import { useNavigate } from "react-router";
import { Button } from "./kit/button";

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/");
  };

  return (
    <Button className="-ms-4" variant="link" onClick={handleBack}>
      ← Назад
    </Button>
  );
}
