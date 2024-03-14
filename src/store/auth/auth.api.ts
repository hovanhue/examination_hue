import { instanceAxios } from '@/config/axios';
import { LoginResponse, ParamLogin } from './auth.type';

const auth = {
  login({ email, password }: ParamLogin): Promise<LoginResponse> {
    const url = '/auth/login';
    return instanceAxios.post(url, {
      email,
      password,
    });
  },
};

export default auth;
