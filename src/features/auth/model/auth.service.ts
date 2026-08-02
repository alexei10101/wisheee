import { authRepository } from "../api/auth.repository";

export const authService = {
  logout(): Promise<void> {
    return authRepository.logout();
  },

  refresh(): Promise<void> {
    return authRepository.refresh();
  },
};
