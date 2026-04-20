import { Spinner } from "./kit/spinner";

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
}
