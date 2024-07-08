import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserDetailsScreen from './UserDetailsScreen';
import {CONTINUE_BTN_TEST_ID} from '../../utils/utils';

// Mock hooks
jest.mock('../../hooks/useUserInfo', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    fullName: '',
    phoneNumber: '',
    email: '',
    errors: {},
    onChangeFormValue: jest.fn(),
    navigateToSignIn: jest.fn(),
  }),
}));

describe('<UserDetailsScreen />', () => {
  it('renders correctly with initial state', () => {
    const {getByPlaceholderText, getByText} = render(<UserDetailsScreen />);

    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  it('displays error messages when fields are invalid', () => {
    const mockedUseUserInfo = require('../../hooks/useUserInfo').default;
    mockedUseUserInfo.mockReturnValue({
      fullName: '',
      phoneNumber: '',
      email: '',
      errors: {
        fullName: 'Full Name is required',
        phoneNumber: 'Phone Number is invalid',
        email: 'Email is invalid',
      },
      onChangeFormValue: jest.fn(),
      navigateToSignIn: jest.fn(),
    });

    const {getByText} = render(<UserDetailsScreen />);

    expect(getByText('Full Name is required')).toBeTruthy();
    expect(getByText('Phone Number is invalid')).toBeTruthy();
    expect(getByText('Email is invalid')).toBeTruthy();
  });

  it('calls onChangeFormValue when input changes', () => {
    const mockedUseUserInfo = require('../../hooks/useUserInfo').default;
    const mockOnChangeFormValue = jest.fn();
    mockedUseUserInfo.mockReturnValue({
      fullName: '',
      phoneNumber: '',
      email: '',
      errors: {},
      onChangeFormValue: mockOnChangeFormValue,
      navigateToSignIn: jest.fn(),
    });

    const {getByPlaceholderText} = render(<UserDetailsScreen />);

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');

    expect(mockOnChangeFormValue).toHaveBeenCalledWith('fullName');
    expect(mockOnChangeFormValue).toHaveBeenCalledWith('phoneNumber');
    expect(mockOnChangeFormValue).toHaveBeenCalledWith('email');
  });

  it('disables the Continue button when fields are invalid', () => {
    const mockedUseUserInfo = require('../../hooks/useUserInfo').default;
    mockedUseUserInfo.mockReturnValue({
      fullName: '',
      phoneNumber: '',
      email: '',
      errors: {
        fullName: 'Full Name is required',
        phoneNumber: 'Phone Number is invalid',
        email: 'Email is invalid',
      },
      onChangeFormValue: jest.fn(),
      navigateToSignIn: jest.fn(),
    });

    const {getByTestId} = render(<UserDetailsScreen />);
    const button = getByTestId(CONTINUE_BTN_TEST_ID);
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('calls navigateToSignIn when Continue button is pressed', () => {
    const mockedUseUserInfo = require('../../hooks/useUserInfo').default;
    const mockNavigateToSignIn = jest.fn();
    mockedUseUserInfo.mockReturnValue({
      fullName: 'John Doe',
      phoneNumber: '1234567890',
      email: 'john@example.com',
      errors: {},
      onChangeFormValue: jest.fn(),
      navigateToSignIn: mockNavigateToSignIn,
    });

    const {getByText} = render(<UserDetailsScreen />);
    const button = getByText('Continue');

    fireEvent.press(button);

    expect(mockNavigateToSignIn).toHaveBeenCalled();
  });
});
