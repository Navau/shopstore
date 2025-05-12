import type {
  ILoginRequest,
  IRegisterRequest,
} from "@/interfaces/api/auth.interface";
import type { IUser } from "@/interfaces/api/user.interface";
import { createContext } from "react";

interface AuthContextType {
  user: IUser | null;
  register: (data: IRegisterRequest) => Promise<void>;
  login: (credentials: ILoginRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<IUser>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
