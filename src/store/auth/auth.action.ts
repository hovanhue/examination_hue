import auth from '@/store/auth/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParamLogin } from './auth.type';

const loginAction = createAsyncThunk(
  'auth/loginAction',
  async (params: ParamLogin, thunkAPI) => {
    try {
      const res: any = await auth.login(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message,
      });
    }
  }
);

export { loginAction };
