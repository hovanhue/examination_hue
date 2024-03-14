import { AxiosResponse } from 'axios';

export type ParamLogin = {
  email: string;
  password: string;
  type?: string;
};

export type LoginResponse = AxiosResponse<{
  data: {
    access_token: string;
    refresh_token: string;
  };
  error?: string;
}>;

export interface AuthState {
  token: {
    access_token: string;
    refresh_token: string;
  };
  error: string;
  loading: boolean;
  isModalAuthVisible: boolean;
  typeLogin: string;
}
