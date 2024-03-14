import { NotificationTypeEnum } from '@/config/constant';
import { createToast } from '@/store/notification/notification.reducer';
import { v4 as uuidv4 } from 'uuid';

export const showToast = (status_: NotificationTypeEnum, message: string, dispatch: any) => {
  const toast = {
    id: uuidv4(),
    status: status_,
    message,
    description: '',
  };
  dispatch(createToast(toast));
};
