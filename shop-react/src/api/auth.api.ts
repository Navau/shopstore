import { API_ROUTES } from "@/constants";
import type { ApiResponse } from "@/interfaces/api/api-response";
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from "@/interfaces/api/auth.interface";
import type { IUser } from "@/interfaces/api/user.interface";
import http from "./http";

export const meApi = async (): Promise<ApiResponse<IUser>> => {
  const response = await http.get<ApiResponse<IUser>>(API_ROUTES.auth.me);
  return response.data;
};

export const loginApi = async (
  body: ILoginRequest
): Promise<ApiResponse<ILoginResponse>> => {
  const response = await http.post<ApiResponse<ILoginResponse>>(
    API_ROUTES.auth.login,
    body
  );
  return response.data;
};

export const registerApi = async (
  body: IRegisterRequest
): Promise<ApiResponse<null>> => {
  const response = await http.post<ApiResponse<null>>(
    API_ROUTES.auth.register,
    body
  );
  return response.data;
};

export const updateProfileApi = async (
  body: Partial<IUser>
): Promise<ApiResponse<IUser>> => {
  const response = await http.patch<ApiResponse<IUser>>(
    API_ROUTES.auth.me,
    body
  );
  return response.data;
};

export const forgotPasswordApi = async (body: {
  email: string;
}): Promise<ApiResponse<null>> => {
  const response = await http.post<ApiResponse<null>>(
    API_ROUTES.auth.forgotPassword,
    body
  );
  return response.data;
};

export const resetPasswordApi = async (body: {
  token: string;
  newPassword: string;
}): Promise<ApiResponse<null>> => {
  const response = await http.post<ApiResponse<null>>(
    API_ROUTES.auth.resetPassword,
    body
  );
  return response.data;
};
