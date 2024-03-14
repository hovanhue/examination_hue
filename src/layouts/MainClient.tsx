'use client';

import React, { type ReactNode, useEffect } from 'react';
import HeaderClient from '@/components/HeaderClient/HeaderClient';
import { FloatButton } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import ModalAuth from '@/components/ModalAuth/ModalAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsModalAuthVisible } from '@/store/auth/auth.reducer';
import { useTheme } from 'next-themes';
import './layout.scss';
import { ThemeMode } from '@/config/constant';

type IMainProps = {
  children: ReactNode;
};

function MainClient({ children }: IMainProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isModalAuthVisible } = useAppSelector((state) => state.authSlice);
  const { setTheme, resolvedTheme } = useTheme();

  const test = localStorage.getItem('theme');

  useEffect(() => {
    if (!resolvedTheme) {
      setTheme(test as string);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <HeaderClient />
      <main
        style={{
          backgroundColor: test === ThemeMode.DARK ? 'black' : 'white',
          height: '90vh',
        }}
      >
        {children}
      </main>
      <FloatButton.BackTop type="primary" icon={<ArrowUpOutlined />} />
      <ModalAuth
        visible={isModalAuthVisible}
        onClose={() => dispatch(setIsModalAuthVisible(false))}
      />
    </>
  );
}

export { MainClient };
