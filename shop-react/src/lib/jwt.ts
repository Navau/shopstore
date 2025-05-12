import { jwtDecode, type JwtPayload } from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (!payload.exp) return false;
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch {
    return false;
  }
}
