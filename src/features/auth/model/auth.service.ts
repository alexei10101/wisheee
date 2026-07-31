import { authRepository } from "../api/auth.repository";

export class AuthService {
  logout(): Promise<void> {
    return authRepository.logout();
  }

  refresh(): Promise<void> {
    return authRepository.refresh();
  }
}
