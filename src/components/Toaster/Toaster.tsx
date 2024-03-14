'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useMemo, createContext, useCallback } from 'react';
import { notification } from 'antd';
import { deleteToastById } from '@/store/notification/notification.reducer';
import './style.scss';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const NotificationContext = createContext({ name: 'Default' });

const secondToast = 1;

const ToasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector((state) => state.notificationSlice);
  const [api, contextHolder] = notification.useNotification({ maxCount: 5 });

  const openNotificationWithIcon = useCallback(
    (
      typeNotification: NotificationType,
      message: string,
      description: string,
      id: string
    ) => {
      api[typeNotification]({
        key: id,
        message,
        description,
        onClose: () => {
          notification.destroy(id);
          dispatch(deleteToastById(id));
        },
        className: 'custom-notification',
      });
    },
    [api, dispatch]
  );

  useEffect(() => {
    if (toast.length > 0) {
      const lastNotification = toast[toast.length - 1];
      openNotificationWithIcon(
        lastNotification.status,
        lastNotification.message,
        lastNotification.description,
        lastNotification.id
      );
      const timeoutId = setTimeout(() => {
        notification.destroy(lastNotification.id);
        dispatch(deleteToastById(lastNotification.id));
      }, secondToast * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    return () => {};
  }, [toast, openNotificationWithIcon, dispatch]);

  const contextValue = useMemo(() => ({ name: 'Notification' }), []);
  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default ToasterContextProvider;
