import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginAction } from './auth.action';
import { AuthState } from './auth.type';

const initialState: AuthState = {
  token: {
    access_token: '',
    refresh_token: '',
  },
  error: '',
  loading: false,
  isModalAuthVisible: false,
  typeLogin: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state: AuthState, action: PayloadAction<any>) => ({
      ...state,
      user: action.payload,
    }),
    setTokenAuth: (state: AuthState, action: PayloadAction<any>) => ({
      ...state,
      token: action.payload,
    }),
    setErrorAuth: (state: AuthState, action: any) => ({
      ...state,
      error: action.payload,
    }),
    setIsModalAuthVisible: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => ({
      ...state,
      isModalAuthVisible: action.payload,
    }),

    setTypeLogin: (state: AuthState, action: PayloadAction<any>) => ({
      ...state,
      typeLogin: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state: AuthState) => ({
        ...state,
        token: {
          access_token: '',
          refresh_token: '',
        },
        error: '',
        loading: true,
      }))
      .addCase(loginAction.fulfilled, (state: AuthState, action: any) => {
        // khi đăng nhập thành công thì lưu vào local ở dạng string
        localStorage.setItem(
          'persist:auth',
          JSON.stringify({
            token: action.payload,
          })
        );

        // return tự động đồng bộ persist auth ở dạng json object
        return {
          ...state,
          token: action.payload,
          error: '',
          loading: false,
        };
      })
      .addCase(loginAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload || { error: 'error' };
        return {
          ...state,
          token: {
            access_token: '',
            refresh_token: '',
          },

          error,
          loading: false,
        };
      });
  },
});

export const {
  setTokenAuth,
  setUserAuth,
  setErrorAuth,
  setIsModalAuthVisible,
  setTypeLogin,
} = authSlice.actions;

export default authSlice.reducer;
