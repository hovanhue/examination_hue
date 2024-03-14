import { NotificationTypeEnum } from '@/config/constant';

export type ToastPayloadAction = {
  id: string;
  status: NotificationTypeEnum;
  message: string;
  description: string;
};

export type NotificationState = {
  toast: ToastPayloadAction[];
};
