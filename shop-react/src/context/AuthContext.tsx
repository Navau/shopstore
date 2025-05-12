import {
  forgotPasswordApi,
  loginApi,
  meApi,
  registerApi,
  resetPasswordApi,
  updateProfileApi,
} from "@/api/auth.api";
import type {
  ILoginRequest,
  IRegisterRequest,
} from "@/interfaces/api/auth.interface";
import type { IUser } from "@/interfaces/api/user.interface";
import { isTokenValid } from "@/lib/jwt";
import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const token = localStorage.getItem("token");
  const isAuthenticated = token ? isTokenValid(token) : false;

  useEffect(() => {
    if (isAuthenticated) {
      meApi()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const login = async (credentials: ILoginRequest) => {
    const res = await loginApi(credentials);
    localStorage.setItem("token", res.data.accessToken);

    const me = await meApi();
    setUser(me.data);
  };

  const register = async (data: IRegisterRequest) => {
    await registerApi(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (data: Partial<IUser>) => {
    const res = await updateProfileApi(data);
    setUser(res.data);
  };

  const sendPasswordReset = async (email: string) => {
    await forgotPasswordApi({ email });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await resetPasswordApi({ token, newPassword });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated,
        updateProfile,
        sendPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
