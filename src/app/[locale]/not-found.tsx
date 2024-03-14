'use client';

import React from 'react';
import { MainClient } from '@/layouts/MainClient';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NotFoundPage = () => {
  const router = useRouter();
  const t = useTranslations('common');
  return (
    <MainClient>
      <div className="container">
        <Result
          status="404"
          title="404"
          subTitle={t('systemNotfound')}
          extra={
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/', { scroll: false })}
            >
              {t('itemHome')}
            </Button>
          }
        />
      </div>
    </MainClient>
  );
};
export default NotFoundPage;
