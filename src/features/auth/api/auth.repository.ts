import type { SignInDto, SignUpDto } from "@/features/auth/model/dto";
import type { User } from "@/entities/user/model/user";
import { api } from "@/shared/api/api";
import type { ApiResponse } from "@/shared/api/types";
import { authApi } from "@/shared/api/auth-api";

export const authRepository = {
  // async me(): Promise<User | null> {
  //   try {
  //     const { data } = await authApi.get<ApiResponse<User>>("/auth/me");
  //     return data.data;
  //   } catch (e) {
  //     if (axios.isAxiosError(e) && e.response?.status === 401) {
  //       return null;
  //     }
  //     throw e;
  //   }
  // },

  async init(): Promise<User | null> {
    const { data } = await authApi.get<ApiResponse<User | null>>("/auth/init");
    return data.data;
  },

  async signUp(dto: SignUpDto): Promise<void> {
    await api.post("/auth/signup", dto);
  },

  async signIn(dto: SignInDto): Promise<User> {
    const { data } = await api.post<ApiResponse<User>>("/auth/signin", dto);
    return data.data;
  },

  async logout() {
    await authApi.post("auth/logout");
  },

  async refresh(): Promise<void> {
    return await authApi.post("/auth/refresh");
  },
};
