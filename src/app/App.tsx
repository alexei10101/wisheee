import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
