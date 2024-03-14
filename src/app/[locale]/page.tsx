'use client';

import './page.scss';
import { useTranslations } from 'next-intl';
import { MainClient } from '@/layouts/MainClient';
import { Button, Space, Table, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useState } from 'react';
import { getAllProductsAction } from '@/store/product/product.action';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { ThemeMode } from '@/config/constant';
import debounce from 'lodash/debounce';

export default function Home() {
  const t = useTranslations('common');

  const dispatch = useAppDispatch();
  const { getAllProducts } = useAppSelector((state) => state.productSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [getAllProductsFilter, setGetAllProductsFilter] = useState<any[]>([]);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (getAllProducts.data?.results?.length > 0) {
      setGetAllProductsFilter(getAllProducts.data?.results);
    }
  }, [getAllProducts]);

  useEffect(() => {
    if (token.access_token) {
      dispatch(getAllProductsAction());
    }
  }, [dispatch, token.access_token]);

  // debounce
  const debouncedSearchKey = debounce((searchKey: string) => {
    const res = getAllProducts.data?.results?.filter(
      (item: any) => item.project_name?.toLocaleLowerCase()?.includes(searchKey.toLocaleLowerCase())
    );
    setGetAllProductsFilter(res)
  }, 1000);

  const onChangeSearchKey = (e: any) => {
    const { value } = e.target;
    debouncedSearchKey(value);
  };

  const columns = [
    {
      title: t('docNo'),
      dataIndex: 'stt',
      key: 'stt',
      width: 20,
    },
    {
      title: t('code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('projectName'),
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: t('projectDomain'),
      dataIndex: 'projectDomain',
      key: 'projectDomain',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      width: 100,
    },
  ];

  const dataSource = getAllProductsFilter?.map((item: any, index: number) => ({
    key: item.id,
    stt: index + 1,
    code: item.id,
    projectName: item.project_name,
    projectDomain: item.project_domain,
    action: (
      <Space>
        <Button type="primary" ghost icon={<EditOutlined />} />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Space>
    ),
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <MainClient>
      {token.access_token && (
        <div className="container">
          <div className="flex-1 place-content-between pt-20 mb-8">
            <h3 className="text-6xl font-semibold mb-8">{t('listProducts')}</h3>
            <Input
              onChange={onChangeSearchKey}
              placeholder={t('itemSearch')}
              style={{ width: 400 }}
            />
          </div>

          <div>
            <Table
              columns={columns}
              dataSource={dataSource}
              size="small"
              rowSelection={rowSelection}
              className={
                resolvedTheme === ThemeMode.DARK ? `table-product-dark` : 'table-product-light'
              }
            />
          </div>
        </div>
      )}
    </MainClient>
  );
}
