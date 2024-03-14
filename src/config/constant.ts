const HEIGHT_HEADER_ADMIN = 64;
const WIDTH_SIDEBAR_ADMIN = 200;
const PAGE_SIZE_OPTIONS = [5, 10, 50];

export { HEIGHT_HEADER_ADMIN, WIDTH_SIDEBAR_ADMIN, PAGE_SIZE_OPTIONS };

// eslint-disable-next-line no-shadow
export enum NotificationTypeEnum {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

// title button when click add or update
// eslint-disable-next-line no-shadow
export enum AppActionEnum {
  create = 'create',
  update = 'update',
  delete = 'delete',
  reset = 'reset',
}

// eslint-disable-next-line no-shadow
export enum AppConfirmModalEnum {
  delete = 'delete',
  confirm = 'confirm',
  info = 'info',
  warning = 'warning',
}

export const LOGO_LOGIN_AMDIN = '/images/logo.png';

export type Language = 'en' | 'vi';

export interface MetaPagination {
  page?: number;
  take?: number;
  itemCount?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface ParameterGet {
  order?: string;
  page?: number;
  take?: number;
  searchKey?: string;
}

// eslint-disable-next-line no-shadow
export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}
