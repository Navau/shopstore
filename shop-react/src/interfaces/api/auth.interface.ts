export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  dateOfBirth: string;
  password: string;
}
