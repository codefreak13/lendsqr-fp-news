import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from './Input';
import {ON_CLEAR_TEST_ID} from '../../../utils/utils';

describe('Input Component', () => {
  const defaultProps = {
    customStyle: {backgroundColor: 'white'},
    value: '',
    setValue: jest.fn(),
    placeholder: 'Enter text',
    numberOfLines: 1,
    multiline: false,
    testID: 'input',
    editable: true,
    onBlur: jest.fn(),
    onClear: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByTestId} = render(<Input {...defaultProps} />);
    const input = getByTestId('input');
    expect(input).toBeTruthy();
  });

  it('displays the correct placeholder', () => {
    const {getByPlaceholderText} = render(<Input {...defaultProps} />);
    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
  });

  it('calls setValue on text change', () => {
    const setValueMock = jest.fn();
    const {getByTestId} = render(
      <Input {...defaultProps} setValue={setValueMock} value="initial" />,
    );
    const input = getByTestId('input');
    fireEvent.changeText(input, 'new text');
    expect(setValueMock).toHaveBeenCalledWith('new text');
  });

  it('calls onBlur when input loses focus', () => {
    const onBlurMock = jest.fn();
    const {getByTestId} = render(
      <Input {...defaultProps} onBlur={onBlurMock} />,
    );
    const input = getByTestId('input');
    fireEvent(input, 'onBlur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('renders clear icon and calls onClear when pressed', () => {
    const onClearMock = jest.fn();
    const {getByTestId} = render(
      <Input {...defaultProps} onClear={onClearMock} />,
    );
    const clearIcon = getByTestId(ON_CLEAR_TEST_ID);
    expect(clearIcon).toBeTruthy();
    fireEvent.press(clearIcon);
    expect(onClearMock).toHaveBeenCalled();
  });

  it('does not call setValue when input is not editable', () => {
    const setValueMock = jest.fn();
    const {getByTestId} = render(
      <Input {...defaultProps} setValue={setValueMock} editable={false} />,
    );
    const input = getByTestId('input');
    fireEvent.changeText(input, 'new text');
    expect(setValueMock).not.toHaveBeenCalled();
  });
});
