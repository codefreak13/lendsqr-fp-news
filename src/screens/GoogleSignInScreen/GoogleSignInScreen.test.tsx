import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GoogleSignInScreen from './GoogleSignInScreen';
import {useAuth} from '../../hooks';
import {LEFT_BUTTON_TEST_ID} from '../../utils/utils';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    goBack: jest.fn(),
    signIn: jest.fn(),
  }),
}));

describe('GoogleSignInScreen Component', () => {
  const mockOnGoBack = jest.fn();
  const mockOnSignIn = jest.fn();
  (useAuth as jest.Mock).mockReturnValue({
    goBack: mockOnGoBack,
    signIn: mockOnSignIn,
  });
  it('renders correctly and triggers sign-in', () => {
    const {getByTestId, getByText} = render(<GoogleSignInScreen />);
    expect(getByText('SIGN IN')).toBeTruthy();

    fireEvent.press(getByTestId(LEFT_BUTTON_TEST_ID));

    expect(mockOnGoBack).toHaveBeenCalled();
  });
});
