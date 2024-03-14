'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import './header.scss';

import { useParams } from 'next/navigation';
import { Avatar, Button, Divider, Modal, Popover, Space } from 'antd';
import Image from 'next/image';
import { usePathname as usePathnameIntl, Link } from '@/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { Language, NotificationTypeEnum, ThemeMode } from '@/config/constant';
import { useLocale, useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import ThemeSwitch from '@/theme/ThemeSwitch';
import { setTokenAuth } from '@/store/auth/auth.reducer';
import { showToast } from '@/utils/showToast';
import { useTheme } from 'next-themes';
import UserIcon from '../Icons/UserIcon';
import SearchIcon from '../Icons/SearchIcon';
import BarIcon from '../Icons/BarIcon';
import FormAuth from './FormAuth';

export default function HeaderClient() {
  const locale = useLocale();
  const t = useTranslations('common');
  const pathnameIntl = usePathnameIntl();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { token } = useAppSelector((state) => state.authSlice);

  const [isSideMenuMobile, setIsSideMenuMobile] = useState<boolean>(false);
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);

  const [tokenState, setTokenState] = useState<string>('');

  const [isShowContainerSearchMobile, setIsShowContainerSearchMobile] = useState<boolean>(false);

  const wrapperRef = useRef<any>(null);
  const inputSearchMobileRef = useRef<any>(null);

  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  useEffect(() => {
    if (isShowContainerSearchMobile) {
      inputSearchMobileRef.current.focus();
    }
  }, [isShowContainerSearchMobile]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isSideMenuMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    // Loại bỏ class khi component unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isSideMenuMobile]);

  useEffect(() => {
    setIsSideMenuMobile(false);
  }, [pathnameIntl]);

  useEffect(() => {
    setTokenState(token.access_token);
  }, [token.access_token]);

  const handleChangeLanguage = (localeParams: Language) => {
    // console.log('searchParams: ', params?.['detail-product-slug'], pathnameIntl.startsWith('/'));
    let cleanedPathName = '';
    if (params?.slug && pathnameIntl.includes('about-us')) {
      cleanedPathName = `/about-us/${params?.slug}`;
    } else if (params?.slug && pathnameIntl.includes('news')) {
      cleanedPathName = `/news/${params?.slug}`;
    } else {
      cleanedPathName = pathnameIntl.startsWith('/') ? pathnameIntl : `/${pathnameIntl}`;
    }

    const currentURL = new URL(window.location.href);
    // console.log('cleanedPathName: ', cleanedPathName, currentRoute, currentURL);
    if (localeParams === 'en') {
      // router.replace(`/en${cleanedPathName}${currentURL.search ? currentURL.search : ''}`);
      window.location.href = `/en${cleanedPathName}${currentURL.search ? currentURL.search : ''}`;
    } else {
      // router.replace(`/vi${cleanedPathName}${currentURL.search ? currentURL.search : ''}`);
      window.location.href = `/vi${cleanedPathName}${currentURL.search ? currentURL.search : ''}`;
    }
    // if (localeParams === 'en') {
    //   routerIntl.push(pathnameIntl, { locale: 'vi' });
    // } else if (localeParams === 'vi') {
    //   routerIntl.push(pathnameIntl, { locale: 'en' });
    // }
  };

  return (
    <Suspense fallback={<p>Loading header...</p>}>
      <header className="wrapper-header-client" ref={wrapperRef}>
        {/* header mid */}
        <div
          className={
            resolvedTheme === ThemeMode.DARK ? 'wrapper-header-top-dark' : 'wrapper-header-top'
          }
        >
          <div className="container wrapper-header-top-content">
            <div className="wrapper-search-bar">
              <div className="wrapper-search-bar-input-module">
                {/* <input
                  type="search"
                  className="base-input-module"
                  placeholder={t("itemSearch")}
                />
                <Button type="link" icon={<SearchIcon />} /> */}
              </div>

              {/* khi responsive mobile bar action */}
              <div className="wrapper-search-bar-action">
                <Button
                  type="link"
                  aria-label="Bar icon"
                  icon={<BarIcon />}
                  onClick={() => setIsSideMenuMobile(!isSideMenuMobile)}
                />
                <Link href="/" className="wrapper-logo-mobile" scroll={false}>
                  <div className="wrapper-logo-mobile-shape">
                    <Image src="/images/logo.png" fill blurDataURL="" alt="" sizes="100%" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="wrapper-logo">
              <Link href="/" className="wrapper-logo" scroll={false}>
                <div className="wrapper-logo-shape">
                  <Image src="/images/logo.png" fill blurDataURL="" alt="" sizes="100%" />
                </div>
              </Link>
            </div>
            <div className="wrapper-header-link">
              {isMobile && (
                <>
                  <Button
                    type="link"
                    size="small"
                    icon={<SearchIcon />}
                    onClick={() => setIsShowContainerSearchMobile(!isShowContainerSearchMobile)}
                  />
                  <div
                    style={{
                      backgroundColor: 'white',
                      width: '100%',
                      position: 'absolute',
                      top: '99%',
                      left: 0,
                      transition: 'all  0.3s ease-in-out',
                      height: `${isShowContainerSearchMobile ? '56px' : '0px'}`,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ padding: '12px 20px' }}>
                      <div className="wrapper-search-bar-input-module-mobile">
                        <input
                          type="search"
                          className="base-input-module"
                          placeholder={t('itemSearch')}
                          ref={inputSearchMobileRef}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* đã login */}
              {tokenState ? (
                <div aria-hidden onClick={() => setIsModalLogoutOpen(!isModalLogoutOpen)}>
                  <Avatar
                    size={{ xs: 28, sm: 28, md: 38, lg: 38, xl: 38, xxl: 38 }}
                    src="/images/avt-login.png"
                  />
                </div>
              ) : (
                <Button
                  type="link"
                  aria-label="Profile"
                  icon={<UserIcon />}
                  onClick={() => {
                    setIsModalAuthOpen(!isModalAuthOpen);
                  }}
                />
              )}

              <Divider type="vertical" />
              <div className="wrapper-header-language">
                <Space>
                  <p
                    className={`${
                      // eslint-disable-next-line no-nested-ternary
                      locale === 'vi' && resolvedTheme === ThemeMode.DARK
                        ? 'active-language-dark'
                        : locale === 'vi' && resolvedTheme === ThemeMode.LIGHT
                        ? 'active-language-light'
                        : 'inactive-language-dark'
                    }`}
                    aria-hidden
                    onClick={() => handleChangeLanguage('vi')}
                  >
                    Vn
                  </p>
                  <Divider type="vertical" />
                  <p
                    className={`${
                      // eslint-disable-next-line no-nested-ternary
                      locale === 'en' && resolvedTheme === ThemeMode.DARK
                        ? 'active-language-dark'
                        : locale === 'en' && resolvedTheme === ThemeMode.LIGHT
                        ? 'active-language-light'
                        : 'inactive-language-light'
                    }`}
                    aria-hidden
                    onClick={() => handleChangeLanguage('en')}
                  >
                    En
                  </p>
                </Space>
              </div>
              <ThemeSwitch />

              {isMobile && (
                <Popover
                  rootClassName="wrapper-header-language-popover"
                  content={
                    <Space direction="vertical">
                      <p
                        className={`${locale === 'vi' ? 'active-language' : 'inactive-language'}`}
                        aria-hidden
                        onClick={() => handleChangeLanguage('vi')}
                      >
                        Vn
                      </p>
                      <p
                        className={`${locale === 'en' ? 'active-language' : 'inactive-language'}`}
                        aria-hidden
                        onClick={() => handleChangeLanguage('en')}
                      >
                        En
                      </p>
                    </Space>
                  }
                  title=""
                  trigger="click"
                  placement="bottomRight"
                >
                  <>
                    <Divider type="vertical" />
                    <p className="active-language">{locale === 'vi' ? 'EN' : 'VN'}</p>
                  </>
                </Popover>
              )}
            </div>
          </div>
        </div>

        {/* header navigation */}
        <div
          className={
            resolvedTheme === ThemeMode.DARK
              ? 'wrapper-navigation-dark wrapper-navigation'
              : 'wrapper-navigation wrapper-navigation-light'
          }
        >
          <div className="container">
            <div className="content-navigation">
              <Link
                href={{
                  pathname: '/',
                }}
                scroll={false}
                className={
                  pathnameIntl === '/'
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                    ${
                      resolvedTheme === ThemeMode.DARK
                        ? 'non-active-class-name-dark'
                        : 'non-active-class-name-light'
                    }
                    `
                }
              >
                {t('itemHome')}
              </Link>
              <Link
                href="/about-us"
                scroll={false}
                className={
                  pathnameIntl.includes('about-us')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }
              >
                {t('itemAboutUs')}
              </Link>
              <Link
                className={`${
                  pathnameIntl.includes('catalogs')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }`}
                href="/catalogs"
              >
                {t('itemCatalogs')}
              </Link>
              <Link
                href="/news"
                scroll={false}
                className={
                  pathnameIntl.includes('news')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }
              >
                {t('itemNewsAndPress')}
              </Link>
              <Link
                href="/faqs"
                scroll={false}
                className={
                  pathnameIntl.includes('faqs')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }
              >
                {t('itemFaqs')}
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* header when responsive */}
      <div className={isSideMenuMobile ? 'wrapper-header-mobile open' : 'wrapper-header-mobile '}>
        <div className="wrapper-header-mobile-content">
          <div className="wrapper-header-mobile-content-navigation">
            <div className="content-navigation-item">
              <Link
                href="/"
                scroll={false}
                className={`content-navigation-item-main ${
                  pathnameIntl === '/'
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }`}
              >
                {t('itemHome')}
              </Link>
            </div>

            <div className="content-navigation-item">
              <Link
                href="/about-us"
                scroll={false}
                className={`content-navigation-item-main ${
                  pathnameIntl.includes('/about-us')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                ${
                  resolvedTheme === ThemeMode.DARK
                    ? 'non-active-class-name-dark'
                    : 'non-active-class-name-light'
                }
                `
                }`}
              >
                {t('itemAboutUs')}
              </Link>
            </div>

            <div className="content-navigation-item">
              <Link
                href="/news"
                scroll={false}
                className={`content-navigation-item-main ${
                  pathnameIntl.includes('/news')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                    ${
                      resolvedTheme === ThemeMode.DARK
                        ? 'non-active-class-name-dark'
                        : 'non-active-class-name-light'
                    }
                    `
                }`}
              >
                {t('itemNewsAndPress')}
              </Link>
            </div>
            <div className="content-navigation-item">
              <Link
                href="/faqs"
                scroll={false}
                className={`content-navigation-item-main ${
                  pathnameIntl.includes('/faqs')
                    ? `active-class-name ${
                        resolvedTheme === ThemeMode.DARK
                          ? 'active-class-name-dark'
                          : 'active-class-name-light'
                      }}`
                    : `non-active-class-name  
                    ${
                      resolvedTheme === ThemeMode.DARK
                        ? 'non-active-class-name-dark'
                        : 'non-active-class-name-light'
                    }
                    `
                }`}
              >
                {t('itemFaqs')}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="header-content-close"
          aria-hidden="true"
          onClick={() => setIsSideMenuMobile(!isSideMenuMobile)}
        />
      </div>
      <Modal
        centered
        title=""
        open={isModalAuthOpen}
        onOk={() => {
          setIsModalAuthOpen(!isModalAuthOpen);
        }}
        onCancel={() => {
          setIsModalAuthOpen(!isModalAuthOpen);
        }}
        footer={[]}
        closeIcon={false}
      >
        <FormAuth
          onCancelModal={() => {
            setIsModalAuthOpen(false);
          }}
        />
      </Modal>

      <Modal
        centered
        title={t('titleLogout')}
        open={isModalLogoutOpen}
        onOk={async () => {
          showToast(NotificationTypeEnum.success, t('logout'), dispatch);

          const dispatchPromises = [
            (window.location.href = '/'),
            dispatch(
              setTokenAuth({
                access_token: '',
                refresh_token: '',
              })
            ),
          ];

          await Promise.all([...dispatchPromises]);

          setIsModalLogoutOpen(false);
        }}
        onCancel={() => setIsModalLogoutOpen(false)}
        okText={t('itemYes')}
        cancelText={t('itemNo')}
      >
        <p>{t('desLogout')}</p>
      </Modal>
    </Suspense>
  );
}
