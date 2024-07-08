/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// const mockAsyncStorage = require('@react-native-community/async-storage/jest/async-storage-mock');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: 0,
        minor: 65,
        patch: 1,
      },
    },
  };
});

export default {
  fetch: jest.fn(() => Promise.resolve({isConnected: true})),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn(() => Promise.resolve(true)),
  signIn: jest.fn(() => Promise.resolve({idToken: 'test-id-token'})),
  signOut: jest.fn(() => Promise.resolve()),
  isSignedIn: jest.fn(() => Promise.resolve(true)),
};

export const GoogleSigninButton = jest.fn(() => null);

export const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
};

export const remoteConfig = {
  fetch: jest.fn(() => Promise.resolve()),
  fetchAndActivate: jest.fn(() => Promise.resolve(true)),
  getValue: jest.fn(() => ({asString: () => ''})),
  setDefaults: jest.fn(() => Promise.resolve()),
  setConfigSettings: jest.fn(() => Promise.resolve()),
};

export const firebaseAnalytics = () => ({
  trackLogOut: jest.fn(),
  trackAuthentication: jest.fn(),
  trackAddFavoriteItem: jest.fn(),
  trackDeleteFavoriteItem: jest.fn(),
  trackFavoriteScreenPress: jest.fn(),
  trackItemDetailPress: jest.fn(),
  trackViewType: jest.fn(),
  trackFilterType: jest.fn(),
});

jest.mock('./src/hooks/useFirebaseAnalytics', () => firebaseAnalytics);
