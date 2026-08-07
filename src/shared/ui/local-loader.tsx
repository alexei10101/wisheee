import { Spinner } from "./kit/spinner";

export function LocalLoader() {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className="flex w-full items-center justify-center py-12 text-primary"
    >
      <Spinner aria-hidden="true" />
    </div>
  );
}
