import { Spinner } from "./kit/spinner";

export function AppLoader() {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background text-primary"
    >
      <Spinner aria-hidden="true" />
    </div>
  );
}
