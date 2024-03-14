import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const SearchSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
  >
    <path
      d="M10.7143 21.4286C4.80836 21.4286 0 16.6202 0 10.7143C0 4.80836 4.80836 0 10.7143 0C16.6202 0 21.4286 4.80836 21.4286 10.7143C21.4286 16.6202 16.6202 21.4286 10.7143 21.4286ZM10.7143 1.56794C5.66551 1.56794 1.56794 5.67596 1.56794 10.7143C1.56794 15.7526 5.66551 19.8606 10.7143 19.8606C15.7631 19.8606 19.8606 15.7526 19.8606 10.7143C19.8606 5.67596 15.7631 1.56794 10.7143 1.56794Z"
      fill="#61677A"
    />
    <path
      d="M21.9405 22.8572C21.7075 22.8572 21.4745 22.7715 21.2906 22.5877L18.8381 20.1369C18.4825 19.7816 18.4825 19.1934 18.8381 18.8381C19.1937 18.4827 19.7823 18.4827 20.1379 18.8381L22.5904 21.2888C22.946 21.6441 22.946 22.2323 22.5904 22.5877C22.4065 22.7715 22.1735 22.8572 21.9405 22.8572Z"
      fill="#61677A"
    />
  </svg>
);

const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SearchSvg} {...props} />
);

export default SearchIcon;
