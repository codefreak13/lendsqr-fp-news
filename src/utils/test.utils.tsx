import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {RootState, rootReducer} from '../store';
import {configureStore} from '@reduxjs/toolkit';

jest.mock('redux-persist/lib/integration/react', () => ({
  PersistGate: ({children}: {children: React.ReactNode}) => <>{children}</>,
}));

export const renderWithProvider = (
  ui: React.ReactElement,
  {preloadedState}: {preloadedState: Partial<RootState>},
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};
