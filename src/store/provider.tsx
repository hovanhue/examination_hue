'use client';

import React from 'react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { store } from './index';

persistStore(store);

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
