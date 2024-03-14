import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationState, ToastPayloadAction } from './notification.type';

const initialState: NotificationState = {
  toast: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createToast: (
      state: NotificationState,
      action: PayloadAction<ToastPayloadAction>
    ) => ({
      ...state,
      toast: [...state.toast, action.payload],
    }),
    deleteToastById: (
      state: NotificationState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      toast: state.toast.filter((item) => item.id !== action.payload),
    }),
    clearToast: (state: NotificationState) => ({
      ...state,
      toast: [],
    }),
  },

  extraReducers: () => {},
});

export const { createToast, deleteToastById, clearToast } =
  notificationSlice.actions;

export default notificationSlice.reducer;
