import { io } from "socket.io-client";

export const realtimeClient = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: false,
});
