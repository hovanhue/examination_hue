import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store';
import { loginAction } from '@/store/auth/auth.action';
import { NotificationTypeEnum } from '@/config/constant';

import { useTranslations } from 'next-intl';
import './header.scss';
import { showToast } from '@/utils/showToast';

interface Props {
  onCancelModal?: () => void;
}

const FormAuth = ({ onCancelModal }: Props) => {
  const [formRef] = Form.useForm();
  const t = useTranslations('common');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinishLoginOrRegister = async (values: any) => {
    setLoading(true);
    const action = loginAction(values);

    const successMessage = t('loginSuccess');
    const res: any = await dispatch(action);
    if (res.payload?.error) {
      setLoading(false);
      showToast(NotificationTypeEnum.error, res.payload.error, dispatch);
    } else {
      showToast(NotificationTypeEnum.success, successMessage, dispatch);
      formRef.resetFields();
      if (onCancelModal) {
        onCancelModal();
      }
    }

    setLoading(false);
  };

  return (
    <div className="wrapper-auth-client">
      <Form
        name="form-auth-login-and-register-client"
        layout="vertical"
        form={formRef}
        onFinish={onFinishLoginOrRegister}
        className="customize-form"
      >
        <Form.Item
          name="email"
          label={t('itemEmailAddress')}
          rules={[
            { required: true, message: t('errorInputEmailEmpty') },
            {
              type: 'email',
              message: t('emailInvalid'),
            },
          ]}
        >
          <Input placeholder="" size="large" className="customize-input" />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('itemPassword')}
          rules={[{ required: true, message: t('errorInputPasswordEmpty') }]}
        >
          <Input.Password placeholder="" size="large" />
        </Form.Item>

        <Form.Item className="form-item-btn">
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            {t('btnLogin')}
          </Button>
        </Form.Item>
        <Button type="link" block className="text-forgot-password">
          {t('itemForgotPassword')}
        </Button>
      </Form>
    </div>
  );
};

export default FormAuth;
